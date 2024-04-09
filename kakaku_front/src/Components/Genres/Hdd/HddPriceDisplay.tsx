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
import SelectedHdd from './SelectedHdd';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HddSearcher, { SearchHdd, SearchHddParameter } from './HddSearcher';
import HddDescriptionList from './HddDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
import Papa from 'papaparse';


type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
}

const HddPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [hddDescriptions, setHddDescriptions] = useState<HddDescription[]>([]);
    const changeHddDescriptions = (hddDescriptions: HddDescription[]) => {
        setHddDescriptions(hddDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setHddDescriptions([]);
    };
    const [hddDescriptionAndCounts, setHddDescriptionAndCounts] = useState<(HddDescriptionAndCount[])>([]);
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = Papa.parse<string[]>(
                    Buffer.from(
                        queryString.parse(location.search).Hdd as string, 'base64'
                    ).toString().trim().trim(),
                ).data.map((itemShortDescriptionArray): ItemShortDescription => (
                    {
                        item_id: itemShortDescriptionArray[0],
                        price: parseInt(itemShortDescriptionArray[1]),
                        count: parseInt(itemShortDescriptionArray[2])
                    }
                )).filter((itemIdShortDescription) => !isNaN(itemIdShortDescription.count));
                if (itemShortDescriptions.length === 0) {
                    return;
                }
                const searedHddParameter: SearchHddParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    capacity: 0,
                    write_style: "",
                    sort_order: "PriceAsc",
                };
                const searchedHddDescriptions = await SearchHdd(searedHddParameter);
                setHddDescriptionAndCounts(searchedHddDescriptions.map(
                    (searchedHddDescription): HddDescriptionAndCount => (
                        {
                            HddDescription: searchedHddDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedHddDescription.item_id)[0].count
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
    const deleteHddDescriptionAndCount = (hddDescriptionAndCount: HddDescriptionAndCount) => {
        setHddDescriptionAndCounts(hddDescriptionAndCounts.filter((currentHddDescriptionAndCount) => currentHddDescriptionAndCount !== hddDescriptionAndCount));
    };
    const addHddDescriptionAndCount = (hddDescription: HddDescription) => {
        setHddDescriptionAndCounts([...hddDescriptionAndCounts, { HddDescription: hddDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeHddDescriptionAndCountCount = (hddDescriptionAndCount: HddDescriptionAndCount, count: number) => {
        setHddDescriptionAndCounts(hddDescriptionAndCounts.map((currentHddDescriptionAndCount) => currentHddDescriptionAndCount === hddDescriptionAndCount ? { ...currentHddDescriptionAndCount, Count: count } : currentHddDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeGenreSummary({
            Genre: "Hdd",
            ItemShortDescriptions: hddDescriptionAndCounts.map(
                (hddDescriptionAndCount): ItemShortDescription => ({ item_id: hddDescriptionAndCount.HddDescription.item_id, price: hddDescriptionAndCount.HddDescription.price, count: hddDescriptionAndCount.Count }
                ))
        });
    }, [hddDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="HDD" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {hddDescriptionAndCounts.map((hddDescriptionAndCount) =>
                        <SelectedHdd HddDescriptionAndCount={hddDescriptionAndCount} DeleteHddDescriptionAndCount={deleteHddDescriptionAndCount} ChangeCount={changeHddDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいHDDを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>HDD検索</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <HddSearcher ChangeHddDescriptions={changeHddDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <HddDescriptionList HddDescriptions={hddDescriptions} AddHddDescriptionAndCount={addHddDescriptionAndCount} />
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

export default HddPriceDisplay;

export type HddDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    capacity: number;
    rpm: number | null;
    write_style: string;
    release_date: Date | null;
    is_exist: boolean;
};

export type HddDescriptionAndCount = {
    HddDescription: HddDescription;
    Count: number;
};