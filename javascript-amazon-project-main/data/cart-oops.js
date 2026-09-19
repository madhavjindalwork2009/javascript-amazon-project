export const cart = [];
const CART_STORAGE_KEY = 'cart';

export const carts = {
	get cartItems() {
		return cart;
	},
	set cartItems(value) {
		cart.splice(0, cart.length, ...value);
	},

	loadFromStorage() {
		const storedCart = localStorage.getItem(CART_STORAGE_KEY);
		this.cartItems = storedCart ? JSON.parse(storedCart) : [];
	},

	saveToStorage() {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
	},

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
	},

	removeFromCart(productId) {
		const newCartItems = [];

		this.cartItems.forEach((cartItem) => {
			if (cartItem.productId !== productId) {
				newCartItems.push(cartItem);
			}
		});

		this.cartItems = newCartItems;
		this.saveToStorage();
	},

	updateDeliveryOption(productId, deliveryOptionId) {
		this.cartItems.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				cartItem.deliveryOptionId = deliveryOptionId;
			}
		});

		this.saveToStorage();
	}
};

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

 