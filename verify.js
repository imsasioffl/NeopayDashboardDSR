(async function (page, reqElement, xpathval, testdata, timeoutsec, assert) {

    try {

        const isChecked = await reqElement.evaluate(el => {

            // Native checkbox/radio
            if (el.tagName.toLowerCase() === "input") {
                return el.checked;
            }

            // Custom checkbox
            const cls = el.className || "";
            if (cls.includes("checkbox-checked")) {
                return true;
            }

            if (cls.includes("checkbox-unchecked")) {
                return false;
            }

            // aria-checked support
            if (el.getAttribute("aria-checked") === "true") {
                return true;
            }

            return false;
        });

        if (isChecked) {
            return "Success. Element is checked.";
        }

        return "Failure. Element is not checked.";

    } catch (err) {
        return "Failure. Error: " + err.message;
    }

});
