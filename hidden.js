// Get Formatted Value by Key
nova.db_getFormattedValue___$Get_Formatted_Value$ = (response, key) => {
 
    return (function () {
 
        const value = Number(response[key]);
 
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
 
    })();
};



// ===


let response = {
    negativeSum: 2400.2,
    positiveSum: 400,
    netDifference: 2000.1999999999998,
    percentValue: 100.00999999999999
};
 
console.log(nova.db_getFormattedValue___$Get_Formatted_Value$(response, "netDifference"));
// Output: 2,000.20
 
console.log(nova.db_getFormattedValue___$Get_Formatted_Value$(response, "percentValue"));
// Output: 100.01
 
console.log(nova.db_getFormattedValue___$Get_Formatted_Value$(response, "negativeSum"));
// Output: 2,400.20
 
console.log(nova.db_getFormattedValue___$Get_Formatted_Value$(response, "positiveSum"));
// Output: 400.00
