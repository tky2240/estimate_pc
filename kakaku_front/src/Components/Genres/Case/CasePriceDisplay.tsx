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
import CpuSearcher from './CaseSearcher';
import CaseDescriptionList from './CaseDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
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
    const deleteCaseDescriptionAndCount = (caseDescriptionAndCount: CaseDescriptionAndCount) => {
        setCaseDescriptionAndCounts(caseDescriptionAndCounts.filter((currentCaseDescriptionAndCount) => currentCaseDescriptionAndCount !== caseDescriptionAndCount));
    };
    const addCaseDescriptionAndCount = (caseDescription: CaseDescription) => {
        setCaseDescriptionAndCounts([...caseDescriptionAndCounts, { CaseDescription: caseDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeCaseDescriptionAndCountCount = (caseDescriptionAndCount: CaseDescriptionAndCount, count: number) => {
        setCaseDescriptionAndCounts(caseDescriptionAndCounts.map((currentCaseDescriptionAndCount) => currentCaseDescriptionAndCount === caseDescriptionAndCount ? { ...currentCaseDescriptionAndCount, Count: count } : currentCaseDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeTotalPrice("Cpu", caseDescriptionAndCounts.reduce((total, caseDescriptionAndCount) => total + caseDescriptionAndCount.CaseDescription.price * caseDescriptionAndCount.Count, 0));
        console.log(caseDescriptionAndCounts.reduce((total, caseDescriptionAndCount) => total + caseDescriptionAndCount.CaseDescription.price * caseDescriptionAndCount.Count, 0));
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
                        <SelectedCase CaseDescriptionAndCount={caseDescriptionAndCount} DeleteCaseDescriptionAndCount={deleteCaseDescriptionAndCount} ChangeCount={changeCaseDescriptionAndCountCount} />
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
                    <Grid container spacing={2} sx={{ width: '100%', height: "100%", display: "flex", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1, justifyContent: "center", alignContent: "center" }} wrap="wrap" >
                        <Grid xs={12} md={6} >
                            <CpuSearcher ChangeCaseDescriptions={changeCaseDescriptions} />
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