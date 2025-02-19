import { Locator, Page } from "@playwright/test";
import { 
    enterText, 
    clickElement, 
    getTextContent 
} from "../utils/utils";

import * as allure from "allure-js-commons";

class ProductDetailsPage {
    private productTitle: Locator;
    private quantityInput: Locator;
    private addToCartButton: Locator;
    private viewCartButton: Locator;
    private productPrice: Locator;

    constructor(page: Page) {
        this.productTitle = page.locator(".product-information h2");
        this.quantityInput = page.locator('input[name="quantity"]');
        this.productPrice = page.locator(".product-information span span");
        this.addToCartButton = page.locator('button[class*="btn btn-default cart"]');
        this.viewCartButton = page.locator('a[href="/view_cart"]');
    }

    async updateProductQuantity(quantity: number) {
        await allure.step("Updating product quantity", async () => {
            await enterText(this.quantityInput, quantity.toString());
        });
    }

    async addProductToCart() {
        await allure.step("Adding product to cart", async () => {
            await clickElement(this.addToCartButton);
        });
    }

    async navigateToCart() {
        await allure.step("Navigating to Cart page", async () => {
            await clickElement(this.viewCartButton);
        });
    }

    async getProductName(): Promise<string> {
        return await getTextContent(this.productTitle);
    }

    async updateProductPrice(): Promise<number> {
        const priceText = await getTextContent(this.productPrice);
        return parseFloat(priceText.replace("Rs. ", ""));
    }
}

export default ProductDetailsPage;