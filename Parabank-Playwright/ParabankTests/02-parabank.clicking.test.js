const { test, expect } = require('@playwright/test');
import { CUSTOMER_LOGIN, FOOTER_MENU, LEFT_MENU, MAIN_PANEL_BUTTONS, READ_MORE, SERVICES_MENU } from './locators-HomePage.js';
import { localHost } from './locators-Base.js';

async function clickAndReturnToHome(page, locator) {
    await page.goto(localHost); // Отваряне на началната страница
    await page.locator(locator).click();
    await page.waitForTimeout(400);
    
    // Връщане на началната страница
    await page.goto(localHost);
}

test.describe('CLICKING TESTS', () => {
    test('Click on "Customer Login" elements', async ({ page }) => {
        const locators = [
            CUSTOMER_LOGIN.FORGOT_LOGIN_INFO,
            CUSTOMER_LOGIN.REGISTER_LINK,
        ];
        let successfulClicks = 0; // Променлива за успешни кликове
        const expectedClicks = locators.length; // Очаквани кликове

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++; // Увеличаване на успешните кликове
        }
        
        // Проверка дали успешните кликове съвпадат с очакваните
        expect(successfulClicks).toBe(expectedClicks);
    });

    test('Click on "Left Menu" elements', async ({ page }) => {
        const locators = [
            LEFT_MENU.SOLUTIONS,
            LEFT_MENU.ABOUT_US,
            LEFT_MENU.SERVICES,
            LEFT_MENU.PRODUCTS,
            LEFT_MENU.LOCATIONS,
            LEFT_MENU.ADMIN_PAGE,
        ];
        let successfulClicks = 0;
        const expectedClicks = locators.length;

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++;
        }

        expect(successfulClicks).toBe(expectedClicks);
    });

    test('Click on "Footer Menu" elements', async ({ page }) => {
        const locators = [
            FOOTER_MENU.HOME,
            FOOTER_MENU.ABOUT_US,
            FOOTER_MENU.SERVICES,
            FOOTER_MENU.PRODUCTS,
            FOOTER_MENU.LOCATIONS,
            FOOTER_MENU.FORUM,
            FOOTER_MENU.SITE_MAP,
            FOOTER_MENU.CONTACT_US,
        ];
        let successfulClicks = 0;
        const expectedClicks = locators.length;

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++;
        }

        expect(successfulClicks).toBe(expectedClicks);
    });

    test('Click on "Main Panel" buttons', async ({ page }) => {
        const locators = [
            MAIN_PANEL_BUTTONS.HOME_BUTTON,
            MAIN_PANEL_BUTTONS.ABOUT_BUTTON,
            MAIN_PANEL_BUTTONS.CONTACT_BUTTON,
        ];
        let successfulClicks = 0;
        const expectedClicks = locators.length;

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++;
        }

        expect(successfulClicks).toBe(expectedClicks);
    });

    test('Click on "ATM Services"', async ({ page }) => {
        const locators = [
            SERVICES_MENU.ATM_SERVICES.WITHDRAW_FUNDS,
            SERVICES_MENU.ATM_SERVICES.TRANSFER_FUNDS,
            SERVICES_MENU.ATM_SERVICES.CHECK_BALANCES,
            SERVICES_MENU.ATM_SERVICES.MAKE_DEPOSITS,
        ];
        let successfulClicks = 0;
        const expectedClicks = locators.length;

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++;
        }

        expect(successfulClicks).toBe(expectedClicks);
    });

    test('Click on "Online Services"', async ({ page }) => {
        const locators = [
            SERVICES_MENU.ONLINE_SERVICES.BILL_PAY,
            SERVICES_MENU.ONLINE_SERVICES.ACCOUNT_HISTORY,
            SERVICES_MENU.ONLINE_SERVICES.TRANSFER_FUNDS,
        ];
        let successfulClicks = 0;
        const expectedClicks = locators.length;

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++;
        }

        expect(successfulClicks).toBe(expectedClicks);
    });

    test('Click on "Read More" paragraphs', async ({ page }) => {
        const locators = [
            READ_MORE.INFO_FOR_SERVICES,
            READ_MORE.INFO_FOR_NEWS,
        ];
        let successfulClicks = 0;
        const expectedClicks = locators.length;

        for (const locator of locators) {
            await clickAndReturnToHome(page, locator);
            successfulClicks++;
        }

        expect(successfulClicks).toBe(expectedClicks);
    });
});
