import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import { TreeView, TreeItem, TreeItemProps } from "@material-ui/lab";
import { default as NumberFormat, NumberFormatProps } from 'react-number-format';
import { ResponsiveContainer, Pie, PieChart } from "recharts";
import { EstimateTotalService, Totals } from "services/estimate-total-service";
import { EstimateTemplate } from "models/estimate-template";
import { Range } from "models/range";
import { EstimateListDisplayData, EstimateList } from "components/estimate-list";

export type MainProps = {};
export type MainState = {
    estimates: EstimateTemplate[],
    totals: Totals
};

export class PageMain extends React.Component<MainProps, MainState> {

    estimateTotalService: EstimateTotalService = new EstimateTotalService();

    state = {
        estimates: [],
        totals: {
            income: { start: 0, end: 0 },
            deductions: { start: 0, end: 0 },
            taxable: { start: 0, end: 0 },
            tax: { start: 0, end: 0 },
            expenses: { start: 0, end: 0 },
            unaccounted: { start: 0, end: 0 },
        }
    };

    componentDidMount(): void {
        this.setState((prevState) => {
            let estimates = this.estimateTotalService.getEstimateTotals();
            return {
                estimates: estimates,
                totals: this.estimateTotalService.calculateTotals(estimates)
            };
        });
    }

    componentWillUnmount(): void {
        this.setState({ estimates: [] });
    }

    _renderTreeView0(): React.ReactNode {
        type DATATYPE = {
            id: string,
            label: string,
            headers: string[],
            rows: string[][] // Possible to be DATATYPE[][]
            children?: DATATYPE[]
        };
        const data: DATATYPE = {
            id: "root",
            label: "",
            headers: [
                "Test1",
                "Test2"
            ],
            rows: [
                ["A", "B"],
                ["C", "D"],
                ["E", "F"],
            ],
            children: [
                {
                    id: "1",
                    label: "Child 1",
                    headers: [
                        "Asdf",
                        "zxcv"
                    ],
                    rows: [
                        ["ss", "dd"],
                        ["zz", "vv"]
                    ]
                }
            ]
        };
        const renderDataView = (nodes: DATATYPE) => (
            <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.label}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {nodes.headers.map(header => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nodes.rows.map(row => (
                            <TableRow>
                                {row.map(cell => (
                                    <TableCell>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {/* <TableRow>
                            <TableCell>Value1</TableCell>
                            <TableCell>Value2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Value1</TableCell>
                            <TableCell>Value2</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </TreeItem>
        );
        return (
            <TreeView defaultExpanded={['root']}>
                {renderDataView(data)}
            </TreeView>
        )
    }

    _renderTreeView1(): React.ReactNode {
        return (
            <TreeView>
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10" label="OSS" />
                    <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                            <TreeItem nodeId="8" label="index.js" />
                            <TreeItem nodeId="9" label="test">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Test</TableCell>
                                            <TableCell>Test3</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <TreeItem nodeId="10" label="CLICK ME!">
                                                    <div>Test!</div>
                                                </TreeItem>
                                            </TableCell>
                                            <TableCell>Test3</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Test</TableCell>
                                            <TableCell>Test3</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </TreeView>
        );
    }

    _renderTreeView2(): React.ReactNode {
        return (
            <TreeView>
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10" label="OSS" />
                    <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                            <TreeItem nodeId="8" label="index.js" />
                            <TreeItem nodeId="9" label={
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Test</TableCell>
                                            <TableCell>Test3</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <TreeItem nodeId="10" label="CLICK ME!">
                                                    <div>Test!</div>
                                                </TreeItem>
                                            </TableCell>
                                            <TableCell>Test3</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Test</TableCell>
                                            <TableCell>Test3</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                }
                            />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </TreeView>
        );
    }

    _renderTreeView3(): React.ReactNode {
        type stylizedTreeItemProps = TreeItemProps & {
            labelText: string
        };
        function __stylizedTreeItem(props: stylizedTreeItemProps): JSX.Element {
            const { labelText, ...other } = props;
            return (
                <TreeItem
                    label={
                        <div>
                            <Typography variant="body2">
                                {labelText}
                            </Typography>
                        </div>
                    }
                    style={{}}
                    classes={{}}
                    {...other}
                />
            );
        }
        return (
            <TreeView
                defaultCollapseIcon={<ArrowDropDown />}
                defaultExpandIcon={<ArrowRight />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                <__stylizedTreeItem
                    nodeId="1"
                    labelText="Asdf"
                />
                <__stylizedTreeItem
                    nodeId="2"
                    labelText="Zcxv"
                >
                    <__stylizedTreeItem
                        nodeId="1"
                        labelText="Potato"
                    />
                    <__stylizedTreeItem
                        nodeId="5"
                        labelText="Machingo"
                    >
                        <__stylizedTreeItem
                            nodeId="7"
                            labelText="werterter"
                        />
                        <__stylizedTreeItem
                            nodeId="8"
                            labelText="xcvbxcvb"
                        />
                    </__stylizedTreeItem>
                    <__stylizedTreeItem
                        nodeId="6"
                        labelText="werlwekjr"
                    />
                </__stylizedTreeItem>
                <__stylizedTreeItem
                    nodeId="3"
                    labelText="Qwqer"
                >
                    <__stylizedTreeItem
                        nodeId="9"
                        labelText="Test"
                    />
                    <__stylizedTreeItem
                        nodeId="10"
                        labelText="rty rty "
                    />
                    <__stylizedTreeItem
                        nodeId="11"
                        labelText="tyuyt oi bpoiwert"
                    />
                </__stylizedTreeItem>
                <__stylizedTreeItem
                    nodeId="4"
                    labelText="Ytret"
                />
            </TreeView>
        );
    }

    _renderTreeView4(): React.ReactNode {
        type DATATYPE = {
            id: string,
            children?: DATATYPE[] | undefined;
        };
        const data: DATATYPE = {
            id: "Root",
            children: [
                { id: "1" },
                {
                    id: "2",
                    children: [
                        { id: "3" },
                        { id: "4" },
                        { id: "5" }
                    ]
                },
                {
                    id: "6",
                    children: [
                        { id: "7" },
                        {
                            id: "8",
                            children: [
                                { id: "9" },
                                { id: "10" }
                            ]
                        }
                    ]
                }
            ]
        };

        function S_TreeItem(data: DATATYPE): JSX.Element {
            return (
                <TreeItem
                    nodeId={data.id}
                    label={
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>Value: {data.id}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    }
                    style={{}}
                    classes={{}}
                >
                    {data.children?.map((value, index): JSX.Element => S_TreeItem(value))}
                </TreeItem>
            );
        }
        return (
            <TreeView
                defaultCollapseIcon={<ArrowDropDown />}
                defaultExpandIcon={<ArrowRight />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                {S_TreeItem(data)}
            </TreeView>
        );
    }

    _renderProtoTable(): React.ReactNode {
        function _renderRange(displayName: string, value: Range<number>): React.ReactNode {
            const numberFormatProps: Readonly<NumberFormatProps> = {
                displayType: 'text',
                thousandSeparator: true,
                prefix: '$',
                decimalScale: 2,
                fixedDecimalScale: true
            };
            return (
                <React.Fragment>
                    <TableCell>{displayName}</TableCell>
                    <TableCell>
                        <NumberFormat value={value.start} {...numberFormatProps} />
                    </TableCell>
                    <TableCell>
                        <NumberFormat value={value.end} {...numberFormatProps} />
                    </TableCell>
                </React.Fragment>
            )
        }
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Minimum</TableCell>
                        <TableCell>Maximum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {_renderRange("Income", this.state.totals.income)}
                    </TableRow>
                    <TableRow>
                        {_renderRange("Deductions", this.state.totals.deductions)}
                    </TableRow>
                    <TableRow>
                        {_renderRange("Taxable", this.state.totals.taxable)}
                    </TableRow>
                    <TableRow>
                        {_renderRange("Tax", this.state.totals.tax)}
                    </TableRow>
                    <TableRow>
                        {_renderRange("Expenses", this.state.totals.expenses)}
                    </TableRow>
                    <TableRow>
                        {_renderRange("Unaccounted", this.state.totals.unaccounted)}
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    render(): React.ReactNode {
        const styles: { [name: string]: React.CSSProperties} = {
            toolLink: {
                marginLeft: '1em',
                marginRight: '1em'
            }
        };
        let data: EstimateListDisplayData = {
            displayName: "Net Income",
            value: this.state.totals.unaccounted,
            children: [
                {
                    displayName: "Income",
                    value: this.state.totals.income
                },
                {
                    displayName: "Deductions",
                    value: this.state.totals.deductions
                },
                {
                    displayName: "Taxable Income",
                    value: this.state.totals.taxable
                },
                {
                    displayName: "Tax payment",
                    value: this.state.totals.tax
                },
                {
                    displayName: "Expenses",
                    value: this.state.totals.expenses
                }
            ]
        };
        return (
            <React.Fragment>
                {/* {this._renderTreeView()} */}
                {/* {this._renderTreeView1()} */}
                {/* {this._renderTreeView2()} */}
                {/* {this._renderTreeView3()} */}
                {/* {this._renderTreeView4()} */}
                <div style={{ width: "100%", height:500 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie dataKey="value" data={[{value: 25}, {value: 50}, {value: 30}]}>
                                
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <EstimateList data={data} />
            </React.Fragment>
        );
    }
}
