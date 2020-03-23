import { Range } from "./range";
import { TaxType } from "./tax-type";

export interface Estimate {
    date: Date,
    name: string,
    description: string | null,
    amount: number | Range<number>,
    taxType: TaxType
    tag: string | null,
}