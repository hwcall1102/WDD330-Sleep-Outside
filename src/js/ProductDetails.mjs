import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> 
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Render product details
    this.renderProductDetails("main");

    // Attach event listener to manually added button
    setTimeout(() => {
      const addToCartButton = document.getElementById("addToCart");
  
      if (addToCartButton) {
        addToCartButton.disabled = false; // Enable the button
        addToCartButton.addEventListener("click", this.addToCart.bind(this));
      }
    }, 100);
  }

  addToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    
    // Add new product
    cartItems.push(this.product);

    // Save updated cart to localStorage
    setLocalStorage("so-cart", cartItems);

  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }
}