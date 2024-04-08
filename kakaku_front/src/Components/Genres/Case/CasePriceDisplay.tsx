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
import SelectedCase from './SelectedCase';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CaseSearcher, { SearchCase, SearchCaseParameter } from './CaseSearcher';
import CaseDescriptionList from './CaseDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
// import * as CSV from 'csv-string';
import Papa, { ParseResult } from 'papaparse';


type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
}

const CasePriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [caseDescriptions, setCaseDescriptions] = useState<CaseDescription[]>([]);
    const changeCaseDescriptions = (caseDescriptions: CaseDescription[]) => {
        setCaseDescriptions(caseDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setCaseDescriptions([]);
    };
    const [caseDescriptionAndCounts, setCaseDescriptionAndCounts] = useState<(CaseDescriptionAndCount[])>([]);
    const location = useLocation();

    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = Papa.parse<string[]>(
                    Buffer.from(
                        queryString.parse(location.search).Case as string, 'base64'
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
                const searedCaseParameter: SearchCaseParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    form_factor: "",
                    is_low_profile: false,
                    sort_order: "PriceAsc",
                };
                const searchedCaseDescriptions = await SearchCase(searedCaseParameter);
                setCaseDescriptionAndCounts(searchedCaseDescriptions.map(
                    (searchedCaseDescription): CaseDescriptionAndCount => (
                        {
                            CaseDescription: searchedCaseDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedCaseDescription.item_id)[0].count
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
    const deleteCaseDescriptionAndCount = (caseDescriptionAndCount: CaseDescriptionAndCount) => {
        setCaseDescriptionAndCounts(caseDescriptionAndCounts.filter((currentCaseDescriptionAndCount) => currentCaseDescriptionAndCount !== caseDescriptionAndCount));
    };
    const addCaseDescriptionAndCount = (caseDescription: CaseDescription) => {
        setCaseDescriptionAndCounts([...caseDescriptionAndCounts, { CaseDescription: caseDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeCaseDescriptionAndCount = (caseDescriptionAndCount: CaseDescriptionAndCount, count: number) => {
        setCaseDescriptionAndCounts(caseDescriptionAndCounts.map((currentCaseDescriptionAndCount) => currentCaseDescriptionAndCount === caseDescriptionAndCount ? { ...currentCaseDescriptionAndCount, Count: count } : currentCaseDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeGenreSummary({
            Genre: "Case",
            ItemShortDescriptions: caseDescriptionAndCounts.map(
                (caseDescriptionAndCount): ItemShortDescription => ({ item_id: caseDescriptionAndCount.CaseDescription.item_id, price: caseDescriptionAndCount.CaseDescription.price, count: caseDescriptionAndCount.Count }
                ))
        });
    }, [caseDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="ケース" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {caseDescriptionAndCounts.map((caseDescriptionAndCount) =>
                        <SelectedCase CaseDescriptionAndCount={caseDescriptionAndCount} DeleteCaseDescriptionAndCount={deleteCaseDescriptionAndCount} ChangeCount={changeCaseDescriptionAndCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいケースを追加...</Button>
            </Collapse>
            <Dialog
                sx={{ height: "100%" }}
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>ケース検索</DialogTitle>
                <DialogContent sx={{ width: '100%', height: "100%", }}>
                    <Grid container spacing={2} sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignContent: "center" }} wrap="wrap" >
                        <Grid xs={12} md={6} >
                            <CaseSearcher ChangeCaseDescriptions={changeCaseDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6} >
                            <Paper sx={{ marginTop: 1 }}>
                                <CaseDescriptionList CaseDescriptions={caseDescriptions} AddCaseDescriptionAndCount={addCaseDescriptionAndCount} />
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

export default CasePriceDisplay;

export type CaseDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    max_gpu_length: number | null;
    max_cpu_cooler_height: number | null;
    max_power_supply_size: number | null;
    slot_count: null;
    drive_bay_information: string;
    is_low_profile: boolean;
    weight: number | null;
    width: number | null;
    height: number | null;
    depth: number | null;
    release_date: Date | null;
    is_exist: boolean;
    form_factors: string[];
};

export type CaseDescriptionAndCount = {
    CaseDescription: CaseDescription;
    Count: number;
};