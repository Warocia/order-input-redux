import { OrderLineExtension } from '../Model/OrderLineExtension';

describe('OrderLineExtension', () => {
  let orderLineExtension: OrderLineExtension;

  beforeEach(() => {
    orderLineExtension = new OrderLineExtension(
      1,
      1,
      1,
      70,
      70,
      100,
      100,
      'USD'
    );
  });

  it('calculates the profit correctly', () => {
    expect(parseFloat(orderLineExtension.calculateProfit().toFixed(2))).toBe(42.86);
  });

  it('calculates the margin correctly', () => {
    expect(parseFloat(orderLineExtension.calculateMargin().toFixed(2))).toBe(30);
  });

  it('set count correctly', () => {
    orderLineExtension.setCount(10);

    expect(orderLineExtension.count).toBe(10);
    expect(orderLineExtension.salesPriceTotal).toBe(1000);
    expect(orderLineExtension.unitSalesPrice).toBe(100);
    expect(orderLineExtension.unitCostPrice).toBe(70);
    expect(orderLineExtension.totalUnitCostPrice).toBe(700);
  });
});