import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowRight, MaximizeTwoTone } from "@material-ui/icons";
import { TreeView, TreeItem, TreeItemProps } from "@material-ui/lab";
import { default as NumberFormat, NumberFormatProps } from 'react-number-format';
import { Range, assertRange } from "models/range";

export type EstimateListDisplayData = {
    displayName: string,
    value: number | Range<number>,
    children?: EstimateListDisplayData[] | undefined
};

export type EstimateListProps = {
    data: EstimateListDisplayData
};
export type EstimateListState = {};

const cellWidth = "10%";
const cellStyles: React.CSSProperties = {
    minWidth: cellWidth,
    maxWidth: cellWidth,
    width: cellWidth
};

export class EstimateList extends React.Component<EstimateListProps, EstimateListState> {
    componentDidMount(): void {
    }

    componentWillUnmount(): void {
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell style={cellStyles}>Minimum</TableCell>
                            <TableCell style={cellStyles}>Maximum</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <TreeView
                    defaultCollapseIcon={<ArrowDropDown />}
                    defaultExpandIcon={<ArrowRight />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                >
                    {this._renderTreeItem(this.props.data, "root")}
                </TreeView>
            </React.Fragment>
        );
    }

    _renderTreeItem(data: EstimateListDisplayData, parentNodeId: string): JSX.Element {
        return (
        <TreeItem
            nodeId={this._calculateNodeId(data, parentNodeId)}
            label={
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>{data.displayName}</TableCell>
                            <TableCell style={cellStyles}>{this._renderAsCurrency(assertRange(data.value).start)}</TableCell>
                            <TableCell style={cellStyles}>{this._renderAsCurrency(assertRange(data.value).end)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            }
            style={{}}
            classes={{}}
        >
            {data.children?.map((child, index): JSX.Element => this._renderTreeItem(child, this._calculateNodeId(child, parentNodeId)))}
        </TreeItem>
        );
    }
    
    _renderAsCurrency(value: number): React.ReactNode {
        const numberFormatProps: Readonly<NumberFormatProps> = {
            displayType: 'text',
            thousandSeparator: true,
            prefix: '$',
            decimalScale: 2,
            fixedDecimalScale: true
        };
        return (
            <NumberFormat value={value} {...numberFormatProps} />
        )
    }

    _calculateNodeId(data: EstimateListDisplayData, parentNodeId: string): string {
        return `${parentNodeId}-${data.displayName}`;
    }
}