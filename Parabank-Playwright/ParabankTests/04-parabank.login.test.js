const { test, expect } = require('@playwright/test');
import {CUSTOMER_LOGIN, FOOTER_MENU, LEFT_MENU, MAIN_PANEL_BUTTONS, READ_MORE, SERVICES_MENU} from './locators-HomePage.js'
import { localHost, THROW, ACCOUNT, REG_FORM } from './locators-Base.js';
const fs = require('fs');
//import { my_username } from './parabank.register.test.js';
function generateUsername(baseName, number) {
    let paddedNumber = String(number).padStart(4, '0');
   
    return `${baseName}${paddedNumber}`;
}

// Пример за използване:
let my_username = generateUsername('evgeni', Math.floor(Math.random() * 999) + 1);

test.describe('LOGIN TESTS', () => {
    test('Register and login with my_username - REGISTER', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
        await page.click(REG_FORM.FIRST_NAME);
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
        await page.click(REG_FORM.LAST_NAME);
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
        await page.click(REG_FORM.ADDRESS);
        await page.fill(REG_FORM.ADDRESS, 'Poduene');
        await page.click(REG_FORM.CITY);
        await page.fill(REG_FORM.CITY, 'Sofia');
        await page.click(REG_FORM.STATE);
        await page.fill(REG_FORM.STATE, 'BG');
        await page.click(REG_FORM.ZIP_CODE);
        await page.fill(REG_FORM.ZIP_CODE, '1000');
        await page.click(REG_FORM.PHONE_NUMBER);
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
        await page.click(REG_FORM.SSN);
        await page.fill(REG_FORM.SSN, '911240000');
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, my_username) // Използвай променливата my_username
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);
        await page.waitForSelector(ACCOUNT.welcome_msg, { state: 'visible' });
        await page.waitForSelector(ACCOUNT.created, { state: 'visible' });
        fs.writeFileSync('username.json', JSON.stringify({ username: my_username }));
        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Register and login with my_username - LOGIN', async ({ page }) => {
      
    await page.goto(localHost);
    // const data = JSON.parse(fs.readFileSync('username.json'));
    // const my_username = data.username;
    await page.fill(CUSTOMER_LOGIN.USERNAME, my_username);
    await page.fill(CUSTOMER_LOGIN.PASSWORD, '1234');
    await page.click(CUSTOMER_LOGIN.LOGIN_BUTTON);
    await page.waitForTimeout(1000);
    await page.waitForSelector(ACCOUNT.overview, { state: 'visible' });
    await expect(page.locator(ACCOUNT.overview)).toHaveText('Accounts Overview');
    await page.waitForTimeout(1000);
    await page.context().close();

    }) 
    test('The invalid username unsuccessfully logs us in', async ({ page }) => {
    await page.goto(localHost);
    await page.fill(CUSTOMER_LOGIN.USERNAME, 'evgen');
    await page.fill(CUSTOMER_LOGIN.PASSWORD, '1234');
    await page.click(CUSTOMER_LOGIN.LOGIN_BUTTON);
    await page.waitForTimeout(1000);
    await page.waitForSelector(THROW.error, { state: 'visible' });
    await page.waitForSelector(THROW.internal_error_message, { state: 'visible' });
    await expect(page.locator(THROW.error)).toHaveText('Error!');
    await expect(page.locator(THROW.internal_error_message)).toHaveText('The username and password could not be verified.');
    await page.context().close(); 
    })
    test('The invalid password with valid user unsuccessfully logs us in', async ({ page }) => {
    await page.goto(localHost);
    await page.fill(CUSTOMER_LOGIN.USERNAME, 'evgeni');
    await page.fill(CUSTOMER_LOGIN.PASSWORD, '12345678');
    await page.click(CUSTOMER_LOGIN.LOGIN_BUTTON);
    await page.waitForTimeout(1000);
    await expect(page.locator(THROW.error)).toHaveText('Error!');
    await expect(page.locator(THROW.empty_userOrPass_message)).toHaveText('The username and password could not be verified.');
    await page.context().close(); 
    })

    test('An empty password with a valid user is an unsuccessful login.', async ({ page }) => {
    await page.goto(localHost);
    await page.fill(CUSTOMER_LOGIN.USERNAME, 'evgeni');
    await page.fill(CUSTOMER_LOGIN.PASSWORD, '');
    await page.click(CUSTOMER_LOGIN.LOGIN_BUTTON);
    await page.waitForTimeout(1000);
    await expect(page.locator(THROW.error)).toHaveText('Error!');
    await expect(page.locator(THROW.empty_userOrPass_message)).toHaveText('Please enter a username and password.');
    await page.context().close(); 
    })
    test('An empty username is an unsuccessful login', async ({ page }) => {
    await page.goto(localHost);
    await page.fill(CUSTOMER_LOGIN.USERNAME, '');
    await page.fill(CUSTOMER_LOGIN.PASSWORD, '1234');
    await page.click(CUSTOMER_LOGIN.LOGIN_BUTTON);
    await page.waitForTimeout(1000);
    await expect(page.locator(THROW.error)).toHaveText('Error!');
    await expect(page.locator(THROW.empty_userOrPass_message)).toHaveText('Please enter a username and password.');
    await page.context().close(); 
    })    
})
