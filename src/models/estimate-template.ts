import { Range } from "./range";
import { WeekDay } from "./weekday";
import { TaxType } from "./tax-type";

export interface EstimateTemplate {
    day: number,
    applyDay: WeekDay,
    name: string,
    description: string | null,
    amount: number | Range<number>
    taxType: TaxType,
    tag: string | null,
}