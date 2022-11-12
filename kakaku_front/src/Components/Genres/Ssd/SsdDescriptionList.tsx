import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { SsdDescription } from './SsdPriceDisplay'


type Props = {
    SsdDescriptions: SsdDescription[];
    AddSsdDescriptionAndCount: (ssdDescription: SsdDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ SsdDescriptions: SsdDescription[]; AddSsdDescriptionAndCount: (ssdDescription: SsdDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.SsdDescriptions[index].maker_name} ${data.SsdDescriptions[index].product_name} : ${data.SsdDescriptions[index].price} 円`}
                    secondary={`${data.SsdDescriptions[index].capacity} GB | ${data.SsdDescriptions[index].size} | ${data.SsdDescriptions[index].interface} | ${data.SsdDescriptions[index].tbw ?? ""} TBW`}
                    onClick={() => data.AddSsdDescriptionAndCount(data.SsdDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const SsdDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={470}
                width="100%"
                itemSize={75}
                itemCount={props.SsdDescriptions.length}
                overscanCount={5}
                itemData={{ SsdDescriptions: props.SsdDescriptions, AddSsdDescriptionAndCount: props.AddSsdDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default SsdDescriptionList;