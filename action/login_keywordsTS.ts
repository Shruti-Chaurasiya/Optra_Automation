import {expect, Page} from '@playwright/test';
import {Login_Locators} from '../page_objects/login_locatorsTS';


// Run this hook before each test --> same as suit setup in robot framework

export class Login_Keywords {
   
    async Login_To_Optra(page : Page, username : string, password : any) : Promise<void>
    {
        const login_page = new Login_Locators(page);
        await login_page.navigateToLoginPage();
        await login_page.validateLoginPage(username, password);
        await page.waitForLoadState('networkidle');
    }

    async Return_Employee_Role(page : Page) : Promise<any> {
        // Function to check if the logged-in user has an employee role
        const login_page = new Login_Locators(page);
        await login_page.profileIcon.click();
        await login_page.profilemenu.click();

        const newpage = await login_page.clickProfileMenu();
        const login_page1 = new Login_Locators(newpage);
        await expect(login_page1.profilenavbar).toBeVisible();
        await login_page1.employeeRoleLabel.scrollIntoViewIfNeeded();
        const role = await login_page1.employeeRoleValue.textContent();
        console.log("Employee Role is: " + role);
        // Check if the role on the profile page matches any of the expected roles
        // const array_role = ['HR', 'Employee' , 'Engineering Manager' , 'Manager' , 'Account User' ,'Engineering Partner' ];
        // for (let i = 0; i < array_role.length; i++) {
        //     if (role.includes(array_role[i])) {
        //         var new_role = array_role[i];
        //         // await page.bringToFront();
        //         await newpage.close();
        //         console.log("Matched Role is: " + new_role);
        //     } 
        return role;
        
        }

    }


export default Login_Keywords;