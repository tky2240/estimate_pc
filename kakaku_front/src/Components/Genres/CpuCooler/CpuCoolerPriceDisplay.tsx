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
import SelectedCpuCooler from './SelectedCpuCooler';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CpuCoolerSearcher from './CpuCoolerSearcher';
import CpuCoolerDescriptionList from './CpuCoolerDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
}

const CpuCoolerPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [cpuCoolerDescriptions, setCpuCoolerDescriptions] = useState<CpuCoolerDescription[]>([]);
    const changeCpuCoolerDescriptions = (cpuCoolerDescriptions: CpuCoolerDescription[]) => {
        setCpuCoolerDescriptions(cpuCoolerDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setCpuCoolerDescriptions([]);
    };
    const [cpuCoolerDescriptionAndCounts, setCpuCoolerDescriptionAndCounts] = useState<(CpuCoolerDescriptionAndCount[])>([]);
    const deleteCpuCoolerDescriptionAndCount = (cpuCoolerDescriptionAndCount: CpuCoolerDescriptionAndCount) => {
        setCpuCoolerDescriptionAndCounts(cpuCoolerDescriptionAndCounts.filter((currentCpuCoolerDescriptionAndCount) => currentCpuCoolerDescriptionAndCount !== cpuCoolerDescriptionAndCount));
    };
    const addCpuCoolerDescriptionAndCount = (cpuCoolerDescription: CpuCoolerDescription) => {
        setCpuCoolerDescriptionAndCounts([...cpuCoolerDescriptionAndCounts, { CpuCoolerDescription: cpuCoolerDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeCpuCoolerDescriptionAndCountCount = (cpuCoolerDescriptionAndCount: CpuCoolerDescriptionAndCount, count: number) => {
        setCpuCoolerDescriptionAndCounts(cpuCoolerDescriptionAndCounts.map((currentCpuCoolerDescriptionAndCount) => currentCpuCoolerDescriptionAndCount === cpuCoolerDescriptionAndCount ? { ...currentCpuCoolerDescriptionAndCount, Count: count } : currentCpuCoolerDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeTotalPrice("CpuCooler", cpuCoolerDescriptionAndCounts.reduce((total, cpuCoolerDescriptionAndCount) => total + cpuCoolerDescriptionAndCount.CpuCoolerDescription.price * cpuCoolerDescriptionAndCount.Count, 0));
        console.log(cpuCoolerDescriptionAndCounts.reduce((total, cpuCoolerDescriptionAndCount) => total + cpuCoolerDescriptionAndCount.CpuCoolerDescription.price * cpuCoolerDescriptionAndCount.Count, 0));
    }, [cpuCoolerDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="CPUクーラー" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {cpuCoolerDescriptionAndCounts.map((cpuCoolerDescriptionAndCount) =>
                        <SelectedCpuCooler CpuCoolerDescriptionAndCount={cpuCoolerDescriptionAndCount} DeleteCpuCoolerDescriptionAndCount={deleteCpuCoolerDescriptionAndCount} ChangeCount={changeCpuCoolerDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいCPUクーラーを追加...</Button>
            </Collapse>
            <Dialog
                sx={{ height: "100%" }}
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>CPUクーラー検索</DialogTitle>
                <DialogContent sx={{ width: '100%', height: "100%", }}>
                    <Grid container spacing={2} sx={{ width: '100%', height: "100%", display: "flex", justifyContent: "center", alignContent: "center" }} wrap="wrap" >
                        <Grid xs={12} md={6} >
                            <CpuCoolerSearcher ChangeCpuCoolerDescriptions={changeCpuCoolerDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6} >
                            <Paper sx={{ marginTop: 1 }}>
                                <CpuCoolerDescriptionList CpuCoolerDescriptions={cpuCoolerDescriptions} AddCpuCoolerDescriptionAndCount={addCpuCoolerDescriptionAndCount} />
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

export default CpuCoolerPriceDisplay;

export type CpuCoolerDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number;
    maker_name: string;
    product_name: string;
    air_flow_type: string;
    noise_level: string;
    max_tdp: null;
    width: number;
    height: number;
    depth: number;
    release_date: Date;
    is_exist: boolean;
    socket_names: string[];
}

export type CpuCoolerDescriptionAndCount = {
    CpuCoolerDescription: CpuCoolerDescription;
    Count: number;
};