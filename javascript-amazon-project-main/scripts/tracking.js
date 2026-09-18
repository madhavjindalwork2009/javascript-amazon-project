import { orders, getTrackedOrderProduct } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

function getStatus(estimatedDeliveryTime) {
  const deliveryTime = new Date(estimatedDeliveryTime).getTime();
  const now = Date.now();
  const shippedTime = deliveryTime - (2 * 24 * 60 * 60 * 1000);

  if (now >= deliveryTime) {
    return { label: 'Delivered', width: '100%' };
  }
  if (now >= shippedTime) {
    return { label: 'Shipped', width: '50%' };
  }
  return { label: 'Preparing', width: '15%' };
}

async function loadTrackingPage() {
  const params = new URLSearchParams(window.location.search);
  const trackedOrder = getTrackedOrderProduct(
    orders,
    params.get('orderId'),
    params.get('productId')
  );
  const content = document.querySelector('.js-tracking-content');

  if (!trackedOrder) {
    content.innerHTML = '<p>We could not find this package.</p>';
    return;
  }

  const { orderProduct } = trackedOrder;
  await loadProductsFetch();
  const product = getProduct(orderProduct.productId);
  const status = getStatus(orderProduct.estimatedDeliveryTime);

  content.innerHTML = `
    <div class="delivery-date">
      Arriving on ${formatDate(orderProduct.estimatedDeliveryTime)}
    </div>
    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${orderProduct.quantity}</div>
    <img class="product-image" src="${product.image}" alt="${product.name}">
    <div class="progress-labels-container">
      <div class="progress-label ${status.label === 'Preparing' ? 'current-status' : ''}">Preparing</div>
      <div class="progress-label ${status.label === 'Shipped' ? 'current-status' : ''}">Shipped</div>
      <div class="progress-label ${status.label === 'Delivered' ? 'current-status' : ''}">Delivered</div>
    </div>
    <div class="progress-bar-container" aria-label="Package status: ${status.label}">
      <div class="progress-bar" style="width: ${status.width}"></div>
    </div>
  `;
}

loadTrackingPage().catch((error) => {
  console.error('Unable to load tracking page:', error);
});
