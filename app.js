const express = require('express');
const inquirer = require('inquirer');
const schedule = require('./schedule.json');
const app = express();

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const date = new Date();
const day = days[date.getDay()];
const time = date.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit'
});
console.log(day, time);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'day',
      message: 'Choose Day',
      default: day,
      choices: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      type: 'input',
      name: 'time',
      default: time,
      message: 'Enter Time (HH:MM AM/PM)'
    }
  ])
  .then((input) => {
    if (!validateInput(input)) console.log('Enter Time in format');
    else {
      const inputTime = new Date(`May 01,2002 ${input.time}`).getTime();
      const status = schedule.SHOP_SCHEDULE.find((obj) => {
        return obj.day == input.day;
      });
      if (!status) {
        console.log('Closed');
      } else {
        const openTime = new Date(`May 01,2002 ${status.open}`).getTime();
        const closeTime = new Date(`May 01,2002 ${status.close}`).getTime();
        if (inputTime >= openTime && inputTime < closeTime) {
          console.log('Open');
        } else {
          console.log('Closed');
        }
      }
    }
  });
function validateInput(input) {
  let regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s([AP][M])$/;
  if (!input.time.match(regex)) {
    return false;
  } else return true;
}
