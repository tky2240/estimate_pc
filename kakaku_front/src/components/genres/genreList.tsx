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
import CpuPriceDisplay from './cpu/cpuPriceDisplay';

const GenreList = () => {
    const [expanded, setExpanded] = useState<PartGenre | null>(null)
    const expandedChange =
        (genre: PartGenre) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? genre : null);
        };
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ margin: "auto", width: "80%", maxWidth: "1000px", padding: "20px", bgcolor: "background.paper" }}>
            <Paper>
                <List
                    sx={{ margin: "auto", alignContent: "center", width: '100%', maxWidth: "1000px" }}
                    subheader={
                        <ListSubheader component="div">
                            PC Parts
                        </ListSubheader>
                    }
                >
                    <CpuPriceDisplay />
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
        </Box>
    );
}
export default GenreList

export type PartGenre =
    "Cpu" |
    "CpuCooler" |
    "Motherboard" |
    "Memory" |
    "Ssd" |
    "Hdd" |
    "Case" |
    "PowerSupply";