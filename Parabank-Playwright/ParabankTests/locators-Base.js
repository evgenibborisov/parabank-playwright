export{localHost, ACCOUNT, THROW, REG_FORM, REG_ERROR}
//let localHost = 'https://parabank.parasoft.com/' //за преместване в отделен файл
let localHost = 'http://localhost:8080/parabank/index.htm'
let CUSTOMER_FORM = '#customerForm';


let ACCOUNT = 
{
welcome_msg:'#rightPanel > h1',
overview:'#showOverview > h1',
created:'#rightPanel > p',
banica:"h2[@class='title'][contains(.,'HKError!')]",
}
let REG_FORM = {
    FIRST_NAME: '#customerForm #customer\\.firstName',
    LAST_NAME: '#customerForm #customer\\.lastName',
    ADDRESS: '#customerForm #customer\\.address\\.street',
    CITY: '#customerForm #customer\\.address\\.city',
    STATE: '#customerForm #customer\\.address\\.state',
    ZIP_CODE: '#customerForm #customer\\.address\\.zipCode',
    PHONE_NUMBER: '#customerForm #customer\\.phoneNumber',
    SSN: '#customerForm #customer\\.ssn',
    USERNAME: '#customerForm #customer\\.username',
    PASSWORD: '#customerForm #customer\\.password',
    REPASSWORD: '#customerForm #repeatedPassword',
    REGISTER_BUTTON: '#customerForm input.button[value="Register"]'
};


//"h1[@class='title'][contains(.,)]";
let THROW = 
{
error: "#rightPanel > h1",
internal_error_message: "#rightPanel > p",
empty_userOrPass_message: "#rightPanel > p",

}
let REG_ERROR =
{
username_error_message: "#customerForm #customer\\.username\\.errors",
password_error_message: "#customerForm #customer\\.password\\.errors",
repassword_error_message: "#customerForm #repeatedPassword\\.errors",
first_name_error_message: "#customerForm #customer\\.firstName\\.errors",
last_name_error_message:"#customerForm #customer\\.lastName\\.errors",
address_error_message: "#customerForm #customer\\.address\\.street\\.errors",
city_error_message: "#customerForm #customer\\.address\\.city\\.errors",
state_error_message: "#customerForm #customer\\.address\\.state\\.errors",
zip_error_message: "#customerForm #customer\\.address\\.zipCode\\.errors",
ssn_error_message: "#customerForm #customer\\.ssn\\.errors",

}
