import axios from 'axios';
import chalk from 'chalk';
import * as ora from 'ora';
import * as baseUrl from './constants';

const url: string = `${baseUrl}`;

export const addTask = (answers: any) => {
  (async () => {
    try {
      const spinner = ora('タスクを追加しています.../\u2700-\u27bf/').start();
      const response = await axios.post(`${url}/addTask/`, answers);
      spinner.stop();
      console.log(chalk.bgMagenta('タスクが追加されました /\uD83D\uDE00/'));
    } catch (error) {
      console.log(error);
    }
  })();
};

export const getTask = (id: number) => {
  (async () => {
    try {
      const spinner = ora('タスクを取得しています...').start();
      const response = await axios.get(`${url}/getTask/${id}/`);
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
      const response = await axios.put(`${url}/updateTask/${task.id}`, task);
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
      const response = await axios.delete(`${url}/deleteTask/${id}`);
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
      const response = await axios.get(`${url}/getTaskList`);
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
