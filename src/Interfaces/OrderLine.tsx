import {Product } from './Product';

export interface OrderLine {
    id: number;
    productId: number | null;
    count: number;
    unitCost: number;
    totalCost: number;
    costUnit: string;
  }
  