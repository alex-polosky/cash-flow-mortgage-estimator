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
