const { browser } = require('@wdio/globals')

class HomePage {

    async visit() {
        await browser.url("https://magento.softwaretestingboard.com/"); 
    }

}

module.exports = new HomePage();

