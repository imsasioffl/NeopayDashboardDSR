// (async function (page, reqElement, xpathval, testdata, timeoutsec, expect) {

//     try {
// // Card|Credit Adjustment|4198682470601740|100.00|784 
//         const expected = testdata.split("|").map(x => x.trim());

//         const rows = page.locator(`xpath=${xpathval}//tbody/tr[td]`);
//         const rowCount = await rows.count();

//         let found = false;

//         for (let i = 0; i < rowCount; i++) {

//             const cells = await rows.nth(i).locator("td").allTextContents();

//             // Skip Select column (0) and ignore last auto-generated column
//             const actual = cells.slice(1, 6).map(x => x.trim());

//             if (JSON.stringify(actual) === JSON.stringify(expected)) {
//                 found = true;
//                 break;
//             }
//         }

//         await expect(found).toBeTruthy();

//         // return "Success. Matching row found.";
//         return `Success. Successfully verified the following values across the table row: ${expected.join(", ")}.`;

//     } catch (err) {
//         return "Failed : " + err.message;
//     }

// });


// ==================================

(async function (page, reqElement, xpathval, testdata, timeoutsec, expect) {

    console.log("Inside Keyword - Verify Table Row");
    console.log("XPath :", xpathval);
    console.log("Test Data :", testdata);

    try {

        const expected = testdata.split("|").map(value => value.trim());

        // Read table headers once
        const headers = (await page.locator(`xpath=${xpathval}//th`).allTextContents())
            .map(header => header.trim())
            .filter(header =>
                header !== "" &&
                header.toLowerCase() !== "select" &&
                header.toLowerCase() !== "order entered"
            );

        console.log("Headers :", headers);

        const rows = page.locator(`xpath=${xpathval}//tbody/tr[td]`);
        const rowCount = await rows.count();

        console.log("Total Rows :", rowCount);

        let rowFound = false;

        for (let i = 0; i < rowCount; i++) {

            const cells = (await rows.nth(i).locator("td").allTextContents())
                .map(cell => cell.trim());

            // Ignore first column (Select)
            // Ignore last column (Order Entered)
            const actual = cells.slice(1, cells.length - 1);

            console.log(`Row ${i + 1} :`, actual);

            if (actual.length !== expected.length)
                continue;

            let matched = true;

            for (let j = 0; j < expected.length; j++) {

                if (actual[j] !== expected[j]) {
                    matched = false;
                    break;
                }

            }

            if (matched) {

                rowFound = true;

                const verifiedMsg = headers
                    .map((header, index) => `${header} = ${expected[index]}`)
                    .join(", ");

                return `Success. Successfully verified the row values. ${verifiedMsg}`;

            }

        }

        await expect(rowFound).toBeTruthy();

        return "Failed. Expected row was not found in the table.";

    }
    catch (err) {

        return "Failed. Error while verifying table row. " + err.message;

    }

});
