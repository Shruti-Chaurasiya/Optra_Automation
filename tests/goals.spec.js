const {test , expect} = require('@playwright/test');
const {Goals_Keywords} = require('../action/goals_keywords.js');
const {Login_Keywords} = require('../action/login_keywords.js');
  
const login_keywords = new Login_Keywords();
const goals_keywords = new Goals_Keywords();

// Run this hook before each test --> same as suit setup in robot framework
test('Navigate to the Goals Page and validate that HR is able to see Organization tab', async({page})=>
{
    await login_keywords.Login_To_Optra(page); 
    await login_keywords.Return_Employee_Role(page);
    await goals_keywords.navigateToGoalsPage(page);
    await page.waitForTimeout(5000);
    await goals_keywords.Check_Goal_Tabs_According_To_Roles(page);
    await goals_keywords.Click_On_Add_Goals_Button(page);
});