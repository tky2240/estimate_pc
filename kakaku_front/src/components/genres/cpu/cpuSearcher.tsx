import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Paper, Select } from '@mui/material';
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
import { Add, Remove, Delete, Search } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CpuDescription } from './cpuPriceDisplay'
import { SortOrder } from '../genreList';
import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';
import { cpuUsage } from 'process';

type Props = {
    ChangeCpuDescriptions: (cpuDescriptions: CpuDescription[]) => void;
}

const CpuSearcher = (props: Props) => {
    const [searchCpuParameter, setSearchCpuParameter] = useState<SearchCpuParameter>({
        search_text: "",
        maker_name: " ",
        socket_name: " ",
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={4}>
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        キーワード
                    </Typography>
                </Grid>
                <Grid xs={8} >
                    <TextField label="Keyword" variant="filled"
                        value={searchCpuParameter.search_text}
                        onChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, search_text: e.target.value })}
                    />
                </Grid>
                <Grid xs={4} >
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        メーカー名
                    </Typography>
                </Grid>
                <Grid xs={8}>
                    <FormControl fullWidth>
                        <InputLabel >Maker</InputLabel>
                        <Select
                            value={searchCpuParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"AMD"}>AMD</MenuItem>
                            <MenuItem value={"インテル"}>Intel</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={4} >
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ソケット名
                    </Typography>
                </Grid>
                <Grid xs={8}>
                    <FormControl fullWidth>
                        <InputLabel >Socket</InputLabel>
                        <Select
                            value={searchCpuParameter.socket_name}
                            label="Socket"
                            onChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, socket_name: e.target.value })}
                        >
                            <MenuItem value={"LGA1150"}>LGA1150</MenuItem>
                            <MenuItem value={"LGA1151"}>LGA1151</MenuItem>
                            <MenuItem value={"LGA1155"}>LGA1155</MenuItem>
                            <MenuItem value={"LGA1156"}>LGA1156</MenuItem>
                            <MenuItem value={"LGA1200"}>LGA1200</MenuItem>
                            <MenuItem value={"LGA1700"}>LGA1700</MenuItem>
                            <MenuItem value={"LGA2011"}>LGA2011</MenuItem>
                            <MenuItem value={"LGA2011-3"}>LGA2011-3</MenuItem>
                            <MenuItem value={"LGA2066"}>LGA2066</MenuItem>
                            <MenuItem value={"LGA3647"}>LGA3647</MenuItem>
                            <MenuItem value={"LGA4189"}>LGA4189</MenuItem>
                            <MenuItem value={"Socket AM4"}>Socket AM4</MenuItem>
                            <MenuItem value={"Socket AM5"}>Socket AM5</MenuItem>
                            <MenuItem value={"Socket sTRX4"}>Socket sTRX4</MenuItem>
                            <MenuItem value={"Socket sWRX8"}>Socket sWRX8</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={4} >
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        価格
                    </Typography>
                </Grid>
                <Grid xs={3}>
                    <NumericFormat
                        value={searchCpuParameter.min_price}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        onValueChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={2} >
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={3}>
                    <NumericFormat
                        value={searchCpuParameter.max_price}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        onValueChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={4} >
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        並び順
                    </Typography>
                </Grid>
                <Grid xs={8}>
                    <FormControl fullWidth>
                        <InputLabel >SortOrder</InputLabel>
                        <Select
                            value={searchCpuParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <Button endIcon={<Search />} fullWidth onClick={async () => props.ChangeCpuDescriptions(await SearchCpu(searchCpuParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default CpuSearcher;

type SearchCpuParameter = {
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    socket_name: string;
    min_price: number | null;
    max_price: number | null;
}

const SearchCpu = async (searchCpuParameter: SearchCpuParameter): Promise<CpuDescription[]> => {

    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        console.log(urlBase);
        const response = await fetch(urlJoin(urlBase, "cpu"), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchCpuParameter) });
        if (!response.ok) {
            return [];
        }
        console.log(response);
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}