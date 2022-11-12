import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { PowerSupplyDescription } from './PowerSupplyPriceDisplay'


type Props = {
    PowerSupplyDescriptions: PowerSupplyDescription[];
    AddPowerSupplyDescriptionAndCount: (powerSupplyDescription: PowerSupplyDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ PowerSupplyDescriptions: PowerSupplyDescription[]; AddPowerSupplyDescriptionAndCount: (powerSupplyDescription: PowerSupplyDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.PowerSupplyDescriptions[index].maker_name} ${data.PowerSupplyDescriptions[index].product_name} : ${data.PowerSupplyDescriptions[index].price} 円`}
                    secondary={`${data.PowerSupplyDescriptions[index].capacity} W | ${data.PowerSupplyDescriptions[index].form_factor} | ${data.PowerSupplyDescriptions[index].width ?? 0}x${data.PowerSupplyDescriptions[index].height ?? 0}x${data.PowerSupplyDescriptions[index].depth ?? 0} mm`}
                    onClick={() => data.AddPowerSupplyDescriptionAndCount(data.PowerSupplyDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const PowerSupplyDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={550}
                width="100%"
                itemSize={75}
                itemCount={props.PowerSupplyDescriptions.length}
                overscanCount={5}
                itemData={{ PowerSupplyDescriptions: props.PowerSupplyDescriptions, AddPowerSupplyDescriptionAndCount: props.AddPowerSupplyDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default PowerSupplyDescriptionList;