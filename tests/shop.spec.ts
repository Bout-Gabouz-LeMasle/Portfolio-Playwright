import {test, expect} from '@playwright/test';
import { WelcomePage } from '../src/pages/WelcomePage';
import { CommonPage } from '../src/pages/CommonPage';
import * as allure from 'allure-js-commons';
import { ContactPage } from '../src/pages/ContactPage';

test.describe('E-Commerce - Shopping experience', () => 
{
    test('Contact', async ({page}) =>
    {
        const welcomePage = new WelcomePage(page);
        const contactPage = new ContactPage(page);
        const commonPage = new CommonPage(page);

        await allure.epic('Site Web Demoblaze');      
        await allure.feature('Panier');
        await allure.owner('Boutheina');
        await allure.tag('Critical');

        await test.step('Given I open the product store page', async() => {
            await commonPage.goto()
        });

        await test.step('And I verify the product store title on browser', async() => {
            await welcomePage.verifyTitle(/store/i)
        });

        await test.step('And I verify that the menu items are visible', async() => {
            await welcomePage.verifyMenuVisibility()
        });

        await test.step('When I navigate to the contact page', async() => {
            await welcomePage.navigateMenu('contact')
        });

        await test.step('And I verify the contact popin is displayed', async () => {
            await contactPage.verifyContactPopinVisibility()
        });
    }); 
});