// content goes here ... 
(async function (page, reqElement, xpathval, testdata, timeoutsec, expect) {

    try {

        // Default Action
        let action = "click";
        let values = [];

        // Parse test data
        if (testdata && testdata.includes("|")) {

            const parts = testdata.split("|");

            action = parts[0].trim().toLowerCase();

            if (parts.length > 1) {
                values = parts[1]
                    .split(",")
                    .map(value => value.trim())
                    .filter(value => value !== "");
            }

        } else if (testdata) {

            action = testdata.trim().toLowerCase();
        }

        // Multiple Element Action
        if (values.length > 0) {

            for (const value of values) {

                const locator = page.locator(
                    xpathval.replace("${value}", value)
                );

                await locator.waitFor({ state: "visible" });
                await locator.scrollIntoViewIfNeeded();

                switch (action) {

                    case "doubleclick":
                        await locator.dblclick();
                        break;

                    case "rightclick":
                        await locator.click({ button: "right" });
                        break;

                    default:
                        await locator.click();
                        break;
                }

                console.log(`${action} performed on : ${value}`);
            }

            return `Success. ${action} performed on ${values.length} element(s).`;
        }

        // Single Element Action
        switch (action) {

            case "doubleclick":
                await reqElement.dblclick();
                break;

            case "rightclick":
                await reqElement.click({ button: "right" });
                break;

            default:
                await reqElement.click();
                break;
        }

        return `Success. ${action} performed successfully.`;

    } catch (err) {

        console.log("Failure ----", err);

        return "Failure. " + err.message;
    }

});
