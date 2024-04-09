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
import { SsdDescription } from './SsdPriceDisplay'
import { SortOrder } from '../GenreList';
import { NumericFormat } from 'react-number-format';

type Props = {
    ChangeSsdDescriptions: (ssdDescriptions: SsdDescription[]) => void;
}

const SsdSearcher = (props: Props) => {
    const [searchSsdParameter, setSearchSsdParameter] = useState<SearchSsdParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        capacity: 0,
        interface: " ",
        tbw: null,
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
    return (
        <Box sx={{ width: '100%', height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        キーワード
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <TextField label="Keyword" variant="filled" fullWidth
                        value={searchSsdParameter.search_text}
                        onChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, search_text: e.target.value })}
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
                            value={searchSsdParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"Acer"}>Acer</MenuItem>
                            <MenuItem value={"ADATA"}>ADATA</MenuItem>
                            <MenuItem value={"addlink"}>addlink</MenuItem>
                            <MenuItem value={"ADTEC"}>ADTEC</MenuItem>
                            <MenuItem value={"Apacer"}>Apacer</MenuItem>
                            <MenuItem value={"BIOSTAR"}>BIOSTAR</MenuItem>
                            <MenuItem value={"CFD"}>CFD</MenuItem>
                            <MenuItem value={"Corsair"}>Corsair</MenuItem>
                            <MenuItem value={"crucial"}>crucial</MenuItem>
                            <MenuItem value={"ESSENCORE"}>ESSENCORE</MenuItem>
                            <MenuItem value={"GIGABYTE"}>GIGABYTE</MenuItem>
                            <MenuItem value={"HGST"}>HGST</MenuItem>
                            <MenuItem value={"HI-DISC"}>HI-DISC</MenuItem>
                            <MenuItem value={"HIKVISION"}>HIKVISION</MenuItem>
                            <MenuItem value={"HP"}>HP</MenuItem>
                            <MenuItem value={"IBM"}>IBM</MenuItem>
                            <MenuItem value={"IODATA"}>IODATA</MenuItem>
                            <MenuItem value={"J&A Information"}>J&A Information</MenuItem>
                            <MenuItem value={"KingFast"}>KingFast</MenuItem>
                            <MenuItem value={"KINGMAX"}>KINGMAX</MenuItem>
                            <MenuItem value={"KingSpec"}>KingSpec</MenuItem>
                            <MenuItem value={"LaCie"}>LaCie</MenuItem>
                            <MenuItem value={"Lenovo"}>Lenovo</MenuItem>
                            <MenuItem value={"Lexar"}>Lexar</MenuItem>
                            <MenuItem value={"Micron"}>Micron</MenuItem>
                            <MenuItem value={"MSI"}>MSI</MenuItem>
                            <MenuItem value={"Patriot Memory"}>Patriot Memory</MenuItem>
                            <MenuItem value={"PLEXTOR"}>PLEXTOR</MenuItem>
                            <MenuItem value={"PNY"}>PNY</MenuItem>
                            <MenuItem value={"SANDISK"}>SANDISK</MenuItem>
                            <MenuItem value={"SEAGATE"}>SEAGATE</MenuItem>
                            <MenuItem value={"Silicon Power"}>Silicon Power</MenuItem>
                            <MenuItem value={"SOLIDATA"}>SOLIDATA</MenuItem>
                            <MenuItem value={"Solidigm"}>Solidigm</MenuItem>
                            <MenuItem value={"SUPER TALENT"}>SUPER TALENT</MenuItem>
                            <MenuItem value={"Synology"}>Synology</MenuItem>
                            <MenuItem value={"Team"}>Team</MenuItem>
                            <MenuItem value={"UMAX"}>UMAX</MenuItem>
                            <MenuItem value={"WESTERN DIGITAL"}>WESTERN DIGITAL</MenuItem>
                            <MenuItem value={"WINTEN"}>WINTEN</MenuItem>
                            <MenuItem value={"インテル"}>インテル</MenuItem>
                            <MenuItem value={"エレコム"}>エレコム</MenuItem>
                            <MenuItem value={"キオクシア"}>キオクシア</MenuItem>
                            <MenuItem value={"キングストン"}>キングストン</MenuItem>
                            <MenuItem value={"グリーンハウス"}>グリーンハウス</MenuItem>
                            <MenuItem value={"サムスン"}>サムスン</MenuItem>
                            <MenuItem value={"トランセンド"}>トランセンド</MenuItem>
                            <MenuItem value={"リーダーメディアテクノ"}>リーダーメディアテクノ</MenuItem>
                            <MenuItem value={"ロジテック"}>ロジテック</MenuItem>
                            <MenuItem value={"旭東エレクトロニクス"}>旭東エレクトロニクス</MenuItem>
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
                        value={searchSsdParameter.capacity}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="Capacity"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'GB以上'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, capacity: e.floatValue ?? 0 })}
                    />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        接続規格
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >Interface</InputLabel>
                        <Select
                            value={searchSsdParameter.interface}
                            label="Interface"
                            onChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, interface: e.target.value })}
                        >
                            <MenuItem value={"PCI-Express"}>PCI-Express</MenuItem>
                            <MenuItem value={"PCI-Express Gen3"}>PCI-Express Gen3</MenuItem>
                            <MenuItem value={"PCI-Express Gen4"}>PCI-Express Gen4</MenuItem>
                            <MenuItem value={"PCI-Express Gen5"}>PCI-Express Gen5</MenuItem>
                            <MenuItem value={"SAS 12Gb/s"}>SAS 12Gb/s</MenuItem>
                            <MenuItem value={"Serial ATA"}>Serial ATA</MenuItem>
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
                        value={searchSsdParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchSsdParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchSsdParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchSsdParameter({ ...searchSsdParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} display="flex" justifyContent="start" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeSsdDescriptions(await SearchSsd(searchSsdParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default SsdSearcher;

export type SearchSsdParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    capacity: number;
    interface: string;
    tbw: number | null;
    min_price: number | null;
    max_price: number | null;
}

export const SearchSsd = async (searchSsdParameter: SearchSsdParameter): Promise<SsdDescription[]> => {
    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(new URL("ssd", urlBase), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchSsdParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}