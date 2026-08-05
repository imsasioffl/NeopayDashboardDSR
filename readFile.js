(async function (page, reqElement, xpathval, testdata, timeoutsec) {
//     const fs = require('fs');
//     const path = require('path');
//     try {
//         // 1. Validate the input format
//         if (!testdata || !testdata.includes("::")) {
//             return "Failure. Failed - Invalid testdata format. Please use: FolderPath::SearchValue1||SearchValue2";
//         }
//         // 2. Split the input into the Folder Path and the Search String
//         const [folderPathInput, searchString] = testdata.split("::");
//         const outputFolderPath = folderPathInput.trim();
        
//         // 3. Get the values to search for and remove any spaces
//         const verifyValues = searchString
//             .split("||")
//             .map(v => v.trim().replace(/\s+/g, '')) 
//             .filter(v => v !== "");
            
//         if (verifyValues.length === 0) {
//             return "Failure. Failed - No verification values provided after the :: delimiter.";
//         }
        
//         // 4. Check if the provided directory exists
//         if (!fs.existsSync(outputFolderPath)) {
//             return "Failure. Failed - Directory does not exist: " + outputFolderPath;
//         }
        
//         const files = fs.readdirSync(outputFolderPath);
//         if (files.length === 0) {
//             return "Failure. Failed - No files found in the folder: " + outputFolderPath;
//         }
        
//         // 5. Loop through every file in the folder
//         for (const fileName of files) {
//             // Note: If you want this to search ANY file type, you can remove this next line. 
//             // If it should ONLY search Merchant files, keep it.
//             if (!fileName.includes("MB_Merchant_info_")) continue;
            
//             const filePath = path.join(outputFolderPath, fileName);
            
//             if (fs.statSync(filePath).isFile()) {
//                 const content = fs.readFileSync(filePath, 'utf8');
//                 const lines = content.split(/\r?\n/);
                
//                 // 6. Loop through every line in the file
//                 for (let i = 0; i < lines.length; i++) {
//                     const line = lines[i];
//                     if (!line.trim()) continue;
                    
//                     // 7. Remove ALL spaces from the file's line before checking
//                     const lineNoSpaces = line.replace(/\s+/g, '');
                    
//                     // Check if the spaceless verification values exist in the spaceless line
//                     const matched = verifyValues.every(value => lineNoSpaces.includes(value));
                    
//                     if (matched) {
//                         // Store the full path, line number, and original clean line in retvalue
//                         // FIX: Added enclosing backticks for the template literal
//                         global.retvalue = `${filePath}||${i + 1}||${line.trim()}`;
                        
//                         return (
//                             "Success. Success\n\n" +
//                             "File : " + fileName + "\n" +
//                             "Line : " + (i + 1) + "\n" +
//                             "Data : " + line.trim()
//                         );
//                     }
//                 }
//             }
//         }
//         return "Failure. Failed - No matching data found in any file.";
//     } catch (err) {
//         return "Failure. Failed : " + (err.message || err);
//     }
// });
