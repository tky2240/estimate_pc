import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import SelectedCpu from './SelectedCpu';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CpuSearcher, { SearchCpu, SearchCpuParameter } from './CpuSearcher';
import CpuDescriptionList from './CpuDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
import * as CSV from 'csv-string';

type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
}

const CpuPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [cpuDescriptions, setCpuDescriptions] = useState<CpuDescription[]>([]);
    const changeCpuDescriptions = (cpuDescriptions: CpuDescription[]) => {
        setCpuDescriptions(cpuDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setCpuDescriptions([]);
    };
    const [cpuDescriptionAndCounts, setCpuDescriptionAndCounts] = useState<(CpuDescriptionAndCount[])>([]);
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                //const itemIdAndCounts = JSON.parse(Buffer.from(queryString.parse(location.search).Cpu as string, 'base64').toString()) as ItemIDAndCount[];
                const itemShortDescriptions = CSV.parse(
                    Buffer.from(
                        queryString.parse(location.search).Cpu as string, 'base64'
                    ).toString()
                )
                    .map((itemShortDescriptionArray): ItemShortDescription => (
                        {
                            item_id: itemShortDescriptionArray[0],
                            price: parseInt(itemShortDescriptionArray[1]),
                            count: parseInt(itemShortDescriptionArray[2])
                        }
                    ))
                    .filter((itemIdShortDescription) => !isNaN(itemIdShortDescription.count));
                if (itemShortDescriptions.length === 0) {
                    return;
                }
                const searedCpuParameter: SearchCpuParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    socket_name: "",
                    sort_order: "PriceAsc",
                };
                const searchedCpuDescriptions = await SearchCpu(searedCpuParameter);
                setCpuDescriptionAndCounts(searchedCpuDescriptions.map(
                    (searchedCpuDescription): CpuDescriptionAndCount => (
                        {
                            CpuDescription: searchedCpuDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedCpuDescription.item_id)[0].count
                        }
                    )
                ));
                setIsOpen(true);
            } catch (e) {
                console.log(`parse error : ${e}`);
            }
        }
        inner();
    }, []);
    const deleteCpuDescriptionAndCount = (cpuDescriptionAndCount: CpuDescriptionAndCount) => {
        setCpuDescriptionAndCounts(cpuDescriptionAndCounts.filter((currentCpuDescriptionAndCount) => currentCpuDescriptionAndCount !== cpuDescriptionAndCount));
    };
    const addCpuDescriptionAndCount = (cpuDescription: CpuDescription) => {
        setCpuDescriptionAndCounts([...cpuDescriptionAndCounts, { CpuDescription: cpuDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeCpuDescriptionAndCountCount = (cpuDescriptionAndCount: CpuDescriptionAndCount, count: number) => {
        setCpuDescriptionAndCounts(cpuDescriptionAndCounts.map((currentCpuDescriptionAndCount) => currentCpuDescriptionAndCount === cpuDescriptionAndCount ? { ...currentCpuDescriptionAndCount, Count: count } : currentCpuDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeGenreSummary({
            Genre: "Cpu",
            ItemShortDescriptions: cpuDescriptionAndCounts.map(
                (cpuDescriptionAndCount): ItemShortDescription => ({ item_id: cpuDescriptionAndCount.CpuDescription.item_id, price: cpuDescriptionAndCount.CpuDescription.price, count: cpuDescriptionAndCount.Count }
                ))
        });
        //console.log(cpuDescriptionAndCounts);
        //console.log(cpuDescriptionAndCounts.reduce((total, cpuDescriptionAndCount) => total + cpuDescriptionAndCount.CpuDescription.price * cpuDescriptionAndCount.Count, 0));
        //console.log(JSON.stringify(cpuDescriptionAndCounts));
    }, [cpuDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="CPU" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {cpuDescriptionAndCounts.map((cpuDescriptionAndCount) =>
                        <SelectedCpu CpuDescriptionAndCount={cpuDescriptionAndCount} DeleteCpuDescriptionAndCount={deleteCpuDescriptionAndCount} ChangeCount={changeCpuDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいCPUを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>CPU検索</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <CpuSearcher ChangeCpuDescriptions={changeCpuDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <CpuDescriptionList CpuDescriptions={cpuDescriptions} AddCpuDescriptionAndCount={addCpuDescriptionAndCount} />
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions >
                    <Button sx={{ width: "20%" }} variant='outlined' onClick={handleDialogOpen}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CpuPriceDisplay;

export type CpuDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    generation: string;
    socket_name: string;
    core_count: number;
    thread_count: number;
    tdp: number | null;
    base_clock: number;
    boost_clock: number | null;
    graphics: string;
    release_date: Date | null;
    is_exist: boolean;
};

export type CpuDescriptionAndCount = {
    CpuDescription: CpuDescription;
    Count: number;
};