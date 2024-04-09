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
import PowerSupplySearcher, { SearchPowerSupply, SearchPowerSupplyParameter } from './PowerSupplySearcher';
import PowerSupplyDescriptionList from './PowerSupplyDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
import Papa from 'papaparse';


type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
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
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = Papa.parse<string[]>(
                    Buffer.from(
                        queryString.parse(location.search).PowerSupply as string, 'base64'
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
                const searedPowerSupplyParameter: SearchPowerSupplyParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    capacity: 0,
                    cpu_connector_count: null,
                    eight_pin_connector_count: null,
                    eighty_plus_certification: "",
                    form_factor: "",
                    sort_order: "PriceAsc",
                };
                const searchedPowerSupplyDescriptions = await SearchPowerSupply(searedPowerSupplyParameter);
                setPowerSupplyDescriptionAndCounts(searchedPowerSupplyDescriptions.map(
                    (searchedPowerSupplyDescription): PowerSupplyDescriptionAndCount => (
                        {
                            PowerSupplyDescription: searchedPowerSupplyDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedPowerSupplyDescription.item_id)[0].count
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
        props.ChangeGenreSummary({
            Genre: "PowerSupply",
            ItemShortDescriptions: powerSupplyDescriptionAndCounts.map(
                (powerSupplyDescriptionAndCount): ItemShortDescription => ({ item_id: powerSupplyDescriptionAndCount.PowerSupplyDescription.item_id, price: powerSupplyDescriptionAndCount.PowerSupplyDescription.price, count: powerSupplyDescriptionAndCount.Count }
                ))
        });
    }, [powerSupplyDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="電源" />
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
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しい電源を追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>電源検索</DialogTitle>
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
                    <Button sx={{ width: "20%" }} variant='outlined' onClick={handleDialogOpen}>閉じる</Button>
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