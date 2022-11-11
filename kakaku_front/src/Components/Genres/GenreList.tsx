import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Divider, Paper } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
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
import CpuPriceDisplay from './Cpu/CpuPriceDisplay';
import CpuCoolerPriceDisplay from './CpuCooler/CpuCoolerPriceDisplay';
import MotherboardPriceDisplay from './Motherboard/MotherboardPriceDisplay';
import MemoryPriceDisplay from './Memory/MemoryPriceDisplay';
import GpuPriceDisplay from './Gpu/GpuPriceDisplay';
import { PropaneSharp } from '@mui/icons-material';

type Props = {
    ChangeTotalPrice: (price: number) => void;
}

const GenreList = (props: Props) => {
    const [genrePrices, setGenrePrices] = useState<GenrePrice[]>([
        { Genre: "Cpu", Price: 0 },
        { Genre: "CpuCooler", Price: 0 },
        { Genre: "Motherboard", Price: 0 },
        { Genre: "Memory", Price: 0 },
        { Genre: "Gpu", Price: 0 },
        { Genre: "Ssd", Price: 0 },
        { Genre: "Hdd", Price: 0 },
        { Genre: "Case", Price: 0 },
        { Genre: "PowerSupply", Price: 0 },
    ]);
    const changeGenrePrice = (genre: PartGenre, price: number) => {
        setGenrePrices(genrePrices.map((genrePrice) => genrePrice.Genre !== genre ? genrePrice : { Genre: genre, Price: price }));
    };
    useEffect(() => {
        props.ChangeTotalPrice(genrePrices.reduce(function (total, genrePrice) { return total + genrePrice.Price }, 0));
        console.log(genrePrices.reduce(function (total, genrePrice) { return total + genrePrice.Price }, 0));
    }, [genrePrices]);
    return (
        < Box sx={{ margin: "auto", width: "80%", maxWidth: "1000px", padding: "20px", }}>
            <Paper>
                <List
                    sx={{ margin: "auto", alignContent: "center", width: '100%', maxWidth: "1000px" }}
                    subheader={
                        <ListSubheader component="div">
                            PC Parts
                        </ListSubheader>
                    }
                >
                    <CpuPriceDisplay ChangeTotalPrice={changeGenrePrice} />
                    <Divider />
                    <CpuCoolerPriceDisplay ChangeTotalPrice={changeGenrePrice} />
                    <Divider />
                    <MotherboardPriceDisplay ChangeTotalPrice={changeGenrePrice} />
                    <Divider />
                    <MemoryPriceDisplay ChangeTotalPrice={changeGenrePrice} />
                    <Divider />
                    <GpuPriceDisplay ChangeTotalPrice={changeGenrePrice} />
                </List>
            </Paper>



            {/* <Accordion expanded={expanded === "Cpu"} onChange={expandedChange("Cpu")}>
                <AccordionSummary
                    sx={{ textAlign: "start" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{`CPU ${selectedSsdDescription?.product_name ?? ""} : ${selectedSsdDescription?.price ?? "0"}円`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        <SsdSearcher ChangeSsdDescriptions={changeSsdDescriptions} />
                        <SsdList SsdDescriptions={ssdDescriptions} ChangeSelectedSsdDescription={changeSelectedSsdDescription} />
                    </Stack>

                </AccordionDetails>
            </Accordion> */}
        </Box >
    );
}
export default GenreList

export type PartGenre =
    "Cpu" |
    "CpuCooler" |
    "Motherboard" |
    "Memory" |
    "Gpu" |
    "Ssd" |
    "Hdd" |
    "Case" |
    "PowerSupply";

export type SortOrder =
    "PriceAsc" |
    "PriceDesc" |
    "RankAsc" |
    "ReleaseDateDesc";

export type GenrePrice = {
    Genre: PartGenre;
    Price: number;
}