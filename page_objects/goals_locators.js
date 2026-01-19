const { expect } = require("@playwright/test");
const data_set = require('../testdata/goals.json');


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
        this.goals_dashboard_rows = page.locator('//div[@class = "empty-text"]');
        this.goals_alert_popup = page.getByRole('alert');
        this.edit_goals_button = page.locator('//div[@aria-colindex="6" and not(@role = "columnheader")]//button');
        // this.manager_comments_field = page.locator('//span[contains(text(),"Comments:")]//following::div');
        this.manager_comments_field = page.locator('//div[contains(text(),"No manager comments available")]');
        

        // Inside the goals page:
        this.goals_ongoing_status = page.locator('//span[text()="Ongoing"]');
        this.goals_grid_view = page.getByRole('grid');
        this.select_goals_dropdown = page.locator('//div[@role="gridcell"]//select');
        this.delivery_qulity_option = page.locator("//option[@value = '${value}']");  //value to be replaced with actual value 
        this.delivery_description= page.locator('//textarea');
        this.goal_start_date = page.locator('//div[@aria-rowindex="2"]//div[@aria-colindex="3"]/div');    //change the aria row index for different rows
        this.goals_from_date = page.locator('//span[text()= "From Date:"]//following-sibling::span');
        this.goals_success_criteria = page.locator('//div[@aria-rowindex="2"]//div//child::input[@type="text" and @value ="${success_criteria}" ]')    //value to be given from the specs file
        this.goals_success_or_comment = page.locator('//div[@aria-rowindex="2"]//div//child::input[@type="text"]');      //change the aria row index for different rows
        this.goals_progress = page.locator('//div[@aria-rowindex="2"]//div//child::input[@type="number"]');    //change the aria row index for different rows
        this.goals_save_draft_button = page.locator('//button[text()="Save Draft"]');
        this.goals_popup = page.getByRole('alert');
        this.goals_submit_button = page.locator('//button[text()="Submit Goals"]');
        this.add_goals_validation = page.locator('//div[@aria-rowindex="2"]');
        this.copy_goals_from_last_cycle_option = page.locator('//span[contains(text(),"Copy Goals from Last Cycle")]')
        this.goals_checkbox_dynamic_desc = (desc) => page.locator(`//span[@title ="${desc}"]//parent::div//preceding::div[@role="gridcell"]//input[@type="checkbox"]`);
        this.last_cycle_add_goals_button = page.locator('//button[text()= "Add Goals"]');
        this.goals_description = page.locator('//div[@aria-colindex="2" and not(@role="columnheader")]//span')
        this.goals_attach_pdf_button = page.locator('//button[text()="Attach"]');
        this.goals_view_attachments_button = page.locator('//button[text()= " View Attachment"]');


        // Organizational Goals 
        this.org_goals_dashboard_header = page.locator('//div/h3[contains(text(),"Cycle Summary")]');
        this.card_count = (cardname) => page.locator(`//div[contains(@class,"grid grid-cols-2")]/div//p[contains(text(),"${cardname}")]//preceding-sibling::p`);           // card title to be given from json file and count to be verified
        this.goals_table = page.locator('.custom-table-wrapper');
        this.goals_status = page.locator('//div[@aria-colindex="2" and not (@role="columnheader")]');
        this.pdf_upload_input = page.locator('input[type="file"]');  // Locator for PDF upload input
        


    }
}


module.exports = {Goals_Locators};