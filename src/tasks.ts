#!/usr/bin/env node
import './polyfills';
import * as commander from 'commander';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as actions from './actions';
import { getIdQuestions, questions, updateTaskQuestions } from './questions';

commander.version('0.1.0').description('Task Management System');

commander
  .command('addTask')
  .alias('a')
  .description('Add a task')
  .action(() => {
    console.log(
      chalk.bgBlueBright('=========*** Task Management System ***==========')
    );
    inquirer.prompt(questions).then(answers => actions.addTask(answers));
  });

commander
  .command('getTask')
  .alias('g')
  .description('Get Task')
  .action(() => {
    console.log(
      chalk.bgYellow('=========*** Task Management System ***==========')
    );
    inquirer.prompt(getIdQuestions).then(answers => console.log(answers)); //actions.getTask(answers.id));
  });

commander
  .command('updateTask')
  .alias('u')
  .description('Update Task')
  .action(() => {
    console.log(
      chalk.bgYellow('=========*** Task Management System ***==========')
    );
    inquirer
      .prompt(updateTaskQuestions)
      .then(answers => actions.updateTask(answers));
  });

commander
  .command('deleteTask')
  .alias('d')
  .description('Delete a Task')
  .action(() => {
    console.log(
      chalk.bgYellow('=========*** Task Management System ***==========')
    );
    inquirer.prompt(getIdQuestions).then(answers => console.log(answers)); //actions.deleteTask(answers.id));
  });

commander
  .command('getTaskList')
  .alias('l')
  .description('Get Task List')
  .action(() => {
    console.log(
      chalk.bgYellow('=========*** Task Management System ***==========')
    );
    actions.getTaskList();
  });

if (!process.argv.slice(2).length) {
  commander.outputHelp();
  process.exit();
}
commander.parse(process.argv);
