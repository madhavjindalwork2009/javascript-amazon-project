import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCartFetch} from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductsFetch();
    await loadCartFetch();

    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error('Unable to load checkout data:', error);
  }
}

loadPage().catch((error) => {
  console.error('Unexpected checkout error:', error);
});