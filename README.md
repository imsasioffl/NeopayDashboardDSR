node generate.js sample/sample-input.json output/my-batch-output.txt

node -e "const {validateFileStructure}=require('./lib/validate'); const fs=require('fs'); console.log(validateFileStructure(fs.readFileSync('output/my-batch-output.txt','latin1')))"
