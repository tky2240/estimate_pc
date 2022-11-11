import React, { useRef, useState, useEffect, RefObject, ReactNode, ComponentType, Context } from 'react'
import Box from '@mui/material/Box';
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer'
import { CpuCoolerDescription } from './CpuCoolerPriceDisplay'
import { Components, ItemProps, Virtuoso } from 'react-virtuoso'
import { SxProps, Theme } from '@mui/material';

type Props = {
    CpuCoolerDescriptions: CpuCoolerDescription[];
    AddCpuCoolerDescriptionAndCount: (cpuCoolerDescription: CpuCoolerDescription) => void;
}


function renderRow(props: ListChildComponentProps<{ CpuCoolerDescriptions: CpuCoolerDescription[]; AddCpuCoolerDescriptionAndCount: (cpuCoolerDescription: CpuCoolerDescription) => void; }>) {
    const { style, index, data } = props;

    return (
        <ListItem style={style} key={index} disablePadding>
            <ListItemButton>
                <ListItemText
                    sx={{ whiteSpace: 'nowrap', margin: 1 }}
                    primary={`${data.CpuCoolerDescriptions[index].maker_name} ${data.CpuCoolerDescriptions[index].product_name} : ${data.CpuCoolerDescriptions[index].price} 円`}
                    secondary={`${data.CpuCoolerDescriptions[index].air_flow_type} | 高さ : ${data.CpuCoolerDescriptions[index].height ?? ""} mm | 許容TDP : ${data.CpuCoolerDescriptions[index].max_tdp ?? ""} W`}
                    onClick={() => data.AddCpuCoolerDescriptionAndCount(data.CpuCoolerDescriptions[index])}
                />
            </ListItemButton>
        </ListItem>
    );
}

const CpuCoolerDescriptionList = (props: Props) => {
    return (
        <Box
            sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                style={{ alignContent: "center" }}
                height={650}
                width="100%"
                itemSize={75}
                itemCount={props.CpuCoolerDescriptions.length}
                overscanCount={5}
                itemData={{ CpuCoolerDescriptions: props.CpuCoolerDescriptions, AddCpuCoolerDescriptionAndCount: props.AddCpuCoolerDescriptionAndCount }}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
        // <Virtuoso
        //     style={{ height: '500px' }}
        //     data={props.CpuCoolerDescriptions}

        //     components={MUIComponents}
        //     itemContent={(index, cpuCoolerDescription) => (
        //         <ListItem disablePadding>
        //             <ListItemButton>
        //                 <ListItemText
        //                     sx={{ whiteSpace: 'nowrap', margin: 1 }}
        //                     primary={`${cpuCoolerDescription.maker_name} ${cpuCoolerDescription.product_name} : ${cpuCoolerDescription.price} 円`}
        //                     secondary={`${cpuCoolerDescription.air_flow_type} | 高さ : ${cpuCoolerDescription.height ?? ""} mm | 許容TDP : ${cpuCoolerDescription.max_tdp ?? ""} W`}
        //                     onClick={() => props.AddCpuCoolerDescriptionAndCount(cpuCoolerDescription)}
        //                 />
        //             </ListItemButton>
        //         </ListItem>
        //     )}
        // />
    );
}

const listContainer = ({ listRef, style, children }: { listRef: RefObject<HTMLUListElement>, style: React.CSSProperties, children: ReactNode }) => {
    return (
        <List ref={listRef} style={{ ...style, padding: 0 }}>
            {children}
        </List>
    );
};

const itemContainer = ({ children, ...props }: { children: ReactNode, props: {} }) => {
    return (
        <ListItem {...props} style={{ margin: 0 }}>
            {children}
        </ListItem>
    );
};

const MUIComponents: Components = {
    List: React.forwardRef<HTMLDivElement, ListProps>(({ style, children }, listRef) => {
        return (
            <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
                {children}
            </List>
        )
    }),
}

export default CpuCoolerDescriptionList;