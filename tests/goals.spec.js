const {test , expect} =  require('@playwright/test');
const {Goals_Keywords} = require('../action/goals_keywords.js');
const {Login_Keywords} = require('../action/login_keywords.js');
const {Appraisal_Keywords} = require('../action/appraisal_keywords.js');
const data_set = require('../testdata/login.json');
const goals_data = require('../testdata/goals.json');

const login_keywords = new Login_Keywords();
const goals_keywords = new Goals_Keywords();
const appraisal_keywords = new Appraisal_Keywords();

// Run this hook before each test --> same as suit setup in robot framework
test('@IMP TC_01 Navigate to the Goals Page and validate that HR is able to see Organization tab. Also Add goals for the logged In user', async({page})=>
{
    await login_keywords.Login_To_Optra(page,data_set.TC_01.username,data_set.TC_01.password); 
    const role = await login_keywords.Return_Employee_Role(page);
    await goals_keywords.navigateToGoalsPage(page);
    await page.waitForTimeout(5000);
    await goals_keywords.Check_Goal_Tabs_According_To_Roles(page,role);
    await goals_keywords.Click_On_Add_Goals_Button(page);
    await goals_keywords.Add_Goals(page,goals_data.TC_02.goals_value);
    await goals_keywords.Save_And_Submit_Goals(page);
});

test('TC_02 Switch to Organization tab and validate total pending goals for the organization', async({page})=>
{
    await login_keywords.Login_To_Optra(page,data_set.TC_01.username,data_set.TC_01.password);
    const role =  await login_keywords.Return_Employee_Role(page);
    await goals_keywords.navigateToGoalsPage(page);
    await page.waitForLoadState('domcontentloaded');
    await goals_keywords.Switch_To_Organization_Tab(page,role);
    await goals_keywords.Validate_Pending_Goals_Count(page);
    
});

test('TC_03 Switch to Organization tab and validate total goals filled for the organization', async({page})=>
{
    await login_keywords.Login_To_Optra(page,data_set.TC_01.username,data_set.TC_01.password);
    const role =  await login_keywords.Return_Employee_Role(page);
    await goals_keywords.navigateToGoalsPage(page);
    await page.waitForLoadState('domcontentloaded');
    await goals_keywords.Switch_To_Organization_Tab(page,role);
    await goals_keywords.Validate_Total_Goals_Filled_Count(page);
});

test('TC_04 Verify Copy goals from last cycle displays accurate data from previous goals cycle', async({page}) => {

    await login_keywords.Login_To_Optra(page,data_set.TC_02.username,data_set.TC_02.password);
    await goals_keywords.navigateToGoalsPage(page);
    await page.waitForLoadState('domcontentloaded');
    await goals_keywords.Add_Goals_From_Last_Cycle(page);
    await goals_keywords.Select_Goals_from_Last_Cycle(page);
    await goals_keywords.Validate_Copied_Goals_Data(page);
});

test('TC_06 Verify attaching a pdf display its name under PDF with proof of goals', async({page}) => {

    await login_keywords.Login_To_Optra(page,data_set.TC_06.username,data_set.TC_06.password);
    await goals_keywords.navigateToGoalsPage(page);
    await goals_keywords.Click_On_Add_Goals_Button(page);
    await goals_keywords.Attach_PDF_Under_Goals(page);
    await goals_keywords.Attach_PDF_And_Validate(page, goals_data.TC_06.filepath);
});

test('TC_07Verify employee should not be able to add text in the Manager Comments', async ({page}) => {

    await login_keywords.Login_To_Optra(page,data_set.TC_01.username,data_set.TC_01.password);
    const role = await login_keywords.Return_Employee_Role(page);
    await goals_keywords.navigateToGoalsPage(page);
    await goals_keywords.Check_Goal_Tabs_According_To_Roles(page,role);
    await goals_keywords.Click_On_Add_Goals_Button(page);
    await goals_keywords.Add_Goals(page,goals_data.TC_02.goals_value);
    await goals_keywords.Save_And_Submit_Goals(page);
    await goals_keywords.Click_On_First_Edit_Goals_Button(page);
    await goals_keywords.Validate_Manager_Comments_Non_Editable(page);
});

// Delete goal from backend 
test('@IMP TC_08 Delete a goal from the backend for solving the issue of data dependency', async({page}) => {
    await login_keywords.Login_To_Optra(page,goals_data.TC_07.username,goals_data.TC_07.password);
    const backend_page = await appraisal_keywords.navigateToAppraisalPage(page);
    await backend_page.waitForLoadState('networkidle');
    await appraisal_keywords.Search_Goal_In_Appraisal(backend_page,goals_data.TC_07.form_name);
    await appraisal_keywords.Delete_Goal_From_Backend(backend_page,goals_data.TC_07.emp_name);
});

test('TC_09 Verify that the Manager is able to add comments in the Manager Comments and approve an employee goal', async({page}) => {
    await login_keywords.Login_To_Optra(page,goals_data.TC_09.username,goals_data.TC_09.password);
    const role = await login_keywords.Return_Employee_Role(page);
    await goals_keywords.navigateToGoalsPage(page);
    await goals_keywords.Check_Goal_Tabs_According_To_Roles(page,role);
    await goals_keywords.Switch_To_My_Approvals_Tab(page,role);
    await goals_keywords.Click_On_First_Edit_Goals_Button(page);
    await goals_keywords.Add_Manager_Comments(page,goals_data.TC_09.comment);
    await goals_keywords.Approve_Goal_As_Manager(page); 
});


    
