import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Add, Remove, Delete } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { MemoryDescriptionAndCount } from './MemoryPriceDisplay'
import Link from '@mui/material/Link';

type Props = {
    MemoryDescriptionAndCount: MemoryDescriptionAndCount;
    DeleteMemoryDescriptionAndCount: (memoryDescriptionAndCount: MemoryDescriptionAndCount) => void;
    ChangeCount: (memoryDescriptionAndCount: MemoryDescriptionAndCount, count: number) => void;
}

const SelectedMemory = (props: Props) => {
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={6} display="flex" justifyContent="start" alignItems="center">
                    <Link sx={{ overflowWrap: "anywhere" }} target="_blank" rel="noopener noreferrer" href={`https://kakaku.com/item/${props.MemoryDescriptionAndCount.MemoryDescription.item_id}`} >
                        {`${props.MemoryDescriptionAndCount.MemoryDescription.maker_name} ${props.MemoryDescriptionAndCount.MemoryDescription.product_name} : ${props.MemoryDescriptionAndCount.MemoryDescription.price}円`}
                    </Link>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.MemoryDescriptionAndCount, props.MemoryDescriptionAndCount.Count < 2 ? 1 : props.MemoryDescriptionAndCount.Count - 1)}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid xs={3} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ textAlign: "center", overflowWrap: "anywhere" }}>
                        {props.MemoryDescriptionAndCount.Count}
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.MemoryDescriptionAndCount, props.MemoryDescriptionAndCount.Count + 1)}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid xs={6} sm={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere", textAlign: "end" }}>
                        {props.MemoryDescriptionAndCount.MemoryDescription.price * props.MemoryDescriptionAndCount.Count}円
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.DeleteMemoryDescriptionAndCount(props.MemoryDescriptionAndCount)}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SelectedMemory