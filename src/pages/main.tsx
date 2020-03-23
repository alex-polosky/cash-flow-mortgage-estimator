import React from "react";
import { EstimateTotalService, Totals } from "services/estimate-total-service";
import { EstimateTemplate } from "models/estimate-template";
import { ResponsiveContainer, Pie, PieChart } from "recharts";

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
        return (
            <React.Fragment>
                <div style={{ width: "100%", height:500 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie dataKey="value" data={[{value: 25}, {value: 50}, {value: 30}]}>
                                
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <div>
                        <div>Income</div>
                        <div>{`${this.state.totals.income.start} - ${this.state.totals.income.end}`}</div>
                    </div>
                    <div>
                        <div>Deductions</div>
                        <div>{`${this.state.totals.deductions.start} - ${this.state.totals.deductions.end}`}</div>
                        
                    </div>
                    <div>
                        <div>Taxable</div>
                        <div>{`${this.state.totals.taxable.start} - ${this.state.totals.taxable.end}`}</div>
                    </div>
                    <div>
                        <div>Tax</div>
                        <div>{`${this.state.totals.tax.start} - ${this.state.totals.tax.end}`}</div>
                    </div>
                    <div>
                        <div>Expenses</div>
                        <div>{`${this.state.totals.expenses.start} - ${this.state.totals.expenses.end}`}</div>
                    </div>
                    <div>
                        <div>Non-Spent</div>
                        <div>{`${this.state.totals.unaccounted.start} - ${this.state.totals.unaccounted.end}`}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
