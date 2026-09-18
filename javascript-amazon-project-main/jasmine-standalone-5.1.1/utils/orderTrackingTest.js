import { getTrackedOrderProduct, getTrackingUrl } from '../../data/orders.js';

describe('order tracking', () => {
  const savedOrders = [{
    id: 'order-1',
    products: [
      { productId: 'product-1', quantity: 1 },
      { productId: 'product-2', quantity: 2 }
    ]
  }];

  it('includes both order and product IDs in the tracking URL', () => {
    const trackingUrl = new URL(
      getTrackingUrl('order-1', 'product-2'),
      'https://example.com/'
    );

    expect(trackingUrl.searchParams.get('orderId')).toEqual('order-1');
    expect(trackingUrl.searchParams.get('productId')).toEqual('product-2');
  });

  it('selects only the requested product from the requested order', () => {
    const tracked = getTrackedOrderProduct(savedOrders, 'order-1', 'product-2');

    expect(tracked.order.id).toEqual('order-1');
    expect(tracked.orderProduct.productId).toEqual('product-2');
    expect(getTrackedOrderProduct(savedOrders, 'order-1', 'missing')).toBeNull();
  });
});
