import { expect, FrameLocator, type Locator, type Page} from "@playwright/test";
import * as allure from 'allure-js-commons';
import {menus} from '../utils/Translation';

export class WelcomePage 
{
    readonly page: Page;
    readonly shopMenu: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.shopMenu = page.locator('#navbarExample');
    }

    async verifyTitle(title: RegExp)
    {
        await expect(this.page).toHaveTitle(title);
    }

    async verifyMenuVisibility(lang: 'fr' | 'en' = 'en')
    {
        const menuTexts = menus[lang];
        const allMenu = [
            { name: 'shopMenu', locator: this.shopMenu },
            { name: 'homeMenu', locator: this.shopMenu.getByRole('link', { name: menuTexts.home }) },
            { name: 'contactMenu', locator: this.shopMenu.getByRole('link', { name: menuTexts.contact }) },
            { name: 'cartMenu', locator: this.shopMenu.getByRole('link', { name: menuTexts.cart }) },
            { name: 'signupMenu', locator: this.shopMenu.getByRole('link', { name: menuTexts.signup }) },
            { name: 'aboutUsMenu', locator: this.shopMenu.getByRole('link', { name: menuTexts.about }) },
            { name: 'loginMenu', locator: this.shopMenu.getByRole('link', { name: menuTexts.login }) }
        ];

        await this.shopMenu.getByRole('link', { name: menuTexts.signup }).waitFor({ state: 'visible', timeout: 10000 });

        const failedMenus: string[] = [];
        for (const { name, locator } of allMenu)
            if (!(await locator.isVisible().catch(() => false))) 
                failedMenus.push(name);

        if (failedMenus.length === 0)
            allure.logStep("All menus are visible.");
        else
            expect(failedMenus, `Fails : Some menus are not : ${failedMenus.join(', ')}`).toHaveLength(0);
    }
    
    async navigateMenu(menuName: 'home' | 'contact' | 'cart' | 'signup' | 'about' | 'login' = 'home', lang: 'fr' | 'en' = 'en')
    {
        const menuTexts = menus[lang];
        const menuLocator = this.shopMenu.getByRole('link', { name: menuTexts[menuName] });

        await menuLocator.waitFor({ state: 'visible', timeout: 10000 });
        await menuLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}