export let cart = [];

export function addToCart(productId, quantity) {
	let matchingCartItem;

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingCartItem = cartItem;
		}
	});

	if (matchingCartItem) {
		matchingCartItem.quantity += quantity;
	} else {
		cart.push({
			productId,
			quantity
		});
	}
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});

	cart = newCart;
}
