function hatvany(number, quotient) {
    let result = 1;
    const subresults = [];
    for (let i = 0; i < quotient; i++) {
        subresults.push(result);
        result = result * number;
    }
    return { result: result, subresults: subresults };
}

// result should be { result: 8, subresults: [1, 2, 4] }
const result = hatvany(2, 3);
console.log(JSON.stringify(result));
