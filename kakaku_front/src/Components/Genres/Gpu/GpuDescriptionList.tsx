import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { GpuDescription } from './GpuPriceDisplay'


type Props = {
    GpuDescriptions: GpuDescription[];
    AddGpuDescriptionAndCount: (gpuDescription: GpuDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ GpuDescriptions: GpuDescription[]; AddGpuDescriptionAndCount: (gpuDescription: GpuDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.GpuDescriptions[index].maker_name} ${data.GpuDescriptions[index].product_name} : ${data.GpuDescriptions[index].price} 円`}
                    secondary={`${data.GpuDescriptions[index].chip_name} | ${data.GpuDescriptions[index].gpu_memory_type} ${data.GpuDescriptions[index].gpu_memory_capacity} GB | ${data.GpuDescriptions[index].width}x${data.GpuDescriptions[index].height}x${data.GpuDescriptions[index].depth} mm`}
                    onClick={() => data.AddGpuDescriptionAndCount(data.GpuDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const GpuDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={600}
                width="100%"
                itemSize={75}
                itemCount={props.GpuDescriptions.length}
                overscanCount={5}
                itemData={{ GpuDescriptions: props.GpuDescriptions, AddGpuDescriptionAndCount: props.AddGpuDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default GpuDescriptionList;