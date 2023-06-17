import Box from '@mui/material/Box';
import { useState } from 'react';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Search } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { GpuDescription } from './GpuPriceDisplay'
import { SortOrder } from '../GenreList';
//import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';
import CheckBox from '@mui/material/Checkbox'

type Props = {
    ChangeGpuDescriptions: (gpuDescriptions: GpuDescription[]) => void;
}

const GpuSearcher = (props: Props) => {
    const [searchGpuParameter, setSearchGpuParameter] = useState<SearchGpuParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        chip_name: " ",
        gpu_memory_capacity: 0,
        is_low_profile: false,
        cooling_solution: " ",
        max_tdp: null,
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
                        value={searchGpuParameter.search_text}
                        onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, search_text: e.target.value })}
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
                            value={searchGpuParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"AMD"}>AMD</MenuItem>
                            <MenuItem value={"Apple"}>Apple</MenuItem>
                            <MenuItem value={"ASRock"}>ASRock</MenuItem>
                            <MenuItem value={"ASUS"}>ASUS</MenuItem>
                            <MenuItem value={"BIOSTAR"}>BIOSTAR</MenuItem>
                            <MenuItem value={"Colorful"}>Colorful</MenuItem>
                            <MenuItem value={"ELSA"}>ELSA</MenuItem>
                            <MenuItem value={"GAINWARD"}>GAINWARD</MenuItem>
                            <MenuItem value={"GALAXY"}>GALAXY</MenuItem>
                            <MenuItem value={"GIGABYTE"}>GIGABYTE</MenuItem>
                            <MenuItem value={"HIS"}>HIS</MenuItem>
                            <MenuItem value={"Inno3D"}>Inno3D</MenuItem>
                            <MenuItem value={"LEADTEK"}>LEADTEK</MenuItem>
                            <MenuItem value={"Lenovo"}>Lenovo</MenuItem>
                            <MenuItem value={"Manli"}>Manli</MenuItem>
                            <MenuItem value={"MSI"}>MSI</MenuItem>
                            <MenuItem value={"NVIDIA"}>NVIDIA</MenuItem>
                            <MenuItem value={"Palit Microsystems"}>Palit Microsystems</MenuItem>
                            <MenuItem value={"PNY"}>PNY</MenuItem>
                            <MenuItem value={"PowerColor"}>PowerColor</MenuItem>
                            <MenuItem value={"SAPPHIRE"}>SAPPHIRE</MenuItem>
                            <MenuItem value={"VTX3D"}>VTX3D</MenuItem>
                            <MenuItem value={"XFX"}>XFX</MenuItem>
                            <MenuItem value={"ZOTAC"}>ZOTAC</MenuItem>
                            <MenuItem value={"エーキューブ"}>エーキューブ</MenuItem>
                            <MenuItem value={"玄人志向"}>玄人志向</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        チップ名
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >ChipName</InputLabel>
                        <Select
                            value={searchGpuParameter.chip_name}
                            label="ChipName"
                            onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, chip_name: e.target.value })}
                        >
                            <MenuItem value={"AMD Radeon 550"}>AMD Radeon 550</MenuItem>
                            <MenuItem value={"AMD Radeon Pro W5500X"}>AMD Radeon Pro W5500X</MenuItem>
                            <MenuItem value={"AMD Radeon Pro W5700X"}>AMD Radeon Pro W5700X</MenuItem>
                            <MenuItem value={"AMD Radeon Pro W6400"}>AMD Radeon Pro W6400</MenuItem>
                            <MenuItem value={"AMD Radeon Pro W6600"}>AMD Radeon Pro W6600</MenuItem>
                            <MenuItem value={"AMD Radeon Pro W6800"}>AMD Radeon Pro W6800</MenuItem>
                            <MenuItem value={"AMD Radeon Pro WX 3200"}>AMD Radeon Pro WX 3200</MenuItem>
                            <MenuItem value={"AMD Radeon Pro WX 8200"}>AMD Radeon Pro WX 8200</MenuItem>
                            <MenuItem value={"AMD Radeon RX 550"}>AMD Radeon RX 550</MenuItem>
                            <MenuItem value={"AMD Radeon RX 560"}>AMD Radeon RX 560</MenuItem>
                            <MenuItem value={"AMD Radeon RX 5700 XT"}>AMD Radeon RX 5700 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 580"}>AMD Radeon RX 580</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6400"}>AMD Radeon RX 6400</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6500 XT"}>AMD Radeon RX 6500 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6600"}>AMD Radeon RX 6600</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6600 XT"}>AMD Radeon RX 6600 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6650 XT"}>AMD Radeon RX 6650 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6700"}>AMD Radeon RX 6700</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6700 XT"}>AMD Radeon RX 6700 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6750 XT"}>AMD Radeon RX 6750 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6800"}>AMD Radeon RX 6800</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6800 XT"}>AMD Radeon RX 6800 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6900 XT"}>AMD Radeon RX 6900 XT</MenuItem>
                            <MenuItem value={"AMD Radeon RX 6950 XT"}>AMD Radeon RX 6950 XT</MenuItem>
                            <MenuItem value={"AMD Vega10"}>AMD Vega10</MenuItem>
                            <MenuItem value={"Intel Arc A380"}>Intel Arc A380</MenuItem>
                            <MenuItem value={"Intel Arc A750"}>Intel Arc A750</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GT 1030"}>NVIDIA GeForce GT 1030</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GT 730 (64-bit DDR3)"}>NVIDIA GeForce GT 730 (64-bit DDR3)</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GT 730 (64-bit GDDR5)"}>NVIDIA GeForce GT 730 (64-bit GDDR5)</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1050 Ti"}>NVIDIA GeForce GTX 1050 Ti</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1630"}>NVIDIA GeForce GTX 1630</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1650 (G5)"}>NVIDIA GeForce GTX 1650 (G5)</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1650 (G6)"}>NVIDIA GeForce GTX 1650 (G6)</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1660"}>NVIDIA GeForce GTX 1660</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1660 SUPER"}>NVIDIA GeForce GTX 1660 SUPER</MenuItem>
                            <MenuItem value={"NVIDIA GeForce GTX 1660 Ti"}>NVIDIA GeForce GTX 1660 Ti</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 2060"}>NVIDIA GeForce RTX 2060</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3050"}>NVIDIA GeForce RTX 3050</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3060"}>NVIDIA GeForce RTX 3060</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3060 Ti"}>NVIDIA GeForce RTX 3060 Ti</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3070"}>NVIDIA GeForce RTX 3070</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3070 Ti"}>NVIDIA GeForce RTX 3070 Ti</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3080"}>NVIDIA GeForce RTX 3080</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3080 Ti"}>NVIDIA GeForce RTX 3080 Ti</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3090"}>NVIDIA GeForce RTX 3090</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 3090 Ti"}>NVIDIA GeForce RTX 3090 Ti</MenuItem>
                            <MenuItem value={"NVIDIA GeForce RTX 4090"}>NVIDIA GeForce RTX 4090</MenuItem>
                            <MenuItem value={"NVIDIA Quadro GV100"}>NVIDIA Quadro GV100</MenuItem>
                            <MenuItem value={"NVIDIA Quadro K6000"}>NVIDIA Quadro K6000</MenuItem>
                            <MenuItem value={"NVIDIA Quadro P400"}>NVIDIA Quadro P400</MenuItem>
                            <MenuItem value={"NVIDIA Quadro RTX 4000"}>NVIDIA Quadro RTX 4000</MenuItem>
                            <MenuItem value={"NVIDIA Quadro RTX 5000"}>NVIDIA Quadro RTX 5000</MenuItem>
                            <MenuItem value={"NVIDIA Quadro RTX 6000"}>NVIDIA Quadro RTX 6000</MenuItem>
                            <MenuItem value={"NVIDIA Quadro RTX 8000"}>NVIDIA Quadro RTX 8000</MenuItem>
                            <MenuItem value={"NVIDIA RTX A2000"}>NVIDIA RTX A2000</MenuItem>
                            <MenuItem value={"NVIDIA RTX A4000"}>NVIDIA RTX A4000</MenuItem>
                            <MenuItem value={"NVIDIA RTX A4500"}>NVIDIA RTX A4500</MenuItem>
                            <MenuItem value={"NVIDIA RTX A5000"}>NVIDIA RTX A5000</MenuItem>
                            <MenuItem value={"NVIDIA RTX A6000"}>NVIDIA RTX A6000</MenuItem>
                            <MenuItem value={"NVIDIA T1000"}>NVIDIA T1000</MenuItem>
                            <MenuItem value={"NVIDIA T400"}>NVIDIA T400</MenuItem>
                            <MenuItem value={"NVIDIA T600"}>NVIDIA T600</MenuItem>
                            <MenuItem value={"NVIDIA Tesla T4"}>NVIDIA Tesla T4</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        VRAM容量
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >VRAMCapacity</InputLabel>
                        <Select
                            value={searchGpuParameter.gpu_memory_capacity}
                            label="VRAMCapacity"
                            onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, gpu_memory_capacity: e.target.value as number })}
                        >
                            <MenuItem value={1}>1GB以上</MenuItem>
                            <MenuItem value={2}>2GB以上</MenuItem>
                            <MenuItem value={3}>3GB以上</MenuItem>
                            <MenuItem value={4}>4GB以上</MenuItem>
                            <MenuItem value={5}>5GB以上</MenuItem>
                            <MenuItem value={6}>6GB以上</MenuItem>
                            <MenuItem value={8}>8GB以上</MenuItem>
                            <MenuItem value={10}>10GB以上</MenuItem>
                            <MenuItem value={12}>12GB以上</MenuItem>
                            <MenuItem value={16}>16GB以上</MenuItem>
                            <MenuItem value={20}>20GB以上</MenuItem>
                            <MenuItem value={24}>24GB以上</MenuItem>
                            <MenuItem value={32}>32GB以上</MenuItem>
                            <MenuItem value={48}>48GB以上</MenuItem>
                            <MenuItem value={0}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <FormControlLabel control={
                        <CheckBox checked={searchGpuParameter.is_low_profile} onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, is_low_profile: e.target.checked })} />
                    }
                        label={"ロープロファイル"} />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        冷却方式
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >CoolingSolution</InputLabel>
                        <Select
                            value={searchGpuParameter.cooling_solution}
                            label="CoolingSolution"
                            onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, cooling_solution: e.target.value })}
                        >
                            <MenuItem value={"水冷"}>水冷</MenuItem>
                            <MenuItem value={"空冷"}>空冷</MenuItem>
                            <MenuItem value={"空冷+水冷"}>空冷+水冷</MenuItem>
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
                        value={searchGpuParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchGpuParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{inputMode: "decimal"}}
                        onValueChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchGpuParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchGpuParameter({ ...searchGpuParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeGpuDescriptions(await SearchGpu(searchGpuParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default GpuSearcher;

export type SearchGpuParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    chip_name: string,
    gpu_memory_capacity: number,
    is_low_profile: boolean,
    cooling_solution: string,
    max_tdp: number | null,
    min_price: number | null;
    max_price: number | null;
}

export const SearchGpu = async (searchGpuParameter: SearchGpuParameter): Promise<GpuDescription[]> => {
    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(new URL("gpu", urlBase), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchGpuParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}