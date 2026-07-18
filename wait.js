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
async function (page, reqElement, xpathval, timeoutsec, expect) {
  try {
    const safeTimeoutSec = (typeof timeoutsec === "number" && timeoutsec > 0) ? timeoutsec : 15;
    const timeoutMs = safeTimeoutSec * 1000;
    const startTime = Date.now();

    let totalClicked = 0;
    let pass = 0;
    const maxPasses = 10;
    const clickedKeys = new Set(); // remembers which nodes we've already expanded

    const frame = page
      .frameLocator("#applicationFrame")
      .frameLocator('frame[name="MerchantLeftPage"]');

    let newClicksThisPass;
    do {
      const elms = await frame.locator(xpathval).all();
      console.log(`Pass ${pass + 1}: found ${elms.length} candidate nodes`);

      newClicksThisPass = 0;

      for (const elm of elms) {
        try {
          // Stable identity for this tree node = its enclosing PrimeTreeview div id
          // (e.g. "PrimeTreeview_1_1_3_1_5") - this stays constant for the same
          // logical node even across postbacks, unlike nth() index which shifts.
          const key = await elm.evaluate(node => {
            const p = node.closest('div[id^="PrimeTreeview"]');
            return p ? p.id : null;
          });

          if (key && clickedKeys.has(key)) {
            continue; // already expanded this exact node - don't click it again
          }

          if (await elm.isVisible()) {
            await elm.click();
            totalClicked++;
            newClicksThisPass++;
            if (key) clickedKeys.add(key);
            await page.waitForTimeout(250);
          }
        } catch (e) {
          continue; // stale element from re-render, skip
        }
      }

      pass++;

      if (Date.now() - startTime > timeoutMs) {
        console.log("Timeout reached, stopping expansion.");
        break;
      }
    } while (newClicksThisPass > 0 && pass < maxPasses);

    console.log(`Success. Total unique tree items expanded: ${totalClicked}`);
    return `Success. Total nodes expanded: ${totalClicked}`;
  } catch (err) {
    console.error("Failure expanding framework tree context:", err);
    return "Failure. " + err.message;
  }
}
// ==========================================
for (const elm of elms) {
  try {
    const key = await elm.evaluate(node => {
      const p = node.closest('div[id^="PrimeTreeview"]');
      return p ? p.id : null;
    });

    if (key && clickedKeys.has(key)) {
      continue; // already expanded this exact node
    }

    if (await elm.isVisible()) {
      await elm.click();
      totalClicked++;
      clickedThisPass++;
      if (key) clickedKeys.add(key);
      await page.waitForTimeout(250);
    }
  } catch (e) {
    continue;
  }
}
