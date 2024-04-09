import Box from '@mui/material/Box';
import { useState } from 'react';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Search } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CpuDescription } from './CpuPriceDisplay'
import { SortOrder } from '../GenreList';
import { NumericFormat } from 'react-number-format';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
    ChangeCpuDescriptions: (cpuDescriptions: CpuDescription[]) => void;
}

const CpuSearcher = (props: Props) => {
    const [searchCpuParameter, setSearchCpuParameter] = useState<SearchCpuParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        socket_name: " ",
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const searchHandler = async function () {
        setIsSearching(true);
        props.ChangeCpuDescriptions(await SearchCpu(searchCpuParameter));
        setIsSearching(false);
    }
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        キーワード
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <TextField label="Keyword" variant="filled" fullWidth
                        value={searchCpuParameter.search_text}
                        onChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, search_text: e.target.value })}
                    />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        メーカー名
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
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
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ソケット名
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
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
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        価格
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchCpuParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchCpuParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchCpuParameter({ ...searchCpuParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        並び順
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
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
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <LoadingButton variant='outlined' endIcon={<Search />} loading={isSearching} fullWidth onClick={searchHandler}>検索</LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}
export default CpuSearcher;

export type SearchCpuParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    socket_name: string;
    min_price: number | null;
    max_price: number | null;
}

export const SearchCpu = async (searchCpuParameter: SearchCpuParameter): Promise<CpuDescription[]> => {

    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(new URL("cpu", urlBase), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchCpuParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}