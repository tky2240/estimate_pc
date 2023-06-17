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
import { HddDescription } from './HddPriceDisplay'
import { SortOrder } from '../GenreList';
//import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';

type Props = {
    ChangeHddDescriptions: (hddDescriptions: HddDescription[]) => void;
}

const HddSearcher = (props: Props) => {
    const [searchHddParameter, setSearchHddParameter] = useState<SearchHddParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        capacity: 0,
        write_style: " ",
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
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
                        value={searchHddParameter.search_text}
                        onChange={(e) => setSearchHddParameter({ ...searchHddParameter, search_text: e.target.value })}
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
                            value={searchHddParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchHddParameter({ ...searchHddParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"HGST"}>HGST</MenuItem>
                            <MenuItem value={"HP"}>HP</MenuItem>
                            <MenuItem value={"IODATA"}>IODATA</MenuItem>
                            <MenuItem value={"Lenovo"}>Lenovo</MenuItem>
                            <MenuItem value={"SEAGATE"}>SEAGATE</MenuItem>
                            <MenuItem value={"Synology"}>Synology</MenuItem>
                            <MenuItem value={"WESTERN DIGITAL"}>WESTERN DIGITAL</MenuItem>
                            <MenuItem value={"サムスン"}>サムスン</MenuItem>
                            <MenuItem value={"バッファロー"}>バッファロー</MenuItem>
                            <MenuItem value={"ロジテック"}>ロジテック</MenuItem>
                            <MenuItem value={"東芝"}>東芝</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        容量
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchHddParameter.capacity}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="Capacity"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'GB以上'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchHddParameter({ ...searchHddParameter, capacity: e.floatValue ?? 0 })}
                    />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        書込方式
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >WriteStyle</InputLabel>
                        <Select
                            value={searchHddParameter.write_style}
                            label="WriteStyle"
                            onChange={(e) => setSearchHddParameter({ ...searchHddParameter, write_style: e.target.value })}
                        >
                            <MenuItem value={"CMR"}>CMR</MenuItem>
                            <MenuItem value={"SMR"}>SMR</MenuItem>
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
                        value={searchHddParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchHddParameter({ ...searchHddParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchHddParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchHddParameter({ ...searchHddParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchHddParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchHddParameter({ ...searchHddParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeHddDescriptions(await SearchHdd(searchHddParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default HddSearcher;

export type SearchHddParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    capacity: number;
    write_style: string;
    min_price: number | null;
    max_price: number | null;
}

export const SearchHdd = async (searchHddParameter: SearchHddParameter): Promise<HddDescription[]> => {
    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(new URL("hdd", urlBase), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchHddParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}