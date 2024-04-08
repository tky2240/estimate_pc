import React, { useRef, useState, useEffect, RefObject, ReactNode, ComponentType, Context } from 'react'
import Box from '@mui/material/Box';
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer'
import { CaseDescription } from './CasePriceDisplay'
import { Components, ItemProps, Virtuoso } from 'react-virtuoso'
import { SxProps, Theme } from '@mui/material';

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
        // <Virtuoso
        //     style={{ height: '500px' }}
        //     data={props.CaseDescriptions}

        //     components={MUIComponents}
        //     itemContent={(index, caseDescription) => (
        //         <ListItem disablePadding>
        //             <ListItemButton>
        //                 <ListItemText
        //                     sx={{ whiteSpace: 'nowrap', margin: 1 }}
        //                     primary={`${caseDescription.maker_name} ${caseDescription.product_name} : ${caseDescription.price} 円`}
        //                     secondary={`${caseDescription.air_flow_type} | 高さ : ${caseDescription.height ?? ""} mm | 許容TDP : ${caseDescription.max_tdp ?? ""} W`}
        //                     onClick={() => props.AddCaseDescriptionAndCount(caseDescription)}
        //                 />
        //             </ListItemButton>
        //         </ListItem>
        //     )}
        // />
    );
}

// const listContainer = ({ listRef, style, children }: { listRef: RefObject<HTMLUListElement>, style: React.CSSProperties, children: ReactNode }) => {
//     return (
//         <List ref={listRef} style={{ ...style, padding: 0 }}>
//             {children}
//         </List>
//     );
// };

// const itemContainer = ({ children, ...props }: { children: ReactNode, props: {} }) => {
//     return (
//         <ListItem {...props} style={{ margin: 0 }}>
//             {children}
//         </ListItem>
//     );
// };

// const MUIComponents: Components = {
//     List: React.forwardRef<HTMLDivElement, ListProps>(({ style, children }, listRef) => {
//         return (
//             <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
//                 {children}
//             </List>
//         )
//     }),
// }

export default CaseDescriptionList;