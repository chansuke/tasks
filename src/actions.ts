import axios from 'axios';
import chalk from 'chalk';
import * as ora from 'ora';
import * as constants from './constants';

const url: string = constants.baseUrl;

export const addTask = (answers: any) => {
  (async () => {
    try {
      const spinner = ora('タスクを追加しています...').start();
      const requestUrl = url + '/addTask';
      const response = await axios.post(requestUrl, answers);
      spinner.stop();
      console.log(chalk.blueBright('タスクが追加されました'));
    } catch (error) {
      console.log(error);
    }
  })();
};

export const getTask = (id: number) => {
  (async () => {
    try {
      const spinner = ora('タスクを取得しています...').start();
      const requestUrl = url + '/getTask/' + `${id}`;
      const response = await axios.get(requestUrl);
      spinner.clear();
      spinner.stop();
      const object = response.data;
      for (var key in object) {
        console.log(chalk.cyanBright('========================='));
        console.log(
          chalk.bgGreenBright(
            `Id: ${id} \nTask: ${object.task} \nDue: ${
              object.duedate
            } \nタグ: ${object.tag}`
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  })();
};

export const updateTask = (task: any) => {
  (async () => {
    try {
      const spinner = ora('タスクを更新しています...').start();
      const requestUrl = url + '/updateTask/' + `${task.id}`;
      const response = await axios.put(requestUrl, task);
      spinner.stop();
      console.log(chalk.yellowBright('タスクが更新されました'));
    } catch (error) {
      console.log(error);
    }
  })();
};

export const deleteTask = (id: number) => {
  (async () => {
    try {
      const spinner = ora('タスクをクリアしています...').start();
      const requestUrl = url + '/deleteTask/' + `${id}`;
      const response = await axios.delete(requestUrl);
      spinner.stop();
      console.log(chalk.magentaBright('タスクがクリアされました!!'));
    } catch (error) {
      console.log(error);
    }
  })();
};

export const getTaskList = () => {
  (async () => {
    try {
      const spinner = ora('全てのタスクを取得しています...').start();
      const requestUrl = url + '/getTaskList';
      const response = await axios.get(requestUrl);
      spinner.stop();
      const object = await response.data.res;
      for (var key in object) {
        console.log(chalk.blueBright('~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
        console.log(
          chalk.whiteBright(
            `Id: ${key} \nTask: ${object[key].task} \nDue: ${
              object[key].duedate
            } \nタグ: ${object[key].tag}`
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  })();
};
