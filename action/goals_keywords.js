const {expect} = require('@playwright/test');
const {Goals_Locators} = require('../page_objects/goals_locators');
const {Login_Keywords} = require('./login_keywords');
const { validateHeaderValue } = require('http');
const data_set = require('../testdata/goals.json');

class Goals_Keywords {
   
    async navigateToGoalsPage(page) {
        const goals_page = new Goals_Locators(page);
        await page.waitForLoadState('domcontentloaded');
        await goals_page.goals_menu.click();
        await page.waitForLoadState('networkidle');
        await expect(goals_page.goals_dashboard_header).toBeVisible();
        await expect(goals_page.goals_dashboard_header).toHaveText('Goals');

        }

    async Check_Goal_Tabs_According_To_Roles(page,role) {
        const goals_page = new Goals_Locators(page);
        const login_keywords = new Login_Keywords();
        if (role === 'HR') {
            await expect(goals_page.organization_tab).toBeVisible();
        } else if (role === 'Manager' || role === 'Engineering Manager') {
            await expect(goals_page.my_approvals_tab).toBeVisible();
        } else if (role === 'Employee') {
            await expect(goals_page.my_goals_tab).toBeVisible();
        }
        else if (role === 'HR' && role === 'Manager'){
            await expect(goals_page.organization_tab).toBeVisible();
            await expect(goals_page.my_approvals_tab).toBeVisible();
        }
    }

    async Click_On_Add_Goals_Button(page){
        const goals_page = new Goals_Locators(page);
        if (goals_page.goals_dashboard_rows){
            await goals_page.add_goals_button.click();
            await page.waitForLoadState('networkidle');
            await expect(goals_page.add_goals_header).toHaveText('Employee Details');
        }

        else{
            await goals_page.add_goals_button.click();
            await expect(goals_page.goals_alert_popup).toBeVisible();
        }
    }

    async Add_Goals(page){
        const goals_page = new Goals_Locators(page);
        await expect(goals_page.goals_ongoing_status).toBeVisible();
        await expect(goals_page.goals_grid_view).toBeVisible();
        //Click on the dropdown and select a goal
        await goals_page.select_goals_dropdown.click();
        const value  = data_set.goals_value;        //data  from goals 
        await goals_page.select_goals_dropdown.selectOption(value);
        
        // Description and date validation
        await expect(goals_page.delivery_description).toHaveText('Roll out and integrate the employee recognition framework, including digital and physical badges, to foster a culture of appreciation.');
        const start_date = await goals_page.goal_start_date.textContent();
        const from_date = await goals_page.goals_from_date.textContent();
        await expect(start_date).toBe(from_date);

        // Check the Success Criteria and Comments field (need to restart from hereeeeeeeeee)
        
        // const success_criteria="40 badges in FY 2025"
        // await goals_page.goals_success_criteria.click(success_criteria);
        // await expect(goals_page.goals_success_criteria).toContainText('40 badges in FY 2025');

        await (goals_page.goals_success_or_comment.last()).fill(data_set.comment);  

        // Progress for a goal
        await goals_page.goals_progress.fill(data_set.progress);

        // Click on Save Draft and Submit Button : 
        await goals_page.goals_save_draft_button.click();
        await expect(goals_page.goals_popup).toBeVisible();
        await expect(goals_page.goals_save_draft_button).toBeDisabled();
        await goals_page.goals_submit_button.click();
        await expect(goals_page.goals_popup).toBeVisible();
        await page.waitForLoadState('networkidle');
        await expect(goals_page.add_goals_validation).toBeVisible();
    }

    async Switch_To_Organization_Tab(page, role){
        const goals_page = new Goals_Locators(page);
        if (role === 'HR') {
            await goals_page.organization_tab.click();
            await expect(goals_page.organization_tab).toBeVisible();
        }
        else { 
            await expect(goals_page.organization_tab).toBeHidden();
        }

        // await goals_page.goals_table.scrollIntoViewIfNeeded();
        await page.waitForTimeout(5000);
    }

    async Validate_Pending_Goals_Count(page){
        const goals_page = new Goals_Locators(page);
        const count = await goals_page.goals_status.count();
        let pending_goals = 0;
        for (let i=0; i<=count;i++){
            goals_page.goals_status.nth(i).scrollIntoViewIfNeeded();
            if (await (goals_page.goals_status).nth(i).textContent() === 'Approval Pending'){
                pending_goals= pending_goals+1;
            }
            else{
                continue;
            }
        }
        console.log("Total Pending Goals are: " + pending_goals);
        await page.evaluate(() => window.scrollTo(0, 0));
        const card_count = await goals_page.card_count.textContent();
        console.log("Pending Goals count from Card is: " + card_count);
        await expect(parseInt(card_count)).toBe(pending_goals);
}
}

module.exports = {Goals_Keywords};