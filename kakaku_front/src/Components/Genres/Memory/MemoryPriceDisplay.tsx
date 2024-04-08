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
import SelectedMemory from './SelectedMemory';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MemorySearcher, { SearchMemory, SearchMemoryParameter } from './MemorySearcher';
import MemoryDescriptionList from './MemoryDescriptionList';
import { ItemShortDescription, GenreSummary } from "../GenreList";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Buffer } from 'buffer';
// import * as CSV from 'csv-string';
import Papa, { ParseResult } from 'papaparse';


type Props = {
    ChangeGenreSummary: (genreSummary: GenreSummary) => void;
}

const MemoryPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [memoryDescriptions, setMemoryDescriptions] = useState<MemoryDescription[]>([]);
    const changeMemoryDescriptions = (memoryDescriptions: MemoryDescription[]) => {
        setMemoryDescriptions(memoryDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setMemoryDescriptions([]);
    };
    const [memoryDescriptionAndCounts, setMemoryDescriptionAndCounts] = useState<(MemoryDescriptionAndCount[])>([]);
    const location = useLocation();
    useEffect(() => {
        const inner = async () => {
            try {
                const itemShortDescriptions = Papa.parse<string[]>(
                    Buffer.from(
                        queryString.parse(location.search).Memory as string, 'base64'
                    ).toString().trim().trim(),
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
                const searedMemoryParameter: SearchMemoryParameter = {
                    item_ids: itemShortDescriptions.map((itemShortDescription) => itemShortDescription.item_id),
                    maker_name: "",
                    max_price: null,
                    min_price: null,
                    search_text: "",
                    capacity_per_module: 0,
                    interface: "",
                    memory_type: "",
                    module_count: 0,
                    module_type: "",
                    sort_order: "PriceAsc",
                };
                const searchedMemoryDescriptions = await SearchMemory(searedMemoryParameter);
                setMemoryDescriptionAndCounts(searchedMemoryDescriptions.map(
                    (searchedMemoryDescription): MemoryDescriptionAndCount => (
                        {
                            MemoryDescription: searchedMemoryDescription,
                            Count: itemShortDescriptions.filter((itemShortDescription) => itemShortDescription.item_id === searchedMemoryDescription.item_id)[0].count
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
    const deleteMemoryDescriptionAndCount = (memoryDescriptionAndCount: MemoryDescriptionAndCount) => {
        setMemoryDescriptionAndCounts(memoryDescriptionAndCounts.filter((currentMemoryDescriptionAndCount) => currentMemoryDescriptionAndCount !== memoryDescriptionAndCount));
    };
    const addMemoryDescriptionAndCount = (memoryDescription: MemoryDescription) => {
        setMemoryDescriptionAndCounts([...memoryDescriptionAndCounts, { MemoryDescription: memoryDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeMemoryDescriptionAndCountCount = (memoryDescriptionAndCount: MemoryDescriptionAndCount, count: number) => {
        setMemoryDescriptionAndCounts(memoryDescriptionAndCounts.map((currentMemoryDescriptionAndCount) => currentMemoryDescriptionAndCount === memoryDescriptionAndCount ? { ...currentMemoryDescriptionAndCount, Count: count } : currentMemoryDescriptionAndCount));
    }
    useEffect(() => {
        props.ChangeGenreSummary({
            Genre: "Memory",
            ItemShortDescriptions: memoryDescriptionAndCounts.map(
                (memoryDescriptionAndCount): ItemShortDescription => ({ item_id: memoryDescriptionAndCount.MemoryDescription.item_id, price: memoryDescriptionAndCount.MemoryDescription.price, count: memoryDescriptionAndCount.Count }
                ))
        });
    }, [memoryDescriptionAndCounts]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="メモリ" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {memoryDescriptionAndCounts.map((memoryDescriptionAndCount) =>
                        <SelectedMemory MemoryDescriptionAndCount={memoryDescriptionAndCount} DeleteMemoryDescriptionAndCount={deleteMemoryDescriptionAndCount} ChangeCount={changeMemoryDescriptionAndCountCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいメモリを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
                onClose={handleDialogOpen}
            >
                <DialogTitle>メモリ検索</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%" }} wrap="wrap" >
                        <Grid xs={12} md={6} justifyItems="center" alignItems="center">
                            <MemorySearcher ChangeMemoryDescriptions={changeMemoryDescriptions} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ marginTop: 1 }}>
                                <MemoryDescriptionList MemoryDescriptions={memoryDescriptions} AddMemoryDescriptionAndCount={addMemoryDescriptionAndCount} />
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

export default MemoryPriceDisplay;

export type MemoryDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    capacity_per_module: number;
    module_count: number;
    interface: string;
    memory_type: string;
    module_type: string;
    release_date: Date | null;
    is_exist: boolean;
};

export type MemoryDescriptionAndCount = {
    MemoryDescription: MemoryDescription;
    Count: number;
};
