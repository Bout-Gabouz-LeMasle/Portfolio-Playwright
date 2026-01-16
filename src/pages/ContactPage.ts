import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import { CommonPage } from "./CommonPage";
import * as allure from 'allure-js-commons';

export class ContactPage extends CommonPage
{
    readonly contactPopin: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly messageInput: Locator;
    readonly sendMessageButton: Locator;

    constructor(page: Page)
    {
        super(page);
        this.contactPopin = page.locator('#exampleModal');
        this.emailInput = this.contactPopin.locator('#recipient-email');
        this.nameInput = this.contactPopin.locator('#recipient-name');
        this.messageInput = this.contactPopin.locator('#message-text');
        this.sendMessageButton = this.contactPopin.locator('[onclick="send()"]');
    }

    /**
     * This method is used to verify the contact popin is visible.
     */
    async verifyContactPopinVisibility()
    {
        await expect(this.contactPopin).toBeVisible();
    }   

    /**
     * This method is used to fill the contact form.
     * @param email - The email to fill in the contact form.    
     * @param name - The name to fill in the contact form.
     * @param message - The message to fill in the contact form.
     */
    async fillContactForm(email: string, name: string, message: string)
    {
        await allure.step("Fill contact form", async () => 
        {
            await this.emailInput.fill(email);
            await this.nameInput.fill(name);
            await this.messageInput.fill(message);
        });
    }

    /**
     * This method is used to send the contact message.
     */
    async sendMessage()
    {
        await allure.step("Send contact message", async () =>
        {
            await this.sendMessageButton.click();
        await expect(this.contactPopin).toBeHidden();
        });
    }
}