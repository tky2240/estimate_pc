import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Add, Remove, Delete } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { PowerSupplyDescriptionAndCount } from './PowerSupplyPriceDisplay'
import Link from '@mui/material/Link';

type Props = {
    PowerSupplyDescriptionAndCount: PowerSupplyDescriptionAndCount;
    DeletePowerSupplyDescriptionAndCount: (powerSupplyDescriptionAndCount: PowerSupplyDescriptionAndCount) => void;
    ChangeCount: (powerSupplyDescriptionAndCount: PowerSupplyDescriptionAndCount, count: number) => void;
}

const SelectedPowerSupply = (props: Props) => {
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={6} display="flex" justifyContent="start" alignItems="center">
                    <Link sx={{ overflowWrap: "anywhere" }} target="_blank" rel="noopener noreferrer" href={`https://kakaku.com/item/${props.PowerSupplyDescriptionAndCount.PowerSupplyDescription.item_id}`} >
                        {`${props.PowerSupplyDescriptionAndCount.PowerSupplyDescription.maker_name} ${props.PowerSupplyDescriptionAndCount.PowerSupplyDescription.product_name} : ${props.PowerSupplyDescriptionAndCount.PowerSupplyDescription.price}円`}
                    </Link>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.PowerSupplyDescriptionAndCount, props.PowerSupplyDescriptionAndCount.Count < 2 ? 1 : props.PowerSupplyDescriptionAndCount.Count - 1)}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid xs={3} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ textAlign: "center", overflowWrap: "anywhere" }}>
                        {props.PowerSupplyDescriptionAndCount.Count}
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.PowerSupplyDescriptionAndCount, props.PowerSupplyDescriptionAndCount.Count + 1)}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid xs={6} sm={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere", textAlign: "end" }}>
                        {props.PowerSupplyDescriptionAndCount.PowerSupplyDescription.price * props.PowerSupplyDescriptionAndCount.Count}円
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.DeletePowerSupplyDescriptionAndCount(props.PowerSupplyDescriptionAndCount)}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SelectedPowerSupply