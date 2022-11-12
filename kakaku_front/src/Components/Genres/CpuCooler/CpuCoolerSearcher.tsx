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
import { CpuCoolerDescription } from './CpuCoolerPriceDisplay'
import { SortOrder } from '../GenreList';
import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';

type Props = {
    ChangeCpuCoolerDescriptions: (cpuCoolerDescriptions: CpuCoolerDescription[]) => void;
}

const CpuCoolerSearcher = (props: Props) => {
    const [searchCpuCoolerParameter, setSearchCpuCoolerParameter] = useState<SearchCpuCoolerParameter>({
        search_text: "",
        maker_name: " ",
        socket_name: " ",
        air_flow_type: " ",
        height: null,
        max_tdp: null,
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2.5} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        キーワード
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <TextField label="Keyword" variant="filled" fullWidth
                        value={searchCpuCoolerParameter.search_text}
                        onChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, search_text: e.target.value })}
                    />
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        メーカー名
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >Maker</InputLabel>
                        <Select
                            value={searchCpuCoolerParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"ADATA"}>ADATA</MenuItem>
                            <MenuItem value={"AINEX"}>AINEX</MenuItem>
                            <MenuItem value={"ANTEC"}>ANTEC</MenuItem>
                            <MenuItem value={"ARCTIC"}>ARCTIC</MenuItem>
                            <MenuItem value={"ASUS"}>ASUS</MenuItem>
                            <MenuItem value={"be quiet！"}>be quiet！</MenuItem>
                            <MenuItem value={"COOLER MASTER"}>COOLER MASTER</MenuItem>
                            <MenuItem value={"Corsair"}>Corsair</MenuItem>
                            <MenuItem value={"COUGAR"}>COUGAR</MenuItem>
                            <MenuItem value={"CRYORIG"}>CRYORIG</MenuItem>
                            <MenuItem value={"darkFlash"}>darkFlash</MenuItem>
                            <MenuItem value={"DEEPCOOL"}>DEEPCOOL</MenuItem>
                            <MenuItem value={"Dynatron"}>Dynatron</MenuItem>
                            <MenuItem value={"EK Water Blocks"}>EK Water Blocks</MenuItem>
                            <MenuItem value={"ENERMAX"}>ENERMAX</MenuItem>
                            <MenuItem value={"Fractal Design"}>Fractal Design</MenuItem>
                            <MenuItem value={"GELID Solutions"}>GELID Solutions</MenuItem>
                            <MenuItem value={"ID-COOLING"}>ID-COOLING</MenuItem>
                            <MenuItem value={"IN WIN"}>IN WIN</MenuItem>
                            <MenuItem value={"LEPA"}>LEPA</MenuItem>
                            <MenuItem value={"LIAN LI"}>LIAN LI</MenuItem>
                            <MenuItem value={"MSI"}>MSI</MenuItem>
                            <MenuItem value={"noctua"}>noctua</MenuItem>
                            <MenuItem value={"NZXT"}>NZXT</MenuItem>
                            <MenuItem value={"PCCOOLER"}>PCCOOLER</MenuItem>
                            <MenuItem value={"ProArtist"}>ProArtist</MenuItem>
                            <MenuItem value={"PROLIMA TECH"}>PROLIMA TECH</MenuItem>
                            <MenuItem value={"Razer"}>Razer</MenuItem>
                            <MenuItem value={"REEVEN"}>REEVEN</MenuItem>
                            <MenuItem value={"SAPPHIRE"}>SAPPHIRE</MenuItem>
                            <MenuItem value={"SILVERSTONE"}>SILVERSTONE</MenuItem>
                            <MenuItem value={"Spire"}>Spire</MenuItem>
                            <MenuItem value={"SUNTRUST"}>SUNTRUST</MenuItem>
                            <MenuItem value={"SUPER FLOWER"}>SUPER FLOWER</MenuItem>
                            <MenuItem value={"SUPERMICRO"}>SUPERMICRO</MenuItem>
                            <MenuItem value={"TACENS"}>TACENS</MenuItem>
                            <MenuItem value={"Team"}>Team</MenuItem>
                            <MenuItem value={"Thermalright"}>Thermalright</MenuItem>
                            <MenuItem value={"Thermaltake"}>Thermaltake</MenuItem>
                            <MenuItem value={"XIGMATEK"}>XIGMATEK</MenuItem>
                            <MenuItem value={"ZALMAN"}>ZALMAN</MenuItem>
                            <MenuItem value={"インテル"}>インテル</MenuItem>
                            <MenuItem value={"オウルテック"}>オウルテック</MenuItem>
                            <MenuItem value={"サイズ"}>サイズ</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ソケット名
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >Socket</InputLabel>
                        <Select
                            value={searchCpuCoolerParameter.socket_name}
                            label="Socket"
                            onChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, socket_name: e.target.value })}
                        >
                            <MenuItem value={"AM2"}>AM2</MenuItem>
                            <MenuItem value={"AM2+"}>AM2+</MenuItem>
                            <MenuItem value={"AM3"}>AM3</MenuItem>
                            <MenuItem value={"AM3+"}>AM3+</MenuItem>
                            <MenuItem value={"AM4"}>AM4</MenuItem>
                            <MenuItem value={"AM5"}>AM5</MenuItem>
                            <MenuItem value={"FM1"}>FM1</MenuItem>
                            <MenuItem value={"FM2"}>FM2</MenuItem>
                            <MenuItem value={"FM2+"}>FM2+</MenuItem>
                            <MenuItem value={"LGA1150"}>LGA1150</MenuItem>
                            <MenuItem value={"LGA1151"}>LGA1151</MenuItem>
                            <MenuItem value={"LGA1152"}>LGA1152</MenuItem>
                            <MenuItem value={"LGA1155"}>LGA1155</MenuItem>
                            <MenuItem value={"LGA1156"}>LGA1156</MenuItem>
                            <MenuItem value={"LGA1200"}>LGA1200</MenuItem>
                            <MenuItem value={"LGA1366"}>LGA1366</MenuItem>
                            <MenuItem value={"LGA1700"}>LGA1700</MenuItem>
                            <MenuItem value={"LGA2011"}>LGA2011</MenuItem>
                            <MenuItem value={"LGA2011 Square&Narrow"}>LGA2011 Square&Narrow</MenuItem>
                            <MenuItem value={"LGA2011-3"}>LGA2011-3</MenuItem>
                            <MenuItem value={"LGA2066"}>LGA2066</MenuItem>
                            <MenuItem value={"LGA3647"}>LGA3647</MenuItem>
                            <MenuItem value={"LGA3647 Narrow"}>LGA3647 Narrow</MenuItem>
                            <MenuItem value={"LGA3647 Square"}>LGA3647 Square</MenuItem>
                            <MenuItem value={"LGA4189"}>LGA4189</MenuItem>
                            <MenuItem value={"LGA775"}>LGA775</MenuItem>
                            <MenuItem value={"SP3"}>SP3</MenuItem>
                            <MenuItem value={"sTRX4"}>sTRX4</MenuItem>
                            <MenuItem value={"TR4"}>TR4</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        エアフロー
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >AirFlow</InputLabel>
                        <Select
                            value={searchCpuCoolerParameter.air_flow_type}
                            label="AirFlow"
                            onChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, air_flow_type: e.target.value })}
                        >
                            <MenuItem value={"サイドフロー型"}>サイドフロー型</MenuItem>
                            <MenuItem value={"トップフロー型"}>トップフロー型</MenuItem>
                            <MenuItem value={"ファンレス"}>ファンレス</MenuItem>
                            <MenuItem value={"水冷型"}>水冷型</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        高さ
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <NumericFormat
                        value={searchCpuCoolerParameter.height}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="Height"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={2}
                        suffix={'mm以下'}
                        onValueChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, height: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        許容TDP
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <NumericFormat
                        value={searchCpuCoolerParameter.max_tdp}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MaxTDP"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'W以上'}
                        onValueChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, max_tdp: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        価格
                    </Typography>
                </Grid>
                <Grid xs={3.5} display="flex" justifyContent="center" alignItems="center">
                    <NumericFormat
                        value={searchCpuCoolerParameter.min_price}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        onValueChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={3.5} display="flex" justifyContent="center" alignItems="center">
                    <NumericFormat
                        value={searchCpuCoolerParameter.max_price}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        onValueChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        並び順
                    </Typography>
                </Grid>
                <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >SortOrder</InputLabel>
                        <Select
                            value={searchCpuCoolerParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchCpuCoolerParameter({ ...searchCpuCoolerParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeCpuCoolerDescriptions(await SearchCpuCooler(searchCpuCoolerParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default CpuCoolerSearcher;

type SearchCpuCoolerParameter = {
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    socket_name: string;
    air_flow_type: string;
    height: number | null;
    max_tdp: number | null;
    min_price: number | null;
    max_price: number | null;
}

const SearchCpuCooler = async (searchCpuCoolerParameter: SearchCpuCoolerParameter): Promise<CpuCoolerDescription[]> => {

    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(urlJoin(urlBase, "cpu_cooler"), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchCpuCoolerParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}