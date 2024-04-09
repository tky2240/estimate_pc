import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { HddDescription } from './HddPriceDisplay'

type Props = {
    HddDescriptions: HddDescription[];
    AddHddDescriptionAndCount: (hddDescription: HddDescription) => void;
}

function renderRow(props: ListChildComponentProps<{ HddDescriptions: HddDescription[]; AddHddDescriptionAndCount: (hddDescription: HddDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.HddDescriptions[index].maker_name} ${data.HddDescriptions[index].product_name} : ${data.HddDescriptions[index].price} 円`}
                    secondary={`${data.HddDescriptions[index].capacity} GB | ${data.HddDescriptions[index].rpm ?? ""} rpm | ${data.HddDescriptions[index].write_style}`}
                    onClick={() => data.AddHddDescriptionAndCount(data.HddDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const HddDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={470}
                width="100%"
                itemSize={75}
                itemCount={props.HddDescriptions.length}
                overscanCount={5}
                itemData={{ HddDescriptions: props.HddDescriptions, AddHddDescriptionAndCount: props.AddHddDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default HddDescriptionList;