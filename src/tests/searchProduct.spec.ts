import test from "@playwright/test";
import HomePage from "../pageObjects/home_page";
import ProductsPage from "../pageObjects/products_page";

test.describe("Search Product", () => {
    let homePage: HomePage;
    let productsPage : ProductsPage;
    const productName: string = 'Saree';

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
  });

  test("Test Case 9: Search for a product", async ({ page }) => {
    

    await homePage.navigateToProductsPage();

    await productsPage.validateProductsPageTitle('All Products');

    await productsPage.searchForProduct(productName);

    await productsPage.validateListProductsResult(productName);
  });
});