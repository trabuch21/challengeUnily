import {  Locator, Page } from "@playwright/test";
import { getTextContent, getAllElements, assertEqual } from "../utils/utils";


class CartPage {
    private cartTable: Locator;
    private cartItems: Locator;

    constructor(page: Page) {
        this.cartTable = page.locator("#cart_info_table");
        this.cartItems = this.cartTable.locator("tbody tr");
    }

    
    async getCartProducts(): Promise<{ name: string; price: number; quantity: number; total: number }[]> {
        const rows = await getAllElements(this.cartItems);
        const cartProducts: { name: string; price: number; quantity: number; total: number }[] = [];

        for (const row of rows) {
            const name = await getTextContent(row.locator(".cart_description"));
            const priceText = await getTextContent(row.locator(".cart_price"));
            const quantityText = await getTextContent(row.locator(".cart_quantity button"));
            const totalText = await getTextContent(row.locator(".cart_total"));

            cartProducts.push({
                name: name || "",
                price: parseFloat(priceText.replace("Rs. ", "") || "0"),
                quantity: parseInt(quantityText || "1"),
                total: parseFloat(totalText.replace("Rs. ", "") || "0")
            });
        }

        return cartProducts;
    }

    async validateCartItems(expectedProducts: { name: string; price: number; quantity: number; total: number }[]) {
        const cartProducts = await this.getCartProducts();

        for (const expectedProduct of expectedProducts) {
            const matchingProduct = cartProducts.find(p => p.name.includes(expectedProduct.name));

            assertEqual(matchingProduct!.price, expectedProduct.price, "Incorrect price");
            assertEqual(matchingProduct!.quantity, expectedProduct.quantity, "Incorrect quantity");
            assertEqual(matchingProduct!.total, expectedProduct.total, "Incorrect total price");
        }
    }
}

export default CartPage;