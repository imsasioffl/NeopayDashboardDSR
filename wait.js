(async function (page, reqElement, xpathval, testdata, timeoutSec) {
    console.log("Inside keyword Input - Expiry Date Field");
    console.log("Parameters:", xpathval, testdata, timeoutSec);
    try {
        // testdata example: "April 2037"
        await page.locator(xpathval).evaluate((visibleEl, displayVal) => {
            var months = ["January","February","March","April","May","June",
                          "July","August","September","October","November","December"];
            var parts = displayVal.split(" ");
            var monthName = parts[0];
            var year = parts[1];
            var monthNum = months.indexOf(monthName) + 1;
            var monthNumPadded = String(monthNum).padStart(2, "0");



            var hiddenVal = monthNumPadded + " " + year;                 // "04 2037"
            var hiddenP = year + "-" + monthNum + "-1-0-0-0-0";           // "2037-4-1-0-0-0-0"



            var baseId = visibleEl.getAttribute("editid");
            var hiddenValEl = document.getElementById(baseId);
            var hiddenPEl = document.getElementById(baseId + "_p");



            if (hiddenValEl) {
                hiddenValEl.value = hiddenVal;
                hiddenValEl.dispatchEvent(new Event("change", { bubbles: true }));
            }
            if (hiddenPEl) {
                hiddenPEl.value = hiddenP;
                hiddenPEl.dispatchEvent(new Event("change", { bubbles: true }));
            }



            visibleEl.value = displayVal;
            visibleEl.dispatchEvent(new Event("input", { bubbles: true }));
            visibleEl.dispatchEvent(new Event("change", { bubbles: true }));
            visibleEl.dispatchEvent(new Event("blur", { bubbles: true }));
        }, testdata);



        var smsg = "Success - Successfully entered value into expiry date field(s).";
        return smsg;
    } catch (err) {
        var fmsg = "Failure - Failed to enter value into expiry date field(s). Error: " + err;
        return fmsg;
    }
});
