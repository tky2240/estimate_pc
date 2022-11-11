import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { MotherboardDescription } from './MotherboardPriceDisplay'


type Props = {
    MotherboardDescriptions: MotherboardDescription[];
    AddMotherboardDescriptionAndCount: (motherboardDescription: MotherboardDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ MotherboardDescriptions: MotherboardDescription[]; AddMotherboardDescriptionAndCount: (motherboardDescription: MotherboardDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.MotherboardDescriptions[index].maker_name} ${data.MotherboardDescriptions[index].product_name} : ${data.MotherboardDescriptions[index].price} 円`}
                    secondary={`${data.MotherboardDescriptions[index].form_factor} | ${data.MotherboardDescriptions[index].socket_name} | ${data.MotherboardDescriptions[index].memory_type}}`}
                    onClick={() => data.AddMotherboardDescriptionAndCount(data.MotherboardDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const MotherboardDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={620}
                width="100%"
                itemSize={75}
                itemCount={props.MotherboardDescriptions.length}
                overscanCount={5}
                itemData={{ MotherboardDescriptions: props.MotherboardDescriptions, AddMotherboardDescriptionAndCount: props.AddMotherboardDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default MotherboardDescriptionList;