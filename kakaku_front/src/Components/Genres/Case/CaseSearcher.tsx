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
import { CaseDescription } from './CasePriceDisplay'
import { SortOrder } from '../GenreList';
import urlJoin from 'url-join';
import { NumericFormat } from 'react-number-format';
import CheckBox from '@mui/material/Checkbox';

type Props = {
    ChangeCaseDescriptions: (caseDescriptions: CaseDescription[]) => void;
}

const CaseSearcher = (props: Props) => {
    const [searchCaseParameter, setSearchCaseParameter] = useState<SearchCaseParameter>({
        item_ids: [],
        search_text: "",
        maker_name: " ",
        form_factor: " ",
        is_low_profile: false,
        min_price: null,
        max_price: null,
        sort_order: "PriceAsc",
    });
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2.5} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        キーワード
                    </Typography>
                </Grid>
                <Grid xs={12} sm={8} display="flex" justifyContent="start" alignItems="center">
                    <TextField label="Keyword" variant="filled" fullWidth
                        value={searchCaseParameter.search_text}
                        onChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, search_text: e.target.value })}
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
                            value={searchCaseParameter.maker_name}
                            label="Maker"
                            onChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, maker_name: e.target.value })}
                        >
                            <MenuItem value={"Abee"}>Abee</MenuItem>
                            <MenuItem value={"ABKONCORE"}>ABKONCORE</MenuItem>
                            <MenuItem value={"ADATA"}>ADATA</MenuItem>
                            <MenuItem value={"ANTEC"}>ANTEC</MenuItem>
                            <MenuItem value={"AOPEN"}>AOPEN</MenuItem>
                            <MenuItem value={"ASUS"}>ASUS</MenuItem>
                            <MenuItem value={"AZZA"}>AZZA</MenuItem>
                            <MenuItem value={"be quiet！"}>be quiet！</MenuItem>
                            <MenuItem value={"BitFenix"}>BitFenix</MenuItem>
                            <MenuItem value={"CHENBRO"}>CHENBRO</MenuItem>
                            <MenuItem value={"COOLER MASTER"}>COOLER MASTER</MenuItem>
                            <MenuItem value={"Corsair"}>Corsair</MenuItem>
                            <MenuItem value={"COUGAR"}>COUGAR</MenuItem>
                            <MenuItem value={"DAN Cases"}>DAN Cases</MenuItem>
                            <MenuItem value={"darkFlash"}>darkFlash</MenuItem>
                            <MenuItem value={"DEEPCOOL"}>DEEPCOOL</MenuItem>
                            <MenuItem value={"ENERMAX"}>ENERMAX</MenuItem>
                            <MenuItem value={"Fractal Design"}>Fractal Design</MenuItem>
                            <MenuItem value={"FSP"}>FSP</MenuItem>
                            <MenuItem value={"GALAXY"}>GALAXY</MenuItem>
                            <MenuItem value={"Hanmi Micronics"}>Hanmi Micronics</MenuItem>
                            <MenuItem value={"HEC"}>HEC</MenuItem>
                            <MenuItem value={"HYTE"}>HYTE</MenuItem>
                            <MenuItem value={"IKONIK"}>IKONIK</MenuItem>
                            <MenuItem value={"IN WIN"}>IN WIN</MenuItem>
                            <MenuItem value={"JONSBO"}>JONSBO</MenuItem>
                            <MenuItem value={"KEIAN"}>KEIAN</MenuItem>
                            <MenuItem value={"LIAN LI"}>LIAN LI</MenuItem>
                            <MenuItem value={"MONTECH"}>MONTECH</MenuItem>
                            <MenuItem value={"MSI"}>MSI</MenuItem>
                            <MenuItem value={"NZXT"}>NZXT</MenuItem>
                            <MenuItem value={"Phanteks"}>Phanteks</MenuItem>
                            <MenuItem value={"RAIJINTEK"}>RAIJINTEK</MenuItem>
                            <MenuItem value={"Razer"}>Razer</MenuItem>
                            <MenuItem value={"SAMA"}>SAMA</MenuItem>
                            <MenuItem value={"Sharkoon"}>Sharkoon</MenuItem>
                            <MenuItem value={"SILVERSTONE"}>SILVERSTONE</MenuItem>
                            <MenuItem value={"SSUPD"}>SSUPD</MenuItem>
                            <MenuItem value={"SUPERMICRO"}>SUPERMICRO</MenuItem>
                            <MenuItem value={"Thermaltake"}>Thermaltake</MenuItem>
                            <MenuItem value={"UAC"}>UAC</MenuItem>
                            <MenuItem value={"ZALMAN"}>ZALMAN</MenuItem>
                            <MenuItem value={"オウルテック"}>オウルテック</MenuItem>
                            <MenuItem value={"サイズ"}>サイズ</MenuItem>
                            <MenuItem value={"サンワサプライ"}>サンワサプライ</MenuItem>
                            <MenuItem value={"タオエンタープライズ"}>タオエンタープライズ</MenuItem>
                            <MenuItem value={"玄人志向"}>玄人志向</MenuItem>
                            <MenuItem value={"長尾製作所"}>長尾製作所</MenuItem>
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
                        <InputLabel >FromFactor</InputLabel>
                        <Select
                            value={searchCaseParameter.form_factor}
                            label="FormFactor"
                            onChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, form_factor: e.target.value })}
                        >
                            <MenuItem value={"ATX"}>ATX</MenuItem>
                            <MenuItem value={"EE-ATX"}>EE-ATX</MenuItem>
                            <MenuItem value={"Extended ATX"}>Extended ATX</MenuItem>
                            <MenuItem value={"ITX"}>ITX</MenuItem>
                            <MenuItem value={"MicroATX"}>MicroATX</MenuItem>
                            <MenuItem value={"Mini-DTX"}>Mini-DTX</MenuItem>
                            <MenuItem value={"Mini-ITX"}>Mini-ITX</MenuItem>
                            <MenuItem value={"Mini-STX"}>Mini-STX</MenuItem>
                            <MenuItem value={"MiniITX"}>MiniITX</MenuItem>
                            <MenuItem value={"nano-ITX"}>nano-ITX</MenuItem>
                            <MenuItem value={"SSI-CEB"}>SSI-CEB</MenuItem>
                            <MenuItem value={"SSI-EEB"}>SSI-EEB</MenuItem>
                            <MenuItem value={"Thin Mini-ITX"}>Thin Mini-ITX</MenuItem>
                            <MenuItem value={"XL-ATX"}>XL-ATX</MenuItem>
                            <MenuItem value={" "}>全て</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <FormControlLabel control={
                        <CheckBox checked={searchCaseParameter.is_low_profile} onChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, is_low_profile: e.target.checked })} />
                    }
                        label={"ロープロファイル"} />
                </Grid>
                <Grid xs={12} sm={4} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        価格
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchCaseParameter.min_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MinPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, min_price: e.floatValue === undefined ? null : e.floatValue })}
                    />
                </Grid>
                <Grid xs={12} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        ～
                    </Typography>
                </Grid>
                <Grid xs={12} sm={3.5} display="flex" justifyContent="start" alignItems="center">
                    <NumericFormat
                        value={searchCaseParameter.max_price}
                        thousandSeparator={false}
                        customInput={TextField}
                        label="MaxPrice"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        fullWidth={true}
                        decimalScale={0}
                        suffix={'円'}
                        inputProps={{ inputMode: "decimal" }}
                        onValueChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, max_price: e.floatValue === undefined ? null : e.floatValue })}
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
                            value={searchCaseParameter.sort_order}
                            label="SortOrder"
                            onChange={(e) => setSearchCaseParameter({ ...searchCaseParameter, sort_order: e.target.value as SortOrder })}
                        >
                            <MenuItem value={"PriceAsc"}>価格昇順</MenuItem>
                            <MenuItem value={"PriceDesc"}>価格降順</MenuItem>
                            <MenuItem value={"RankAsc"}>人気順</MenuItem>
                            <MenuItem value={"ReleaseDateDesc"}>発売日降順</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={12} display="flex" justifyContent="start" alignItems="center">
                    <Button variant='outlined' endIcon={<Search />} fullWidth onClick={async () => props.ChangeCaseDescriptions(await SearchCase(searchCaseParameter))}>検索</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
export default CaseSearcher;

export type SearchCaseParameter = {
    item_ids: string[]
    search_text: string;
    sort_order: SortOrder;
    maker_name: string;
    form_factor: string,
    is_low_profile: boolean,
    min_price: number | null;
    max_price: number | null;
}

export const SearchCase = async (searchCaseParameter: SearchCaseParameter): Promise<CaseDescription[]> => {

    try {
        const urlBase = process.env.REACT_APP_SEARCH_API_URL_BASE ?? "";
        const response = await fetch(urlJoin(urlBase, "case"), { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(searchCaseParameter) });
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (e) {
        console.log(e)
        return [];
    }
}