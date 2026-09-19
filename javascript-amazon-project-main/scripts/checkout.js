import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCartFetch} from '../data/cart.js';
import {cart} from '../data/cart-oops.js';

function updateCheckoutItemCount() {
  const itemCount = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  document.querySelector('.js-checkout-item-count').textContent = itemCount;
}

async function loadPage() {
  try {
    await loadProductsFetch();
    await loadCartFetch();

    updateCheckoutItemCount();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error('Unable to load checkout data:', error);
  }
}

loadPage().catch((error) => {
  console.error('Unexpected checkout error:', error);
});