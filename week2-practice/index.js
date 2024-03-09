// using recommended libraries: chalk and @inquirer/prompts

const chalk = require('chalk');
const { input, select } = require('@inquirer/prompts');
const { add, subtract, multiply, divide } = require('./calculator.js');

const allowedOperations = {
    'összeadás': {
        function: add,
        symbol: '+'
    },
    'kivonás': {
        function: subtract,
        symbol: '-'
    },
    'szorzás': {
        function: multiply,
        symbol: '*'
    },
    'osztás': {
        function: divide,
        symbol: '/'
    }
}

async function retrieveOperationTextual() {
    const operationName = await input({ 
        message: 'Add meg mit szeretnél végezni: összeadás, kivonás, szorzás, osztás!', 
        validate: (input) => {
            if (!allowedOperations[input.toLowerCase().trim()]) {
                return 'Pontosan írd le magyarul a művelet nevét! Próbáld újra!';
            }
            return true;
        }
    });
    return allowedOperations[operationName.toLowerCase().trim()];
}

async function retrieveOperationSelect() {
    const operationName = await select({
        message: 'Add meg mit szeretnél végezni!',
        choices: Object.keys(allowedOperations).map((key) => ({ value: key }))
    });
    return allowedOperations[operationName];
}

async function retrieveNumber(side) {
    return parseInt(await input({ 
        message: `Add meg a művelet ${side} oldalán álló számot!`,
        validate: (input) => {
            if (Number.isNaN(parseInt(input))) {
                return 'Kérlek számot adj meg!';
            }
            return true;
        }
    }));
}

async function run() {
    const operation = await retrieveOperationTextual();
    // I also implemented with select
    // const operation = await retrieveOperationSelect();

    const firstNumber = await retrieveNumber("bal");
    const secondNumber = await retrieveNumber("jobb");

    const result = operation.function(firstNumber, secondNumber);
    console.log(`${firstNumber} ${chalk.red(operation.symbol)} ${secondNumber} = ${chalk.blue(result)}`);
}

run();
