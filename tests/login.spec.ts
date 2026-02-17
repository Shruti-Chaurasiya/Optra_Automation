import {test, expect, Page} from '@playwright/test';
import Login_Locators from '../page_objects/login_locatorsTS';
import data_set from '../testdata/login.json';

// Run this hook before each test --> same as suit setup in robot framework

async function Login_To_Optra(page: Page): Promise<void> {
    const login_page = new Login_Locators(page);
    await login_page.navigateToLoginPage();
    await login_page.validateLoginPage(data_set.TC_01.username, data_set.TC_01.password);
    await expect(login_page.dashboardHeader).toBeVisible();

}

async function Return_Employee_Role(page: Page): Promise<string | void> {
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
    if (!role) return;
    // Check if the role on the profile page matches any of the expected roles
    const array_role = ['HR', 'Employee' , 'Engineering Manager' , 'Manager' , 'Account User' , ];
    for (let i = 0; i < array_role.length; i++) {
        if (role.includes(array_role[i])) {
            const new_role = array_role[i];
            console.log("Matched Role is: " + new_role);
            newpage.close();
            return new_role;
        }
    }
    newpage.close();

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

export {Login_To_Optra, Return_Employee_Role};