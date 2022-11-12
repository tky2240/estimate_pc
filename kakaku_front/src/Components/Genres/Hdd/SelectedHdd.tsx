import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import { Add, Remove, Delete } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import { HddDescription, HddDescriptionAndCount } from './HddPriceDisplay'

type Props = {
    HddDescriptionAndCount: HddDescriptionAndCount;
    DeleteHddDescriptionAndCount: (hddDescriptionAndCount: HddDescriptionAndCount) => void;
    ChangeCount: (hddDescriptionAndCount: HddDescriptionAndCount, count: number) => void;
}

const SelectedHdd = (props: Props) => {
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={6} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        {`${props.HddDescriptionAndCount.HddDescription.maker_name} ${props.HddDescriptionAndCount.HddDescription.product_name} : ${props.HddDescriptionAndCount.HddDescription.price}円`}
                    </Typography>
                </Grid>
                <Grid xs={1} display="flex" justifyContent="start" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.HddDescriptionAndCount, props.HddDescriptionAndCount.Count < 2 ? 1 : props.HddDescriptionAndCount.Count - 1)}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ textAlign: "center", overflowWrap: "anywhere" }}>
                        {props.HddDescriptionAndCount.Count}
                    </Typography>
                </Grid>
                <Grid xs={1} display="flex" justifyContent="end" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.HddDescriptionAndCount, props.HddDescriptionAndCount.Count + 1)}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid xs={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere", textAlign: "end" }}>
                        {props.HddDescriptionAndCount.HddDescription.price * props.HddDescriptionAndCount.Count}円
                    </Typography>
                </Grid>
                <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.DeleteHddDescriptionAndCount(props.HddDescriptionAndCount)}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SelectedHdd