import {OrderLine } from './OrderLine';

export class OrderLineExtension  implements  OrderLine{
    id: number;
    productId: number | null;
    count: number;
    totalUnitCostPrice: number;
    unitCostPrice: number;
    unitSalesPrice: number;
    salesPriceTotal: number;
    priceUnit: string;

    constructor(
        id: number,
        productId: number | null,
        count: number,
        totalUnitCostPrice: number,
        unitCostPrice: number,
        unitSalesPrice: number,
        salesPriceTotal: number,
        priceUnit: string
    ) {
        this.id = id;
        this.productId = productId;
        this.count = count;
        this.totalUnitCostPrice = totalUnitCostPrice;
        this.unitCostPrice = unitCostPrice;
        this.unitSalesPrice = unitSalesPrice;
        this.salesPriceTotal = salesPriceTotal;
        this.priceUnit = priceUnit;
    }

    calculateProfit(): number {
        return 100 * ((this.salesPriceTotal - this.totalUnitCostPrice) / this.totalUnitCostPrice);
    }

    calculateMargin(): number {
        return 100 * ((this.salesPriceTotal - this.totalUnitCostPrice) / this.salesPriceTotal);
    }

    setCount(count : number) : void {
        this.count = count;
        this.totalUnitCostPrice = this.unitCostPrice * count;
        this.salesPriceTotal = this.unitSalesPrice * count;
    }
}