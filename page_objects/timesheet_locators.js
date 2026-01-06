const {except} = require('@playwright/test');

class Timesheet_Locators { 
    constructor(page){
        this.page = page;
        this.timesheet_menu = page.locator('//nav//button[contains(text(),"Timesheet")]');
        this.timesheet_dashboard = page.locator('//header/h1[contains(text(),"Timesheet")]');
        this.my_timesheet_tab = page.locator('//button[text()="My Timesheets"]');
        this.timesheet_month_dropdown = page.locator('//select');
        this.timesheet_status = page.locator('//span[text()="Pending"]');
        this.timesheet_logtime_button = page.locator('//button[text()="Log time"]');
        this.timesheet_header = page.locator('//h1[text()="Log Time"]');
        
        this.timesheet_dynamic_col = page.locator('(//div[@aria-colindex="${col_index}" and not(@role="columnheader")])[1]'); // col_index to be replaced with actual index
        this.timesheet_activity_dropdown = page.locator('');
        
     }
}


module.exports = {Timesheet_Locators};