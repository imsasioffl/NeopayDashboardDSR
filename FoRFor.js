(async function (mdriver, reqElement, xpathval, testdata, timeoutSec, fieldtype) {

    try {

        const fs = require("fs").promises;

        // Expected Input:
        // verifyText||c:/user/desktop/file.txt::4367364893847554|12216|8292|6011

        const [, remaining] = testdata.split("||");

        if (!remaining) {
            throw new Error("Invalid test data format.");
        }

        const [filePath, searchData] = remaining.split("::");

        if (!filePath || !searchData) {
            throw new Error("Invalid file path or search data.");
        }

        const parts = searchData.split("|");

        const uniqueId = parts[0].trim();
        const valuesToVerify = parts.slice(1);

        // Read file
        const fileContent = await fs.readFile(filePath.trim(), "utf8");

        // Find unique identifier
        const startIndex = fileContent.indexOf(uniqueId);

        if (startIndex === -1) {
            throw new Error(`Unique identifier '${uniqueId}' not found.`);
        }

        // Search only after the unique identifier
        const contentAfter = fileContent.substring(startIndex);

        const missingValues = [];

        for (const value of valuesToVerify) {

            if (!contentAfter.includes(value.trim())) {
                missingValues.push(value.trim());
            }
        }

        if (missingValues.length > 0) {
            throw new Error(
                `Verification failed. Missing values: ${missingValues.join(", ")}`
            );
        }

        return "Successfully verified all values.";

    } catch (err) {

        return "Failure --- " + err.message;
    }

});


/*v

verifyText||c:/user/desktop/file.txt::4367364893847554|12216|8292|6011

*/
