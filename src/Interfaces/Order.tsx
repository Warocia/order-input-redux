import {OrderLine } from './OrderLine';

export interface Order {
    id: number;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    deliveryDate: string;
    orderlines: OrderLine[];
  }