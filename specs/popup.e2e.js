describe('Popup', () => {

    const pageUrl = `http://localhost:4000/`

    it('should be shown when page is loaded for first time', async () => {
        await browser.url(pageUrl);

        await expect($('#popup')).toBeExisting();
    });

    it('should contain a confirmation button', async () => {
        await browser.url(pageUrl);

        await expect($('#confirm-button')).toBeExisting();

    });

    it('should close once clicked on close button', async () => {
        await browser.url(pageUrl);

        const isDisplayed = await $('.modal-content').isDisplayed();
        expect(isDisplayed).toBe(true);

        const myButton = await $('.modal-content .close');
        await myButton.click();

        const isDisplayed2 = await $('.modal-content').isDisplayed();
        expect(isDisplayed2).toBe(false);        
    });

    it('should close once clicked outside the popup', async () => {
        await browser.url(pageUrl);

        const isDisplayed = await $('.modal-content').isDisplayed();
        expect(isDisplayed).toBe(true);

        const clickAnywhere = await $('#popup');
        await clickAnywhere.click();

        const isDisplayed2 = await $('#popup').isDisplayed();
        expect (isDisplayed2).toBe(false);

    });


    it('should not be shown when page is reloaded after confirmation', async () => {
        await browser.url(pageUrl);

        await expect($('#confirm-button')).toBeExisting();
        const myButton = await $('#confirm-button');

        await myButton.click();

        await browser.url(pageUrl);

        const isDisplayed = await $('#popup').isDisplayed();
        expect(isDisplayed).toBe(false);
        await browser.reloadSession();
    });

    it('should not be shown when page is loaded but it was already confirmed in past 10 minutes', async () => {
        await browser.url(pageUrl);

        await expect($('#confirm-button')).toBeExisting();
        const myButton = await $('#confirm-button');

        await myButton.click();

        await browser.newWindow(pageUrl);

        const isDisplayed = await $('#popup').isDisplayed();
        expect(isDisplayed).toBe(false);
    });

    /* please implement any additional scenario you consider as needed to ensure good test coverage */
});

