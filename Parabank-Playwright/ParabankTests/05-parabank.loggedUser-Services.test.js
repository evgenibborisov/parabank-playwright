const { test, expect, chromium } = require('@playwright/test');
import { CUSTOMER_LOGIN, FOOTER_MENU, LEFT_MENU, MAIN_PANEL_BUTTONS, READ_MORE, SERVICES_MENU } from './locators-HomePage.js';
import { localHost, THROW, ACCOUNT, REG_FORM } from './locators-Base.js';
import { SERVICES, RECEIVER,SENDER,TRANSACTIONS, loggedUrl } from './locators-LoggedUser.js';
const fs = require('fs');

function generateUsername(baseName, number) {
    let paddedNumber = String(number).padStart(4, '0');
    return `${baseName}${paddedNumber}`;
}

let my_username = generateUsername('evgeni', Math.floor(Math.random() * 999) + 1);
let browser;
let context;
let page;

test.describe('LOGGED USER - TESTS', () => {
    // Създаване на контекст и страница преди всички тестове
    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

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
        
        // Записване на името на потребителя в JSON файл
        fs.writeFileSync('username.json', JSON.stringify({ username: my_username }));
        
        // Изход от системата
        await page.click(SERVICES.LOG_OUT);
    });

    // Логин преди всеки тест
    test.beforeEach(async () => {
        await page.goto(localHost);
        await page.fill(CUSTOMER_LOGIN.USERNAME, my_username);
        await page.fill(CUSTOMER_LOGIN.PASSWORD, '1234');
        await page.click(CUSTOMER_LOGIN.LOGIN_BUTTON);
        
        // Изчакайте пренасочването след логин
        await page.waitForSelector(ACCOUNT.overview, { state: 'visible' });
    });

    test('OPEN NEW ACCOUNT - Checking Test', async () => {
        await page.goto(loggedUrl);
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Checking);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');
        await page.waitForTimeout(1000);
        // Допълнителни проверки
    });

    test('OPEN NEW ACCOUNT - Savings Test', async () => {
        await page.goto(loggedUrl);
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');
        await page.waitForTimeout(1000);
        // Допълнителни проверки
    });

    test('ACCOUNT OVERVIEW - Visibility and Text Content TESTS', async () => {
        await page.goto(loggedUrl);
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service);
        
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_Title)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_Title)).toHaveText('Accounts Overview');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_AccNum)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_AccNum)).toHaveText('Account');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_Balance)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_Balance)).toHaveText('Balance*');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_Amount)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_Amount)).toHaveText('Available Amount');

        await page.waitForTimeout(1000);
        // Допълнителни проверки
    });

    test('ACCOUNT OVERVIEW - Account Details Test', async () => {
        await page.goto(loggedUrl);
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');
        
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service);
        await page.click(SERVICES.ACCOUNT_OVERVIEW_LinkProfile_N1);
        
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TransactionTable)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Date)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Transaction)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Debit)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Credit)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Date)).toHaveText('Date');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Transaction)).toHaveText('Transaction');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Debit)).toHaveText('Debit (-)');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TT_Credit)).toHaveText('Credit (+)');
        
        await page.click(SERVICES.ACCOUNT_OVERVIEW_TT_FirstTransaction);
        
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Title)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Id)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Date)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Description)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Type)).toBeVisible();
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Ammount)).toBeVisible();
        
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Title)).toHaveText('Transaction Details');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Id)).toHaveText('Transaction ID:');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Date)).toHaveText('Date:');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Description)).toHaveText('Description:');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Type)).toHaveText('Type:');
        await expect(page.locator(SERVICES.ACCOUNT_OVERVIEW_TRANSACTION_INFO.Ammount)).toHaveText('Amount:');
        
        await page.waitForTimeout(1000);
    });
    test('TRANSFER FUNDS FROM FIRST TO SECOND ACCOUNT', async () => {
        await page.goto(loggedUrl);
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');
        
        await page.click(SERVICES.TRANSFER_FUNDS_Service);
        await page.click(SERVICES.TRANSFER_FUNDS_Amount);
        await page.fill(SERVICES.TRANSFER_FUNDS_Amount, '1');

        // Избиране на първата опция за 'From' акаунт
await page.selectOption(SERVICES.TRANSFER_FUNDS_From, { index: 0 });
// Избиране на втората опция за 'To' акаунт
await page.selectOption(SERVICES.TRANSFER_FUNDS_To, { index: 1 });

await page.click(SERVICES.TRANSFER_FUNDS_Button);
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Title)).toBeVisible();
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Text)).toBeVisible();
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Title)).toHaveText('Transfer Complete!');
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Text)).toContainText('$1.00 has been transferred from account');
await page.click(SERVICES.ACCOUNT_OVERVIEW_Service);
await page.click(RECEIVER.ACC);
await expect(page.locator(RECEIVER.ACC_BALANCE)).toHaveText('$101.00');


        await page.waitForTimeout(1000)
     });
     test('PAY BILL BY SECOND ACCOUNT', async () => {
let REGISTER_LINK = '#loginPanel > p:nth-child(3) > a'
        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
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
        await page.fill(REG_FORM.USERNAME, `${my_username}-NEW`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');    
        await page.click(SERVICES.BILL_PAY_Service);
        await page.fill(SERVICES.BILL_PAY_PayeeName, 'Evgeni')
        await page.fill(SERVICES.BILL_PAY_Address, 'Poduene')
        await page.fill(SERVICES.BILL_PAY_City, 'Sofia')
        await page.fill(SERVICES.BILL_PAY_State, 'Sofia-City')
        await page.fill(SERVICES.BILL_PAY_Zip, '1517')
        await page.fill(SERVICES.BILL_PAY_Phone, '0895266606')
        await page.fill(SERVICES.BILL_PAY_AccNum, '123456')
        await page.fill(SERVICES.BILL_PAY_AccNum_Conf, '123456')
        await page.fill(SERVICES.BILL_PAY_Amount, '10')
        await page.selectOption(SERVICES.BILL_PAY_Option, { index: 1 });
        await page.click(SERVICES.BILL_PAY_Button)
        await page.waitForTimeout(3000)
        await expect(page.locator(SERVICES.BILL_PAY_Completed.Title)).toBeVisible();
        await expect(page.locator(SERVICES.BILL_PAY_Completed.Text)).toBeVisible();
        await expect(page.locator(SERVICES.BILL_PAY_Completed.Title)).toHaveText('Bill Payment Complete');
        await expect(page.locator(SERVICES.BILL_PAY_Completed.Text)).toContainText('Bill Payment to Evgeni in the amount of $10.00 from account')
        await expect(page.locator(SERVICES.BILL_PAY_Completed.Text)).toContainText('was successful.')
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service)
        await page.click(SENDER.ACC);
        await expect(page.locator(SENDER.ACC_BALANCE)).toHaveText('$90.00');
        await page.waitForTimeout(1000)
    });
    test('FIND TRANSACTION WITH CORRECT ID, THROWS ERROR', async () => {
        
        const randomInteger = Math.floor(Math.random() * 100) + 1;

        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
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
        await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);
        
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');    
        await page.click(SERVICES.BILL_PAY_Service);
        await page.fill(SERVICES.BILL_PAY_PayeeName, 'Evgeni')
        await page.fill(SERVICES.BILL_PAY_Address, 'Poduene')
        await page.fill(SERVICES.BILL_PAY_City, 'Sofia')
        await page.fill(SERVICES.BILL_PAY_State, 'Sofia-City')
        await page.fill(SERVICES.BILL_PAY_Zip, '1517')
        await page.fill(SERVICES.BILL_PAY_Phone, '0895266606')
        await page.fill(SERVICES.BILL_PAY_AccNum, '123456')
        await page.fill(SERVICES.BILL_PAY_AccNum_Conf, '123456')
        await page.fill(SERVICES.BILL_PAY_Amount, '10')
        await page.selectOption(SERVICES.BILL_PAY_Option, { index: 1 });
        await page.click(SERVICES.BILL_PAY_Button)
    
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service)
        await page.click(SENDER.ACC);
        await page.click(SERVICES.FIND_TRANSACTIONS.BILL_PAYMENT_TRANSACTION)
        let dataId = await page.locator('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)').allTextContents();
        await page.click(SERVICES.FIND_TRANSACTIONS.NOW)
        await page.selectOption(SERVICES.FIND_TRANSACTIONS.CHOOSE_ACCOUNT, { index: 1 })
        
        await page.fill(SERVICES.FIND_TRANSACTIONS.CHOOSE_FIELD_ID, dataId.toString())
        await page.click(SERVICES.FIND_TRANSACTIONS.BUTTON_ID)
        
        await expect(page.locator(SERVICES.THROW_ERROR.TITLE)).toHaveText('Error!');
        await expect(page.locator(SERVICES.THROW_ERROR.MSG)).toHaveText('An internal error has occurred and has been logged.');
        await page.waitForTimeout(1000)
    });
    test('FIND TRANSACTION WITH CORRECT DATE', async () => {
        
        const randomInteger = Math.floor(Math.random() * 100) + 1;
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
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
        await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);
        
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');    
        await page.click(SERVICES.BILL_PAY_Service);
        await page.fill(SERVICES.BILL_PAY_PayeeName, 'Evgeni')
        await page.fill(SERVICES.BILL_PAY_Address, 'Poduene')
        await page.fill(SERVICES.BILL_PAY_City, 'Sofia')
        await page.fill(SERVICES.BILL_PAY_State, 'Sofia-City')
        await page.fill(SERVICES.BILL_PAY_Zip, '1517')
        await page.fill(SERVICES.BILL_PAY_Phone, '0895266606')
        await page.fill(SERVICES.BILL_PAY_AccNum, '123456')
        await page.fill(SERVICES.BILL_PAY_AccNum_Conf, '123456')
        await page.fill(SERVICES.BILL_PAY_Amount, '10')
        await page.selectOption(SERVICES.BILL_PAY_Option, { index: 1 });
        await page.click(SERVICES.BILL_PAY_Button)
    
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service)
        await page.click(SENDER.ACC);
        await page.click(SERVICES.FIND_TRANSACTIONS.BILL_PAYMENT_TRANSACTION)
        let dataId = await page.locator('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)').allTextContents();
        await page.click(SERVICES.FIND_TRANSACTIONS.NOW)
        await page.selectOption(SERVICES.FIND_TRANSACTIONS.CHOOSE_ACCOUNT, { index: 1 })
       
        await page.fill(SERVICES.FIND_TRANSACTIONS.CHOOSE_TRANS_DATE, formattedDate.toString())
        await page.click(SERVICES.FIND_TRANSACTIONS.BUTTON_DATE)
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_RESULTS)).toBeVisible();
        // await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_RESULTS)).toHaveText('Transaction Results!');
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE)).toBeVisible();
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE_FIRST_RESULT)).toBeVisible();
        await page.waitForTimeout(2000)
        await page.click(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE_FIRST_RESULT)
        
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.DATE_ROW)).toHaveText(formattedDate.toString())
        
        
    });
    test('FIND TRANSACTION WITH CORRECT DATE RANGE', async () => {
        
        const randomInteger = Math.floor(Math.random() * 100) + 1;
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
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
        await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);
        
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');    
        await page.click(SERVICES.BILL_PAY_Service);
        await page.fill(SERVICES.BILL_PAY_PayeeName, 'Evgeni')
        await page.fill(SERVICES.BILL_PAY_Address, 'Poduene')
        await page.fill(SERVICES.BILL_PAY_City, 'Sofia')
        await page.fill(SERVICES.BILL_PAY_State, 'Sofia-City')
        await page.fill(SERVICES.BILL_PAY_Zip, '1517')
        await page.fill(SERVICES.BILL_PAY_Phone, '0895266606')
        await page.fill(SERVICES.BILL_PAY_AccNum, '123456')
        await page.fill(SERVICES.BILL_PAY_AccNum_Conf, '123456')
        await page.fill(SERVICES.BILL_PAY_Amount, '10')
        await page.selectOption(SERVICES.BILL_PAY_Option, { index: 1 });
        await page.click(SERVICES.BILL_PAY_Button)
    
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service)
        await page.click(SENDER.ACC);
        await page.click(SERVICES.FIND_TRANSACTIONS.BILL_PAYMENT_TRANSACTION)
        let dataId = await page.locator('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)').allTextContents();
        await page.click(SERVICES.FIND_TRANSACTIONS.NOW)
        await page.selectOption(SERVICES.FIND_TRANSACTIONS.CHOOSE_ACCOUNT, { index: 1 })
        await page.fill(SERVICES.FIND_TRANSACTIONS.DATE_RANGE_1, formattedDate.toString())
        await page.fill(SERVICES.FIND_TRANSACTIONS.DATE_RANGE_2, formattedDate.toString())
        await page.click(SERVICES.FIND_TRANSACTIONS.BY_DATE_RANGE_BUTTON)

        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE)).toBeVisible();
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE_FIRST_RESULT)).toBeVisible();
        await page.waitForTimeout(2000)
        await page.click(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE_FIRST_RESULT)
        
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.DATE_ROW)).toHaveText(formattedDate.toString())
    
    });
    test('FIND TRANSACTION WITH AMOUNT. WORKING FOR CHECKING ACCOUNTS', async () => {
        
        const randomInteger = Math.floor(Math.random() * 100) + 1;
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
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
        await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);
        
        await page.click(SERVICES.OPEN_NEW_ACC_Service);
        await page.selectOption('#type', SERVICES.OPEN_NEW_ACC_Savings);
        await page.click(SERVICES.OPEN_NEW_ACC_Btn);
        await expect(page.locator(SERVICES.OPEN_NEW_ACC_Msg)).toHaveText('Account Opened!');    
        await page.click(SERVICES.BILL_PAY_Service);
        await page.fill(SERVICES.BILL_PAY_PayeeName, 'Evgeni')
        await page.fill(SERVICES.BILL_PAY_Address, 'Poduene')
        await page.fill(SERVICES.BILL_PAY_City, 'Sofia')
        await page.fill(SERVICES.BILL_PAY_State, 'Sofia-City')
        await page.fill(SERVICES.BILL_PAY_Zip, '1517')
        await page.fill(SERVICES.BILL_PAY_Phone, '0895266606')
        await page.fill(SERVICES.BILL_PAY_AccNum, '123456')
        await page.fill(SERVICES.BILL_PAY_AccNum_Conf, '123456')
        await page.fill(SERVICES.BILL_PAY_Amount, '10')
        await page.selectOption(SERVICES.BILL_PAY_Option, { index: 1 });
        await page.click(SERVICES.BILL_PAY_Button)

        await page.click(SERVICES.TRANSFER_FUNDS_Service);
        await page.click(SERVICES.TRANSFER_FUNDS_Amount);
        await page.fill(SERVICES.TRANSFER_FUNDS_Amount, '10');

        // Избиране на първата опция за 'From' акаунт
await page.selectOption(SERVICES.TRANSFER_FUNDS_From, { index: 0 });
// Избиране на втората опция за 'To' акаунт
await page.selectOption(SERVICES.TRANSFER_FUNDS_To, { index: 1 });

await page.click(SERVICES.TRANSFER_FUNDS_Button);
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Title)).toBeVisible();
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Text)).toBeVisible();
await expect(page.locator(SERVICES.TRANSFER_FUNDS_Completed.Title)).toHaveText('Transfer Complete!');
    
        await page.click(SERVICES.ACCOUNT_OVERVIEW_Service)
        await page.click(SENDER.ACC);
        await page.click(SERVICES.FIND_TRANSACTIONS.BILL_PAYMENT_TRANSACTION)
        let dataId = await page.locator('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)').allTextContents();
        await page.click(SERVICES.FIND_TRANSACTIONS.NOW)
        await page.selectOption(SERVICES.FIND_TRANSACTIONS.CHOOSE_ACCOUNT, { index: 1 })
        
        await page.click(SERVICES.FIND_TRANSACTIONS.BY_DATE_RANGE_BUTTON)

        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE)).toBeVisible();
        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE_FIRST_RESULT)).toBeVisible();
        await page.waitForTimeout(2000)
        await page.click(SERVICES.FIND_TRANSACTIONS.TRANS_TABLE_FIRST_RESULT)
        await page.fill(SERVICES.FIND_TRANSACTIONS.BY_AMOUNT, '10')

        await expect(page.locator(SERVICES.FIND_TRANSACTIONS.DATE_ROW)).toHaveText(formattedDate.toString())
    
    });
    test('UPDATE CONTACT INFO', async () => {
        const randomInteger = Math.floor(Math.random() * 100) + 1;
        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
        await page.goto(localHost);
        
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
        
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
        await page.fill(REG_FORM.ADDRESS, 'Poduene');
        await page.fill(REG_FORM.CITY, 'Sofia');
        await page.fill(REG_FORM.STATE, 'BG');
        await page.fill(REG_FORM.ZIP_CODE, '1517');
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
        await page.fill(REG_FORM.SSN, '911240000');
        await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}-${randomInteger}`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);

        await page.click(SERVICES.UPDATE.MY_PROFILE)
        

         await page.fill(SERVICES.UPDATE.LAST_NAME, '');
         await page.fill(SERVICES.UPDATE.CITY, '');
         await page.fill(SERVICES.UPDATE.STATE, '');
         await page.fill(SERVICES.UPDATE.ZIP, '');
        await page.fill(SERVICES.UPDATE.PHONE_NUMBER, '');
        //await page.waitForTimeout(2000)
        
        await page.fill(SERVICES.UPDATE.FIRST_NAME, 'Evgen111')
        await page.fill(SERVICES.UPDATE.LAST_NAME, 'Bor1sov')
        await page.fill(SERVICES.UPDATE.CITY, 'Sof1a')
        await page.fill(SERVICES.UPDATE.STATE, 'Bulgar1a')
        await page.fill(SERVICES.UPDATE.ZIP, '1000')
        await page.fill(SERVICES.UPDATE.PHONE_NUMBER, '070077000')
        await page.click(SERVICES.UPDATE.BUTTON)
       // await page.waitForTimeout(2000)
        await expect(page.locator(SERVICES.TITLE_FOR_SUCCESSFUL_UPDATE)).toBeVisible();   
        await expect(page.locator(SERVICES.TITLE_FOR_SUCCESSFUL_UPDATE)).toHaveText('Profile Updated'); 
        await expect(page.locator(SERVICES.TEXT_FOR_SUCCESSFUL_UPDATE)).toBeVisible();   
        await expect(page.locator(SERVICES.TEXT_FOR_SUCCESSFUL_UPDATE)).toHaveText('Your updated address and phone number have been added to the system.'); 
        //await page.waitForTimeout(2000)
    });

    test('SUCCESSFULLY REQUEST LOAN', async () => {
        const randomInteger = Math.floor(Math.random() * 100) + 1;
        await page.goto(loggedUrl);
        await page.click(SERVICES.LOG_OUT);
        await page.goto(localHost);
        
        await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
        
        await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
        await page.fill(REG_FORM.LAST_NAME, 'Borisov');
        await page.fill(REG_FORM.ADDRESS, 'Poduene');
        await page.fill(REG_FORM.CITY, 'Sofia');
        await page.fill(REG_FORM.STATE, 'BG');
        await page.fill(REG_FORM.ZIP_CODE, '1517');
        await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
        await page.fill(REG_FORM.SSN, '911240000');
        await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}-${randomInteger}`);
        await page.fill(REG_FORM.PASSWORD, '1234');
        await page.fill(REG_FORM.REPASSWORD, '1234');
        await page.click(REG_FORM.REGISTER_BUTTON);
//await page.waitForTimeout(2000)
const sum101 = "101";
        await page.click(SERVICES.LOAN.REQUEST)
        await page.fill(SERVICES.LOAN.SUM, sum101)
        await page.fill(SERVICES.LOAN.FIRST_PAYMENT,"100")
        await page.click(SERVICES.LOAN.APPLY)
//await page.waitForTimeout(2000)
        await expect(page.locator(SERVICES.LOAN.STATUS)).toBeVisible()
        await expect(page.locator(SERVICES.LOAN.SUCCESS_TEXT)).toBeVisible()
        await expect(page.locator(SERVICES.LOAN.STATUS)).toHaveText('Approved')
        await expect(page.locator(SERVICES.LOAN.SUCCESS_TEXT)).toHaveText('Congratulations, your loan has been approved.')
        await page.click(SERVICES.LOAN.NEW_ACC_ID)
        await expect(page.locator(SERVICES.LOAN.NEW_ACC_BALANCE)).toContainText(sum101)
        await expect(page.locator(SERVICES.LOAN.NEW_ACC_AVALIABLE)).toContainText(sum101)
//await page.waitForTimeout(2000)
        });

        test('UNSUCCESSFUL REQUEST LOAN', async () => {
            const randomInteger = Math.floor(Math.random() * 100) + 1;
            await page.goto(loggedUrl);
            await page.click(SERVICES.LOG_OUT);
            await page.goto(localHost);
            
            await page.click(CUSTOMER_LOGIN.REGISTER_LINK);
            
            await page.fill(REG_FORM.FIRST_NAME, 'Evgeni');
            await page.fill(REG_FORM.LAST_NAME, 'Borisov');
            await page.fill(REG_FORM.ADDRESS, 'Poduene');
            await page.fill(REG_FORM.CITY, 'Sofia');
            await page.fill(REG_FORM.STATE, 'BG');
            await page.fill(REG_FORM.ZIP_CODE, '1517');
            await page.fill(REG_FORM.PHONE_NUMBER, '0895266606');
            await page.fill(REG_FORM.SSN, '911240000');
            await page.fill(REG_FORM.USERNAME, `${my_username}-${randomInteger}-${randomInteger}`);
            await page.fill(REG_FORM.PASSWORD, '1234');
            await page.fill(REG_FORM.REPASSWORD, '1234');
            await page.click(REG_FORM.REGISTER_BUTTON);
    //await page.waitForTimeout(2000)
    const sum101 = "101";
    const wrongSum = "wrongSum";
            await page.click(SERVICES.LOAN.REQUEST)
            await page.fill(SERVICES.LOAN.SUM,sum101 )
            await page.fill(SERVICES.LOAN.FIRST_PAYMENT,wrongSum)
            await page.click(SERVICES.LOAN.APPLY)
    //await page.waitForTimeout(2000)
    await expect(page.locator(SERVICES.LOAN.ERROR_TITLE)).toBeVisible()
    await expect(page.locator(SERVICES.LOAN.ERROR_TITLE)).toHaveText('Error!')
    await expect(page.locator(SERVICES.LOAN.ERROR_MSG)).toBeVisible()
    await expect(page.locator(SERVICES.LOAN.ERROR_MSG)).toHaveText('An internal error has occurred and has been logged.')
        })
    // Затваряне на контекста и браузъра след всеки тест
    test.afterEach(async () => {
        await page.click(SERVICES.LOG_OUT); // Отписване след всеки тест
    });
    
    // Затваряне на контекста и браузъра след всички тестове
    test.afterAll(async () => {
        await context.close();
        await browser.close();
    });
});
