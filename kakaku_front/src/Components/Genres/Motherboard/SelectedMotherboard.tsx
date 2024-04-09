import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Add, Remove, Delete } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { MotherboardDescriptionAndCount } from './MotherboardPriceDisplay'
import Link from '@mui/material/Link';

type Props = {
    MotherboardDescriptionAndCount: MotherboardDescriptionAndCount;
    DeleteMotherboardDescriptionAndCount: (motherboardDescriptionAndCount: MotherboardDescriptionAndCount) => void;
    ChangeCount: (motherboardDescriptionAndCount: MotherboardDescriptionAndCount, count: number) => void;
}

const SelectedMotherboard = (props: Props) => {
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={6} display="flex" justifyContent="start" alignItems="center">
                    <Link sx={{ overflowWrap: "anywhere" }} target="_blank" rel="noopener noreferrer" href={`https://kakaku.com/item/${props.MotherboardDescriptionAndCount.MotherboardDescription.item_id}`} >
                        {`${props.MotherboardDescriptionAndCount.MotherboardDescription.maker_name} ${props.MotherboardDescriptionAndCount.MotherboardDescription.product_name} : ${props.MotherboardDescriptionAndCount.MotherboardDescription.price}円`}
                    </Link>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.MotherboardDescriptionAndCount, props.MotherboardDescriptionAndCount.Count < 2 ? 1 : props.MotherboardDescriptionAndCount.Count - 1)}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid xs={3} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ textAlign: "center", overflowWrap: "anywhere" }}>
                        {props.MotherboardDescriptionAndCount.Count}
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.MotherboardDescriptionAndCount, props.MotherboardDescriptionAndCount.Count + 1)}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid xs={6} sm={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere", textAlign: "end" }}>
                        {props.MotherboardDescriptionAndCount.MotherboardDescription.price * props.MotherboardDescriptionAndCount.Count}円
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.DeleteMotherboardDescriptionAndCount(props.MotherboardDescriptionAndCount)}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SelectedMotherboard