import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import * as allure from 'allure-js-commons';
import { CommonPage } from "./CommonPage";

export class WelcomePage extends CommonPage
{
    readonly shopMenu: Locator;
    readonly homeLink: Locator;
    readonly contactLink: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly signinLink: Locator;
    readonly aboutusLink: Locator;

    readonly category: Locator;
    readonly phonesCategory: Locator;
    readonly laptopsCategory: Locator;
    readonly monitorsCategory: Locator;

    constructor(page: Page)
    {
        super(page);
        this.shopMenu = page.locator('#navbarExample');
        this.homeLink = this.shopMenu.locator('.nav-link[href="index.html"]');
        this.contactLink = this.shopMenu.locator('[data-target="#exampleModal"]');
        this.cartLink = this.shopMenu.locator('#cartur');
        this.loginLink = this.shopMenu.locator('#login2');
        this.signinLink = this.shopMenu.locator('#signin2');
        this.aboutusLink = this.shopMenu.locator('[data-target="#videoModal"]');
        this.category = page.locator('.list-group').filter({ has: page.locator('#cat') });
        this.phonesCategory = this.category.locator('[onclick="byCat(\'phone\')"]');
        this.laptopsCategory = this.category.locator('[onclick="byCat(\'notebook\')"]');
        this.monitorsCategory = this.category.locator('[onclick="byCat(\'monitor\')"]');
    }

    /**
     * This method is used to verify the title of the page.
     * @param title This is the expected title of the page.
     */
    async verifyTitle(title: RegExp)
    {
        await expect(this.page).toHaveTitle(title);
    }

    /**
     * This method is used to verify the visibility of the menu items.
     */
    async verifyMenuVisibility()
    {
        await allure.step("Verify is menu visible", async () => {
            await expect.soft(this.shopMenu, "The menu bar should be visible").toBeVisible();
            await expect.soft(this.homeLink, "The Home link should be visible").toBeVisible();
            await expect.soft(this.contactLink, "The Contact link should be visible").toBeVisible();
            await expect.soft(this.cartLink, "The Cart link should be visible").toBeVisible();
            await expect.soft(this.signinLink, "The Sign In link should be visible").toBeVisible();
            await expect.soft(this.aboutusLink, "The About Us link should be visible").toBeVisible();
            await expect.soft(this.loginLink, "The Login link should be visible").toBeVisible();
        });
    }
    
    /**
     * This method is used to navigate through the menu items.
     * @param menuName This is the name of the menu to navigate to.
     */
    async navigateMenu(menuName: 'home' | 'contact' | 'cart' | 'signup' | 'about' | 'login' = 'home')
    {
        await allure.step(`Navigate to the menu : ${menuName}`, async () => 
        {
            switch (menuName) 
            {
                case 'contact':
                    await this.contactLink.click();
                    break;
                case 'cart':
                    await this.cartLink.click();
                    break;
                case 'login':
                    await this.loginLink.click();
                    break;
                case 'signup':
                    await this.signinLink.click();
                    break;
                case 'home':
                    await this.homeLink.click();
                    break;
                case 'about':
                    await this.aboutusLink.click();
                    break;
                default:
                    throw new Error(`The menu ${menuName} does not exist.`);
                    break
            }
        });
    }

    /**
     * This method is used to navigate to a specific category.
     * @param categoryName This is the name of the category to navigate to.
     */
    async navigateCategory(categoryName: string)
    {
        await allure.step(`Navigate to the category : ${categoryName}`, async () =>
        {
            switch (categoryName) 
            {
                case 'phones': 
                    await this.phonesCategory.click();
                    break; 
                case 'laptops':
                    await this.laptopsCategory.click();
                    break;
                case 'monitors':
                    await this.monitorsCategory.click();
                    break;  
                default:
                    throw new Error(`The category ${categoryName} does not exist.`);
                    break;
            }
        });
    }
}