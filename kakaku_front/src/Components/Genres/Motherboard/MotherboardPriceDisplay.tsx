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
import MotherboardSearcher, { SearchMotherboard, SearchMotherboardParameter } from './MotherboardSearcher';
import MotherboardDescriptionList from './MotherboardDescriptionList';
import { PartGenre, ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
import * as CSV from 'csv-string';


type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
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
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = CSV.parse(
                    Buffer.from(
                        queryString.parse(location.search).Motherboard as string, 'base64'
                    ).toString()
                )
                    .map((itemShortDescriptionArray): ItemShortDescription => (
                        {
                            item_id: itemShortDescriptionArray[0],
                            price: parseInt(itemShortDescriptionArray[1]),
                            count: parseInt(itemShortDescriptionArray[2])
                        }
                    ))
                    .filter((itemIdShortDescription) => !isNaN(itemIdShortDescription.count));
                if (itemShortDescriptions.length == 0) {
                    return;
                }
                const searedMotherboardParameter: SearchMotherboardParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    socket_name: "",
                    chipset: "",
                    form_factor: "",
                    memory_type: "",
                    sort_order: "PriceAsc",
                };
                const searchedMotherboardDescriptions = await SearchMotherboard(searedMotherboardParameter);
                setMotherboardDescriptionAndCounts(searchedMotherboardDescriptions.map(
                    (searchedMotherboardDescription): MotherboardDescriptionAndCount => (
                        {
                            MotherboardDescription: searchedMotherboardDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedMotherboardDescription.item_id)[0].count
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
        props.ChangeGenreSummary({
            Genre: "Motherboard",
            ItemShortDescriptions: motherboardDescriptionAndCounts.map(
                (motherboardDescriptionAndCount): ItemShortDescription => ({ item_id: motherboardDescriptionAndCount.MotherboardDescription.item_id, price: motherboardDescriptionAndCount.MotherboardDescription.price, count: motherboardDescriptionAndCount.Count }
                ))
        });
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