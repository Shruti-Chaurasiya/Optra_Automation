class Login_Locators {
    // Locators for the login page elements
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('//input[@type="email"]');
        this.passwordField = page.locator('//input[@type="password"]');
        this.loginButton = page.locator('//button[@type="submit"]');
        this.dashboardHeader = page.locator('//header/h1');

        this.profileIcon = page.getByLabel('User profile menu');
        this.profilemenu = page.locator('//button[@role="menuitem" and (contains(text(),"Profile"))]');
        this.profilenavbar = page.locator('//ul[@id ="form-tabs"]');
        this.employeeRoleLabel = page.locator('//label[contains(text(),"Employees Role")]')
        this.employeeRoleValue = page.locator('//a[@data-doctype="Employees Role"]');
    }

    // Keyword to open the site with url
    async navigateToLoginPage() {
        await this.page.goto("https://optra-uat.indexnine.com/");
    }

    // Keyword to validate login page
    async validateLoginPage(){
        await this.usernameField.fill('parita.naik@indexnine.com');
        await this.passwordField.fill('parita@123');
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        

    }

    // Method to click profile menu and handle new tab
    async clickProfileMenu() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

}

module.exports = {Login_Locators}; 
