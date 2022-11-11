import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { CpuDescription } from './CpuPriceDisplay'


type Props = {
    CpuDescriptions: CpuDescription[];
    AddCpuDescriptionAndCount: (cpuDescription: CpuDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ CpuDescriptions: CpuDescription[]; AddCpuDescriptionAndCount: (cpuDescription: CpuDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.CpuDescriptions[index].maker_name} ${data.CpuDescriptions[index].product_name} : ${data.CpuDescriptions[index].price} 円`}
                    secondary={`${data.CpuDescriptions[index].socket_name} | ${data.CpuDescriptions[index].core_count} cores | ${data.CpuDescriptions[index].thread_count} threads | ${data.CpuDescriptions[index].tdp === null ? "" : data.CpuDescriptions[index].tdp + "W"}`}
                    onClick={() => data.AddCpuDescriptionAndCount(data.CpuDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const CpuDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={400}
                width="100%"
                itemSize={75}
                itemCount={props.CpuDescriptions.length}
                overscanCount={5}
                itemData={{ CpuDescriptions: props.CpuDescriptions, AddCpuDescriptionAndCount: props.AddCpuDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default CpuDescriptionList;