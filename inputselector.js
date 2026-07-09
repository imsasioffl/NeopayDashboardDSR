async function (page, reqElement, xpathval, testdata, timeoutSec) {

    console.log("Inside keyword Input - Textbox (JS Executor)");
    console.log("Parameters:", xpathval, testdata, timeoutSec);

    try {

        const result = await page.evaluate(({ xpathval, testdata }) => {

            const element = document.evaluate(
                xpathval,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;

            if (!element) {
                return { status: "fail", reason: "Element not found for xpath: " + xpathval };
            }

            // Use native setter to bypass any overridden 'value' property
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, "value"
            ).set;

            nativeInputValueSetter.call(element, testdata);

            // Fire events so any listeners / framework bindings pick up the change
            element.dispatchEvent(new Event("focus", { bubbles: true }));
            element.dispatchEvent(new Event("input", { bubbles: true }));
            element.dispatchEvent(new Event("change", { bubbles: true }));
            element.dispatchEvent(new Event("blur", { bubbles: true }));

            // Also patch companion hidden field(s) if present - Terra pattern
            const hiddenId = element.id.replace(/^igtxt/, "");
            const hiddenElement = document.getElementById(hiddenId);

            if (hiddenElement && hiddenElement !== element) {
                const hiddenSetter = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype, "value"
                ).set;
                hiddenSetter.call(hiddenElement, testdata);
                hiddenElement.dispatchEvent(new Event("input", { bubbles: true }));
                hiddenElement.dispatchEvent(new Event("change", { bubbles: true }));
            }

            return {
                status: "success",
                appliedValue: element.value,
                hiddenValue: hiddenElement ? hiddenElement.value : null
            };

        }, { xpathval, testdata });

        if (result.status === "fail") {
            return "Failure - " + result.reason;
        }

        // Verification step - don't trust blindly
        const verify = await page.evaluate((xpathval) => {
            const el = document.evaluate(
                xpathval, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
            ).singleNodeValue;
            return el ? el.value : null;
        }, xpathval);

        if (verify !== testdata) {
            return "Failure - Value not reflected in DOM after set. Expected: " + testdata + ", Found: " + verify;
        }

        await page.keyboard.press("Tab");

        return "Success - Successfully entered value via JS executor. Value: " + verify;

    } catch (err) {
        console.log("Failure:", err);
        return "Failure - JS executor failed. Error: " + err;
    }

}
