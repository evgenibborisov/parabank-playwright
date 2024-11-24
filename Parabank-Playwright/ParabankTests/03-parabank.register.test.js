const { test, expect } = require('@playwright/test');
import {CUSTOMER_LOGIN, FOOTER_MENU, LEFT_MENU, MAIN_PANEL_BUTTONS, READ_MORE, SERVICES_MENU} from './locators-HomePage.js'
import { localHost, THROW, ACCOUNT, REG_FORM, REG_ERROR } from './locators-Base.js';
const fs = require('fs');
function generateUsername(baseName, number) {
    let paddedNumber = String(number).padStart(6, '0');
   
    return `${baseName}${paddedNumber}`;
}

// Пример за използване:
let my_username = generateUsername('evgeni', Math.floor(Math.random() * 999) + 1);
test.describe('Register TESTS', () => {
 
    test('Successful RANDOM registration', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
        await page.fill(REG_FORM.USERNAME, my_username); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');
    
        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

    
        // Проверка за съобщения за успешно създаден акаунт
        await page.waitForSelector(ACCOUNT.welcome_msg, { state: 'visible' });
        await page.waitForSelector(ACCOUNT.created, { state: 'visible' });
        await expect(page.locator(ACCOUNT.welcome_msg)).toHaveText(`Welcome ${my_username}`);
        await expect(page.locator(ACCOUNT.created)).toHaveText('Your account was created successfully. You are now logged in.');
        fs.writeFileSync('username.json', JSON.stringify({ username: my_username }));
        // Изчакване преди затваряне на контекста
        await page.waitForTimeout(1000);
        await page.context().close();
    });
    // test('Successful registration', async ({ page }) => {
    //     await page.goto(localHost);
    //     await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    //     await page.click(REG_FORM.FIRST_NAME);
    //     await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
    //     await page.click(REG_FORM.LAST_NAME);
    //     await page.fill(REG_FORM.LAST_NAME, 'Borisov');
    //     await page.click(REG_FORM.ADDRESS);
    //     await page.fill(REG_FORM.ADDRESS, 'Poduene');
    //     await page.click(REG_FORM.CITY);
    //     await page.fill(REG_FORM.CITY, 'Sofia');
    //     await page.click(REG_FORM.STATE);
    //     await page.fill(REG_FORM.STATE, 'BG');
    //     await page.click(REG_FORM.ZIP_CODE);
    //     await page.fill(REG_FORM.ZIP_CODE, '1000');
    //     await page.click(REG_FORM.PHONE_NUMBER);
    //     await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
    //     await page.click(REG_FORM.SSN);
    //     await page.fill(REG_FORM.SSN, '911240000');
    //     await page.click(REG_FORM.USERNAME);
    //     await page.fill(REG_FORM.USERNAME, 'evgeni9112'); // Използвай променливата my_username
    //     await page.click(REG_FORM.PASSWORD);
    //     await page.fill(REG_FORM.PASSWORD, '1234');
    //     await page.click(REG_FORM.REPASSWORD);
    //     await page.fill(REG_FORM.REPASSWORD, '1234');
    //     await page.click(REG_FORM.REGISTER_BUTTON);
    //     await page.waitForSelector(ACCOUNT.welcome_msg, { state: 'visible' });
    //     await page.waitForSelector(ACCOUNT.created, { state: 'visible' });
    //     await page.waitForTimeout(1000);
    //     await page.context().close();
    // });
    test('Successful registration - without phone number.', async ({ page }) => {
        //console.log("BUG_1 -> Succesful reg without phone number")
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
    
        // await page.click(REG_FORM.PHONE_NUMBER);
        // await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
    
        await page.click(REG_FORM.SSN);
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, `${my_username}2024`); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(ACCOUNT.welcome_msg, { state: 'visible' });
        await page.waitForSelector(ACCOUNT.created, { state: 'visible' });
        await expect(page.locator(ACCOUNT.welcome_msg)).toHaveText(`Welcome ${my_username}2024`);
        await expect(page.locator(ACCOUNT.created)).toHaveText('Your account was created successfully. You are now logged in.');
        fs.writeFileSync('username.json', JSON.stringify({ username: my_username }));
        // Изчакване преди затваряне на контекста
        await page.waitForTimeout(1000);
        await page.context().close();

   
    });
test('Successful registration - with wrong SSN.SSN is a nine-digit number in format XXX-XX-XXXX', async ({ page }) => {
        //console.log("BUG_2 -> Succesful reg with wrong SNN")
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
        await page.fill(REG_FORM.SSN, '1234567890');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, `${my_username}2025`); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(ACCOUNT.welcome_msg, { state: 'visible' });
        await page.waitForSelector(ACCOUNT.created, { state: 'visible' });
        await expect(page.locator(ACCOUNT.welcome_msg)).toHaveText(`Welcome ${my_username}2025`);
        await expect(page.locator(ACCOUNT.created)).toHaveText('Your account was created successfully. You are now logged in.');
        fs.writeFileSync('username.json', JSON.stringify({ username: my_username }));
        // Изчакване преди затваряне на контекста
        await page.waitForTimeout(1000);
        await page.context().close();

   
    });
    test('Unsuccessful registration - missing username.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
    
        // await page.click(REG_FORM.USERNAME);
        // await page.fill(REG_FORM.USERNAME, 'non_evgeni71'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.username_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.username_error_message)).toHaveText('Username is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - uncofirmed password', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni6'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        // await page.click(REG_FORM.REPASSWORD);
        // await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.repassword_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.repassword_error_message)).toHaveText('Password confirmation is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing password', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni62'); // Използвай променливата my_username
    
        // await page.click(REG_FORM.PASSWORD);
        // await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.password_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.password_error_message)).toHaveText('Password is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
 
    test('Unsuccessful registration - missing first name.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
        // await page.click(REG_FORM.FIRST_NAME);
        // await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
    
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
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni5'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.first_name_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.first_name_error_message)).toHaveText('First name is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing last name.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
        await page.click(REG_FORM.FIRST_NAME);
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
    
        // await page.click(REG_FORM.LAST_NAME);
        // await page.fill(REG_FORM.LAST_NAME, 'Borisov');
    
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
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni4'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.last_name_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.last_name_error_message)).toHaveText('Last name is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing address.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
        await page.click(REG_FORM.FIRST_NAME);
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
    
        await page.click(REG_FORM.LAST_NAME);
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
    
        // await page.click(REG_FORM.ADDRESS);
        // await page.fill(REG_FORM.ADDRESS, 'Poduene');
    
        await page.click(REG_FORM.CITY);
        await page.fill(REG_FORM.CITY, 'Sofia');
    
        await page.click(REG_FORM.STATE);
        await page.fill(REG_FORM.STATE, 'BG');
    
        await page.click(REG_FORM.ZIP_CODE);
        await page.fill(REG_FORM.ZIP_CODE, '1000');
    
        await page.click(REG_FORM.PHONE_NUMBER);
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
    
        await page.click(REG_FORM.SSN);
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni3'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.address_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.address_error_message)).toHaveText('Address is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing city.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
        await page.click(REG_FORM.FIRST_NAME);
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
    
        await page.click(REG_FORM.LAST_NAME);
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
    
        await page.click(REG_FORM.ADDRESS);
        await page.fill(REG_FORM.ADDRESS, 'Poduene');
    
        // await page.click(REG_FORM.CITY);
        // await page.fill(REG_FORM.CITY, 'Sofia');
    
        await page.click(REG_FORM.STATE);
        await page.fill(REG_FORM.STATE, 'BG');
    
        await page.click(REG_FORM.ZIP_CODE);
        await page.fill(REG_FORM.ZIP_CODE, '1000');
    
        await page.click(REG_FORM.PHONE_NUMBER);
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
    
        await page.click(REG_FORM.SSN);
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni2'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.city_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.city_error_message)).toHaveText('City is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing state.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
        await page.click(REG_FORM.FIRST_NAME);
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
    
        await page.click(REG_FORM.LAST_NAME);
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
    
        await page.click(REG_FORM.ADDRESS);
        await page.fill(REG_FORM.ADDRESS, 'Poduene');
    
        await page.click(REG_FORM.CITY);
        await page.fill(REG_FORM.CITY, 'Sofia');
    
        // await page.click(REG_FORM.STATE);
        // await page.fill(REG_FORM.STATE, 'BG');
    
        await page.click(REG_FORM.ZIP_CODE);
        await page.fill(REG_FORM.ZIP_CODE, '1000');
    
        await page.click(REG_FORM.PHONE_NUMBER);
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
    
        await page.click(REG_FORM.SSN);
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni1'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.state_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.state_error_message)).toHaveText('State is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing ZIP code.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
    
        // await page.click(REG_FORM.ZIP_CODE);
        // await page.fill(REG_FORM.ZIP_CODE, '1000');
    
        await page.click(REG_FORM.PHONE_NUMBER);
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
    
        await page.click(REG_FORM.SSN);
        await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni7'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.zip_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.zip_error_message)).toHaveText('Zip Code is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
    test('Unsuccessful registration - missing SSN.', async ({ page }) => {
        await page.goto(localHost);
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
    
        // Кликване и попълване на всяко поле
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
    
        // await page.click(REG_FORM.SSN);
        // await page.fill(REG_FORM.SSN, '9112400000');
    
        await page.click(REG_FORM.USERNAME);
        await page.fill(REG_FORM.USERNAME, 'non_evgeni71'); // Използвай променливата my_username
    
        await page.click(REG_FORM.PASSWORD);
        await page.fill(REG_FORM.PASSWORD, '1234');

        await page.click(REG_FORM.REPASSWORD);
        await page.fill(REG_FORM.REPASSWORD, '1234');

        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.waitForSelector(REG_ERROR.ssn_error_message, { state: 'visible' });
        await expect(page.locator(REG_ERROR.ssn_error_message)).toHaveText('Social Security Number is required.');

        await page.waitForTimeout(1000);
        await page.context().close();
    });
   
});
