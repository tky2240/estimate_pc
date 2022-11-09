import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { CpuDescription } from './cpuPriceDisplay'


type Props = {
    CpuDescriptions: CpuDescription[];
    AddSelectedCpuDescription: (cpuDescription: CpuDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ CpuDescriptions: CpuDescription[]; AddSelectedCpuDescription: (cpuDescription: CpuDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    primary={`${data.CpuDescriptions[index].maker_name} ${data.CpuDescriptions[index].product_name} : ${data.CpuDescriptions[index].price} 円`}
                    secondary={`${data.CpuDescriptions[index].socket_name} | ${data.CpuDescriptions[index].core_count} cores | ${data.CpuDescriptions[index].thread_count} threads | ${data.CpuDescriptions[index].tdp === null ? "" : data.CpuDescriptions[index].tdp + "W"}`}
                    onClick={() => data.AddSelectedCpuDescription(data.CpuDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const CpuDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", maxWidth: "800px", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={400}
                width="100%"
                itemSize={70}
                itemCount={props.CpuDescriptions.length}
                overscanCount={5}
                itemData={{ CpuDescriptions: props.CpuDescriptions, AddSelectedCpuDescription: props.AddSelectedCpuDescription }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default CpuDescriptionList;