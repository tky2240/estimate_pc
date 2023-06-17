import React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState, useRef } from 'react';
import { Divider, Paper, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CpuPriceDisplay from './Cpu/CpuPriceDisplay';
import CpuCoolerPriceDisplay from './CpuCooler/CpuCoolerPriceDisplay';
import MotherboardPriceDisplay from './Motherboard/MotherboardPriceDisplay';
import MemoryPriceDisplay from './Memory/MemoryPriceDisplay';
import GpuPriceDisplay from './Gpu/GpuPriceDisplay';
import SsdPriceDisplay from './Ssd/SsdPriceDisplay';
import HddPriceDisplay from './Hdd/HddPriceDisplay';
import CasePriceDisplay from './Case/CasePriceDisplay';
import PowerSupplyPriceDisplay from './PowerSupply/PowerSupplyPriceDisplay';
import { PropaneSharp, Search } from '@mui/icons-material';
import * as CSV from 'csv-string';
import { Buffer } from 'buffer';
//import urlJoin from 'url-join';
import { Share, ContentCopy } from '@mui/icons-material'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Snackbar from '@mui/material/Snackbar';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

type Props = {
    ChangeTotalPrice: (price: number) => void;
}

const GenreList = (props: Props) => {
    // { Genre: "Cpu", ItemShortDescriptions: [] },
    //     { Genre: "CpuCooler", ItemShortDescriptions: [] },
    //     { Genre: "Motherboard", ItemShortDescriptions: [] },
    //     { Genre: "Memory", ItemShortDescriptions: [] },
    //     { Genre: "Gpu", ItemShortDescriptions: [] },
    //     { Genre: "Ssd", ItemShortDescriptions: [] },
    //     { Genre: "Hdd", ItemShortDescriptions: [] },
    //     { Genre: "Case", ItemShortDescriptions: [] },
    //     { Genre: "PowerSupply", ItemShortDescriptions: [] },
    const location = useLocation()
    const [genreSummaries, setGenreSummaries] = useState<GenreSummary[]>([
        { Genre: "Cpu", ItemShortDescriptions: [] },
        { Genre: "CpuCooler", ItemShortDescriptions: [] },
        { Genre: "Motherboard", ItemShortDescriptions: [] },
        { Genre: "Memory", ItemShortDescriptions: [] },
        { Genre: "Gpu", ItemShortDescriptions: [] },
        { Genre: "Ssd", ItemShortDescriptions: [] },
        { Genre: "Hdd", ItemShortDescriptions: [] },
        { Genre: "Case", ItemShortDescriptions: [] },
        { Genre: "PowerSupply", ItemShortDescriptions: [] },
    ]);
    useEffect(() => {
        try {
            const parseToItemShortDescriptions = (genre: PartGenre): ItemShortDescription[] => {
                return CSV.parse(
                    Buffer.from(
                        Reflect.get(queryString.parse(location.search), genre) as string, 'base64'
                    ).toString()
                ).map((itemShortDescriptionArray): ItemShortDescription => (
                    {
                        item_id: itemShortDescriptionArray[0],
                        price: parseInt(itemShortDescriptionArray[1]),
                        count: parseInt(itemShortDescriptionArray[2])
                    }
                )).filter((itemIdShortDescription) => !isNaN(itemIdShortDescription.count));
            }
            const initialGenreSummaries: GenreSummary[] = [
                { Genre: "Cpu", ItemShortDescriptions: parseToItemShortDescriptions("Cpu") },
                { Genre: "CpuCooler", ItemShortDescriptions: parseToItemShortDescriptions("CpuCooler") },
                { Genre: "Motherboard", ItemShortDescriptions: parseToItemShortDescriptions("Motherboard") },
                { Genre: "Memory", ItemShortDescriptions: parseToItemShortDescriptions("Memory") },
                { Genre: "Gpu", ItemShortDescriptions: parseToItemShortDescriptions("Gpu") },
                { Genre: "Ssd", ItemShortDescriptions: parseToItemShortDescriptions("Ssd") },
                { Genre: "Hdd", ItemShortDescriptions: parseToItemShortDescriptions("Hdd") },
                { Genre: "Case", ItemShortDescriptions: parseToItemShortDescriptions("Case") },
                { Genre: "PowerSupply", ItemShortDescriptions: parseToItemShortDescriptions("PowerSupply") },
            ];
            setGenreSummaries(initialGenreSummaries);
            const totalPrice = initialGenreSummaries.reduce(
                (total, genreSummary) => total + genreSummary.ItemShortDescriptions.reduce(
                    (itemTotal, itemShortDescription) => itemTotal + itemShortDescription.price * itemShortDescription.count, 0)
                , 0);
            //props.ChangeTotalPrice(totalPrice);
            //console.log(totalPrice);
        } catch (e) {
            //console.log(e);
            setGenreSummaries([
                { Genre: "Cpu", ItemShortDescriptions: [] },
                { Genre: "CpuCooler", ItemShortDescriptions: [] },
                { Genre: "Motherboard", ItemShortDescriptions: [] },
                { Genre: "Memory", ItemShortDescriptions: [] },
                { Genre: "Gpu", ItemShortDescriptions: [] },
                { Genre: "Ssd", ItemShortDescriptions: [] },
                { Genre: "Hdd", ItemShortDescriptions: [] },
                { Genre: "Case", ItemShortDescriptions: [] },
                { Genre: "PowerSupply", ItemShortDescriptions: [] },
            ]);
        }
    }, [])
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setIsShareDialogOpen(!isShareDialogOpen);
    };
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
    const handleSnackBarOpen = () => {
        setIsOpenSnackbar(!isOpenSnackbar);
    }
    const [shareUrl, setShareUrl] = useState("");
    const changeGenreSummary = (genreSummary: GenreSummary) => {
        const filteredGenreSummaries = genreSummaries.filter((currentGenreSummaries) => currentGenreSummaries.Genre !== genreSummary.Genre);
        setGenreSummaries([...filteredGenreSummaries, genreSummary]);
        //console.log(genreSummary);
        //console.log(genreSummaries);
    };
    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        handleSnackBarOpen();
    }
    const processingShareUrl = useRef(false);
    const CreateShareURL = async () => {
        if (processingShareUrl.current) {
            return;
        }
        processingShareUrl.current = true;
        const baseUrl = window.location.href.split('?')[0];
        //console.log(baseUrl);
        const parseParameter = (partGenre: PartGenre) => {
            return Buffer.from(
                CSV.stringify(
                    genreSummaries.filter((genreSummary) => genreSummary.Genre === partGenre)[0].ItemShortDescriptions
                        .map((itemShortDescription => [itemShortDescription.item_id, itemShortDescription.price, itemShortDescription.count]))
                )
            ).toString('base64');
        };
        //console.log(genreSummaries);
        // const cpuParameter = parseParameter("Cpu");
        // const cpuCoolerParameter = parseParameter("CpuCooler");
        // const motherboardParameter = parseParameter("Motherboard");
        // const memoryParameter = parseParameter("Memory");
        // const gpuParameter = parseParameter("Gpu");
        // const ssdParameter = parseParameter("Ssd");
        // const hddParameter = parseParameter("Hdd");
        // const caseParameter = parseParameter("Case");
        // const powerSupplyParameter = parseParameter("PowerSupply");
        const shareParameters = new URLSearchParams({
            "Cpu": parseParameter("Cpu"),
            "CpuCooler": parseParameter("CpuCooler"),
            "Motherboard": parseParameter("Motherboard"),
            "Memory": parseParameter("Memory"),
            "Gpu": parseParameter("Gpu"),
            "Ssd": parseParameter("Ssd"),
            "Hdd": parseParameter("Hdd"),
            "Case": parseParameter("Case"),
            "PowerSupply": parseParameter("PowerSupply"),
        });
        // const createdShareUrl = urlJoin(
        //     baseUrl,
        //     `?Cpu=${parseParameter("Cpu")}`,
        //     `?CpuCooler=${parseParameter("CpuCooler")}`,
        //     `?Motherboard=${parseParameter("Motherboard")}`,
        //     `?Memory=${parseParameter("Memory")}`,
        //     `?Gpu=${parseParameter("Gpu")}`,
        //     `?Ssd=${parseParameter("Ssd")}`,
        //     `?Hdd=${parseParameter("Hdd")}`,
        //     `?Case=${parseParameter("Case")}`,
        //     `?PowerSupply=${parseParameter("PowerSupply")}`,
        // )
        //console.log(createdShareUrl);
        const longUrl = new URL(baseUrl);
        longUrl.search = shareParameters.toString();
        const createdShortUrl = CreateShortUrl(longUrl.toString());
        //console.log(createdShortUrl);
        setShareUrl(await createdShortUrl);
        processingShareUrl.current = false;
        handleDialogOpen();
    }
    useEffect(() => {
        //console.log(`changed from genre change, genre summery`);
        //console.log(genreSummaries);
        const totalPrice = genreSummaries.reduce(
            (total, genreSummary) => total + genreSummary.ItemShortDescriptions.reduce(
                (itemTotal, itemShortDescription) => itemTotal + itemShortDescription.price * itemShortDescription.count, 0)
            , 0);
        //console.log(`changed from genre change, total price : ${totalPrice}`)
        props.ChangeTotalPrice(totalPrice);
    }, genreSummaries);
    return (
        < Box sx={{ margin: "auto", width: "90%", maxWidth: "1000px", padding: "20px", }}>
            <Stack spacing={2}>
                <Paper>
                    <List
                        sx={{ margin: "auto", alignContent: "center", width: '100%', maxWidth: "1000px" }}
                        subheader={
                            <ListSubheader component="div">
                                PC Parts
                            </ListSubheader>
                        }
                    >
                        <CpuPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <CpuCoolerPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <MotherboardPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <MemoryPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <GpuPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <SsdPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <HddPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <CasePriceDisplay ChangeGenreSummary={changeGenreSummary} />
                        <Divider />
                        <PowerSupplyPriceDisplay ChangeGenreSummary={changeGenreSummary} />
                    </List>
                </Paper>
                <Button variant='outlined' startIcon={<Share />} onClick={(async () => await CreateShareURL())}>
                    共有リンク作成
                </Button>
                <Dialog
                    fullWidth={true}
                    maxWidth={false}
                    open={isShareDialogOpen}
                    onClose={handleDialogOpen}
                    aria-labelledby="共有リンク"
                >
                    <DialogTitle >
                        共有リンク
                    </DialogTitle>
                    <DialogContent>
                        <Stack alignContent="start" spacing={2}>
                            <TextField variant='filled' fullWidth inputProps={{ readOnly: true }} value={shareUrl} onFocus={event => { event.target.select() }} />
                            <Button variant='outlined' startIcon={<ContentCopy />} onClick={() => copyLink()}>
                                コピー
                            </Button>
                            <Snackbar
                                open={isOpenSnackbar}
                                autoHideDuration={3000}
                                onClose={handleSnackBarOpen}
                                message="Share link is Copied!!"
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <DialogActions >
                            <Button variant='outlined' onClick={handleDialogOpen}>閉じる</Button>
                        </DialogActions>
                    </DialogActions>
                </Dialog>
            </Stack>


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
                        <SsdList SsdDescriptions={ssdDescriptionscase} ChangeSelectedSsdDescription={changeSelectedSsdDescription} />
                    </Stack>

                </AccordionDetails>
            </Accordion> */}
        </Box >
    );
}

const CreateShortUrl = async (long_url: string): Promise<string> => {
    try {
        const urlBase = process.env.REACT_APP_CREATE_API_URL_BASE ?? "";
        const response = await fetch(new URL("short_url", urlBase), { method: "POST", headers: { 'Content-Type': 'text/plain' }, body: long_url });
        if (!response.ok) {
            return '';
        }
        return response.text();
    } catch (e) {
        console.log(e)
        return '';
    }
}

export type SearchFromItemIdParameter = {
    case_ids: string[],
    cpu_cooler_ids: string[],
    cpu_ids: string[],
    gpu_ids: string[],
    hdd_ids: string[],
    memory_ids: string[],
    motherboard_ids: string[],
    power_supply_ids: string[],
    ssd_ids: string[],
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

export type GenreSummary = {
    Genre: PartGenre;
    ItemShortDescriptions: ItemShortDescription[]
}

export type ItemShortDescription = {
    item_id: string;
    count: number;
    price: number;
}