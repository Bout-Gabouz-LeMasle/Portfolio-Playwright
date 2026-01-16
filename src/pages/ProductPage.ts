import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import * as allure from 'allure-js-commons';
import { CommonPage } from "./CommonPage";

export class ProductPage extends CommonPage
{
    constructor(page: Page)
    {
        super(page);
    }

    /**
     * This method is used to open the product details page.
     * @param productName This is the name of the product to open.
     */
    async selectProduct(productName: string)
    {
        await allure.step(`Open product details for ${productName}`, async () =>
        {
            const productLink = this.page.locator('.card-title').filter({ hasText: productName });
            await productLink.click();
        });
    }
}