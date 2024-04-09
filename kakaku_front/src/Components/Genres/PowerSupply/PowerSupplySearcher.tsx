import Box from '@mui/material/Box';
import { useState } from 'react';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Search } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { PowerSupplyDescription } from './PowerSupplyPriceDisplay'
import { SortOrder } from '../GenreList';
import { NumericFormat } from 'react-number-format';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
    ChangePowerSupplyDescriptions: (powerSupplyDescriptions: PowerSupplyDescription[]) => void;
}

const PowerSupplySearcher = (props: Props) => {
    const [searchPowerSupplyParameter, setSearchPowerSupplyParameter] = useState<SearchPowerSupplyParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        form_factor: " ",
        capacity: 0,
        eighty_plus_certification: " ",
        cpu_connector_count: null,
        eight_pin_connector_count: null,
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const searchHandler = async function () {
        setIsSearching(true);
        props.ChangePowerSupplyDescriptions(await SearchPowerSupply(searchPowerSupplyParameter));
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
                        value={searchPowerSupplyParameter.search_text}
                        onChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, search_text: e.target.value })}
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
                            value={searchPowerSupplyParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"Abee"}>Abee</MenuItem>
                            <MenuItem value={"AcBel"}>AcBel</MenuItem>
                            <MenuItem value={"ADATA"}>ADATA</MenuItem>
                            <MenuItem value={"ANTEC"}>ANTEC</MenuItem>
                            <MenuItem value={"AOPEN"}>AOPEN</MenuItem>
                            <MenuItem value={"ASUS"}>ASUS</MenuItem>
                            <MenuItem value={"COOLER MASTER"}>COOLER MASTER</MenuItem>
                            <MenuItem value={"Corsair"}>Corsair</MenuItem>
                            <MenuItem value={"COUGAR"}>COUGAR</MenuItem>
                            <MenuItem value={"DEEPCOOL"}>DEEPCOOL</MenuItem>
                            <MenuItem value={"ENERMAX"}>ENERMAX</MenuItem>
                            <MenuItem value={"Enhance"}>Enhance</MenuItem>
                            <MenuItem value={"Fractal Design"}>Fractal Design</MenuItem>
                            <MenuItem value={"FSP"}>FSP</MenuItem>
                            <MenuItem value={"IN WIN"}>IN WIN</MenuItem>
                            <MenuItem value={"LIAN LI"}>LIAN LI</MenuItem>
                            <MenuItem value={"MSI"}>MSI</MenuItem>
                            <MenuItem value={"NZXT"}>NZXT</MenuItem>
                            <MenuItem value={"OCZ"}>OCZ</MenuItem>
                            <MenuItem value={"PC Power & Cooling"}>PC Power & Cooling</MenuItem>
                            <MenuItem value={"Phanteks"}>Phanteks</MenuItem>
                            <MenuItem value={"Seasonic"}>Seasonic</MenuItem>
                            <MenuItem value={"Sharkoon"}>Sharkoon</MenuItem>
                            <MenuItem value={"Shuttle"}>Shuttle</MenuItem>
                            <MenuItem value={"SILVERSTONE"}>SILVERSTONE</MenuItem>
                            <MenuItem value={"SOLYTECH"}>SOLYTECH</MenuItem>
                            <MenuItem value={"SUPER FLOWER"}>SUPER FLOWER</MenuItem>
                            <MenuItem value={"Thermaltake"}>Thermaltake</MenuItem>
                            <MenuItem value={"ZALMAN"}>ZALMAN</MenuItem>
                            <MenuItem value={"オウルテック"}>オウルテック</MenuItem>
                            <MenuItem value={"サイズ"}>サイズ</MenuItem>
                            <MenuItem value={"ニプロン"}>ニプロン</MenuItem>
                            <MenuItem value={"玄人志向"}>玄人志向</MenuItem>
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
                            value={searchPowerSupplyParameter.form_factor}
                            label="FormFactor"
                            onChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, form_factor: e.target.value })}
                        >
                            <MenuItem value={"ATX"}>ATX</MenuItem>
                            <MenuItem value={"FlexATX"}>FlexATX</MenuItem>
                            <MenuItem value={"SFX"}>SFX</MenuItem>
                            <MenuItem value={"SFX-L"}>SFX-L</MenuItem>
                            <MenuItem value={"TFX"}>TFX</MenuItem>
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
                        value={searchPowerSupplyParameter.capacity}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="Capacity"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'W以上'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, capacity: e.floatValue ?? 0 })}
                    />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        80PLUS認証
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >80PLUS</InputLabel>
                        <Select
                            value={searchPowerSupplyParameter.eighty_plus_certification}
                            label="80PLUS"
                            onChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, eighty_plus_certification: e.target.value })}
                        >
                            <MenuItem value={"Bronze"}>Bronze</MenuItem>
                            <MenuItem value={"Gold"}>Gold</MenuItem>
                            <MenuItem value={"Platinum"}>Platinum</MenuItem>
                            <MenuItem value={"Silver"}>Silver</MenuItem>
                            <MenuItem value={"Standard"}>Standard</MenuItem>
                            <MenuItem value={"Titanium"}>Titanium</MenuItem>
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
                        value={searchPowerSupplyParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchPowerSupplyParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchPowerSupplyParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchPowerSupplyParameter({ ...searchPowerSupplyParameter, sort_order: e.target.value as SortOrder })}
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
export default PowerSupplySearcher;

export type SearchPowerSupplyParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    form_factor: string;
    capacity: number;
    eighty_plus_certification: string;
    cpu_connector_count: number | null;
    eight_pin_connector_count: number | null;
    min_price: number | null;
    max_price: number | null;
}

export const SearchPowerSupply = async (searchPowerSupplyParameter: SearchPowerSupplyParameter): Promise<PowerSupplyDescription[]> => {
    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(new URL("power_supply", urlBase), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchPowerSupplyParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}