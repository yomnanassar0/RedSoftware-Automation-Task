import { $, $$, browser, expect } from '@wdio/globals';
import { faker } from '@faker-js/faker';

class CheckoutPage {
    emailInput = () => $(`(//input[@id='customer-email'])[1]`);
    firstName = () => $(`input[name="firstname"]`);
    lastName = () => $(`input[name="lastname"]`);
    street = () => $(`input[name="street[0]"]`);
    city = () => $(`input[name="city"]`);
    countryDropdown = () => $(`select[name="country_id"]`);
    phoneNo = () => $(`input[name="telephone"]`);
    proceedToPaymentButton = () => $(`button.action.continue.primary`);
    placeOrderButton = () => $(`button[title='Place Order']`);
    orderConfirmationMessage = () => $(`span.base`);

    async proceedToCheckout() {
        await $(`#top-cart-btn-checkout`).click();
        await browser.pause(2000);
    }

    async fillCheckoutForm() {
        await (await this.countryDropdown()).selectByVisibleText("United Kingdom");
        await (await this.emailInput()).setValue(faker.internet.email());
        await (await this.firstName()).setValue(faker.person.firstName());
        await (await this.lastName()).setValue(faker.person.lastName());
        await (await this.street()).setValue(faker.location.streetAddress());
        await (await this.city()).setValue(faker.location.city());
        await (await this.phoneNo()).setValue(faker.phone.number('+44 #### ######'));
        await browser.pause(2000);
    }

    async proceedToPayment() {
        await (await this.proceedToPaymentButton()).click();
    }

    async placeOrder() {
        await browser.pause(2000);
        await (await this.placeOrderButton()).click();
    }

    async orderValidation() {
        await browser.pause(5000);
        const actualText = await (await this.orderConfirmationMessage()).getText();
        expect(actualText).toEqual("Thank you for your purchase!");
    }

    async validateEmptyCheckoutForm() {
        await this.proceedToPayment();
        await this.validateRequiredFields();
    }

    async selectPriceSpan(price) {
        const priceElement = await $(`//span[@class='price' and text()='${price}']`);
        await priceElement.click();
    }
    
    
    async validateRequiredFields() {
        await this.selectPriceSpan("$5.00");
        await browser.pause(2000);
        await this.proceedToPayment();
        const requiredDivError = await $(`//div[text()='This is a required field.']`);
        const requiredSpanErrors = await $$(`//span[text()='This is a required field.']`);
        
        expect(requiredSpanErrors.length).toEqual(7);
        expect(await requiredDivError.getText()).toEqual("This is a required field.");

        for (const error of requiredSpanErrors) {
            expect(await error.getText()).toEqual("This is a required field.");
        }
    }



}

module.exports = new CheckoutPage();
