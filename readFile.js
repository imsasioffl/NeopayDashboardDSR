(async function (page, reqElement, xpathval, testdata, timeoutsec) {
    const fs = require("fs");
    const path = require("path");

    const [folderPath, expectedText] = testdata.split("::");

    const files = fs.readdirSync(folderPath);
    const matches = [];

    for (const file of files) {
        const filePath = path.join(folderPath, file);

        if (!fs.statSync(filePath).isFile()) continue;

        const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

        lines.forEach((line, lineNo) => {
            let index = line.indexOf(expectedText);

            while (index !== -1) {
                matches.push({
                    file: file,
                    line: lineNo + 1,
                    from: index,
                    to: index + expectedText.length - 1,
                    expected: expectedText,
                    actual: line.substring(index, index + expectedText.length)
                });

                index = line.indexOf(expectedText, index + 1);
            }
        });
    }

    if (matches.length === 0) {
        throw new Error(`No Match Found.\nExpected: ${expectedText}`);
    }

    console.log(`Match Found (${matches.length})`);

    matches.forEach((m, i) => {
        console.log(
            `Match ${i + 1}\n` +
            `File     : ${m.file}\n` +
            `Line     : ${m.line}\n` +
            `Index    : ${m.from}-${m.to}\n` +
            `Expected : ${m.expected}\n` +
            `Actual   : ${m.actual}\n`
        );
    });

    return matches;

})
