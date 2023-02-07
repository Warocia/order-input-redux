import {Product } from './Product'

export interface OrderLine {
    id: number;
    productId: number | null;
    count: number;
    totalUnitCostPrice: number;
    unitCostPrice: number;
    unitSalesPrice: number;
    salesPriceTotal: number;
    priceUnit: string;
}
  