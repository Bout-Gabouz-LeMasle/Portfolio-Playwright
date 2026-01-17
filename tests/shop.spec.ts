import {test, expect} from '@playwright/test';
import { WelcomePage } from '../src/pages/WelcomePage';
import { CommonPage } from '../src/pages/CommonPage';
import * as allure from 'allure-js-commons';
import { ContactPage } from '../src/pages/ContactPage';
import { ProductPage } from '../src/pages/ProductPage';
import { ProductDetailsPage } from '../src/pages/ProductDetailsPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('E-Commerce - Shopping experiencen @Ecommerce', () => 
{
    test('Contact @Contact', async ({page}) =>
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

        await test.step('Then I fill the contact form', async () => {
            await contactPage.fillContactForm('test@test.com', 'test tester', 'This is a test message')
        });

        await test.step('And I send the message', async () => {
            await contactPage.sendMessage()
        });
    });

    test('Shop @Shop', async ({page}) =>
    {
        const welcomePage = new WelcomePage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const cartPage = new CartPage(page);
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

        await test.step('And I click on the category ', async() => {
            await welcomePage.navigateCategory('phones')
        });

        await test.step('When I select the product', async() => {
            await productPage.selectProduct('Samsung galaxy s6');
        });

        await test.step('And I verify the product details', async() => {
            await productDetailsPage.verifyProductDetails('Samsung galaxy s6', '$360 *includes tax');
        });

        await test.step('And I add the product to the cart', async() => {
            await productDetailsPage.addToCart();
        });

        await test.step('And I go to the cart page', async() => {
            await welcomePage.navigateMenu("cart");
        });

        await test.step('Then I verify the products in the cart', async() => {
            await cartPage.verifyProductInCart('Samsung galaxy s6', '360');
        });

        await test.step('Given I go back to the home page', async() => {
            await welcomePage.navigateMenu("home");
        });

        await test.step('When I select the product', async() => {
            await productPage.selectProduct('Samsung galaxy s7');
        });

        await test.step('And I verify the product details', async() => {
            await productDetailsPage.verifyProductDetails('Samsung galaxy s7', '$800 *includes tax');
        });

        await test.step('And I add the product to the cart', async() => {
            await productDetailsPage.addToCart();
        });

        await test.step('And I go to the cart page', async() => {
            await welcomePage.navigateMenu("cart");
        });

        await test.step('Then I verify the products in the cart', async() => {
            await cartPage.verifyProductInCart('Samsung galaxy s6', '360');
            await cartPage.verifyProductInCart('Samsung galaxy s7', '800');
        });

        await test.step('And I verify the total price in the cart', async() => {
            await cartPage.verifyTotalPrice('1160');
        });
    });
});