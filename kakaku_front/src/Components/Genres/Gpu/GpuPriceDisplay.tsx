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
import GpuSearcher, { SearchGpu, SearchGpuParameter } from './GpuSearcher';
import GpuDescriptionList from './GpuDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
import Papa from 'papaparse';

type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
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
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = Papa.parse<string[]>(
                    Buffer.from(
                        queryString.parse(location.search).Gpu as string, 'base64'
                    ).toString().trim(),
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
                const searedGpuParameter: SearchGpuParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    chip_name: "",
                    cooling_solution: "",
                    gpu_memory_capacity: 0,
                    is_low_profile: false,
                    max_tdp: null,
                    sort_order: "PriceAsc",
                };
                const searchedGpuDescriptions = await SearchGpu(searedGpuParameter);
                setGpuDescriptionAndCounts(searchedGpuDescriptions.map(
                    (searchedGpuDescription): GpuDescriptionAndCount => (
                        {
                            GpuDescription: searchedGpuDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedGpuDescription.item_id)[0].count
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
        props.ChangeGenreSummary({
            Genre: "Gpu",
            ItemShortDescriptions: gpuDescriptionAndCounts.map(
                (gpuDescriptionAndCount): ItemShortDescription => ({ item_id: gpuDescriptionAndCount.GpuDescription.item_id, price: gpuDescriptionAndCount.GpuDescription.price, count: gpuDescriptionAndCount.Count }
                ))
        });
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