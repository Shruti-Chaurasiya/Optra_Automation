const {expect} = require('@playwright/test');
const {Appraisal_Locators} = require('../page_objects/appraisal_locators');
const {Login_Keywords} = require('./login_keywords');
const { validateHeaderValue } = require('http');
const data_set = require('../testdata/goals.json');
const { time } = require('console');


class Appraisal_Keywords {
   
    async navigateToAppraisalPage(page) {
        const appraisal_page = new Appraisal_Locators(page);
        await page.waitForLoadState('domcontentloaded');
        
        // Wait for new page to open when clicking Appraisal menu
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            appraisal_page.appraisal_menu.click()
        ]);
        
        await newPage.waitForLoadState('networkidle');
        const backend_page = new Appraisal_Locators(newPage);
        await expect(backend_page.appraisal_header).toBeVisible();

        return newPage;  // Return the new page
        }

    async Search_Goal_In_Appraisal(page, form_name) {
        const appraisal_page = new Appraisal_Locators(page);
        await page.waitForLoadState('networkidle');
        await appraisal_page.appraisal_search_field.fill(form_name);
        await page.waitForTimeout(500);  // Wait for search results
        await appraisal_page.appraisal_search_option.first().click();
        await page.waitForLoadState('networkidle');
    }
    
    async Delete_Goal_From_Backend(page, emp_name){
        const appraisal_page = new Appraisal_Locators(page);
        await page.waitForLoadState('networkidle');
        
        // Click on employee name field and search
        await appraisal_page.employee_name_field.last().click();
        await appraisal_page.employee_name_field.last().fill(emp_name);
        await page.waitForTimeout(500);
        
        await appraisal_page.emp_name(emp_name).click();
        await expect(appraisal_page.emp_name(emp_name)).toBeVisible();

        await appraisal_page.menu_button.click();
        await page.waitForTimeout(500);

    //     await Promise.all([
    //     page.once('dialog', dialog => dialog.accept()),
    //     appraisal_page.delete_option.click()
    // ]);
        await appraisal_page.delete_option.click();
        page.on('dialog' , dialog => dialog.accept());
        

    }


}

module.exports = {Appraisal_Keywords};