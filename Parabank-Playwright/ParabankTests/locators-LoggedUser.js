import { ACCOUNT } from "./locators-Base";

// import { ACCOUNT } from "./locators-Base";
export {SERVICES,RECEIVER,SENDER, loggedUrl}

//let loggedUrl = 'https://parabank.parasoft.com/parabank/overview.htm'
let loggedUrl = 'http://localhost:8080/parabank/overview.htm'
// const BY_ID_ = await page.textContent('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)');

let RECEIVER =
{
ACC: '#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a',
ACC_BALANCE: '#balance'
}
let SENDER =
{
ACC: '#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a',
ACC_BALANCE: '#balance'
}
let SERVICES = 
{
    OPEN_NEW_ACC_Service: '#leftPanel a >> text=Open New Account',
    OPEN_NEW_ACC_Btn: '#openAccountForm > form > div > input',
    OPEN_NEW_ACC_Checking: {value: '0'},
    OPEN_NEW_ACC_Savings: {value: '1'},
    OPEN_NEW_ACC_Msg: '#openAccountResult > h1',
    ACCOUNT_OVERVIEW_Service: '#leftPanel a >> text=Accounts Overview',
    ACCOUNT_OVERVIEW_Title: '#showOverview > h1',
    ACCOUNT_OVERVIEW_AccNum:'#accountTable > thead > tr > th:nth-child(1)',
    ACCOUNT_OVERVIEW_Balance: '#accountTable > thead > tr > th:nth-child(2)',
    ACCOUNT_OVERVIEW_Amount: '#accountTable > thead > tr > th:nth-child(3)',
    ACCOUNT_OVERVIEW_LinkProfile_N1: '#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a',
    ACCOUNT_OVERVIEW_LinkProfile_N2: '#accountTable > tbody > tr:nth-child(2) > td:nth-child(1) > a',
    ACCOUNT_OVERVIEW_MonthOption_ALL: '#month option[value="All"]',
    ACCOUNT_OVERVIEW_MonthOption_Dec: '#month option[value="декември"]',
    ACCOUNT_OVERVIEW_TransactionTable: '#transactionTable',
    ACCOUNT_OVERVIEW_TT_Date: '#transactionTable > thead > tr > th:nth-child(1)',
    ACCOUNT_OVERVIEW_TT_Transaction: '#transactionTable > thead > tr > th:nth-child(2)',
    ACCOUNT_OVERVIEW_TT_Debit: '#transactionTable > thead > tr > th:nth-child(3)',
    ACCOUNT_OVERVIEW_TT_Credit: '#transactionTable > thead > tr > th:nth-child(4)',
    ACCOUNT_OVERVIEW_TT_FirstTransaction: '#transactionTable > tbody > tr > td:nth-child(2) > a',
    USER: '#leftPanel > p',
    ACCOUNT_OVERVIEW_TRANSACTION_INFO: 
    {
        Title: '#rightPanel > h1',
        Id: '#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(1) > b',
        Date: '#rightPanel > table > tbody > tr:nth-child(2) > td:nth-child(1) > b',
        Description: '#rightPanel > table > tbody > tr:nth-child(3) > td:nth-child(1) > b',
        Type: '#rightPanel > table > tbody > tr:nth-child(4) > td:nth-child(1) > b',
        Ammount: '#rightPanel > table > tbody > tr:nth-child(5) > td:nth-child(1) > b'
    },
    TRANSFER_FUNDS_Service: '#leftPanel a >> text=Transfer Funds',
    TRANSFER_FUNDS_Amount: '#amount',
    TRANSFER_FUNDS_From: '#fromAccountId',
    TRANSFER_FUNDS_To: '#toAccountId',
    TRANSFER_FUNDS_Button: '.button[type="submit"][value="Transfer"]',
    TRANSFER_FUNDS_Completed:
    {
      Title: '#showResult > h1',
      Text: '#showResult > p:nth-child(2)'
    },
    THROW_ERROR:
{
    TITLE: '#errorContainer > h1',
    MSG: '#errorContainer > p'
},
    BILL_PAY_Service: '#leftPanel > ul > li:nth-child(4) > a',
    BILL_PAY_PayeeName: '#billpayForm > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input',
    BILL_PAY_Address: '#billpayForm > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input',
    BILL_PAY_City: '#billpayForm > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input',
    BILL_PAY_State: '#billpayForm > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input',
    BILL_PAY_Zip: '#billpayForm > form > table > tbody > tr:nth-child(5) > td:nth-child(2) > input',
    BILL_PAY_Phone: '#billpayForm [name="payee.phoneNumber"]',
    BILL_PAY_AccNum: '#billpayForm > form > table > tbody > tr:nth-child(8) > td:nth-child(2) > input',
    BILL_PAY_AccNum_Conf: '#billpayForm > form > table > tbody > tr:nth-child(9) > td:nth-child(2) > input',
    BILL_PAY_Amount: '#billpayForm > form > table > tbody > tr:nth-child(11) > td:nth-child(2) > input',
    BILL_PAY_Option: '#billpayForm > form > table > tbody > tr:nth-child(13) > td:nth-child(2) > select',
    BILL_PAY_Button: '#billpayForm .button[value="Send Payment"]',
    BILL_PAY_Completed: 
    {
    Title: '#billpayResult > h1',
    Text: '#billpayResult > p:nth-child(2)'
    },
    FIND_TRANSACTIONS: 
    {
      NOW: '#leftPanel > ul > li:nth-child(5) > a',
      BILL_PAYMENT_TRANSACTION: '#transactionTable > tbody > tr:nth-child(2) > td:nth-child(2) > a',
      CHOOSE_ACCOUNT: '#accountId',
      CHOOSE_FIELD_ID: '#transactionId',
      BUTTON_ID: '#findById',
      CHOOSE_TRANS_DATE:'#transactionDate',
      BUTTON_DATE: '#findByDate',
      TRANS_RESULTS: '#resultContainer > h1',
      TRANS_TABLE: '#transactionTable > thead > tr > th:nth-child(1)',
      TRANS_TABLE_FIRST_RESULT: '#transactionBody > tr:nth-child(2) > td:nth-child(2) > a',
      DATE_ROW: '#rightPanel > table > tbody > tr:nth-child(2) > td:nth-child(2)',
      DATE_RANGE_1: '#fromDate',
      DATE_RANGE_2: '#toDate',
      BY_DATE_RANGE_BUTTON: '#findByDateRange',
      BY_AMOUNT: '#amount',

  },
  UPDATE:{
    MY_PROFILE: '#leftPanel > ul > li:nth-child(6) > a',
    FIRST_NAME: '#updateProfileForm #customer\\.firstName',
    LAST_NAME: '#updateProfileForm #customer\\.lastName',
    CITY: '#updateProfileForm #customer\\.address\\.city',
    STATE: '#updateProfileForm #customer\\.address\\.state',
    ZIP: '#updateProfileForm #customer\\.address\\.zipCode',
    PHONE_NUMBER: '#updateProfileForm #customer\\.phoneNumber',
    BUTTON: '#updateProfileForm > form > table > tbody > tr:nth-child(8) > td:nth-child(2) > input',
    
    
  },
  LOAN:{
    REQUEST: '#leftPanel > ul > li:nth-child(7) > a',
    SUM: '#amount',
    FIRST_PAYMENT: '#downPayment',
    APPLY: '#requestLoanForm > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input',
    SUCCESS_TEXT: '#loanRequestApproved > p:nth-child(1)',
    STATUS: '#loanStatus',
    NEW_ACC_ID: '#newAccountId',
    NEW_ACC_BALANCE: '#balance',
    NEW_ACC_AVALIABLE:'#availableBalance',
    ERROR_TITLE: '#requestLoanError > h1',
    ERROR_MSG: '#requestLoanError > p'
  },
  
    
    TITLE_FOR_SUCCESSFUL_UPDATE: '#updateProfileResult > h1',
    TEXT_FOR_SUCCESSFUL_UPDATE: '#updateProfileResult > p',
    LOG_OUT: '#leftPanel a >> text=Log Out'
};


