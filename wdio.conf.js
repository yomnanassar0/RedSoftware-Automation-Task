exports.config = {
    runner: 'local',

    specs: ['./features/**/*.feature'], 

    exclude: [],

    maxInstances: 1, 

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: []
        }
    }],

    logLevel: 'info',

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['chromedriver'],

    framework: 'cucumber',

    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results' }]
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: true,
        tagExpression: '',
        timeout: 90000,
        ignoreUndefinedDefinitions: false
    },

    beforeScenario: async () => {
        await browser.url('https://magento.softwaretestingboard.com');
        await browser.deleteSession();
        await browser.reloadSession();
        await browser.refresh(); // Ensures the page resets before each scenario
    }
};