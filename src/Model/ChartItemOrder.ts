export class ChartItemOrder{
    deliveryDate: string;
    amountEUR: number;

    constructor(
        deliveryDate: string,
        amountEUR: number,
    ) {
        this.deliveryDate = deliveryDate;
        this.amountEUR = amountEUR;
    }
}