import {cart, addToCart} from '../data/cart-oops.js';
import {products, loadProducts} from '../data/products.js';

loadProducts(renderProductsGrids);

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}

updateCartQuantity();

function renderProductsGrids(productsToRender = products) {
  let productsHTML = '';

  if (productsToRender.length === 0) {
    document.querySelector('.js-products-grid').innerHTML = `
      <div class="no-products-message">
        <h2>No products found</h2>
        <p>Try a different search term.</p>
      </div>
    `;
    return;
  }

  productsToRender.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsurl()}">

          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        ${product.extraInfoHTML()}

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantity = Number(
          button.closest('.product-container')
            .querySelector('select').value
        );

        addToCart(productId, quantity);
        updateCartQuantity();
      });
    });
}

function searchProducts() {
  const searchBar = document.querySelector('.search-bar');
  const searchTerm = searchBar.value.trim().toLowerCase();

  if (!searchTerm) {
    renderProductsGrids();
    return;
  }

  const matchingProducts = products.filter((product) => {
    const searchableText = [product.name, ...product.keywords].join(' ').toLowerCase();
    return searchableText.includes(searchTerm);
  });

  renderProductsGrids(matchingProducts);
}

document.querySelector('.search-button').addEventListener('click', searchProducts);
document.querySelector('.search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchProducts();
  }
});