// async function (page, reqElement, xpathval, timeoutsec, expect) {
//   try {
//     // Guard against a zero/negative/garbage timeoutsec being handed down
//     // (e.g. framework already spent most of the step budget locating reqElement)
//     const safeTimeoutSec = (typeof timeoutsec === "number" && timeoutsec > 0) ? timeoutsec : 15;
//     const timeoutMs = safeTimeoutSec * 1000;
//     const startTime = Date.now();

//     let totalClicked = 0;
//     let pass = 0;
//     const maxPasses = 10;

//     const frame = page
//       .frameLocator("#applicationFrame")
//       .frameLocator(`//frame[@name="fcontent"]`);

//     let clickedThisPass;
//     do {
//       const elms = await frame.locator(xpathval).all();
//       console.log(`Pass ${pass + 1}: found ${elms.length} candidate nodes`);

//       clickedThisPass = 0;

//       for (const elm of elms) {
//         try {
//           if (await elm.isVisible()) {
//             await elm.click();
//             totalClicked++;
//             clickedThisPass++;
//             await page.waitForTimeout(250);
//           }
//         } catch (e) {
//           continue; // stale element from tree re-render, skip
//         }
//       }

//       pass++;

//       if (Date.now() - startTime > timeoutMs) {
//         console.log("Timeout reached, stopping expansion.");
//         break;
//       }
//     } while (clickedThisPass > 0 && pass < maxPasses);

//     console.log(`Success. Total tree items clicked: ${totalClicked}`);
//     return `Success. Total nodes expanded: ${totalClicked}`;
//   } catch (err) {
//     console.error("Failure expanding framework tree context:", err);
//     return "Failure. " + err.message;
//   }
// }


// ===

async function (page, reqElement, xpathval, timeoutsec, expect) {
    try {
        const safeTimeoutSec =
            (typeof timeoutsec === "number" && timeoutsec > 0)
                ? timeoutsec
                : 15;

        const timeoutMs = safeTimeoutSec * 1000;
        const startTime = Date.now();

        const frame = page
            .frameLocator("#applicationFrame")
            .frameLocator("//frame[@name='MerchantLeftPage']");

        const nodes = frame.locator(xpathval);
        const totalNodes = await nodes.count();

        console.log(`Found ${totalNodes} expandable nodes.`);

        let totalClicked = 0;

        for (let i = 0; i < totalNodes; i++) {

            if (Date.now() - startTime > timeoutMs) {
                console.log("Timeout reached.");
                break;
            }

            try {
                const node = nodes.nth(i);

                if (await node.isVisible()) {
                    await node.scrollIntoViewIfNeeded();
                    await node.click();
                    totalClicked++;

                    console.log(`Expanded node ${i + 1}/${totalNodes}`);

                    // Allow tree to render children
                    await page.waitForTimeout(300);
                }

            } catch (e) {
                console.log(`Skipping node ${i + 1}: ${e.message}`);
            }
        }

        console.log(`Success. Total nodes expanded: ${totalClicked}`);
        return `Success. Total nodes expanded: ${totalClicked}`;

    } catch (err) {
        console.error(err);
        return "Failure. " + err.message;
    }
}
