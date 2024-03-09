const { add, subtract, multiply, divide } = require("./calculator.js");
const chalk = require("chalk");
const { input } = require("@inquirer/prompts");

async function run() {
    const operationName = await input({ message: 'Add meg mit szeretnél végezni: összeadás, kivonás, szorzás, osztás!' });
    const operation = {};
    switch (operationName.trim()) {
        case "összeadás":
            operation.function = add;
            operation.symbol = '+';
            break;
        case "kivonás":
            operation.function = subtract;
            operation.symbol = '-';
            break;
        case "szorzás":
            operation.function = multiply;
            operation.symbol = '*';
            break;
        case "osztás":
            operation.function = divide;
            operation.symbol = '/';
            break;
        default:
            console.error("Pontosan írd le magyarul a művelet nevét! Próbáld újra!");
            setImmediate(run);
            return;
    }
    const firstNumber = parseInt(await input({ message: 'Add meg a művelet bal oldalán álló számot!' }));
    const secondNumber = parseInt(await input({ message: 'Add meg a művelet bal oldalán álló számot!' }));
    const result = operation.function(firstNumber, secondNumber);

    console.log(`${firstNumber} ${chalk.red(operation.symbol)} ${secondNumber} = ${chalk.blue(result)}`);
}

run();
