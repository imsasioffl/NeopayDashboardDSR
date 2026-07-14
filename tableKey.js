(async function (page, reqElement, xpathval, testdata, timeoutsec, expect) {

    try {
// Card|Credit Adjustment|4198682470601740|100.00|784 
        const expected = testdata.split("|").map(x => x.trim());

        const rows = page.locator(`xpath=${xpathval}//tbody/tr[td]`);
        const rowCount = await rows.count();

        let found = false;

        for (let i = 0; i < rowCount; i++) {

            const cells = await rows.nth(i).locator("td").allTextContents();

            // Skip Select column (0) and ignore last auto-generated column
            const actual = cells.slice(1, 6).map(x => x.trim());

            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                found = true;
                break;
            }
        }

        await expect(found).toBeTruthy();

        // return "Success. Matching row found.";
        return `Success. Successfully verified the following values across the table row: ${expected.join(", ")}.`;

    } catch (err) {
        return "Failed : " + err.message;
    }

});
