import { expect, Locator, Page } from "@playwright/test";
import { 
    clickElement, 
    enterText, 
    verifyTextEquals, 
    getAllElements, 
    verifyGreaterThan 
} from "../utils/utils";

import * as allure from "allure-js-commons";

class ProductsPage {
    private searchInput: Locator;
    private searchButton: Locator;
    private productsListTitle: Locator;
    private product: Locator;
    private productDetails: Locator;
    
    // Modal Elements
    private modalTitle: Locator;
    private modalBody: Locator;
    private viewCartLink: Locator;
    private continueShoppingButton: Locator;

    constructor(page: Page) {
        this.searchInput = page.locator("#search_product");
        this.searchButton = page.locator("#submit_search");
        this.productsListTitle = page.locator('h2[class*="title"]');
        this.product = page.locator(".productinfo");
        this.continueShoppingButton = page.locator(".btn-success");
        this.modalTitle = page.locator(".modal-title");
        this.modalBody = page.locator(".modal-body p").first();
        this.viewCartLink = page.locator(".modal-dialog a[href='/view_cart']");
        this.productDetails = page.locator("a[href*='/product_details/']");
    }

    async searchForProduct(productName: string) {
        await allure.step(`Searching for product ${productName}`, async () => {
            await enterText(this.searchInput, productName);
            await clickElement(this.searchButton);
            await verifyTextEquals(this.productsListTitle, "Searched Products");
        });
    }

    async validateProductsPageTitle(title: string) {
        await allure.step(`Validating products page title is ${title}`, async () => {
            await verifyTextEquals(this.productsListTitle, title);
        });
    }

    async getProductsListResult(): Promise<{ name: string; price: number; element: Locator }[]> {
        const productElements = await getAllElements(this.product);
        const products: { name: string; price: number; element: Locator }[] = [];

        for (const product of productElements) {
            const name = await product.locator("p").textContent();
            const priceText = await product.locator("h2").textContent();
            const price = parseFloat(priceText?.replace("Rs. ", "") || "0");

            products.push({ 
                name: name?.trim() || "", 
                price, 
                element: product 
            });
        }

        return products;
    }

    async validateListProductsResult(productName: string) {
        await allure.step(`Validating list of products result for ${productName}`, async () => {
            const products = await this.getProductsListResult();
            const matchingProducts = products.filter((p) => p.name.includes(productName));

            verifyGreaterThan(matchingProducts.length, 0);
        });
    }

    async addProductToCart(product: Locator) {
        await allure.step(`Adding product: ${product.toString()} to cart`, async () => {
            await clickElement(product.locator('a[class*="btn btn-default add-to-cart"]'));
            await this.verifyProductAddedToCartModalIsVisible();
        });
    }

    async verifyProductAddedToCartModalIsVisible() {
        await allure.step("Verifying product added to cart modal is visible", async () => {
            await verifyTextEquals(this.modalTitle, "Added!");
            await verifyTextEquals(this.modalBody, "Your product has been added to cart.");
            await verifyTextEquals(this.viewCartLink, "View Cart");
            await expect(this.continueShoppingButton).toBeVisible();
        });
    }

    async clickContinueShoppingButton() {
        await allure.step("Clicking continue shopping button", async () => {
            await clickElement(this.continueShoppingButton);
        });
    }

    async goToCartPage() {
        await allure.step("Navigating to cart page", async () => {
            await clickElement(this.viewCartLink);
        });
    }

    async viewRandomProductDetails() {
        const productLinks = await getAllElements(this.productDetails);
        const randomIndex = Math.floor(Math.random() * productLinks.length);

        if (productLinks.length === 0) {
            throw new Error("No product details links found.");
        }

        await allure.step(`Navigating to the product details page`, async () => {
            await clickElement(productLinks[randomIndex]);
        });
    }
}

export default ProductsPage;