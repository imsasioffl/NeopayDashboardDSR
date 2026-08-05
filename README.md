node generate.js sample/sample-input.json output/my-batch-output.txt

node -e "const {validateFileStructure}=require('./lib/validate'); const fs=require('fs'); console.log(validateFileStructure(fs.readFileSync('output/my-batch-output.txt','latin1')))"


this is my existing code to loop through files and verify the text present in it but i need like to chech every chars and theri whole word to match the expected so if my file has input like this and need to check for card number '4198682470538975' is incoprated with in line whole text so as a whole text or text in btwen should able to match the expected if multiple foun or single found should return match found and expected actual . which line at which index from to . keep it simple
