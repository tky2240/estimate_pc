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
import SelectedGpu from './SelectedGpu';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GpuSearcher from './GpuSearcher';
import GpuDescriptionList from './GpuDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
}

const GpuPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [gpuDescriptions, setGpuDescriptions] = useState<GpuDescription[]>([]);
    const changeGpuDescriptions = (gpuDescriptions: GpuDescription[]) => {
        setGpuDescriptions(gpuDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setGpuDescriptions([]);
    };
    const [gpuDescriptionAndCounts, setGpuDescriptionAndCounts] = useState<(GpuDescriptionAndCount[])>([]);
    const deleteGpuDescriptionAndCount = (gpuDescriptionAndCount: GpuDescriptionAndCount) => {
        setGpuDescriptionAndCounts(gpuDescriptionAndCounts.filter((currentGpuDescriptionAndCount) => currentGpuDescriptionAndCount !== gpuDescriptionAndCount));
    };
    const addGpuDescriptionAndCount = (gpuDescription: GpuDescription) => {
        setGpuDescriptionAndCounts([...gpuDescriptionAndCounts, { GpuDescription: gpuDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeGpuDescriptionAndCountCount = (gpuDescriptionAndCount: GpuDescriptionAndCount, count: number) => {
        setGpuDescriptionAndCounts(gpuDescriptionAndCounts.map((currentGpuDescriptionAndCount) => currentGpuDescriptionAndCount === gpuDescriptionAndCount ? { ...currentGpuDescriptionAndCount, Count: count } : currentGpuDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeTotalPrice("Gpu", gpuDescriptionAndCounts.reduce((total, gpuDescriptionAndCount) => total + gpuDescriptionAndCount.GpuDescription.price * gpuDescriptionAndCount.Count, 0));
        console.log(gpuDescriptionAndCounts.reduce((total, gpuDescriptionAndCount) => total + gpuDescriptionAndCount.GpuDescription.price * gpuDescriptionAndCount.Count, 0));
    }, [gpuDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="GPU" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {gpuDescriptionAndCounts.map((gpuDescriptionAndCount) =>
                        <SelectedGpu GpuDescriptionAndCount={gpuDescriptionAndCount} DeleteGpuDescriptionAndCount={deleteGpuDescriptionAndCount} ChangeCount={changeGpuDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいGPUを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>GPU検索</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <GpuSearcher ChangeGpuDescriptions={changeGpuDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <GpuDescriptionList GpuDescriptions={gpuDescriptions} AddGpuDescriptionAndCount={addGpuDescriptionAndCount} />
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

export default GpuPriceDisplay;

export type GpuDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    chip_name: string;
    gpu_memory_type: string;
    gpu_memory_capacity: number;
    gpu_memory_bus_width: number | null;
    gpu_memory_clock: number | null;
    pcie_interface: string;
    is_low_profile: boolean;
    cooling_solution: string;
    tdp: number | null;
    hdmi_count: number;
    displayport_count: number;
    width: number | null;
    height: number | null;
    depth: number | null;
    radiator_width: number | null;
    radiator_height: number | null;
    radiator_depth: number | null;
    release_date: Date | null;
    is_exist: boolean;
};

export type GpuDescriptionAndCount = {
    GpuDescription: GpuDescription;
    Count: number;
};