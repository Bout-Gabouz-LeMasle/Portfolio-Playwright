import { expect, type Locator, type Page} from "@playwright/test";

export class CommonPage
{
    readonly page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }   

    async goto()
    {
        await this.page.goto('/',{ waitUntil: 'domcontentloaded' });
    }

    async closeBrowser()
    {
        await this.page.close();
    } 
}