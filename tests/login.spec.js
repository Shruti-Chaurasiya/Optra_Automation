const {test, expect} = require('@playwright/test');
const {Login_Locators} = require('../page_objects/login_locators');


// Run this hook before each test --> same as suit setup in robot framework

async function Login_To_Optra(page)
{
    const login_page = new Login_Locators(page);
    await login_page.navigateToLoginPage();
    await login_page.validateLoginPage();
    await expect(login_page.dashboardHeader).toBeVisible();

}

async function Return_Employee_Role(page){
    // Function to check if the logged-in user has an employee role
    const login_page = new Login_Locators(page);
    await login_page.profileIcon.click();
    await login_page.profilemenu.click();

    const newpage = await login_page.clickProfileMenu();
    const login_page1 = new Login_Locators(newpage);
    await expect(login_page1.profilenavbar).toBeVisible();
    await login_page1.employeeRoleLabel.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000);
    const role = await login_page1.employeeRoleValue.textContent();
    console.log("Employee Role is: " + role);
    // Check if the role on the profile page matches any of the expected roles
    const array_role = ['HR', 'Employee' , 'Engineering Manager' , 'Manager' , 'Account User' , ];
    for (let i = 0; i < array_role.length; i++) {
        if (role.includes(array_role[i])) {
            var new_role = array_role[i];
            console.log("Matched Role is: " + new_role);
             return new_role;
        } 
    newpage.close();
    }

    // const local_storage_role = await page.evaluate(() => {
    //     return localStorage.getItem('role');
    // });
    // console.log("Role from local storage is: " + local_storage_role);

/* To get all the data from local storage 
    const allLocalStorage = await page.evaluate(() => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) 
        {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
        }
    return data;
});

console.log(allLocalStorage);

*/




}

module.exports = {Login_To_Optra, Return_Employee_Role};

