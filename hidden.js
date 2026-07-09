(async function (page, reqElement, xpathval, testdata, timeoutSec) {
 
    console.log("Inside keyword Input - Hidden Field");
 
    try {
 
        await page.locator(xpathval).evaluate((element, value) => {
            element.value = value;
        }, testdata);
 
        return "Success - Hidden input value updated.";
 
    } catch (err) {
 
        return "Failure - " + err.message;
 
    }
 
});
