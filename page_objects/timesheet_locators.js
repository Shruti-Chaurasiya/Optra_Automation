const {except} = require('@playwright/test');

class Timesheet_Locators { 
    constructor(page){
        this.page = page;
        this.timesheet_menu = page.locator('//nav//button[contains(text(),"Timesheet")]');
        this.timesheet_dashboard = page.locator('//header/h1[contains(text(),"Timesheet")]');
    }
}