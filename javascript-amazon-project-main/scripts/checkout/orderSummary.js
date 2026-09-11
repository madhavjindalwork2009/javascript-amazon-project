import {
	cart,
	removeFromCart,
	updateDeliveryOption
} from '../../data/cart-class.js';
import {products,getProduct} from '../../data/products.js';
 import {deliveryOption,getDeliveryOption} from '../../data/deliveryOption.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {renderPaymentSummary} from './paymentSummary.js';
let cartSummaryHTML = '';

export function renderOrderSummary() {
	cartSummaryHTML = '';

	function deliveryOptionsHTML(matchingProduct, cartItem) {
		let html = '';

		deliveryOption.forEach((deliveryOption) => {
			const today = dayjs();
			const deliveryDate = today.add(
				deliveryOption.deliveryDays, 'days'
			);

			const dateString = deliveryDate.format(
				'dddd, MMMM D'
			);

			const priceString = deliveryOption.priceCents === 0
				? 'FREE'
				: `$${formatCurrency(deliveryOption.priceCents)}`;

			const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

			html += `
				<div class="delivery-option js-delivery-option">
					<input type="radio"
						${isChecked ? 'checked' : ''}
						class="delivery-option-input"
						data-product-id="${matchingProduct.id}"
						data-delivery-option-id="${deliveryOption.id}"
						name="delivery-option-${matchingProduct.id}">
					<div>
						<div class="delivery-option-date">
							${dateString}
						</div>
						<div class="delivery-option-price">
							${priceString} Shipping
						</div>
					</div>
				</div>
			`;
		});

		return html;
	}

	cart.forEach((cartItem) => {
		const productId = cartItem.productId;

		const matchingProduct = getProduct(productId);

		

		const deliveryOptionId = cartItem.deliveryOptionId;

		const matchingDeliveryOption = getDeliveryOption(deliveryOptionId);
		const today = dayjs();
		const deliveryDate = today.add(
			matchingDeliveryOption.deliveryDays, 'days'
		);

		const dateString = deliveryDate.format(
			'dddd, MMMM D'
		);

		cartSummaryHTML += `
			<div class="cart-item-container 
			js-cart-item-container-${matchingProduct.id}">
				<div class="delivery-date js-delivery-date">
					Delivery date: ${dateString}
				</div>

				<div class="cart-item-details-grid">
					<img class="product-image" src="${matchingProduct.image}">

					<div class="cart-item-details">
						<div class="product-name">
							${matchingProduct.name}
						</div>
						<div class="product-price">
							$${formatCurrency(matchingProduct.priceCents)}
						</div>
						<div class="product-quantity">
							<span>
								Quantity: <span class="quantity-label">${cartItem.quantity}</span>
							</span>
							<span class="update-quantity-link link-primary">
								Update
							</span>
							<span class="delete-quantity-link link-primary  js-delete-link" data-product-id = "${matchingProduct.id}">
								Delete
							</span>
						</div>
					</div>

					<div class="delivery-options">
						<div class="delivery-options-title">
							Choose a delivery option:
						</div>
						${deliveryOptionsHTML(matchingProduct, cartItem)}
					</div>
				</div>
			</div>
		`;
	});

	document.querySelector('.js-order-summary')
		.innerHTML = cartSummaryHTML;

	document.querySelectorAll('.delivery-option-input')
		.forEach((input) => {
			input.addEventListener('change', () => {
				updateDeliveryOption(
					input.dataset.productId,
					input.dataset.deliveryOptionId
				);
				renderOrderSummary();
				renderPaymentSummary();
			});
		});

		document.querySelectorAll('.js-delete-link')
		.forEach((deleteLink) => {
			deleteLink.addEventListener('click', () => {
				const productId = deleteLink.dataset.productId;
				removeFromCart(productId);
				renderOrderSummary();
				renderPaymentSummary();
			});
		});
}
