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
 
    try {
 
        const element = await reqElement.elementHandle();
 
        const inputType = await element.evaluate(el => el.type);
 
        if (inputType === "hidden") {
 
            await page.evaluate(({ xpathval, testdata }) => {
 
                const ele = document.evaluate(
                    xpathval,
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                ).singleNodeValue;
 
                if (!ele)
                    throw new Error("Element not found");
 
                ele.value = testdata;
 
                ele.dispatchEvent(new Event("input", { bubbles: true }));
                ele.dispatchEvent(new Event("change", { bubbles: true }));
 
                const visible = document.getElementById("igtxt" + ele.id);
 
                if (visible) {
                    visible.value = testdata;
                    visible.dispatchEvent(new Event("input", { bubbles: true }));
                    visible.dispatchEvent(new Event("change", { bubbles: true }));
                    visible.dispatchEvent(new Event("blur", { bubbles: true }));
                }
 
            }, { xpathval, testdata });
 
        } else {
 
            await reqElement.fill("");
            await reqElement.fill(testdata);
            await page.keyboard.press("Tab");
 
        }
 
        return "Success";
 
    } catch (err) {
 
        return "Failure - " + err.message;
 
    }
 
});
 
