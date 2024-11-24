const { test, expect, chromium } = require('@playwright/test');
import { CUSTOMER_LOGIN, FOOTER_MENU, LEFT_MENU, HEADER_MENU, READ_MORE, SERVICES_MENU } from './locators-HomePage.js';
import { localHost, THROW, ACCOUNT, REG_FORM } from './locators-Base.js';
import { SERVICES, RECEIVER,SENDER,TRANSACTIONS, loggedUrl } from './locators-LoggedUser.js';
const fs = require('fs');

// Функция за генериране на уникално потребителско име
function generateUsername() {
    const randomInteger = Math.floor(Math.random() * 1000) + 1;
    return `evgeni_${randomInteger}`;
}

let my_username;

test.describe('FOOTER TESTS FOR LOGGED USERS', () => {
    // Създаване на нова регистрация преди всеки тест
    test.beforeEach(async ({ page }) => {
        my_username = generateUsername();
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);

        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
        await page.fill(REG_FORM.ADDRESS, 'Poduene');
        await page.fill(REG_FORM.CITY, 'Sofia');
        await page.fill(REG_FORM.STATE, 'BG');
        await page.fill(REG_FORM.ZIP_CODE, '1000');
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
        await page.fill(REG_FORM.SSN, '911240000');
        await page.fill(REG_FORM.USERNAME, my_username);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);

        // Изчакайте съобщението за добре дошли
        await page.waitForSelector(ACCOUNT.welcome_msg, { state: 'visible' });
        await page.waitForSelector(ACCOUNT.created, { state: 'visible' });

        // Записване на потребителското име в JSON файл
        fs.writeFileSync('username.json', JSON.stringify({ username: my_username }));
    });

    test('About us - Functionality', async ({ page }) => {
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.ABOUT_US);
        
        const parasoftWeb = 'https://www.parasoft.com';
        await expect(page.locator(FOOTER_MENU.ABOUT_US_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.ABOUT_US_TITLE)).toHaveText('ParaSoft Demo Website');
        await expect(page.locator(FOOTER_MENU.ABOUT_US_REDIRECT)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.ABOUT_US_REDIRECT)).toHaveText('www.parasoft.com');
        
        await page.click(FOOTER_MENU.ABOUT_US_REDIRECT);
        await page.waitForTimeout(2000)
        await expect(page).toHaveURL(parasoftWeb);
      
    });

    test('Services - Functionality', async ({ page }) => {
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SERVICES);
        await expect(page.locator(FOOTER_MENU.SERVICES_TITLE)).toBeVisible();
        await page.waitForTimeout(2000)
        await expect(page.locator(FOOTER_MENU.SERVICES_TITLE)).toHaveText('Available Bookstore SOAP services:');
        
    });

    test('Products Redirect- Functionality', async ({ page }) => {
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.PRODUCTS);
        const parabankProducts = 'https://www.parasoft.com/products/';
        await expect(page).toHaveURL(parabankProducts);
        await expect(page.locator(FOOTER_MENU.PRODUCTS_PAGE_TITLE)).toBeVisible();
        
    });

    test('Locations Redirect- Functionality', async ({ page }) => {
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.LOCATIONS);
        const parabankLocations = 'https://www.parasoft.com/solutions/';
        await expect(page).toHaveURL(parabankLocations);
        await expect(page.locator(FOOTER_MENU.LOCATIONS_PAGE_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.LOCATIONS_PAGE_TITLE)).toHaveText('The Parasoft Continuous Quality Testing Platform: AI-Powered Test Automation Solutions');
       
    });
  

    test('Forums Redirect - Functionality', async ({ page }) => { 
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.FORUM);
        const parabankForum = 'https://forums.parasoft.com/';
        await expect(page).toHaveURL(parabankForum);
        
    })
    test('Site Map Redirects - Functionality', async ({ page }) => {
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_ABOUT_US)
        await expect(page.locator(FOOTER_MENU.ABOUT_US_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.ABOUT_US_TITLE)).toHaveText('ParaSoft Demo Website');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_SERVICES)
        await expect(page.locator(FOOTER_MENU.SERVICES_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SERVICES_TITLE)).toHaveText('Available Bookstore SOAP services:');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_PRODUCTS);
        const parabankProducts = 'https://www.parasoft.com/products/';
        await expect(page).toHaveURL(parabankProducts);
        await expect(page.locator(FOOTER_MENU.PRODUCTS_PAGE_TITLE)).toBeVisible();
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_LOCATIONS);
        const parabankLocations = 'https://www.parasoft.com/solutions/';
        await expect(page).toHaveURL(parabankLocations);
        await expect(page.locator(FOOTER_MENU.LOCATIONS_PAGE_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.LOCATIONS_PAGE_TITLE)).toHaveText('The Parasoft Continuous Quality Testing Platform: AI-Powered Test Automation Solutions');
       //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_ADMIN_PAGE);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_ADMIN_PAGE_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_ADMIN_PAGE_TITLE)).toHaveText('Administration');
        //add more options for testing 
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_OPEN_NEW_ACC);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_OPEN_NEW_ACC_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_OPEN_NEW_ACC_TITLE)).toHaveText('Open New Account');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_ACC_OVERVIEW);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_ACC_OVERVIEW_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_ACC_OVERVIEW_TITLE)).toHaveText('Accounts Overview');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_TRANSFER_FUNDS);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_TRANSFER_FUNDS_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_TRANSFER_FUNDS_TITLE)).toHaveText('Transfer Funds');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_BILL_PAY);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_BILL_PAY_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_BILL_PAY_TITLE)).toHaveText('Bill Payment Service');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_FIND_TRANSACTIONS);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_FIND_TRANSACTIONS_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_FIND_TRANSACTIONS_TITLE)).toHaveText('Find Transactions');
        //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_UPDATE_PROFILE_INFO);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_UPDATE_PROFILE_INFO_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_UPDATE_PROFILE_INFO_TITLE)).toHaveText('Update Profile');
         //add more options for testing
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.SITE_MAP);
        await page.click(FOOTER_MENU.SITE_MAP_REQUEST_LOAN);
        await expect(page.locator(FOOTER_MENU.SITE_MAP_REQUEST_LOAN_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.SITE_MAP_REQUEST_LOAN_TITLE)).toHaveText('Apply for a Loan');
         //add more options for testing
        // await page.goto(loggedUrl);
        // await page.waitForTimeout(2000)
        // await page.click(FOOTER_MENU.SITE_MAP);
        // await page.click(FOOTER_MENU.SITE_MAP_LOG_OUT);
        // await page.waitForTimeout(2000)
        // await expect(page.locator(SERVICES.USER)).toBeHidden();
        // await page.goto(localHost);
        // await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
        // await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
        // await page.fill(REG_FORM.LAST_NAME, 'Borisov');
        // await page.fill(REG_FORM.ADDRESS, 'Poduene');
        // await page.fill(REG_FORM.CITY, 'Sofia');
        // await page.fill(REG_FORM.STATE, 'BG');
        // await page.fill(REG_FORM.ZIP_CODE, '1517');
        // await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
        // await page.fill(REG_FORM.SSN, '911240000');
        // await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}-${randomInteger}`);
        // await page.fill(REG_FORM.PASSWORD, '1234');
        // await page.fill(REG_FORM.REPASSWORD, '1234');
        // await page.click(REG_FORM.REGISTER_BUTTON);


    });
    test('Contact us - Functionality', async ({ page }) => {
        await page.goto(loggedUrl);
        await page.click(FOOTER_MENU.CONTACT_US);
        
        const parasoftWeb = 'https://www.parasoft.com';
        await expect(page.locator(FOOTER_MENU.ABOUT_US_TITLE)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.ABOUT_US_TITLE)).toHaveText('ParaSoft Demo Website');
        await expect(page.locator(FOOTER_MENU.ABOUT_US_REDIRECT)).toBeVisible();
        await expect(page.locator(FOOTER_MENU.ABOUT_US_REDIRECT)).toHaveText('www.parasoft.com');
        
        await page.click(FOOTER_MENU.ABOUT_US_REDIRECT);
        await page.waitForTimeout(2000)
        await expect(page).toHaveURL(parasoftWeb);
      
    });
    // Изход от системата след всеки тест
    test.afterEach(async ({ page }) => {
        await page.goto(loggedUrl);
        await page.waitForSelector(SERVICES.LOG_OUT, { state: 'visible' });
        await page.click(SERVICES.LOG_OUT);
    });
});