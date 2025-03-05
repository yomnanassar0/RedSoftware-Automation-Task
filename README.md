# RedSoftware-Automation Testing - WebdriverIO & Cucumber

This project automates the testing of an **e-commerce platform** using **WebdriverIO with Cucumber**. It covers key functionalities like **product browsing, shopping cart operations, and checkout process validation**.

---

##  Setup Instructions

###  Install Dependencies
Ensure **Node.js** is installed, then run:

npm install

## Test Scenarios Covered

### use case file is uploaded

### **Product Catalog**
-  **View Product Categories**: Verify that selecting a category displays the correct subcategories.
-  **View Product Details**: Ensure that clicking a product shows the correct details.
-  **Sort Products by Price**: Validate sorting functionality (e.g., Low to High).

### **Shopping Cart**
-  **Add a Product to Cart**: Ensure products are added successfully.
-  **Update Cart Quantity**: Verify price updates correctly after modifying item quantity.
-  **Remove Product from Cart**: Ensure cart reflects removal of an item.

### **Checkout Process**
- **Successful Checkout**: Validate checkout with valid shipping & payment details.
- **Validation for Empty Checkout Form**: Ensure users cannot proceed with missing details.

## Running Tests

To execute the test cases, use the following commands:

### Test Execution 
1- Run all feature files:  
- npx wdio wdio.conf.js

2- Run specific feature file:  
- npx wdio wdio.conf.js --spec ./features/your-feature-file.feature

### Generating a report 
- allure generate allure-results --clean
- allure open

