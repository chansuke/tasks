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
      console.log(chalk.bgMagenta('タスクが追加されました'));
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
      object.map(obj => {
        console.log(chalk.bgCyanBright('========================='));
        console.log(
          chalk.bgGreenBright(
            `Task: ${obj.task} \nDue: ${obj.duedate} \nタグ: ${obj.tag}`
          )
        );
      });
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
      console.log(chalk.bgYellowBright('タスクが更新されました'));
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
      console.log(chalk.bgMagentaBright('タスクがクリアされました!!'));
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
      const object = response.data.res;
      object.map(obj => {
        console.log(chalk.bgYellowBright('~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
        console.log(
          chalk.bgRedBright(
            `Task: ${obj.task} \nDue: ${obj.duedate} \nタグ: ${obj.tag}`
          )
        );
      });
    } catch (error) {
      console.log(error);
    }
  })();
};
