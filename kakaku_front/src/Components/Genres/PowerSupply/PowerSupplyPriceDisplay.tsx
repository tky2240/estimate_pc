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
import SelectedPowerSupply from './SelectedPowerSupply';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PowerSupplySearcher from './PowerSupplySearcher';
import PowerSupplyDescriptionList from './PowerSupplyDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
}

const PowerSupplyPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [powerSupplyDescriptions, setPowerSupplyDescriptions] = useState<PowerSupplyDescription[]>([]);
    const changePowerSupplyDescriptions = (powerSupplyDescriptions: PowerSupplyDescription[]) => {
        setPowerSupplyDescriptions(powerSupplyDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setPowerSupplyDescriptions([]);
    };
    const [powerSupplyDescriptionAndCounts, setPowerSupplyDescriptionAndCounts] = useState<(PowerSupplyDescriptionAndCount[])>([]);
    const deletePowerSupplyDescriptionAndCount = (powerSupplyDescriptionAndCount: PowerSupplyDescriptionAndCount) => {
        setPowerSupplyDescriptionAndCounts(powerSupplyDescriptionAndCounts.filter((currentPowerSupplyDescriptionAndCount) => currentPowerSupplyDescriptionAndCount !== powerSupplyDescriptionAndCount));
    };
    const addPowerSupplyDescriptionAndCount = (powerSupplyDescription: PowerSupplyDescription) => {
        setPowerSupplyDescriptionAndCounts([...powerSupplyDescriptionAndCounts, { PowerSupplyDescription: powerSupplyDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changePowerSupplyDescriptionAndCountCount = (powerSupplyDescriptionAndCount: PowerSupplyDescriptionAndCount, count: number) => {
        setPowerSupplyDescriptionAndCounts(powerSupplyDescriptionAndCounts.map((currentPowerSupplyDescriptionAndCount) => currentPowerSupplyDescriptionAndCount === powerSupplyDescriptionAndCount ? { ...currentPowerSupplyDescriptionAndCount, Count: count } : currentPowerSupplyDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeTotalPrice("PowerSupply", powerSupplyDescriptionAndCounts.reduce((total, powerSupplyDescriptionAndCount) => total + powerSupplyDescriptionAndCount.PowerSupplyDescription.price * powerSupplyDescriptionAndCount.Count, 0));
        console.log(powerSupplyDescriptionAndCounts.reduce((total, powerSupplyDescriptionAndCount) => total + powerSupplyDescriptionAndCount.PowerSupplyDescription.price * powerSupplyDescriptionAndCount.Count, 0));
    }, [powerSupplyDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="??????" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {powerSupplyDescriptionAndCounts.map((powerSupplyDescriptionAndCount) =>
                        <SelectedPowerSupply PowerSupplyDescriptionAndCount={powerSupplyDescriptionAndCount} DeletePowerSupplyDescriptionAndCount={deletePowerSupplyDescriptionAndCount} ChangeCount={changePowerSupplyDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>????????????????????????...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>????????????</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <PowerSupplySearcher ChangePowerSupplyDescriptions={changePowerSupplyDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <PowerSupplyDescriptionList PowerSupplyDescriptions={powerSupplyDescriptions} AddPowerSupplyDescriptionAndCount={addPowerSupplyDescriptionAndCount} />
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

export default PowerSupplyPriceDisplay;

export type PowerSupplyDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    form_factor: string;
    capacity: number;
    eighty_plus_certification: string;
    cpu_connector_count: number | null;
    six_pin_connector_count: number | null;
    eight_pin_connector_count: number | null;
    sata_connector_count: number | null;
    peripheral_connector_count: number | null;
    fdd_connector_count: number | null;
    width: number | null;
    height: number | null;
    depth: number | null;
    weight: number | null;
    release_date: Date;
    is_exist: boolean;
};

export type PowerSupplyDescriptionAndCount = {
    PowerSupplyDescription: PowerSupplyDescription;
    Count: number;
};