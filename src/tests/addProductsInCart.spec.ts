import test from "@playwright/test";
import HomePage from "../pageObjects/home_page";
import ProductsPage from "../pageObjects/products_page";
import CartPage from "../pageObjects/cart_page";

test.describe("Add Products", () => {
    let homePage: HomePage;
    let productsPage : ProductsPage;
    let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      productsPage = new ProductsPage(page);
      cartPage = new CartPage(page);
    await page.goto("/");
  });

  test("Test Case 12: Add Products In Cart", async ({ page }) => {
    await homePage.navigateToProductsPage();

    const listOfProducts = await productsPage.getProductsListResult();

    // Add first product to cart
    const product1 = await listOfProducts[0]
    await productsPage.addProductToCart(product1.element);
    await productsPage.clickContinueShoppingButton();

    // Add second product to cart
    const product2 = await listOfProducts[1]
    await productsPage.addProductToCart(product2.element);

    await productsPage.goToCartPage();

    await cartPage.validateCartItems([
        { name: product1.name, price: product1.price, quantity: 1, total: product1.price },
        { name: product2.name, price: product2.price, quantity: 1, total: product2.price }
    ]);

  });
});