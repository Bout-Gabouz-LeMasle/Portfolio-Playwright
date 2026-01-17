import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import * as allure from 'allure-js-commons';
import { CommonPage } from "./CommonPage";

export class CartPage extends CommonPage
{
    readonly cartTable: Locator;
    readonly rowOnTable: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page)
    {
        super(page);
        this.cartTable = page.locator('#tbodyid');
        this.rowOnTable = this.cartTable.locator('.success');
        this.totalPrice = page.locator('#totalp');
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
    async verifyTotalPrice(expectedTotalPrice: string)
    {
        await allure.step("Verify total price in cart", async () =>
        {
            await expect(this.totalPrice, "The total price in cart should be " + expectedTotalPrice).toHaveText(expectedTotalPrice);
        });
    }
}