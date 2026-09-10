import { cart } from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('order summary', () => {
  let summaryContainer;

  beforeEach(() => {
    cart.length = 0;
    summaryContainer = document.createElement('div');
    summaryContainer.className = 'js-order-summary';
    document.body.appendChild(summaryContainer);
  });

  afterEach(() => {
    if (summaryContainer && summaryContainer.parentNode) {
      summaryContainer.parentNode.removeChild(summaryContainer);
    }
  });

  it('renders each cart item with product details and delivery options', () => {
    cart.push({
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    });

    renderOrderSummary();

    const summary = summaryContainer;
    expect(summary.innerHTML).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(summary.innerHTML).toContain('Quantity:');
    expect(summary.innerHTML).toContain('2');
    expect(summary.innerHTML).toContain('Choose a delivery option:');
    expect(summary.querySelectorAll('.delivery-option-input').length).toEqual(3);
  });

  it('renders a delete link for every cart item', () => {
    cart.push({
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    });

    renderOrderSummary();

    expect(summaryContainer.querySelectorAll('.js-delete-link').length).toEqual(1);
    expect(summaryContainer.querySelector('.js-delete-link').dataset.productId)
      .toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
  });
});
