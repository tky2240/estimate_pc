import React from 'react'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import { CaseDescription } from './CasePriceDisplay'

type Props = {
    CaseDescriptions: CaseDescription[];
    AddCaseDescriptionAndCount: (caseDescription: CaseDescription) => void;
}

function renderRow(props: ListChildComponentProps<{ CaseDescriptions: CaseDescription[]; AddCaseDescriptionAndCount: (caseDescription: CaseDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.CaseDescriptions[index].maker_name} ${data.CaseDescriptions[index].product_name} : ${data.CaseDescriptions[index].price} 円`}
                    secondary={`${data.CaseDescriptions[index].width ?? 0}x${data.CaseDescriptions[index].height ?? 0}x${data.CaseDescriptions[index].depth ?? 0} mm`}
                    onClick={() => data.AddCaseDescriptionAndCount(data.CaseDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const CaseDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={480}
                width="100%"
                itemSize={75}
                itemCount={props.CaseDescriptions.length}
                overscanCount={5}
                itemData={{ CaseDescriptions: props.CaseDescriptions, AddCaseDescriptionAndCount: props.AddCaseDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}

export default CaseDescriptionList;