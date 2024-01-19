const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

//Define initial team
const team=[]

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Function to prompt for manager details
const promptManager = async () => {
    const answers = await inquirer.prompt([
        // Inquirer questions for manager details
    ]);

    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    team.push(manager);

    // Continue with the menu
    promptMenu();
};

// Function to prompt for engineer details
const promptEngineer = async () => {
    const answers = await inquirer.prompt([
        // Inquirer questions for engineer details
    ]);

    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    team.push(engineer);

    // Continue with the menu
    promptMenu();
};

// Function to prompt for intern details
const promptIntern = async () => {
    const answers = await inquirer.prompt([
        // Inquirer questions for intern details
    ]);

    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    team.push(intern);

    // Continue with the menu
    promptMenu();
};

// Function to prompt the user with the main menu
const promptMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        },
    ]);

    if (answer.choice === 'Add an engineer') {
        promptEngineer();
    } else if (answer.choice === 'Add an intern') {
        promptIntern();
    } else {
        // Finish building the team, generate HTML, and write to file
        const html = render(team);
        fs.writeFileSync(outputPath, html);
        console.log('HTML file generated successfully!');
    }
};

// Start the application by prompting for the manager's details
promptManager();
