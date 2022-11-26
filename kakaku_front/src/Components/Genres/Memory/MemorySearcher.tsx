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
import { MemoryDescription } from './MemoryPriceDisplay'
import { SortOrder } from '../GenreList';
import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';

type Props = {
    ChangeMemoryDescriptions: (memoryDescriptions: MemoryDescription[]) => void;
}

const MemorySearcher = (props: Props) => {
    const [searchMemoryParameter, setSearchMemoryParameter] = useState<SearchMemoryParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        capacity_per_module: 0,
        module_count: 0,
        interface: " ",
        memory_type: " ",
        module_type: " ",
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
                        value={searchMemoryParameter.search_text}
                        onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, search_text: e.target.value })}
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
                            value={searchMemoryParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"ADATA"}>ADATA</MenuItem>
                            <MenuItem value={"ADTEC"}>ADTEC</MenuItem>
                            <MenuItem value={"Antec Memory"}>Antec Memory</MenuItem>
                            <MenuItem value={"Apacer"}>Apacer</MenuItem>
                            <MenuItem value={"Apple"}>Apple</MenuItem>
                            <MenuItem value={"ARCHISS"}>ARCHISS</MenuItem>
                            <MenuItem value={"BIOSTAR"}>BIOSTAR</MenuItem>
                            <MenuItem value={"CENTURY MICRO"}>CENTURY MICRO</MenuItem>
                            <MenuItem value={"CFD"}>CFD</MenuItem>
                            <MenuItem value={"Corsair"}>Corsair</MenuItem>
                            <MenuItem value={"crucial"}>crucial</MenuItem>
                            <MenuItem value={"ESSENCORE"}>ESSENCORE</MenuItem>
                            <MenuItem value={"G.Skill"}>G.Skill</MenuItem>
                            <MenuItem value={"GALAXY"}>GALAXY</MenuItem>
                            <MenuItem value={"GIGABYTE"}>GIGABYTE</MenuItem>
                            <MenuItem value={"HP"}>HP</MenuItem>
                            <MenuItem value={"IODATA"}>IODATA</MenuItem>
                            <MenuItem value={"J&A Information"}>J&A Information</MenuItem>
                            <MenuItem value={"Lenovo"}>Lenovo</MenuItem>
                            <MenuItem value={"Lexar"}>Lexar</MenuItem>
                            <MenuItem value={"Micron"}>Micron</MenuItem>
                            <MenuItem value={"Mushkin Enhanced"}>Mushkin Enhanced</MenuItem>
                            <MenuItem value={"OCMEMORY"}>OCMEMORY</MenuItem>
                            <MenuItem value={"Patriot Memory"}>Patriot Memory</MenuItem>
                            <MenuItem value={"PNY"}>PNY</MenuItem>
                            <MenuItem value={"Silicon Power"}>Silicon Power</MenuItem>
                            <MenuItem value={"Team"}>Team</MenuItem>
                            <MenuItem value={"UMAX"}>UMAX</MenuItem>
                            <MenuItem value={"アユート"}>アユート</MenuItem>
                            <MenuItem value={"エレコム"}>エレコム</MenuItem>
                            <MenuItem value={"キングストン"}>キングストン</MenuItem>
                            <MenuItem value={"グリーンハウス"}>グリーンハウス</MenuItem>
                            <MenuItem value={"サムスン"}>サムスン</MenuItem>
                            <MenuItem value={"トランセンド"}>トランセンド</MenuItem>
                            <MenuItem value={"バッファロー"}>バッファロー</MenuItem>
                            <MenuItem value={"プリンストン"}>プリンストン</MenuItem>
                            <MenuItem value={"ヤダイ"}>ヤダイ</MenuItem>
                            <MenuItem value={"リーダーメディアテクノ"}>リーダーメディアテクノ</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        1枚あたりの容量
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >CapacityPerModule</InputLabel>
                        <Select
                            value={searchMemoryParameter.capacity_per_module}
                            label="CapacityPerModule"
                            onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, capacity_per_module: e.target.value as number })}
                        >
                            <MenuItem value={2}>2GB</MenuItem>
                            <MenuItem value={4}>4GB</MenuItem>
                            <MenuItem value={8}>8GB</MenuItem>
                            <MenuItem value={16}>16GB</MenuItem>
                            <MenuItem value={32}>32GB</MenuItem>
                            <MenuItem value={64}>64GB</MenuItem>
                            <MenuItem value={128}>128GB</MenuItem>
                            <MenuItem value={0}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        枚数
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >ModuleCount</InputLabel>
                        <Select
                            value={searchMemoryParameter.module_count}
                            label="ModuleCount"
                            onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, module_count: e.target.value as number })}
                        >
                            <MenuItem value={1}>1枚</MenuItem>
                            <MenuItem value={2}>2枚</MenuItem>
                            <MenuItem value={4}>4枚</MenuItem>
                            <MenuItem value={8}>8枚</MenuItem>
                            <MenuItem value={0}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        メモリ規格
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >MemoryType</InputLabel>
                        <Select
                            value={searchMemoryParameter.memory_type}
                            label="MemoryType"
                            onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, memory_type: e.target.value })}
                        >
                            <MenuItem value={"DDR4 SDRAM"}>DDR4 SDRAM</MenuItem>
                            <MenuItem value={"DDR5 SDRAM"}>DDR5 SDRAM</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        メモリスピード
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <FormControl fullWidth>
                        <InputLabel >ModuleType</InputLabel>
                        <Select
                            value={searchMemoryParameter.module_type}
                            label="ModuleType"
                            onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, module_type: e.target.value })}
                        >
                            <MenuItem value={"PC3-21300(DDR3-2666)"}>PC3-21300(DDR3-2666)</MenuItem>
                            <MenuItem value={"PC4-17000(DDR4-2133)"}>PC4-17000(DDR4-2133)</MenuItem>
                            <MenuItem value={"PC4-19200(DDR4-2400)"}>PC4-19200(DDR4-2400)</MenuItem>
                            <MenuItem value={"PC4-21300(DDR4-2666)"}>PC4-21300(DDR4-2666)</MenuItem>
                            <MenuItem value={"PC4-21333(DDR4-2666)"}>PC4-21333(DDR4-2666)</MenuItem>
                            <MenuItem value={"PC4-22400(DDR4-2800)"}>PC4-22400(DDR4-2800)</MenuItem>
                            <MenuItem value={"PC4-23400(DDR4-2933)"}>PC4-23400(DDR4-2933)</MenuItem>
                            <MenuItem value={"PC4-23466(DDR4-2933)"}>PC4-23466(DDR4-2933)</MenuItem>
                            <MenuItem value={"PC4-24000(DDR4-3000)"}>PC4-24000(DDR4-3000)</MenuItem>
                            <MenuItem value={"PC4-25600(DDR4-3200)"}>PC4-25600(DDR4-3200)</MenuItem>
                            <MenuItem value={"PC4-26600(DDR4-3333)"}>PC4-26600(DDR4-3333)</MenuItem>
                            <MenuItem value={"PC4-27700(DDR4-3466)"}>PC4-27700(DDR4-3466)</MenuItem>
                            <MenuItem value={"PC4-28800(DDR4-3600)"}>PC4-28800(DDR4-3600)</MenuItem>
                            <MenuItem value={"PC4-29800(DDR4-3733)"}>PC4-29800(DDR4-3733)</MenuItem>
                            <MenuItem value={"PC4-32000(DDR4-4000)"}>PC4-32000(DDR4-4000)</MenuItem>
                            <MenuItem value={"PC4-33000(DDR4-4133)"}>PC4-33000(DDR4-4133)</MenuItem>
                            <MenuItem value={"PC4-34100(DDR4-4266)"}>PC4-34100(DDR4-4266)</MenuItem>
                            <MenuItem value={"PC4-35200(DDR4-4400)"}>PC4-35200(DDR4-4400)</MenuItem>
                            <MenuItem value={"PC4-36800(DDR4-4600)"}>PC4-36800(DDR4-4600)</MenuItem>
                            <MenuItem value={"PC4-38400(DDR4-4800)"}>PC4-38400(DDR4-4800)</MenuItem>
                            <MenuItem value={"PC4-40600(DDR4-5066)"}>PC4-40600(DDR4-5066)</MenuItem>
                            <MenuItem value={"PC4-42700(DDR4-5333)"}>PC4-42700(DDR4-5333)</MenuItem>
                            <MenuItem value={"PC5-41600(DDR5-5200)"}>PC5-41600(DDR5-5200)</MenuItem>
                            <MenuItem value={"PC5-44800(DDR5-5600)"}>PC5-44800(DDR5-5600)</MenuItem>
                            <MenuItem value={"PC5-48000(DDR5-6000)"}>PC5-48000(DDR5-6000)</MenuItem>
                            <MenuItem value={"PC5-49600(DDR5-6200)"}>PC5-49600(DDR5-6200)</MenuItem>
                            <MenuItem value={"PC5-51200(DDR5-6400)"}>PC5-51200(DDR5-6400)</MenuItem>
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
                        value={searchMemoryParameter.min_price}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        onValueChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchMemoryParameter.max_price}
                        thousandSeparator={true}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        onValueChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchMemoryParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchMemoryParameter({ ...searchMemoryParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeMemoryDescriptions(await SearchMemory(searchMemoryParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default MemorySearcher;

export type SearchMemoryParameter = {
    item_ids: string[];
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    capacity_per_module: number;
    module_count: number;
    interface: string;
    memory_type: string;
    module_type: string;
    min_price: number | null;
    max_price: number | null;
}

export const SearchMemory = async (searchMemoryParameter: SearchMemoryParameter): Promise<MemoryDescription[]> => {
    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(urlJoin(urlBase, "memory"), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchMemoryParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}