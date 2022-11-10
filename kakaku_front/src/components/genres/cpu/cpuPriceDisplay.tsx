import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import { Add, Remove, Delete } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import CpuSelectedRow from './cpuSelectedRow';
import Divider from '@mui/material/Divider';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CpuSearcher from './cpuSearcher';
import CpuDescriptionList from './cpuDescriptionList';
import { PartGenre } from "../genreList"

type Props = {
    ChangeTotalPrice: (genre: PartGenre, price: number) => void;
}

const CpuPriceDisplay = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const genreClick = () => {
        setIsOpen(!isOpen);
    };
    const [cpuDescriptions, setCpuDescriptions] = useState<CpuDescription[]>([]);
    const changeCpuDescriptions = (cpuDescriptions: CpuDescription[]) => {
        setCpuDescriptions(cpuDescriptions);
    };
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsDialogOpen(!isDialogOpen);
        setCpuDescriptions([]);
    };
    const [selectedCpuDescriptions, setSelectedCpuDescriptions] = useState<SelectedCpuDescription[]>([]);
    const deleteSelectedCpuDescription = (selectedCpuDescription: SelectedCpuDescription) => {
        setSelectedCpuDescriptions(selectedCpuDescriptions.filter((currentSelectedCpuDescription) => currentSelectedCpuDescription !== selectedCpuDescription));
    };
    const addSelectedCpuDescription = (cpuDescription: CpuDescription) => {
        setSelectedCpuDescriptions([...selectedCpuDescriptions, { CpuDescription: cpuDescription, Count: 1 }]);
        handleDialogOpen();
    };
    const changeSelectedCpuDescriptionCount = (selectedCpuDescription: SelectedCpuDescription, count: number) => {
        setSelectedCpuDescriptions(selectedCpuDescriptions.map((currentSelectedCpuDescription) => currentSelectedCpuDescription === selectedCpuDescription ? { ...currentSelectedCpuDescription, Count: count } : currentSelectedCpuDescription));
    }
    useEffect(() => {
        props.ChangeTotalPrice("Cpu", selectedCpuDescriptions.reduce(function (total, selectedCpuDescription) { return total + selectedCpuDescription.CpuDescription.price * selectedCpuDescription.Count; }, 0));
        console.log(selectedCpuDescriptions.reduce(function (total, selectedCpuDescription) { return total + selectedCpuDescription.CpuDescription.price * selectedCpuDescription.Count; }, 0));
    }, [selectedCpuDescriptions]);
    return (
        <Box sx={{ width: "100%" }}>
            <ListItemButton onClick={genreClick}>
                <ListItemText primary="Cpu" />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Stack spacing={0} sx={{ alignItems: "center", justifyItems: "center" }}>
                    <Divider />
                    {selectedCpuDescriptions.map((selectedCpuDescription) =>
                        <CpuSelectedRow SelectedCpuDescription={selectedCpuDescription} DeleteSelectedCpuDescription={deleteSelectedCpuDescription} ChangeCount={changeSelectedCpuDescriptionCount} />
                    )}
                </Stack>
                <Divider sx={{ paddingTop: 2 }} />
                <Button sx={{ padding: 1 }} fullWidth onClick={handleDialogOpen}>新しいCPUを追加...</Button>
            </Collapse>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={isDialogOpen}
            >
                <DialogTitle>CPU検索</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                        <Grid xs={6} justifyItems="center" alignItems="center">
                            <CpuSearcher ChangeCpuDescriptions={changeCpuDescriptions} />
                        </Grid>
                        <Grid xs={6}>
                            <CpuDescriptionList CpuDescriptions={cpuDescriptions} AddSelectedCpuDescription={addSelectedCpuDescription} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogOpen}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default CpuPriceDisplay;

export type CpuDescription = {
    // Generated by https://quicktype.io
    item_id: string;
    name: string;
    price: number;
    popular_rank: number | null;
    maker_name: string;
    product_name: string;
    generation: string;
    socket_name: string;
    core_count: number;
    thread_count: number;
    tdp: number | null;
    base_clock: number;
    boost_clock: number | null;
    graphics: string;
    release_date: Date | null;
    is_exist: boolean;
};

export type SelectedCpuDescription = {
    CpuDescription: CpuDescription;
    Count: number;
};