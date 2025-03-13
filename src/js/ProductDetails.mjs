import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${product.Image}"
            alt="${product.NameWithoutBrand}"
        />
        <p class="product-card_price">$${product.FinalPrice}</p>
        <p class="product_color">${product.Colors[0].ColorName}</p>
        <p class="product_description">
        ${product.DescriptoinHtmlSimple}
        </p>
        <div class="product-detail_add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }
    addToCart() {
        setLocalStorage("so-cart", this.product);
    }
    renderProductDetails(selector) {
        const element = document. querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }
}