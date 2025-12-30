const {expect} = require('@playwright/test');
const {Goals_Locators} = require('../page_objects/goals_locators');
const {Login_Keywords} = require('./login_keywords');

class Goals_Keywords {
   
    async navigateToGoalsPage(page) {
        const goals_page = new Goals_Locators(page);
        await goals_page.goals_menu.click();
        await page.waitForLoadState('networkidle');
        await expect(goals_page.goals_dashboard_header).toBeVisible();
        await expect(goals_page.goals_dashboard_header).toHaveText('Goals');

        }

    async Check_Goal_Tabs_According_To_Roles(page) {
        const goals_page = new Goals_Locators(page);
        const login_keywords = new Login_Keywords();
        const role = await login_keywords.Return_Employee_Role(page);
        if (role === 'HR') {
            await expect(goals_page.organization_tab).toBeVisible();
        } else if (role === 'Manager' || role === 'Engineering Manager') {
            await expect(goals_page.my_approvals_tab).toBeVisible();
        } else if (role === 'Employee') {
            await expect(goals_page.my_goals_tab).toBeVisible();
        }
    }

    async Click_On_Add_Goals_Button(page){
        const goals_page = new Goals_Locators(page);
        if (goals_page.goals_dashboaerd_rows){
            await goals_page.add_goals_button.click();
            await page.waitForLoadState('networkidle');
            await expect(goals_page.add_goals_header).toHaveText('Employee Details');
        }

        else{
            await goals_page.add_goals_button.click();
            await expect(goals_page.goals_alert_popup).toBeVisible();
        }
       
        
    }
}

module.exports = {Goals_Keywords};