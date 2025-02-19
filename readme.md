Playwright Automation Challenge

📌 Overview

🔹 Technologies Used
	•	Playwright → Test Automation framework
	•	TypeScript → Programming Language
	•	Allure Reports → Generates detailed test execution reports
	•	Node.js

📂 Project Structure

/automation-challenge
│── /pageObjects
│   │── home_page.ts
│   │── products_page.ts
│   │── productDetails_page.ts
│   │── cart_page.ts
│── /utils
│   │── automation_utils.ts
│── tests/
│   │── addProductsInCart.spec.spec.ts
│   │── searchProduct.spec.spec.ts
│   │── verifyProductQuantityInCart.spec.ts
│── package.json
│── playwright.config.ts
│── README.md

📜 Implemented Features

✅ Page Object Model (POM)
	•	HomePage.ts → Handles navigation to the Products page.
	•	ProductsPage.ts → Searches products, selects a random product, adds to cart.
	•	ProductDetailsPage.ts → Updates product quantity, retrieves name & price, adds product to cart.
	•	CartPage.ts → Validates cart contents, ensures correct product info.

✅ Utility Functions (utils.ts)
	•	Common actions:
	•	clickElement(locator)
	•	enterText(locator, text)
	•	getTextContent(locator)
	•	assertEqual(actual, expected, errorMessage?)
	•	verifyGreaterThan(value, expected)
	•	getAllElements(locator)

🚀 How to Run Tests

1️⃣ Install Dependencies

npm install

2️⃣ Run Playwright Tests

npm test