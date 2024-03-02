// starting code
async function add(numA, numB) {
    return numA + numB;
}

function sub(numA, numB) {
    return new Promise(resolve => resolve(numA - numB));
}

function mul(numA, numB) {
    return numA * numB;
}


// my code, goal: (5 + 4) - (3 * (2 + 1)) - 6 = -6
async function solve() {
    // in one line, with async-awaits
    let result = await sub(await sub(await add(5, 4), mul(3, await add(2, 1))), 6);
    console.log(result);

    // with promises
    add(2, 1)
        .then(result => mul(3, result))
        .then(middle => add(5, 4).then(leftSide => sub(leftSide, middle)))
        .then(result => sub(result, 6))
        .then(console.log);
}
solve();
