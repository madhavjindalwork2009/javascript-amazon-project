export {
	cart,
	carts,
	loadFromStorage,
	addToCart,
	removeFromCart,
	updateDeliveryOption
} from './cart-oops.js';

export function loadCart(fun, errorFun) {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener('load', () => {
		console.log(xhr.response);
		fun();
	});

	xhr.addEventListener('error', () => {
		errorFun(xhr.statusText || 'Unable to load cart');
	});

	xhr.open('GET', 'https://supersimplebackend.dev/cart');
	xhr.send();
}

export async function loadCartFetch() {
	const response = await fetch('https://supersimplebackend.dev/cart');
	if (!response.ok) {
		throw new Error(`Cart request failed: ${response.status}`);
	}
	const responseText = await response.text();
	console.log(responseText);
}

 