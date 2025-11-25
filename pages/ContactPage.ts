import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";

export class ContactPage
{
    readonly page: Page;
    readonly contactPopin: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.contactPopin = page.locator('#exampleModal');
    }

    async verifyContactPopinVisibility()
    {
        await this.contactPopin.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.contactPopin).toBeVisible();
    }   
}