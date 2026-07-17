async function (page, reqElement, xpathval, timeoutsec, expect) {
  try {
    const timeoutMs = timeoutsec * 1000;
    const startTime = Date.now();
    let totalClicked = 0;
    let pass = 0;
    const maxPasses = 10;

    const frame = page
      .frameLocator("#applicationFrame")
      .frameLocator(`//frame[@name="fcontent"]`);

    while (pass < maxPasses) {
      if (Date.now() - startTime > timeoutMs) {
        console.log("Timeout reached, stopping expansion.");
        break;
      }

      // Re-query fresh each pass — clicking re-renders the tree,
      // so a stale snapshot from .all() will miss new nodes.
      const elms = await frame.locator(xpathval).all();
      console.log(`Pass ${pass + 1}: found ${elms.length} candidate nodes`);

      let clickedThisPass = 0;

      for (const elm of elms) {
        try {
          if (await elm.isVisible()) {
            await elm.click();
            totalClicked++;
            clickedThisPass++;
            await page.waitForTimeout(250); // give the tree time to re-render
          }
        } catch (e) {
          // Element went stale/detached because the DOM changed underneath it.
          // Skip it — it'll either already be expanded or get picked up next pass.
          continue;
        }
      }

      pass++;
      if (clickedThisPass === 0) break; // nothing left to expand
    }

    console.log(`Success. Total tree items clicked: ${totalClicked}`);
    return `Success. Total nodes expanded: ${totalClicked}`;
  } catch (err) {
    console.error("Failure expanding framework tree context:", err);
    return "Failure. " + err.message;
  }
}
