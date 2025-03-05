import { $, $$ } from '@wdio/globals';

const getCategoryElement = (categoryName) => $(`//span[contains(text(),'${categoryName}')]`);
const getSubcategoryElements = (categoryName) => $$(`//span[contains(text(),'${categoryName}')]/ancestor::li/ul[contains(@class, 'submenu')]/li[contains(@class, 'category-item')]`);
const getSubcategoryElement = (categoryName, subcategoryName) => $(`//span[contains(text(),'${categoryName}')]/ancestor::li//span[contains(text(),'${subcategoryName}')]`);
const getProductElement = (productName) => $(`//a[contains(@class, 'product-item-link') and contains(text(), '${productName}')]`);
const getProductNameElement = () => $(`span.base`);
const getSortDropdown = () => $('select.sorter-options');
const getPriceElements = () => $$('div.price-box.price-final_price span.price');

class CategoryPage {
    async hoverOverCategory(categoryName) {
        await getCategoryElement(categoryName).moveTo();
    }

    async areSubcategoriesDisplayed(categoryName) {
        const subcategories = await getSubcategoryElements(categoryName);
        return subcategories.length > 0;
    }

    async clickOnSubcategory(categoryName, subcategoryName) {
        const element = await getSubcategoryElement(categoryName, subcategoryName);
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
    }

    async clickOnProduct(productName) {
        await getProductElement(productName).click();
    }

    async getProductName() {
        return await getProductNameElement();
    }

    async selectSort(sortOption) {
        await getSortDropdown().selectByVisibleText(sortOption);
    }

    async sortIsValid() {
        const priceElements = await getPriceElements();
        let prices = [];

        for (const element of priceElements) {
            const priceText = await element.getText();
            const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            prices.push(priceValue);
        }

        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    }
}

module.exports = new CategoryPage();
