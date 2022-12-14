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
import SelectedSsd from './SelectedSsd';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SsdSearcher from './SsdSearcher';
import SsdDescriptionList from './SsdDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
}

const SsdPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [ssdDescriptions, setSsdDescriptions] = useState<SsdDescription[]>([]);
    const changeSsdDescriptions = (ssdDescriptions: SsdDescription[]) => {
        setSsdDescriptions(ssdDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setSsdDescriptions([]);
    };
    const [ssdDescriptionAndCounts, setSsdDescriptionAndCounts] = useState<(SsdDescriptionAndCount[])>([]);
    const deleteSsdDescriptionAndCount = (ssdDescriptionAndCount: SsdDescriptionAndCount) => {
        setSsdDescriptionAndCounts(ssdDescriptionAndCounts.filter((currentSsdDescriptionAndCount) => currentSsdDescriptionAndCount !== ssdDescriptionAndCount));
    };
    const addSsdDescriptionAndCount = (ssdDescription: SsdDescription) => {
        setSsdDescriptionAndCounts([...ssdDescriptionAndCounts, { SsdDescription: ssdDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeSsdDescriptionAndCountCount = (ssdDescriptionAndCount: SsdDescriptionAndCount, count: number) => {
        setSsdDescriptionAndCounts(ssdDescriptionAndCounts.map((currentSsdDescriptionAndCount) => currentSsdDescriptionAndCount === ssdDescriptionAndCount ? { ...currentSsdDescriptionAndCount, Count: count } : currentSsdDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeTotalPrice("Ssd", ssdDescriptionAndCounts.reduce((total, ssdDescriptionAndCount) => total + ssdDescriptionAndCount.SsdDescription.price * ssdDescriptionAndCount.Count, 0));
        console.log(ssdDescriptionAndCounts.reduce((total, ssdDescriptionAndCount) => total + ssdDescriptionAndCount.SsdDescription.price * ssdDescriptionAndCount.Count, 0));
    }, [ssdDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="SSD" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {ssdDescriptionAndCounts.map((ssdDescriptionAndCount) =>
                        <SelectedSsd SsdDescriptionAndCount={ssdDescriptionAndCount} DeleteSsdDescriptionAndCount={deleteSsdDescriptionAndCount} ChangeCount={changeSsdDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>?????????SSD?????????...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>SSD??????</DialogTitle>
                <DialogContent sx={{ width: "100%", height: "100%" }}>
                    <Grid container spacing={2} sx={{ width: "100%", height: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <SsdSearcher ChangeSsdDescriptions={changeSsdDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <SsdDescriptionList SsdDescriptions={ssdDescriptions} AddSsdDescriptionAndCount={addSsdDescriptionAndCount} />
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions >
                    <Button sx={{ width: "20%" }} variant='outlined' onClick={handleDialogOpen}>?????????</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SsdPriceDisplay;

export type SsdDescription = {
    // Generated by https://quicktype.io

    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    capacity: number;
    size: string;
    interface: string;
    tbw: number | null;
    release_date: Date | null;
    is_exist: boolean;
};

export type SsdDescriptionAndCount = {
    SsdDescription: SsdDescription;
    Count: number;
};