const {expect } = require('@playwright/test');
const {Timesheet_Locators} = require('../page_objects/timesheet_locators');
const { get } = require('node:http');
const { time } = require('node:console');

class Timesheet_Keywords {

    async navigateToTimesheetPage(page) {
        const timesheet_page = new Timesheet_Locators(page);
        await timesheet_page.timesheet_menu.click();
        await page.waitForLoadState('networkidle');
        await expect(timesheet_page.timesheet_dashboard).toBeVisible();
        await expect(timesheet_page.timesheet_dashboard).toHaveText('Timesheet');
        await timesheet_page.my_timesheet_tab.click();
    }

    async getCurrentMonthAndYear() {
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(currentDate);
        const todays_date = formattedDate.split(' ');
        const month = todays_date[0];
        const year = todays_date[2];
        console.log("Today's Month is: " + month);
        console.log("Today's Year is: " + year);
        const date_string = month + ' ' + year;
        return date_string;
    }

    async ClickOnLogTimeButton(page,date) {
        const timesheet_page = new Timesheet_Locators(page);

        await timesheet_page.timesheet_month_dropdown.selectOption(date);
        const count = await timesheet_page.timesheet_status.count();
        for (let i=0;i<count;i++){
            if (await (timesheet_page.timesheet_status).nth(i).textContent() === 'Pending') 
                {
                    await ((timesheet_page.timesheet_logtime_button).nth(i)).click();
                    break;
                }
        }
        await page.waitForLoadState('networkidle');
        await expect(timesheet_page.timesheet_header).toBeVisible();
    }

    async LogTimeInTimesheet(page) 
    {
        const timesheet_page = new Timesheet_Locators(page);
        for (let col_index=2; col_index<=11; col_index++) {
            const col_locator = await timesheet_page.timesheet_dynamic_col(col_index);
// col ko replace krna hai and fir usme value dalni hai and col pe iterate krke clicks krne hai
            
        }
    }

    
}

module.exports = {Timesheet_Keywords};