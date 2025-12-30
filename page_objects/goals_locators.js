const { expect } = require("@playwright/test");

class Goals_Locators {
    // Locators for the goals page elements
    constructor(page) {     
        this.page = page;
        this.goals_menu = page.locator('//nav//button[contains(text(),"Goals")]');
        this.goals_dashboard_header = page.locator('//header/h1');
        this.add_goals_header = page.locator('//div/h1');
        this.organization_tab = page.locator('//button[contains(@class,"text-base") and (contains(text(),"Organization Goals"))]');
        this.my_approvals_tab = page.locator('//button[contains(@class,"text-base") and (contains(text(),"My Approvals"))]');
        this.my_goals_tab = page.locator('//button[contains(@class,"text-base") and (contains(text(),"My Goals"))]');
        this.add_goals_button = page.locator('//h2//parent::div//parent::div//button[contains(text(),"Add Goals")]');
        this.goals_dashboaerd_rows = page.locator('//div[@class = "empty-text"]');
        this.goals_alert_popup = page.getByRole('alert');

        // Inside the goals page:
        this.goals_status = page.locator('//span[text()="Ongoing"]');
        this.goals_grid_view = page.getByRole('grid');


    }
}


module.exports = {Goals_Locators};