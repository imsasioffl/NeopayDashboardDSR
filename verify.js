// (async function (page, reqElement, xpathval, testdata, timeoutsec, assert) {

//     try {

//         const isChecked = await reqElement.evaluate(el => {

//             // Native checkbox/radio
//             if (el.tagName.toLowerCase() === "input") {
//                 return el.checked;
//             }

//             // Custom checkbox
//             const cls = el.className || "";
//             if (cls.includes("checkbox-checked")) {
//                 return true;
//             }

//             if (cls.includes("checkbox-unchecked")) {
//                 return false;
//             }

//             // aria-checked support
//             if (el.getAttribute("aria-checked") === "true") {
//                 return true;
//             }

//             return false;
//         });

//         if (isChecked) {
//             return "Success. Element is checked.";
//         }

//         return "Failure. Element is not checked.";

//     } catch (err) {
//         return "Failure. Error: " + err.message;
//     }

// });

// =====


(async function (page, reqElement, xpathval, testdata, timeoutSec) {
 
    console.log("Inside keyword Input - Textbox");
    console.log("Parameters:", xpathval, testdata, timeoutSec);
 
    try {
 
        // Normal textbox
        await reqElement.click();
        await reqElement.fill("");
        await reqElement.fill(testdata);
        await page.keyboard.press("Tab");
 
        return "Success - Successfully entered the value in the textbox";
 
    } catch (err) {
 
        try {
 
            await page.evaluate(({ xpathval, testdata }) => {
 
                const element = document.evaluate(
                    xpathval,
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                ).singleNodeValue;
 
                if (!element)
                    throw new Error("Element not found");
 
                // Update hidden/read-only element
                element.value = testdata;
 
                // Terra hidden textbox handling
                const visibleElement = document.getElementById("igtxt" + element.id);
 
                if (visibleElement) {
                    visibleElement.value = testdata;
 
                    visibleElement.dispatchEvent(new Event("input", {
                        bubbles: true
                    }));
 
                    visibleElement.dispatchEvent(new Event("change", {
                        bubbles: true
                    }));
                }
 
                element.dispatchEvent(new Event("input", {
                    bubbles: true
                }));
 
                element.dispatchEvent(new Event("change", {
                    bubbles: true
                }));
 
            }, { xpathval, testdata });
 
            await page.keyboard.press("Tab");
 
            return "Success - Successfully entered the value in the hidden textbox";
 
        } catch (err1) {
 
            console.log("Failure:", err1);
 
            return "Failure - Failed to enter value in textbox. Error: " + err1;
 
        }
 
    }
 
});
 
