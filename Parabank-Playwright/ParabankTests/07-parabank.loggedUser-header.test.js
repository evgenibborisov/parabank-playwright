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

test.describe('Header Form Tests', () => {
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
    test.only('Home Button', async ({ page }) => {
        await page.goto(localHost);
        //await page.waitForTimeout(2000)
        await page.click(HEADER_MENU.HOME_BUTTON);
        //await page.waitForTimeout(2000)
        await expect(page).toHaveURL(localHost);
    })
    test.only('About Button', async ({ page }) => {
        await page.goto(localHost);
        //await page.waitForTimeout(2000)
        await page.click(HEADER_MENU.ABOUT_BUTTON);
        //await page.waitForTimeout(2000)
        await expect(page).toHaveURL(HEADER_MENU.ABOUT_BUTTON_URL);
        const parasoftWeb = 'https://www.parasoft.com';
        await expect(page.locator(HEADER_MENU.ABOUT_US_TITLE)).toBeVisible();
        await expect(page.locator(HEADER_MENU.ABOUT_US_TITLE)).toHaveText('ParaSoft Demo Website');
        await expect(page.locator(HEADER_MENU.ABOUT_US_REDIRECT)).toBeVisible();
        await expect(page.locator(HEADER_MENU.ABOUT_US_REDIRECT)).toHaveText('www.parasoft.com');
        await page.click(HEADER_MENU.ABOUT_US_REDIRECT);
        //await page.waitForTimeout(2000)
        await expect(page).toHaveURL(parasoftWeb);
    })
    test.only('Contact Button', async ({ page }) => {
        await page.goto(localHost);
        //await page.waitForTimeout(2000)
        await page.click(HEADER_MENU.CONTACT_BUTTON);
        //await page.waitForTimeout(2000)
        await expect(page).toHaveURL(HEADER_MENU.CONTACT_BUTTON_URL);
        await page.fill(HEADER_MENU.CUSTOMER_NAME, 'Evgeni');
        await page.fill(HEADER_MENU.CUSTOMER_EMAIL, 'testovimeil@bg.com');
        await page.fill(HEADER_MENU.CUSTOMER_PHONE, '0888 999 000');
        await page.fill(HEADER_MENU.CUSTOMER_MESSAGE, 'Aui mohur belit kamur');
        await page.click(HEADER_MENU.CUSTOMER_SEND_MESSAGE);
        await expect(page.locator(HEADER_MENU.CUSTOMER_THANK_YOU)).toHaveText('Thank you Evgeni');
    })

})