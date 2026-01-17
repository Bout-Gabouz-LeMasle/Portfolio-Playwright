import {test, expect} from '@playwright/test';
import { WelcomePage } from '../src/pages/WelcomePage';
import { CommonPage } from '../src/pages/CommonPage';
import * as allure from 'allure-js-commons';
import { ContactPage } from '../src/pages/ContactPage';
import { ProductPage } from '../src/pages/ProductPage';
import { ProductDetailsPage } from '../src/pages/ProductDetailsPage';
import { CartPage } from '../src/pages/CartPage';
import productsJson from './data/products.json';
import { ProductsData } from '../src/interfaces/ProductsData';
const productsData = productsJson as Record<string, ProductsData>;

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
        let totalPrice = 0;

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
            await welcomePage.navigateCategory(productsData.S6.category)
        });

        await test.step('When I select the product', async() => {
            await productPage.selectProduct(productsData.S6.name);
        });

        await test.step('And I verify the product details', async() => {
            await productDetailsPage.verifyProductDetails(productsData.S6.name, `$${productsData.S6.price} *includes tax`);
        });

        await test.step('And I add the product to the cart', async() => {
            await productDetailsPage.addToCart();
        });

        await test.step('And I go to the cart page', async() => {
            await welcomePage.navigateMenu("cart");
        });

        await test.step('Then I verify the products in the cart', async() => {
            await cartPage.verifyProductInCart(productsData.S6.name, productsData.S6.price);
        });

        await test.step('Given I go back to the home page', async() => {
            await welcomePage.navigateMenu("home");
        });

        await test.step('When I select the product', async() => {
            await productPage.selectProduct(productsData.S7.name);
        });

        await test.step('And I verify the product details', async() => {
            await productDetailsPage.verifyProductDetails(productsData.S7.name, `$${productsData.S7.price} *includes tax`);
        });

        await test.step('And I add the product to the cart', async() => {
            await productDetailsPage.addToCart();
        });

        await test.step('And I go to the cart page', async() => {
            await welcomePage.navigateMenu("cart");
        });

        for (const product of Object.values(productsData)) 
        {
            await test.step(`Then I verify the product ${product.name} in the cart`, async() => {
                await cartPage.verifyProductInCart(product.name, product.price);
                totalPrice += parseInt(product.price);
            });
        }

        await test.step('And I verify the total price in the cart', async() => {
            await cartPage.verifyTotalPrice(totalPrice);
        });

        await test.step('Given I click on the Order button', async() => {
            await cartPage.clickOrderButton();
        });

        await test.step('When I fill the order form', async() => {
            await cartPage.fillOrderForm('Test User', 'Test Country', 'Test City', '123456789', '12', '2025');
        });

        await test.step('And I click on the Purchase button', async() => {
            await cartPage.clickPurchaseButton();
        });

        await test.step('Then I verify the order confirmation', async() => {
            await cartPage.verifyOrderConfirmation('Thank you for your purchase!', 'Test User', '1160');
        });
    });
});