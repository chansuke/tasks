export const questions: Array<Object> = [
  {
    type: 'input',
    name: 'task',
    message: 'タスクを入力して下さい'
  },
  {
    type: 'input',
    name: 'duedate',
    message: 'Dueを入力して下さい(例: 2020/08/30)'
  },
  {
    type: 'input',
    name: 'tag',
    message: 'タグを入力して下さい'
  }
];

export const getIdQuestions: Array<Object> = [
  {
    type: 'input',
    name: 'id',
    message: 'タスクの番号を入力して下さい'
  }
];

export const updateTaskQuestions: Array<Object> = [
  {
    type: 'input',
    name: 'id',
    message: 'タスクの番号を入力して下さい'
  },
  ...questions
];
