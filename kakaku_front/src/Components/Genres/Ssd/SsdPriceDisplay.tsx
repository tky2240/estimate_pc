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
import SsdSearcher, { SearchSsd, SearchSsdParameter } from './SsdSearcher';
import SsdDescriptionList from './SsdDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
import * as CSV from 'csv-string';


type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
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
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = CSV.parse(
                    Buffer.from(
                        queryString.parse(location.search).Ssd as string, 'base64'
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
                if (itemShortDescriptions.length === 0) {
                    return;
                }
                const searedSsdParameter: SearchSsdParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    capacity: 0,
                    interface: "",
                    tbw: null,
                    sort_order: "PriceAsc",
                };
                const searchedSsdDescriptions = await SearchSsd(searedSsdParameter);
                setSsdDescriptionAndCounts(searchedSsdDescriptions.map(
                    (searchedSsdDescription): SsdDescriptionAndCount => (
                        {
                            SsdDescription: searchedSsdDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedSsdDescription.item_id)[0].count
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
    const deleteSsdDescriptionAndCount = (ssdDescriptionAndCount: SsdDescriptionAndCount) => {
        setSsdDescriptionAndCounts([...ssdDescriptionAndCounts.filter((currentSsdDescriptionAndCount) => currentSsdDescriptionAndCount !== ssdDescriptionAndCount)]);
    };
    const addSsdDescriptionAndCount = (ssdDescription: SsdDescription) => {
        setSsdDescriptionAndCounts([...ssdDescriptionAndCounts, { SsdDescription: ssdDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeSsdDescriptionAndCount = (ssdDescriptionAndCount: SsdDescriptionAndCount, count: number) => {
        setSsdDescriptionAndCounts(ssdDescriptionAndCounts.map((currentSsdDescriptionAndCount) => currentSsdDescriptionAndCount === ssdDescriptionAndCount ? { ...currentSsdDescriptionAndCount, Count: count } : currentSsdDescriptionAndCount));
    }
    useEffect(() => {
        const genreSummary: GenreSummary = {
            Genre: "Ssd",
            ItemShortDescriptions: ssdDescriptionAndCounts.map(
                (ssdDescriptionAndCount): ItemShortDescription => ({ item_id: ssdDescriptionAndCount.SsdDescription.item_id, price: ssdDescriptionAndCount.SsdDescription.price, count: ssdDescriptionAndCount.Count }
                ))
        };
        props.ChangeGenreSummary(genreSummary);
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
                        <SelectedSsd SsdDescriptionAndCount={ssdDescriptionAndCount} DeleteSsdDescriptionAndCount={deleteSsdDescriptionAndCount} ChangeCount={changeSsdDescriptionAndCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいSSDを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>SSD検索</DialogTitle>
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
                    <Button sx={{ width: "20%" }} variant='outlined' onClick={handleDialogOpen}>閉じる</Button>
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