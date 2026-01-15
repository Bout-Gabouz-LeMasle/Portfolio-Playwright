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
        await allure.step("Vérification de la visibilité des menus", async () => {
            await expect.soft(this.shopMenu, "La barre de menu devrait être visible").toBeVisible();
            await expect.soft(this.homeLink, "Le lien Home devrait être visible").toBeVisible();
            await expect.soft(this.contactLink, "Le lien Contact devrait être visible").toBeVisible();
            await expect.soft(this.cartLink, "Le lien Cart devrait être visible").toBeVisible();
            await expect.soft(this.signinLink, "Le lien Sign In devrait être visible").toBeVisible();
            await expect.soft(this.aboutusLink, "Le lien About Us devrait être visible").toBeVisible();
            await expect.soft(this.loginLink, "Le lien Login devrait être visible").toBeVisible();
        });
    }
    
    /**
     * This method is used to navigate through the menu items.
     * @param menuName This is the name of the menu to navigate to.
     */
    async navigateMenu(menuName: 'home' | 'contact' | 'cart' | 'signup' | 'about' | 'login' = 'home')
    {
        await allure.step(`Navigation vers le menu : ${menuName}`, async () => 
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
                    throw new Error(`Le menu ${menuName} n'existe pas.`);
                    break
            }
        });
    }
}