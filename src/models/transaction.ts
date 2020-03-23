export interface Transaction {
    date: Date;
    name: string;
    description: string | null;
    amount: number;
    tag: string | null,
}