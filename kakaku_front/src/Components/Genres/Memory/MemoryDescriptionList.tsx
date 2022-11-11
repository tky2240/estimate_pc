import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { MemoryDescription } from './MemoryPriceDisplay'


type Props = {
    MemoryDescriptions: MemoryDescription[];
    AddMemoryDescriptionAndCount: (memoryDescription: MemoryDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ MemoryDescriptions: MemoryDescription[]; AddMemoryDescriptionAndCount: (memoryDescription: MemoryDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.MemoryDescriptions[index].maker_name} ${data.MemoryDescriptions[index].product_name} : ${data.MemoryDescriptions[index].price} 円`}
                    secondary={`${data.MemoryDescriptions[index].module_type} | ${data.MemoryDescriptions[index].capacity_per_module} GB/枚 | ${data.MemoryDescriptions[index].module_count} 枚`}
                    onClick={() => data.AddMemoryDescriptionAndCount(data.MemoryDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const MemoryDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={620}
                width="100%"
                itemSize={75}
                itemCount={props.MemoryDescriptions.length}
                overscanCount={5}
                itemData={{ MemoryDescriptions: props.MemoryDescriptions, AddMemoryDescriptionAndCount: props.AddMemoryDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default MemoryDescriptionList;