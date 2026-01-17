import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import * as allure from 'allure-js-commons';
import { CommonPage } from "./CommonPage";

export class CartPage extends CommonPage
{
    readonly cartTable: Locator;
    readonly rowOnTable: Locator;
    readonly totalPrice: Locator;
    readonly orderButton: Locator;

    readonly orderPopin: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly creditCardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;

    readonly orderConfirmationPopin: Locator;
    readonly orderConfirmationText: Locator;
    readonly orderConfirmationOkButton: Locator;

    constructor(page: Page)
    {
        super(page);
        this.cartTable = page.locator('#tbodyid');
        this.rowOnTable = this.cartTable.locator('.success');
        this.totalPrice = page.locator('#totalp');
        this.orderButton = page.locator('button[data-target="#orderModal"]');
        
        this.orderPopin = page.locator('#orderModal');
        this.nameInput = this.orderPopin.locator('#name');
        this.countryInput = this.orderPopin.locator('#country');
        this.cityInput = this.orderPopin.locator('#city');
        this.creditCardInput = this.orderPopin.locator('#card');
        this.monthInput = this.orderPopin.locator('#month');
        this.yearInput = this.orderPopin.locator('#year');
        this.purchaseButton = this.orderPopin.locator('button[onclick="purchaseOrder()"]');
        
        this.orderConfirmationPopin = page.locator('.sweet-alert');
        this.orderConfirmationText = this.orderConfirmationPopin.locator('h2');
        this.orderConfirmationOkButton = this.orderConfirmationPopin.locator('button.confirm');
    }

    /**
     * This method is used to verify the total price in the cart.
     * @param expectedProductName The expected product name
     * @param expectedProductPrice The expected product price
     */
    async verifyProductInCart(expectedProductName: string, expectedProductPrice: string)
    {
        await allure.step("Verify product " + expectedProductName + " in cart", async () =>
        {
            const productRow = this.rowOnTable.filter({ hasText: expectedProductName });
            await expect(productRow, "The product " + expectedProductName + " should be present in the cart").toBeVisible();

            const productName = productRow.locator('td').nth(1);
            const productPrice = productRow.locator('td').nth(2);

            await expect(productName, 
                "The product name in cart should be " + expectedProductName + ". But it is " + await productName.textContent())
                .toHaveText(expectedProductName);
            await expect(productPrice, 
                "The product price in cart should be " + expectedProductPrice).
                toHaveText(expectedProductPrice);
        });
    }

    /**
     * This method is used to verify the total price in the cart.
     * @param expectedTotalPrice The expected total price
     */
    async verifyTotalPrice(expectedTotalPrice: number)
    {
        await allure.step("Verify total price in cart", async () =>
        {
            await expect(this.totalPrice, "The total price in cart should be " + expectedTotalPrice).toHaveText(String(expectedTotalPrice));
        });
    }

    /**
     * This method is used to click on the Order button.
     */
    async clickOrderButton()
    {
        await allure.step("Click on Order button", async () =>
        {
            await expect(this.orderPopin).toBeHidden();
            await this.orderButton.click();
            await expect(this.orderPopin).toBeVisible();
        });
    }

    /**
     * This method is used to fill the order form.
     * @param name The name
     * @param country The country
     * @param city The city
     * @param creditCard The credit card
     * @param month The month
     * @param year The year
     */
    async fillOrderForm(name: string, country: string, city: string, creditCard: string, month: string, year: string)
    {
        await allure.step("Fill order form", async () =>
        {
            await this.nameInput.fill(name);
            await this.countryInput.fill(country);
            await this.cityInput.fill(city);
            await this.creditCardInput.fill(creditCard);
            await this.monthInput.fill(month);
            await this.yearInput.fill(year);
        });
    }

    /**
     * This method is used to click on the Purchase button.
     */
    async clickPurchaseButton()
    {
        await allure.step("Click on Purchase button", async () =>
        {
            await this.purchaseButton.click();
            await expect(this.orderConfirmationPopin).toBeVisible();
        });
    }

    /**
     * This method is used to verify the order confirmation.
     * @param confirmationText The expected confirmation text
     * @param name The name
     * @param priceText The expected price text
     */
    async verifyOrderConfirmation(confirmationText: string, name: string, priceText: string)
    {
        await allure.step("Verify order confirmation", async () =>
        {
            await expect(this.orderConfirmationText, "The order confirmation text should be correct")
                .toHaveText(confirmationText);
            await expect(this.orderConfirmationPopin.locator('p'), "The order confirmation price should be correct")
                .toContainText(priceText);
            await expect(this.orderConfirmationPopin.locator('p'), "The order confirmation name should be correct")
                .toContainText(name);
            await this.orderConfirmationOkButton.click();
            await expect(this.orderConfirmationPopin).toBeHidden();
        });
    }
}