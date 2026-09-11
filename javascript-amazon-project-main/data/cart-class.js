const CART_STORAGE_KEY = 'cart';

export class Carts {
	constructor() {
		this._cartItems = [];
	}

	get cartItems() {
		return this._cartItems;
	}

	set cartItems(value) {
		this._cartItems.splice(0, this._cartItems.length, ...value);
	}

	loadFromStorage() {
		const storedCart = localStorage.getItem(CART_STORAGE_KEY);
		this.cartItems = storedCart ? JSON.parse(storedCart) : [{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
			deliveryOptionId: '1'
		}, {
			productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			quantity: 1,
			deliveryOptionId: '1'
		}];
	}

	saveToStorage() {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
	}

	addToCart(productId, quantity) {
		let matchingCartItem;

		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				matchingCartItem = cartItem;
			}
		});

		if (matchingCartItem) {
			matchingCartItem.quantity += quantity;
		} else {
			this.cartItems.push({
				productId,
				quantity,
				deliveryOptionId: '1'
			});
		}

		this.saveToStorage();
	}

	removeFromCart(productId) {
		const newCartItems = [];

		this.cartItems.forEach((cartItem) => {
			if (cartItem.productId !== productId) {
				newCartItems.push(cartItem);
			}
		});

		this.cartItems = newCartItems;
		this.saveToStorage();
	}

	updateDeliveryOption(productId, deliveryOptionId) {
		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				cartItem.deliveryOptionId = deliveryOptionId;
			}
		});

		this.saveToStorage();
	}
}

export const carts = new Carts();
export const cart = carts.cartItems;

export function loadFromStorage() {
	carts.loadFromStorage();
}

export function addToCart(productId, quantity) {
	carts.addToCart(productId, quantity);
}

export function removeFromCart(productId) {
	carts.removeFromCart(productId);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
	carts.updateDeliveryOption(productId, deliveryOptionId);
}

carts.loadFromStorage();

 