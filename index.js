#!/usr/bin/env node

// Importing packages:
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from 'nanospinner';

// Initial Welcome message & tutorial:
let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        `\n
         \t Developer 101 Test! \n`
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`${chalk.bgCyan('\t HOW TO PLAY \n')}
    \t I am process running on your device.
    \t If you answer any question wrong the game will ${chalk.bgRed('end')}
    \t If you answer all questions right, there is a message for you!
    \t Use arrow keys to choose options.
    `);

}

// Taking user's name as input:
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Enter your real or pseudo name to begin: '
    });
    playerName = answers.player_name;
}

// Creating MCQ questions:
// Question 1 -
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question1',
        type: 'list',
        message: 'What is the ip address of localhost?\n',
        choices: [
            '127.1.1.1',
            '127.0.0.0',
            '127.0.0.1',
            '127.127.127.127',
        ],
    });
    return handleAnswer(answers.question1 == '127.0.0.1');
}


// Question 2 - 
async function question2() {
    const answers = await inquirer.prompt({
        name: 'question2',
        type: 'list',
        message: 'Finding and solving errors in code is called:\n',
        choices: [
            'Desk Job',
            'Testing',
            'Developing',
            'Debugging',
        ],
    });
    return handleAnswer(answers.question2 == 'Debugging');
}

// Question 3 -
async function question3() {
    const answers = await inquirer.prompt({
        name: 'question3',
        type: 'list',
        message: 'What does NPM stand for?\n',
        choices: [
            'Nice Package Messenger',
            'Node Package Manager',
            'Neural Proton Mapper',
            'No Pointless Merges',
        ],
    });
    return handleAnswer(answers.question3 == 'Node Package Manager');
}

// Question 4 -
async function question4() {
    const answers = await inquirer.prompt({
        name: 'question4',
        type: 'list',
        message: 'Which command should be used to display the state of the working directory and staging area?\n',
        choices: [
            'git commit',
            'git status',
            'git stage',
            'git diff',
        ],
    });
    return handleAnswer(answers.question4 == 'git status');
}

// Question 5-
async function question5() {
    const answers = await inquirer.prompt({
        name: 'question5',
        type: 'list',
        message: 'Which of the following statements is correct:\n',
        choices: [
            'Java and JavaScript both are different languages.',
            'All programming languages are the same.',
            'It makes you a bad programmer if do not write everything by yourself',
            'To be good at programming you need to be good at Maths.',
        ],
    });
    return handleAnswer(answers.question5 == 'Java and JavaScript both are different languages.');
}

// Checking if answer is right or wrong and proceeding with it:
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking Answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice Work ${playerName}. You gave the correct answer!\n` });
    } else {
        spinner.error({ text:`Oops!! You gave a wrong answer, you lose ${playerName}. Try again.\n`});
        process.exit(1);
    }
}

// If user answers all questions right and wins:
function winner() {
    console.clear();
    figlet(`\t Congrats , ${playerName} !\n`, (err, data) => {
      console.log(gradient.mind.multiline(data) + '\n');

      console.log(
        chalk.green(
          `                       You passed the test!\n
          "Even if a developer knows what they are doing, they will still check StackOverflow!"\n
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          Thank for checking this out. Project GitHub repo: https://github.com/ItzzNeo13/command-line-app`
        )
      );
      process.exit(0);
    });
  }

// Calling the functions:
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();