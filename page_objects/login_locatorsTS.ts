import { Page, Locator } from '@playwright/test';
import data_set from '../testdata/login.json';

export class Login_Locators {
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    dashboardHeader: Locator;
    profileIcon: Locator;
    profilemenu: Locator;
    profilenavbar: Locator;
    employeeRoleLabel: Locator;
    employeeRoleValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('//input[@type="email"]');
        this.passwordField = page.locator('//input[@type="password"]');
        this.loginButton = page.locator('//button[@type="submit"]');
        this.dashboardHeader = page.locator('//header/h1');

        this.profileIcon = page.getByLabel('User profile menu');
        this.profilemenu = page.locator('//button[@role="menuitem" and contains(text(),"Profile")]');
        this.profilenavbar = page.locator('//ul[@id ="form-tabs"]');
        this.employeeRoleLabel = page.locator('//label[contains(text(),"Employees Role")]');
        this.employeeRoleValue = page.locator('//a[@data-doctype="Employees Role"]');
    }

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto((data_set as any).TC_01.url);
    }

    async validateLoginPage(username: string, password: string): Promise<void> {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async clickProfileMenu(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

}

export default Login_Locators;
