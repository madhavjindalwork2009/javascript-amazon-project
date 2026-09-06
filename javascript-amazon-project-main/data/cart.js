export const cart = [];

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
