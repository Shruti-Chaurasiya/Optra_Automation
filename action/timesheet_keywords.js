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

    // async logTimeInTimesheet(page,date) {
    //     const timesheet_page = new Timesheet_Locators(page);

    //     await timesheet_page.timesheet_month_dropdown.selectOption(date);
    //     if (await (timesheet_page.timesheet_status).first().textContent() === 'Pending') 
    //         {
    //             await timesheet_page.timesheet_logtime_button.click();
    //         }

        

    // need to get the month and year in the dropdown onn the ui and check if the date string is same as the date on the dd of uui 
// }
}

module.exports = {Timesheet_Keywords};