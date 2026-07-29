// Percentage Calculation with Minimum Amount 50
nova.db_calculatePercentage___$Calculate_Percentage_MinimumAmount$ = (input, percentage) => {

    return (function () {

        const result = (parseFloat(input) * parseFloat(percentage)) / 100;

        const finalValue = result < 50 ? 50 : result;

        console.log(finalValue.toFixed(2));

        return finalValue.toFixed(2);

    })();
};
