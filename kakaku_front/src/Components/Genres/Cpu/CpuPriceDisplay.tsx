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
import CpuSearcher from './CpuSearcher';
import CpuDescriptionList from './CpuDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
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
        props.ChangeTotalPrice("Cpu", cpuDescriptionAndCounts.reduce((total, cpuDescriptionAndCount) => total + cpuDescriptionAndCount.CpuDescription.price * cpuDescriptionAndCount.Count, 0));
        console.log(cpuDescriptionAndCounts.reduce((total, cpuDescriptionAndCount) => total + cpuDescriptionAndCount.CpuDescription.price * cpuDescriptionAndCount.Count, 0));
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