import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import * as allure from 'allure-js-commons';
import { CommonPage } from "./CommonPage";

export class ProductDetailsPage extends CommonPage
{
    readonly bodyDetail: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page)
    {
        super(page);
        this.bodyDetail = page.locator('#tbodyid');
        this.productTitle = this.bodyDetail.locator('.name');
        this.productPrice = this.bodyDetail.locator('.price-container');
        this.addToCartButton = this.bodyDetail.locator('a[onclick="addToCart(1)"]');
    }

    /**
     * This method is used to verify the product details.
     * @param expectedTitle The expected title of the product.
     * @param expectedPrice The expected price of the product.
     */
    async verifyProductDetails(expectedTitle: string, expectedPrice: string)
    {
        await allure.step("Verify product details", async () =>
        {
            await expect(this.productTitle, "The product title should be correct").toHaveText(expectedTitle);
            await expect(this.productPrice, "The product price should be correct").toHaveText(expectedPrice);
        });
    }

    /**
     * This method is used to add the product to the cart.
     */
    async addToCart()
    {
        await allure.step("Add product to cart", async () =>
        {
            this.page.once('dialog', async dialog => {
                await dialog.accept();
         });
            await this.addToCartButton.click();
        });
    }
}