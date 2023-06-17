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
import { MotherboardDescription } from './MotherboardPriceDisplay'
import { SortOrder } from '../GenreList';
//import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';

type Props = {
    ChangeMotherboardDescriptions: (motherboardDescriptions: MotherboardDescription[]) => void;
}

const MotherboardSearcher = (props: Props) => {
    const [searchMotherboardParameter, setSearchMotherboardParameter] = useState<SearchMotherboardParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        chipset: " ",
        socket_name: " ",
        form_factor: " ",
        memory_type: " ",
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
                        value={searchMotherboardParameter.search_text}
                        onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, search_text: e.target.value })}
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
                            value={searchMotherboardParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"ASRock"}>ASRock</MenuItem>
                            <MenuItem value={"ASUS"}>ASUS</MenuItem>
                            <MenuItem value={"BIOSTAR"}>BIOSTAR</MenuItem>
                            <MenuItem value={"ECS"}>ECS</MenuItem>
                            <MenuItem value={"GIGABYTE"}>GIGABYTE</MenuItem>
                            <MenuItem value={"MSI"}>MSI</MenuItem>
                            <MenuItem value={"NZXT"}>NZXT</MenuItem>
                            <MenuItem value={"SUPERMICRO"}>SUPERMICRO</MenuItem>
                            <MenuItem value={"インテル"}>インテル</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        チップセット
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >Chipset</InputLabel>
                        <Select
                            value={searchMotherboardParameter.chipset}
                            label="Chipset"
                            onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, chipset: e.target.value })}
                        >
                            <MenuItem value={"AMD 970+SB950"}>AMD 970+SB950</MenuItem>
                            <MenuItem value={"AMD A320"}>AMD A320</MenuItem>
                            <MenuItem value={"AMD A520"}>AMD A520</MenuItem>
                            <MenuItem value={"AMD A55"}>AMD A55</MenuItem>
                            <MenuItem value={"AMD A58"}>AMD A58</MenuItem>
                            <MenuItem value={"AMD A75"}>AMD A75</MenuItem>
                            <MenuItem value={"AMD A85X"}>AMD A85X</MenuItem>
                            <MenuItem value={"AMD B550"}>AMD B550</MenuItem>
                            <MenuItem value={"AMD B650"}>AMD B650</MenuItem>
                            <MenuItem value={"AMD B650E"}>AMD B650E</MenuItem>
                            <MenuItem value={"AMD WRX80"}>AMD WRX80</MenuItem>
                            <MenuItem value={"AMD X370"}>AMD X370</MenuItem>
                            <MenuItem value={"AMD X399"}>AMD X399</MenuItem>
                            <MenuItem value={"AMD X470"}>AMD X470</MenuItem>
                            <MenuItem value={"AMD X570"}>AMD X570</MenuItem>
                            <MenuItem value={"AMD X670"}>AMD X670</MenuItem>
                            <MenuItem value={"AMD X670E"}>AMD X670E</MenuItem>
                            <MenuItem value={"INTEL B460"}>INTEL B460</MenuItem>
                            <MenuItem value={"INTEL B560"}>INTEL B560</MenuItem>
                            <MenuItem value={"INTEL B660"}>INTEL B660</MenuItem>
                            <MenuItem value={"INTEL C226"}>INTEL C226</MenuItem>
                            <MenuItem value={"INTEL C232"}>INTEL C232</MenuItem>
                            <MenuItem value={"INTEL C236"}>INTEL C236</MenuItem>
                            <MenuItem value={"INTEL C242"}>INTEL C242</MenuItem>
                            <MenuItem value={"INTEL C246"}>INTEL C246</MenuItem>
                            <MenuItem value={"INTEL C252"}>INTEL C252</MenuItem>
                            <MenuItem value={"INTEL C256"}>INTEL C256</MenuItem>
                            <MenuItem value={"INTEL C422"}>INTEL C422</MenuItem>
                            <MenuItem value={"INTEL C612"}>INTEL C612</MenuItem>
                            <MenuItem value={"INTEL C621"}>INTEL C621</MenuItem>
                            <MenuItem value={"INTEL CM236"}>INTEL CM236</MenuItem>
                            <MenuItem value={"INTEL H110"}>INTEL H110</MenuItem>
                            <MenuItem value={"INTEL H310"}>INTEL H310</MenuItem>
                            <MenuItem value={"INTEL H410"}>INTEL H410</MenuItem>
                            <MenuItem value={"INTEL H510"}>INTEL H510</MenuItem>
                            <MenuItem value={"INTEL H570"}>INTEL H570</MenuItem>
                            <MenuItem value={"INTEL H61"}>INTEL H61</MenuItem>
                            <MenuItem value={"INTEL H610"}>INTEL H610</MenuItem>
                            <MenuItem value={"INTEL H670"}>INTEL H670</MenuItem>
                            <MenuItem value={"INTEL H81"}>INTEL H81</MenuItem>
                            <MenuItem value={"INTEL P55"}>INTEL P55</MenuItem>
                            <MenuItem value={"INTEL P67"}>INTEL P67</MenuItem>
                            <MenuItem value={"INTEL Q170"}>INTEL Q170</MenuItem>
                            <MenuItem value={"INTEL Q370"}>INTEL Q370</MenuItem>
                            <MenuItem value={"INTEL Q470"}>INTEL Q470</MenuItem>
                            <MenuItem value={"INTEL Q470E"}>INTEL Q470E</MenuItem>
                            <MenuItem value={"INTEL Q87"}>INTEL Q87</MenuItem>
                            <MenuItem value={"INTEL W480"}>INTEL W480</MenuItem>
                            <MenuItem value={"INTEL W480E"}>INTEL W480E</MenuItem>
                            <MenuItem value={"INTEL W580"}>INTEL W580</MenuItem>
                            <MenuItem value={"INTEL X299"}>INTEL X299</MenuItem>
                            <MenuItem value={"INTEL X79"}>INTEL X79</MenuItem>
                            <MenuItem value={"INTEL Z390"}>INTEL Z390</MenuItem>
                            <MenuItem value={"INTEL Z490"}>INTEL Z490</MenuItem>
                            <MenuItem value={"INTEL Z590"}>INTEL Z590</MenuItem>
                            <MenuItem value={"INTEL Z690"}>INTEL Z690</MenuItem>
                            <MenuItem value={"INTEL Z790"}>INTEL Z790</MenuItem>
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
                            value={searchMotherboardParameter.socket_name}
                            label="Socket"
                            onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, socket_name: e.target.value })}
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
                            <MenuItem value={"Socket sWRX8"}>Socket sWRX8</MenuItem>
                            <MenuItem value={"SocketAM3+"}>SocketAM3+</MenuItem>
                            <MenuItem value={"SocketAM4"}>SocketAM4</MenuItem>
                            <MenuItem value={"SocketAM5"}>SocketAM5</MenuItem>
                            <MenuItem value={"SocketFM1"}>SocketFM1</MenuItem>
                            <MenuItem value={"SocketFM2"}>SocketFM2</MenuItem>
                            <MenuItem value={"SocketFM2+/FM2"}>SocketFM2+/FM2</MenuItem>
                            <MenuItem value={"SocketTR4"}>SocketTR4</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        フォームファクタ
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >FormFactor</InputLabel>
                        <Select
                            value={searchMotherboardParameter.form_factor}
                            label="FormFactor"
                            onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, form_factor: e.target.value })}
                        >
                            <MenuItem value={"ATX"}>ATX</MenuItem>
                            <MenuItem value={"CEB"}>CEB</MenuItem>
                            <MenuItem value={"Extended"}>Extended</MenuItem>
                            <MenuItem value={"MicroATX"}>MicroATX</MenuItem>
                            <MenuItem value={"Mini ITX"}>Mini ITX</MenuItem>
                            <MenuItem value={"Proprietary"}>Proprietary</MenuItem>
                            <MenuItem value={"SSI EEB"}>SSI EEB</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        メモリタイプ
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >Memory</InputLabel>
                        <Select
                            value={searchMotherboardParameter.memory_type}
                            label="Memory"
                            onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, memory_type: e.target.value })}
                        >
                            <MenuItem value={"DIMM DDR3"}>DIMM DDR3</MenuItem>
                            <MenuItem value={"DIMM DDR4"}>DIMM DDR4</MenuItem>
                            <MenuItem value={"DIMM DDR5"}>DIMM DDR5</MenuItem>
                            <MenuItem value={"S.O.DIMM DDR3"}>S.O.DIMM DDR3</MenuItem>
                            <MenuItem value={"S.O.DIMM DDR3L"}>S.O.DIMM DDR3L</MenuItem>
                            <MenuItem value={"S.O.DIMM DDR4"}>S.O.DIMM DDR4</MenuItem>
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
                        value={searchMotherboardParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchMotherboardParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchMotherboardParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchMotherboardParameter({ ...searchMotherboardParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeMotherboardDescriptions(await SearchMotherboard(searchMotherboardParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default MotherboardSearcher;

export type SearchMotherboardParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    chipset: string,
    socket_name: string,
    form_factor: string,
    memory_type: string,
    min_price: number | null;
    max_price: number | null;
}

export const SearchMotherboard = async (searchMotherboardParameter: SearchMotherboardParameter): Promise<MotherboardDescription[]> => {
    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(new URL("motherboard", urlBase), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchMotherboardParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}