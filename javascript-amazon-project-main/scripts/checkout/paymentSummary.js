import { cart } from "../../data/cart-oops.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import {addOrder} from '../../data/orders.js';
async function placeOrder() {
    try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cart })
        });

        if (!response.ok) {
            throw new Error(`Order request failed: ${response.status}`);
        }

        await response.json();
        window.location.href = 'orders.html';
    } catch (error) {
        console.error('Unable to place order:', error);
        alert('Failed to place order. Please try again.');
    }
}

export function renderPaymentSummary() {
    let totalPriceCents = 0;
    let totalDeliveryPriceCents = 0;
    let itemCount = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        totalPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        totalDeliveryPriceCents += deliveryOption.priceCents;
        itemCount += cartItem.quantity;
    });
    const totalBeforeTaxCents = totalPriceCents + totalDeliveryPriceCents;
    const taxCents = Math.round(totalBeforeTaxCents * 0.1);
    const totalCents = totalBeforeTaxCents + taxCents;
    const paymentSummaryHTML = `
        <div class="payment-summary-title">
                Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${itemCount}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(totalDeliveryPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)} </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart })
            });

            if (!response.ok) {
                throw new Error(`Order request failed: ${response.status}`);
            }

            const orderData = await response.json();
            addOrder(orderData);
            window.location.href = 'orders.html';
        } catch (error) {
            console.error('Unable to place order:', error);
            alert('Failed to place order. Please try again.');
        }
    });
}
