import { cart, loadFromStorage, addToCart, clearCart } from '../../data/cart-oops.js';

describe('cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('adds a new product to the cart', () => {
    localStorage.getItem.and.returnValue(JSON.stringify([]));

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  it('starts empty when no cart is saved', () => {
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
  });

  it('adds an existing product to the cart', () => {
    localStorage.getItem.and.returnValue(JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('clears the cart and saved cart data', () => {
    localStorage.getItem.and.returnValue(JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));

    loadFromStorage();
    clearCart();

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
  });
});
