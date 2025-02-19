import { Page, Locator } from "@playwright/test";
import { clickElement } from "../utils/utils";
import * as allure from "allure-js-commons";

class HomePage {
    private productsNavBarButton: Locator;

    constructor(page: Page) {
        this.productsNavBarButton = page.getByRole("link", { name: "Products" });
    }

    async navigateToProductsPage() {
        await allure.step("Navigating to Products page", async () => {
            await clickElement(this.productsNavBarButton);
        });
    }
}

export default HomePage;