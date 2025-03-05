const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const HomePage = require("../pageobjects/homePage");
const CategoryPage = require("../pageobjects/categoryPage");
const ShoppingCart = require('../pageobjects/shoppingCartPage');
const CheckoutPage = require('../pageobjects/checkoutPage');

Given("the user is on the homepage", async function () {
    await HomePage.visit();
});

When("the user clicks on a category {string}", async function (category) {
    this.category = category;
    await CategoryPage.hoverOverCategory(category);
});

Then("the subcategories should be displayed correctly", async function () {
    const isDisplayed = await CategoryPage.areSubcategoriesDisplayed(this.category);
    expect(isDisplayed).toBe(true);
});

When("the user clicks on a subcategory {string}", async function (subcategory) {
    await CategoryPage.clickOnSubcategory(this.category, subcategory);
});

When("the user clicks on {string} product", async function (productName) {
    this.productName = productName;
    await CategoryPage.clickOnProduct(productName);
});

Then("the product details should be displayed", async function () {
    const productElement = await CategoryPage.getProductName();
    const actualText = await productElement.getText();
    expect(actualText).toEqual(this.productName);
});

When("the user sorts products by {string}", async function (sortOption) {
    await CategoryPage.selectSort(sortOption);
});

Then("the products should be displayed in correct order", async function () {
    await CategoryPage.sortIsValid();
});

When("the user clicks Add to Cart", async function () {
    await ShoppingCart.addToCart();
});

Then("the product should be added to the cart is displayed", async function () {
    await ShoppingCart.addToCartValidation();
});

When("the user clicks on cart", async function () {
    await ShoppingCart.showCart();
});

When("the user updates the quantity of the product to {string}", async function (QtyVal) {
    this.QtyVal = QtyVal;
    await ShoppingCart.updateCart(QtyVal);
});

Then("the total price should update accordingly", async function () {
    await ShoppingCart.UpdateCartValidation();
});

Then("the user removes item from cart", async function () {
    await ShoppingCart.removeFromCart();
});

Then("the product should be removed", async function () {
    await ShoppingCart.removeFromCartValidation();
});

Then("the user enters valid shipping and payment details", async function () {
    await CheckoutPage.proceedToCheckout();
    await CheckoutPage.fillCheckoutForm();
    await CheckoutPage.proceedToPayment();
});

Then("clicks Place Order", async function () {
    await CheckoutPage.placeOrder();
});

Then("the order should be successfully placed", async function () {
    await CheckoutPage.orderValidation();
});

Then("the user proceeds to checkout without filling the form", async function () {
    await CheckoutPage.proceedToCheckout();
});

Then("the user cannot be redirected to payment page", async function () {
    await CheckoutPage.validateEmptyCheckoutForm();
});
