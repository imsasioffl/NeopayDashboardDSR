(async function (driver, reqElement, xpathval, testdata, timeoutSec, fieldtype) {

    try {

        const context = driver.context();
        const pageCount = context.pages().length;

        await reqElement.click();

        await driver.waitForEvent("popup", {
            timeout: Number(timeoutSec) * 1000
        }).catch(() => {});

        const pages = context.pages();

        if (pages.length > pageCount) {

            const newPage = pages[pages.length - 1];

            await newPage.waitForLoadState("domcontentloaded");
            await newPage.bringToFront();

            return newPage; // Use this page for subsequent verification

        }

        return driver;

    } catch (err) {

        return "Failure --- " + err.message;

    }

});


// =================================================================================================

/*

(async function (driver, reqElement, xpathval, testdata, timeoutSec, fieldtype) {

    try {

        // Click the button that may open a new window
        await reqElement.click();

        // Wait for the new page to be created
        await driver.waitForTimeout(2000);

        // Get all open pages
        const pages = driver.context().pages();

        if (pages.length > 1) {

            // Switch to the newest page
            const newPage = pages[pages.length - 1];

            await newPage.bringToFront();
            await newPage.waitForLoadState("domcontentloaded");

            return "Successfully switched to new window.";

        } else {

            return "No new window found.";

        }

    } catch (err) {

        return "Failure --- " + err.message;

    }

});

*/
