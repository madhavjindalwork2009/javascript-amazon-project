import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      loadCart(
        () => resolve(),
        (error) => reject(error)
      );
    });

    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error('Unable to load checkout data:', error);
  }
}

loadPage().catch((error) => {
  console.error('Unexpected checkout error:', error);
});