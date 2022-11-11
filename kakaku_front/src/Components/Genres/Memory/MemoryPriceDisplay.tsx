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
import MemorySearcher from './MemorySearcher';
import MemoryDescriptionList from './MemoryDescriptionList';
import { PartGenre } from "../GenreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
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
        props.ChangeTotalPrice("Memory", memoryDescriptionAndCounts.reduce((total, memoryDescriptionAndCount) => total + memoryDescriptionAndCount.MemoryDescription.price * memoryDescriptionAndCount.Count, 0));
        console.log(memoryDescriptionAndCounts.reduce((total, memoryDescriptionAndCount) => total + memoryDescriptionAndCount.MemoryDescription.price * memoryDescriptionAndCount.Count, 0));
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
                    <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
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
