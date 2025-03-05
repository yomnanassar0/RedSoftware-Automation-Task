import { $, $$, browser, expect } from '@wdio/globals';

let qty;

// Locators
const getAddToCartButton = () => $(`#product-addtocart-button`);
const getSuccessMessage = () => $(`div[data-bind='html: $parent.prepareMessageForHtml(message.text)']`);
const getShowCartButton = () => $(`a.action.showcart`);
const getQuantityInput = () => $(`.cart-item-qty`);
const getUpdateCartButton = () => $(`.update-cart-item`);
const getPriceElement = () => $(`span[data-label='Excl. Tax']`);
const getSubtotalElement = () => $(`.amount.price-container`);
const getRemoveFromCartButton = () => $(`a.action.delete`);
const getConfirmRemoveButton = () => $(`button.action-primary.action-accept`);
const getEmptyCartMessage = () => $(`.subtitle.empty`);

class ShoppingCart {

    async addToCart() {
        await getAddToCartButton().click();
    }

    async addToCartValidation() {
        const element = await getSuccessMessage();
        const actualText = await element.getText();
        expect(actualText).toContain("added");
        await browser.pause(1000);
    }

    async showCart() {
        await browser.pause(2000);
        await getShowCartButton().click();
    }

    async updateCart(QtyVal) {
        qty = QtyVal;
        const qtyInput = await getQuantityInput();
        await browser.execute("arguments[0].value = '';", qtyInput);
        await qtyInput.setValue(QtyVal);
        await getUpdateCartButton().click();
    }

    async UpdateCartValidation() {
        const qtyInput = await getQuantityInput();
        console.log("Extracted quantity:", qtyInput);

        const priceElement = await getPriceElement();
        const priceText = await priceElement.getText();
        const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        console.log("Extracted price:", priceValue);
        await browser.pause(2000);

        const subtotalElement = await getSubtotalElement();
        const subtotalText = await subtotalElement.getText();
        const expectedSubtotal = qty * priceValue;

        expect(subtotalText).toContain(String(expectedSubtotal));
    }

    async removeFromCart() {
        await getRemoveFromCartButton().click();
        await getConfirmRemoveButton().click();
        await browser.pause(2000);
    }

    async removeFromCartValidation() {
        const emptyCartMsg = await getEmptyCartMessage();
        const actualText = await emptyCartMsg.getText();
        expect(actualText).toContain("no items");
    }
}

module.exports = new ShoppingCart();
