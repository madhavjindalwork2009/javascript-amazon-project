import { carts } from '../../data/cart-class.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { loadProducts,loadProductsFetch } from '../../data/products.js';
describe('order summary', () => {
  let summaryContainer;

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });
  beforeEach(() => {
    localStorage.clear();
    document.querySelectorAll('.js-order-summary').forEach((el) => el.remove());
    carts.cartItems = [];
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
    carts.cartItems.push({
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
    expect(summary.querySelectorAll(
      '.js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6 .delivery-option-input'
    ).length).toEqual(3);
  });

  it('renders a delete link for every cart item', () => {
    const productId = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    carts.cartItems.push({
      productId,
      quantity: 1,
      deliveryOptionId: '2'
    });

    renderOrderSummary();

    const deleteLinks = summaryContainer.querySelectorAll(
      `.js-cart-item-container-${productId} .js-delete-link`
    );
    expect(deleteLinks.length).toEqual(1);
    expect(deleteLinks[0].dataset.productId).toEqual(productId);
  });
});
