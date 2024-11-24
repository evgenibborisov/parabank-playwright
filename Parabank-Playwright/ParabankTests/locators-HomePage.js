//export {CUSTOMER_LOGIN, LEFT_MENU, FOOTER_MENU, MAIN_PANEL_BUTTONS, SERVICES_MENU, READ_MORE}
// Локатори за нелогнати потребители



export const CUSTOMER_LOGIN = {
    USERNAME: 'input.input[name="username"]',
    PASSWORD: 'input.input[name="password"]', 
    LOGIN_BUTTON: 'input[type="submit"][value="Log In"]',
    FORGOT_LOGIN_INFO: '#loginPanel > p:nth-child(2) > a',
    REGISTER_LINK: '#loginPanel > p:nth-child(3) > a'
};
  
export const LEFT_MENU = {
    SOLUTIONS: 'li.Solutions:has-text("Solutions")',
    ABOUT_US: '#headerPanel .leftmenu a:has-text("About Us")', // Специфицирай точния текст
    SERVICES: '#headerPanel .leftmenu a:has-text("Services")',
    PRODUCTS: '#headerPanel .leftmenu a:has-text("Products")',
    LOCATIONS: '#headerPanel .leftmenu a:has-text("Locations")',
    ADMIN_PAGE: 'a[href="admin.htm"]:has-text("Admin Page")'
};
  
export const FOOTER_MENU = {
    HOME: '#footerPanel a:has-text("Home")',
    ABOUT_US: '#footerPanel a:has-text("About Us")',
    SERVICES: '#footerPanel a:has-text("Services")',
    PRODUCTS: '#footerPanel a:has-text("Products")',
    LOCATIONS: '#footerPanel a:has-text("Locations")',
    FORUM: '#footerPanel a:has-text("Forum")',
    SITE_MAP: '#footerPanel a:has-text("Site Map")',
    CONTACT_US: '#footerPanel a:has-text("Contact Us")',
    ABOUT_US_TITLE: '#rightPanel > h1',
    ABOUT_US_REDIRECT: '#rightPanel > p:nth-child(4) > a',
    SERVICES_TITLE: '#rightPanel > span:nth-child(4)',
    PRODUCTS_REDIRECT: '#footerPanel > ul:nth-child(1) > li:nth-child(4) > a',
    PRODUCTS_PAGE_TITLE: '#main > section.HERO-BANNER > div.b-frame > div > div > div.content > h1',
    LOCATIONS_PAGE_TITLE: '#main > section.HERO-BANNER > div.b-frame > div > div > div > h1',
    SITE_MAP_ABOUT_US: '#rightPanel > ul.leftmenu > li:nth-child(2) > a',
    SITE_MAP_SERVICES: '#rightPanel > ul.leftmenu > li:nth-child(3) > a', 
    SITE_MAP_PRODUCTS: '#rightPanel > ul.leftmenu > li:nth-child(4) > a',
    SITE_MAP_LOCATIONS: '#rightPanel > ul.leftmenu > li:nth-child(5) > a',
    SITE_MAP_ADMIN_PAGE: '#rightPanel > ul.leftmenu > li:nth-child(6) > a',
    SITE_MAP_ADMIN_PAGE_TITLE: '#rightPanel > h1',
    SITE_MAP_OPEN_NEW_ACC: '#rightPanel > ul:nth-child(4) > li:nth-child(1) > a',
    SITE_MAP_OPEN_NEW_ACC_TITLE: '#rightPanel #openAccountForm > h1',
    SITE_MAP_ACC_OVERVIEW: '#rightPanel > ul:nth-child(4) > li:nth-child(2) > a',
    SITE_MAP_ACC_OVERVIEW_TITLE: '#showOverview > h1',
    SITE_MAP_TRANSFER_FUNDS: '#rightPanel > ul:nth-child(4) > li:nth-child(3) > a',
    SITE_MAP_TRANSFER_FUNDS_TITLE: '#showForm > h1',
    SITE_MAP_BILL_PAY: '#rightPanel > ul:nth-child(4) > li:nth-child(4) > a',
    SITE_MAP_BILL_PAY_TITLE: '#billpayForm > h1',
    SITE_MAP_FIND_TRANSACTIONS: '#rightPanel > ul:nth-child(4) > li:nth-child(5) > a',
    SITE_MAP_FIND_TRANSACTIONS_TITLE: '#formContainer > h1',
    SITE_MAP_UPDATE_PROFILE_INFO: '#rightPanel > ul:nth-child(4) > li:nth-child(6) > a',
    SITE_MAP_UPDATE_PROFILE_INFO_TITLE: '#updateProfileForm > h1',
    SITE_MAP_REQUEST_LOAN: '#rightPanel > ul:nth-child(4) > li:nth-child(7) > a',
    SITE_MAP_REQUEST_LOAN_TITLE: '#requestLoanForm > h1',
    SITE_MAP_LOG_OUT: '#rightPanel > ul:nth-child(4) > li:nth-child(8) > a'
};
  
export const HEADER_MENU = {
    HOME_BUTTON: '#headerPanel .button .home a',
    ABOUT_BUTTON: '#headerPanel .button .aboutus a',
    ABOUT_BUTTON_URL: 'http://localhost:8080/parabank/about.htm',
    ABOUT_US_TITLE: '#rightPanel > h1',
    ABOUT_US_REDIRECT: '#rightPanel > p:nth-child(4) > a',
    CONTACT_BUTTON: '#headerPanel .button .contact a',
    CONTACT_BUTTON_URL: 'http://localhost:8080/parabank/contact.htm',
    CUSTOMER_NAME: '#name',
    CUSTOMER_EMAIL: '#email',
    CUSTOMER_PHONE: '#phone',
    CUSTOMER_MESSAGE: '#message',
    CUSTOMER_SEND_MESSAGE: '#contactForm > table > tbody > tr:nth-child(5) > td:nth-child(2) > input',
    CUSTOMER_THANK_YOU: '#rightPanel > p:nth-child(2)'


};
  
export const SERVICES_MENU = {
    ATM_SERVICES: {
        WITHDRAW_FUNDS: '#rightPanel > ul.services > li:nth-child(2) > a',
        TRANSFER_FUNDS: '#rightPanel > ul.services > li:nth-child(3) > a',
        CHECK_BALANCES: '#rightPanel > ul.services > li:nth-child(4) > a',
        MAKE_DEPOSITS: '#rightPanel > ul.services > li:nth-child(5) > a',
    },
    ONLINE_SERVICES: {
        BILL_PAY: '#rightPanel > ul.servicestwo > li:nth-child(2) > a',
        ACCOUNT_HISTORY: '#rightPanel > ul.servicestwo > li:nth-child(3) > a',
        TRANSFER_FUNDS: '#rightPanel > ul.servicestwo > li:nth-child(4) > a'
    }
};
  
export const READ_MORE = {
    INFO_FOR_SERVICES: '#rightPanel > p:nth-child(4) > a',
    INFO_FOR_NEWS: '#rightPanel > p:nth-child(7) > a'
};
