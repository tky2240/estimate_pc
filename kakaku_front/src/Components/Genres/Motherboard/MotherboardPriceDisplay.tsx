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
import SelectedMotherboard from './SelectedMotherboard';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MotherboardSearcher from './MotherboardSearcher';
import MotherboardDescriptionList from './MotherboardDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
}

const MotherboardPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [motherboardDescriptions, setMotherboardDescriptions] = useState<MotherboardDescription[]>([]);
    const changeMotherboardDescriptions = (motherboardDescriptions: MotherboardDescription[]) => {
        setMotherboardDescriptions(motherboardDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setMotherboardDescriptions([]);
    };
    const [motherboardDescriptionAndCounts, setMotherboardDescriptionAndCounts] = useState<(MotherboardDescriptionAndCount[])>([]);
    const deleteMotherboardDescriptionAndCount = (motherboardDescriptionAndCount: MotherboardDescriptionAndCount) => {
        setMotherboardDescriptionAndCounts(motherboardDescriptionAndCounts.filter((currentMotherboardDescriptionAndCount) => currentMotherboardDescriptionAndCount !== motherboardDescriptionAndCount));
    };
    const addMotherboardDescriptionAndCount = (motherboardDescription: MotherboardDescription) => {
        setMotherboardDescriptionAndCounts([...motherboardDescriptionAndCounts, { MotherboardDescription: motherboardDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeMotherboardDescriptionAndCountCount = (motherboardDescriptionAndCount: MotherboardDescriptionAndCount, count: number) => {
        setMotherboardDescriptionAndCounts(motherboardDescriptionAndCounts.map((currentMotherboardDescriptionAndCount) => currentMotherboardDescriptionAndCount === motherboardDescriptionAndCount ? { ...currentMotherboardDescriptionAndCount, Count: count } : currentMotherboardDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeTotalPrice("Motherboard", motherboardDescriptionAndCounts.reduce((total, motherboardDescriptionAndCount) => total + motherboardDescriptionAndCount.MotherboardDescription.price * motherboardDescriptionAndCount.Count, 0));
        console.log(motherboardDescriptionAndCounts.reduce((total, motherboardDescriptionAndCount) => total + motherboardDescriptionAndCount.MotherboardDescription.price * motherboardDescriptionAndCount.Count, 0));
    }, [motherboardDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="マザーボード" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {motherboardDescriptionAndCounts.map((motherboardDescriptionAndCount) =>
                        <SelectedMotherboard MotherboardDescriptionAndCount={motherboardDescriptionAndCount} DeleteMotherboardDescriptionAndCount={deleteMotherboardDescriptionAndCount} ChangeCount={changeMotherboardDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいマザーボードを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>マザーボード検索</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <MotherboardSearcher ChangeMotherboardDescriptions={changeMotherboardDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <MotherboardDescriptionList MotherboardDescriptions={motherboardDescriptions} AddMotherboardDescriptionAndCount={addMotherboardDescriptionAndCount} />
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

export default MotherboardPriceDisplay;

export type MotherboardDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    chipset: string;
    socket_name: string;
    form_factor: string;
    memory_type: string;
    memory_slot_count: number;
    max_memory_capacity: number;
    pci_slot_count: number;
    pcie_x16_slot_count: number;
    pcie_x8_slot_count: number;
    pcie_x4_slot_count: number;
    pcie_x1_slot_count: number;
    sata_connector_count: number;
    release_date: Date | null;
    is_exist: boolean;
};

export type MotherboardDescriptionAndCount = {
    MotherboardDescription: MotherboardDescription;
    Count: number;
};