import React from 'react'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { CpuCoolerDescription } from './CpuCoolerPriceDisplay'

type Props = {
    CpuCoolerDescriptions: CpuCoolerDescription[];
    AddCpuCoolerDescriptionAndCount: (cpuCoolerDescription: CpuCoolerDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ CpuCoolerDescriptions: CpuCoolerDescription[]; AddCpuCoolerDescriptionAndCount: (cpuCoolerDescription: CpuCoolerDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.CpuCoolerDescriptions[index].maker_name} ${data.CpuCoolerDescriptions[index].product_name} : ${data.CpuCoolerDescriptions[index].price} 円`}
                    secondary={`${data.CpuCoolerDescriptions[index].air_flow_type} | 高さ : ${data.CpuCoolerDescriptions[index].height ?? ""} mm | 許容TDP : ${data.CpuCoolerDescriptions[index].max_tdp ?? ""} W`}
                    onClick={() => data.AddCpuCoolerDescriptionAndCount(data.CpuCoolerDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const CpuCoolerDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={650}
                width="100%"
                itemSize={75}
                itemCount={props.CpuCoolerDescriptions.length}
                overscanCount={5}
                itemData={{ CpuCoolerDescriptions: props.CpuCoolerDescriptions, AddCpuCoolerDescriptionAndCount: props.AddCpuCoolerDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default CpuCoolerDescriptionList;