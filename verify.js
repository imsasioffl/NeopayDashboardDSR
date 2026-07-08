(async function (page, reqElement, xpathval, testdata, timeoutsec, assert) {

    try {

        // Wait for the element
        await reqElement.waitFor({ state: "attached", timeout: timeoutsec * 1000 });

        // Get tag name
        const tagName = await reqElement.evaluate(el => el.tagName.toLowerCase());

        let isChecked = false;

        if (tagName === "input") {
            // Native checkbox/radio
            isChecked = await reqElement.isChecked();
        } else {
            // Custom checkbox
            const className = await reqElement.getAttribute("class") || "";

            if (className.includes("checkbox-checked")) {
                isChecked = true;
            } else {
                // Fallback: check aria-checked if present
                const ariaChecked = await reqElement.getAttribute("aria-checked");
                isChecked = ariaChecked === "true";
            }
        }

        if (isChecked) {
            return "Success. Element is checked.";
        }

        throw new Error("Element is not checked.");

    } catch (err) {
        return "Failure. " + err.message;
    }

});
