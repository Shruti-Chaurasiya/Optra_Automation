const { expect } = require("@playwright/test");
const data_set = require('../testdata/goals.json');

class Appraisal_Locators {

    constructor(page) {
        this.page = page;
        this.appraisal_menu = page.locator('//nav//button[contains(text(),"Appraisal")]');
        this.appraisal_search_field = page.locator('#navbar-search');
        this.appraisal_search_option = page.locator('//ul[@role="listbox"]//a');
        this.appraisal_header = page.locator('//h3[@title="Appraisal"]');
        this.employee_name_field = page.locator('(//input[@placeholder="Employee Name"])[2]');
        this.emp_name = (emp_name) => page.getByTitle(`${emp_name}`);
        this.menu_button = page.locator('(//div[@class = "menu-btn-group"]//button[@data-toggle="dropdown" and @aria-label="Menu"])[3]');
        this.delete_option = page.locator('//span[text() = "Delete"]');
        this.goal_header = page.locator('//h3[@title="Goal Form"]');

        }

}


module.exports = {Appraisal_Locators};