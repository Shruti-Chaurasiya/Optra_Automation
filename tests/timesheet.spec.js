const {test, expect} = require('@playwright/test');
const {Timesheet_Keywords} = require('../action/timesheet_keywords.js');
const {Login_Keywords} = require('../action/login_keywords.js');
const { time } = require('node:console');

const data_set = require('../testdata/login.json');
const timesheet_data = require('../testdata/timesheet_data.json');

const login_keywords = new Login_Keywords();
const timesheet_keywords = new Timesheet_Keywords();



test('@timesheet Navigate to the Timesheet Page and Validate the Page and log time in the timesheet' , async({page}) =>
{   
    await login_keywords.Login_To_Optra(page,data_set.TC_06.username,data_set.TC_06.password);
    await timesheet_keywords.navigateToTimesheetPage(page);
    const date = await timesheet_keywords.getCurrentMonthAndYear();
    await timesheet_keywords.ClickOnLogTimeButton(page,date);
    await timesheet_keywords.LogTimeInTimesheet(page,timesheet_data.TC_01.description);

    
});