// using recommended libraries: chalk and @inquirer/prompts

import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import { add, subtract, multiply, divide } from './calculator.js';

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

async function retrieveNumber(side, additionalValidation) {
    return parseInt(await input({ 
        message: `Add meg a művelet ${side} oldalán álló számot!`,
        validate: (input) => {
            if (Number.isNaN(parseInt(input))) {
                return 'Kérlek számot adj meg!';
            }
            if (additionalValidation) {
                return additionalValidation(parseInt(input));
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
    const secondNumber = await retrieveNumber("jobb", (parsedInput) => {
        if (operation === allowedOperations["osztás"] && parsedInput === 0) {
            return "Osztás jobb oldalán nem értelmezett a 0!"
        }
        return true;
    });

    const result = operation.function(firstNumber, secondNumber);
    console.log(`${firstNumber} ${chalk.red(operation.symbol)} ${secondNumber} = ${chalk.blue(result)}`);
}

run();
