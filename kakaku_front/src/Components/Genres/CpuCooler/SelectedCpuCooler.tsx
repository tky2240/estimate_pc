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
import { CpuCoolerDescription, CpuCoolerDescriptionAndCount } from './CpuCoolerPriceDisplay'

type Props = {
    CpuCoolerDescriptionAndCount: CpuCoolerDescriptionAndCount;
    DeleteCpuCoolerDescriptionAndCount: (cpuCoolerDescriptionAndCount: CpuCoolerDescriptionAndCount) => void;
    ChangeCount: (cpuCoolerDescriptionAndCount: CpuCoolerDescriptionAndCount, count: number) => void;
}

const SelectedCpuCooler = (props: Props) => {
    return (
        <Box sx={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
            <Grid container spacing={2} sx={{ width: "100%", paddingRight: 1, paddingLeft: 4, paddingBottom: 1, paddingTop: 1 }} wrap="wrap" >
                <Grid xs={12} sm={6} display="flex" justifyContent="start" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere" }} >
                        {`${props.CpuCoolerDescriptionAndCount.CpuCoolerDescription.maker_name} ${props.CpuCoolerDescriptionAndCount.CpuCoolerDescription.product_name} : ${props.CpuCoolerDescriptionAndCount.CpuCoolerDescription.price}円`}
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.CpuCoolerDescriptionAndCount, props.CpuCoolerDescriptionAndCount.Count < 2 ? 1 : props.CpuCoolerDescriptionAndCount.Count - 1)}>
                        <Remove />
                    </IconButton>
                </Grid>
                <Grid xs={3} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ textAlign: "center", overflowWrap: "anywhere" }}>
                        {props.CpuCoolerDescriptionAndCount.Count}
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.ChangeCount(props.CpuCoolerDescriptionAndCount, props.CpuCoolerDescriptionAndCount.Count + 1)}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid xs={6} sm={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography sx={{ overflowWrap: "anywhere", textAlign: "end" }}>
                        {props.CpuCoolerDescriptionAndCount.CpuCoolerDescription.price * props.CpuCoolerDescriptionAndCount.Count}円
                    </Typography>
                </Grid>
                <Grid xs={1} sm={1} display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => props.DeleteCpuCoolerDescriptionAndCount(props.CpuCoolerDescriptionAndCount)}>
                        <Delete />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SelectedCpuCooler