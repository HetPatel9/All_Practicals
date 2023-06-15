const inquirer = require("inquirer");
const data = require("./data.json");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const day = new Date();
const currentTime = day.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit"
});
const options = [
  {
    type: "input",
    name: "currentTime",
    message: "CURRENT_TIME:",
    default: currentTime
  },
  {
    type: "input",
    name: "currentTimeZone",
    message: "CURRENT_TIMEZONE:"
  },
  {
    type: "input",
    name: "newTimeZone",
    message: "CONVERT_TO_TIMEZONE:"
  }
];

inquirer.prompt(options).then((answer) => {
  try {
    let response = validateInput(answer);

    if (response !== true) {
      throw new Error(response);
    } else {
      const currentTimeOffset = data[answer.currentTimeZone]["offset"];
      const newTimeOffset = data[answer.newTimeZone]["offset"];
      const totaloffset = (newTimeOffset - currentTimeOffset) * 60 * 60 * 1000;

      let date = new Date(`May 01, 2022 ${answer.currentTime}`);
      const dateMilis = date.getTime() + totaloffset;
      let newDate = new Date();
      newDate.setTime(dateMilis);

      const converted_time = newDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric"
      });
      console.log(converted_time);
    }
  } catch (err) {
    console.log(err.message);
    return;
  }
});

function validateInput(input) {
  let regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s([AP][M])$/;
  if (!input.currentTime.match(regex)) {
    let msg = "Invalid Time Format";
    return msg;
  }

  if (!data[input.currentTimeZone]) {
    let msg = "Current Timezone is not in the data";
    return msg;
  }
  if (!data[input.newTimeZone]) {
    let msg = "New Timezone is not in the data";
    return msg;
  }
  return true;
}
