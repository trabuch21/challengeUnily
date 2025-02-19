# Playwright Automation Challenge

## 📌 Overview
This project is a **Playwright automation framework** designed to test an **e-commerce website**, focusing on:  
✅ **Product Search & Navigation**  
✅ **Product Details Verification**  
✅ **Cart Functionality**  
✅ **Assertions & Validations**  

It follows a **Page Object Model (POM)** for maintainability and uses **utility functions** to improve reusability and readability.  
Additionally, **Allure Reporting** is integrated for **test reporting & analysis**.

---

## 🔹 Technologies Used
- **[Playwright](https://playwright.dev/)** → Test Automation framework  
- **[TypeScript](https://www.typescriptlang.org/)** → Programming Language  
- **[Allure Reports](https://github.com/allure-framework/allure-js)** → Generates detailed test execution reports  
- **Node.js** → Runtime for executing Playwright scripts  

---

## 📂 Project Structure
```
/automation-challenge
│── /pageObjects
│   │── home_page.ts
│   │── products_page.ts
│   │── productDetails_page.ts
│   │── cart_page.ts
│── /utils
│   │── automation_utils.ts
│── /tests
│   │── addProductsInCart.spec.ts
│   │── searchProduct.spec.ts
│   │── verifyProductQuantityInCart.spec.ts
│── package.json
│── playwright.config.ts
│── README.md
```

## 📜 Implemented Features
### ✅ Page Object Model (POM)
- **`HomePage.ts`** → Handles navigation to the Products page.  
- **`ProductsPage.ts`** → Searches products, selects a random product, adds to cart.  
- **`ProductDetailsPage.ts`** → Updates product quantity, retrieves name & price, adds product to cart.  
- **`CartPage.ts`** → Validates cart contents, ensures correct product info.  

### ✅ Utility Functions (`utils.ts`)
- **Common actions:**  
  - `clickElement(locator)`
  - `enterText(locator, text)`
  - `getTextContent(locator)`
- **Assertions:**  
  - `assertEqual(actual, expected, errorMessage?)`
  - `verifyGreaterThan(value, expected)`
- **Element retrieval:**  
  - `getAllElements(locator)`

---

## 🚀 How to Run Tests
### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Run Playwright Tests
```sh
npm test
```