import { Range, assertRange } from "models/range";
import { EstimateTemplate } from "models/estimate-template";
import _raw_data from "../.data";
import { WeekDay } from "models/weekday";
import { TaxType } from "models/tax-type";

// const _raw_data = import("../.data");

export type Totals = {
    income: Range<number>,
    deductions: Range<number>,
    taxable: Range<number>,
    tax: Range<number>,
    unaccounted: Range<number>,
    expenses: Range<number>
};

export class EstimateTotalService {

    constructor() {
    }

    getEstimateTotals(): EstimateTemplate[] {
        let estimates: EstimateTemplate[] = [];

        for (let data of _raw_data) {
            estimates.push({
                day: data[0] as number,
                applyDay: data[1] as WeekDay,
                name: data[2] as string,
                description: (data[3] || "") as string,
                amount: data[4] as number | Range<number>,
                taxType: data[5] as TaxType,
                tag: data[6] as string | null
            })
        }

        return estimates;
    }

    calculateTotals(estimates: EstimateTemplate[]): Totals {
        function addWithTotalPercentageSupport(a: Range<number>, addingTo: Range<number>, total: Range<number>): Range<number> {
            let value = { start: a.start, end: a.end };
            // Handle percentages
            if (Math.abs(a.start) > 0 && Math.abs(a.start) < 1 && Math.abs(a.end) > 0 && Math.abs(a.end) < 1) {
                value.start = (total.start * a.start);
                value.end = (total.end * a.end);
            }
            value.start += addingTo.start;
            value.end += addingTo.end;
            return value;
        }

        let incomeTotal = { start: 0, end: 0 };
        let deductions = { start: 0, end: 0 };
        let taxableTotal = { start: 0, end: 0 };
        let taxTotal = { start: 0, end: 0 };
        let unaccounted = { start: 0, end: 0 };
        let expenses = { start: 0, end: 0 };

        // Calculate income totals before processing the rest (for percentages)
        for (let estimate of estimates) {
            if (!(estimate.taxType === TaxType.Income)) {
                continue;
            }
            let amount: Range<number> = assertRange(estimate.amount);
            incomeTotal.start += amount.start;
            incomeTotal.end += amount.end;
        }

        // Calculate taxable amount
        taxableTotal = { start: incomeTotal.start, end: incomeTotal.end };
        for (let estimate of estimates) {
            if (estimate.taxType !== TaxType.PreTax) {
                continue;
            }
            let amount: Range<number> = assertRange(estimate.amount);
            // #RestOfTheFuckingOwl
        }

        // Run through everything now
        for (let estimate of estimates) {
            let amount: Range<number> = assertRange(estimate.amount);
            switch (estimate.taxType) {
                case TaxType.GenericTax:
                case TaxType.LocalTax:
                case TaxType.StateTax:
                case TaxType.FederalTax:
                    taxTotal = addWithTotalPercentageSupport(amount, taxTotal, taxableTotal);
                    unaccounted = addWithTotalPercentageSupport(amount, unaccounted, taxableTotal);
                    break;
                case TaxType.PreTax:
                    unaccounted = addWithTotalPercentageSupport(amount, unaccounted, incomeTotal);
                    break;
                case TaxType.PostTax:
                    // This should take into account post-tax and post- pre-tax takings, just right now don't use percentages
                    unaccounted = addWithTotalPercentageSupport(amount, unaccounted, incomeTotal);
                    break;
                case TaxType.Income:
                default:
                    continue;
            }
        }

        taxTotal = {
            start: Math.abs(taxTotal.end),
            end: Math.abs(taxTotal.start)
        }
        expenses = {
            start: Math.abs(unaccounted.end),
            end: Math.abs(unaccounted.start)
        };
        unaccounted = {
            start: incomeTotal.end + unaccounted.end,
            end: incomeTotal.start + unaccounted.start
        };

        return {
            income: incomeTotal,
            deductions: deductions,
            taxable: taxableTotal,
            tax: taxTotal,
            unaccounted: unaccounted,
            expenses: expenses
        };
    }
}