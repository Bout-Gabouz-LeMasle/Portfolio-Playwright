import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class ContactPage extends CommonPage
{
    readonly contactPopin: Locator;

    constructor(page: Page)
    {
        super(page);
        this.contactPopin = page.locator('#exampleModal');
    }

    /**
     * This method is used to verify the contact popin is visible.
     */
    async verifyContactPopinVisibility()
    {
        await expect(this.contactPopin).toBeVisible();
    }   
}