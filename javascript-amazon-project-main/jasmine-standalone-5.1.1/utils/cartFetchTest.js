import { loadCartFetch } from '../../data/cart.js';

describe('cart fetch', () => {
  it('logs the cart response text', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      ok: true,
      text: () => Promise.resolve('cart response')
    }));
    spyOn(console, 'log');

    await loadCartFetch();

    expect(window.fetch).toHaveBeenCalledWith('https://supersimplebackend.dev/cart');
    expect(console.log).toHaveBeenCalledWith('cart response');
  });
});
