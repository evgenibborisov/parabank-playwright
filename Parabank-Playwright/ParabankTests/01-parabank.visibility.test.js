const { test, expect } = require('@playwright/test');
import {CUSTOMER_LOGIN, FOOTER_MENU, LEFT_MENU, MAIN_PANEL_BUTTONS, READ_MORE, SERVICES_MENU} from './locators-HomePage.js'
import { localHost, THROW, ACCOUNT } from './locators-Base.js';

/*async function clickAndReturnToHome(page, locator) {
    await page.goto(localHost); // Отваряне на началната страница
    await page.locator(locator).click();
    await page.goto(localHost); // Връщане на началната страница
} */
    test.describe('VISIBILITY TESTS', () => {
//Тестове за присъствие,съответствие и видимост на елементите на страницата    
test('The page title is actual', async ({ page }) => {
await page.goto(localHost);
const title = await page.title();
expect(title).toBe('ParaBank | Welcome | Online Banking');
})
test('The elements of "Customer login" form are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(CUSTOMER_LOGIN.USERNAME)).toBeVisible
await expect(page.locator(CUSTOMER_LOGIN.PASSWORD)).toBeVisible
await expect(page.locator(CUSTOMER_LOGIN.LOGIN_BUTTON)).toBeVisible
await expect(page.locator(CUSTOMER_LOGIN.FORGOT_LOGIN_INFO)).toBeVisible
await expect(page.locator(CUSTOMER_LOGIN.REGISTER_LINK)).toBeVisible
})
test('The elements of "Left menu" form are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(LEFT_MENU.SOLUTIONS)).toBeVisible
await expect(page.locator(LEFT_MENU.ABOUT_US)).toBeVisible
await expect(page.locator(LEFT_MENU.SERVICES)).toBeVisible
await expect(page.locator(LEFT_MENU.PRODUCTS)).toBeVisible
await expect(page.locator(LEFT_MENU.LOCATIONS)).toBeVisible
await expect(page.locator(LEFT_MENU.ADMIN_PAGE)).toBeVisible
}) 
test('The elements of "Footer menu" are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(FOOTER_MENU.HOME)).toBeVisible
await expect(page.locator(FOOTER_MENU.ABOUT_US)).toBeVisible
await expect(page.locator(FOOTER_MENU.SERVICES)).toBeVisible
await expect(page.locator(FOOTER_MENU.PRODUCTS)).toBeVisible
await expect(page.locator(FOOTER_MENU.LOCATIONS)).toBeVisible
await expect(page.locator(FOOTER_MENU.FORUM)).toBeVisible
await expect(page.locator(FOOTER_MENU.SITE_MAP)).toBeVisible
await expect(page.locator(FOOTER_MENU.CONTACT_US)).toBeVisible
}) 
test('The buttons in the Main Panel are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(MAIN_PANEL_BUTTONS.HOME_BUTTON)).toBeVisible
await expect(page.locator(MAIN_PANEL_BUTTONS.ABOUT_BUTTON)).toBeVisible
await expect(page.locator(MAIN_PANEL_BUTTONS.CONTACT_BUTTON)).toBeVisible
})
test('The ATM Services are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(SERVICES_MENU.ATM_SERVICES.WITHDRAW_FUNDS)).toBeVisible
await expect(page.locator(SERVICES_MENU.ATM_SERVICES.TRANSFER_FUNDS)).toBeVisible
await expect(page.locator(SERVICES_MENU.ATM_SERVICES.CHECK_BALANCES)).toBeVisible
await expect(page.locator(SERVICES_MENU.ATM_SERVICES.MAKE_DEPOSITS)).toBeVisible
})
test('The Online Services are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(SERVICES_MENU.ONLINE_SERVICES.BILL_PAY)).toBeVisible
await expect(page.locator(SERVICES_MENU.ONLINE_SERVICES.ACCOUNT_HISTORY)).toBeVisible
await expect(page.locator(SERVICES_MENU.ONLINE_SERVICES.TRANSFER_FUNDS)).toBeVisible
})
test(' "Read More" paragraphs are visible', async ({ page }) => {
await page.goto(localHost);
await expect(page.locator(READ_MORE.INFO_FOR_SERVICES)).toBeVisible
await expect(page.locator(READ_MORE.INFO_FOR_NEWS)).toBeVisible
})
    })