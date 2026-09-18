import { orders, getTrackingUrl } from '../data/orders.js';
import { addToCart } from '../data/cart-oops.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}

function orderHTML(order) {
  const orderDate = formatDate(order.orderTime);
  const productsHTML = order.products.map((orderProduct) => {
    const product = getProduct(orderProduct.productId);
    const arrivalDate = formatDate(orderProduct.estimatedDeliveryTime);

    return `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-delivery-date">Arriving on: ${arrivalDate}</div>
        <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again"
          data-product-id="${product.id}" data-quantity="${orderProduct.quantity}">
          <img class="buy-again-icon" src="images/icons/buy-again.png" alt="">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>
      <div class="product-actions">
        <a class="track-package-button button-secondary"
          href="${getTrackingUrl(order.id, product.id)}">
          Track package
        </a>
      </div>
    `;
  }).join('');

  return `
    <section class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      <div class="order-details-grid">${productsHTML}</div>
    </section>
  `;
}

async function loadOrdersPage() {
  const ordersGrid = document.querySelector('.js-orders-grid');
  await loadProductsFetch();

  if (orders.length === 0) {
    ordersGrid.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  ordersGrid.innerHTML = orders.map(orderHTML).join('');
  ordersGrid.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId, Number(button.dataset.quantity));
      button.querySelector('.buy-again-message').textContent = 'Added';
    });
  });
}

loadOrdersPage().catch((error) => {
  console.error('Unable to load orders:', error);
});
