import test from "@playwright/test";
import HomePage from "../pageObjects/home_page";
import ProductsPage from "../pageObjects/products_page";
import CartPage from "../pageObjects/cart_page";
import ProductDetailsPage from "../pageObjects/productDetails_page";

test.describe("Product Quantity In Cart", () => {
    
  let homePage: HomePage;
    let productsPage : ProductsPage;
    let cartPage: CartPage;
    let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      productsPage = new ProductsPage(page);
      cartPage = new CartPage(page);
      productDetailsPage = new ProductDetailsPage(page);
    await page.goto("/");
  });

  test("Test Case 13: Verify Product Quantity In Cart", async ({ page }) => {
    const quantity = 4;
    await homePage.navigateToProductsPage();


    await productsPage.viewRandomProductDetails();

    const productName = await productDetailsPage.getProductName();
    const productPrice = await productDetailsPage.updateProductPrice();
    await productDetailsPage.updateProductQuantity(quantity);
    const totalPrice = productPrice * quantity;

    await productDetailsPage.addProductToCart();

    await productsPage.goToCartPage();

    await cartPage.validateCartItems([
        { name: productName, price: productPrice, quantity: quantity, total: totalPrice }
    ]);
  });
});