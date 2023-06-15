const schedule = require('./schedule.json');

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dayCount = 1;
const today = new Date('06/09/2023 11:10 PM');
const currentTime = today.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit'
});
const currentMilis = new Date(
  `${today.getMonth()} ${today.getDate()},${today.getFullYear()} ${today.toLocaleTimeString()}`
).getTime();
const currentDay = days[today.getDay()];
console.log('Current time:', currentDay, currentTime);
const matchDay = schedule.SHOP_SCHEDULE.find((obj) => {
  return obj.day === currentDay;
});

if (!matchDay) {
  const { shopOpenDate, dayCount } = getNextOpenDay(days[today.getDay()]);
  calculateTime(shopOpenDate, dayCount);
} else {
  // calculate openTime and closeTime time for shop in miliseconds
  const openTime = new Date(
    `${today.getMonth()} ${today.getDate()},${today.getFullYear()} ${
      matchDay.open
    }`
  );
  const closeTime = new Date(
    `${today.getMonth()} ${today.getDate()},${today.getFullYear()} ${
      matchDay.close
    }`
  );

  if (currentMilis >= openTime && currentMilis < closeTime) {
    const remainingTime = new Date(closeTime - currentMilis);
    console.log(
      `Open, The Shop will be closed in ${remainingTime.getUTCHours()} hours ${remainingTime.getUTCMinutes()} minutes`
    );
  } else if (currentMilis < openTime) {
    const remainingTime = new Date(openTime - currentMilis);
    console.log(
      `Closed, The Shop will open in ${remainingTime.getUTCHours()} hours ${remainingTime.getUTCMinutes()} minutes`
    );
  } else {
    const { shopOpenDate, dayCount } = getNextOpenDay(matchDay.day);
    calculateTime(shopOpenDate, dayCount);
  }
}

// TO CALCULATE THE NEXT SHOP OPEN DAY
function getNextOpenDay(currentDay) {
  let i = days.indexOf(currentDay);
  for (let j = 1; j <= days.length; j++) {
    let shopOpenDate = schedule.SHOP_SCHEDULE.find((obj) => {
      return obj.day === days[(i + j) % 7];
    });

    if (!shopOpenDate) {
      dayCount++;
    } else {
      return { shopOpenDate, dayCount };
    }
  }
}

// TO CALCULATE TOTAL TIME (IN HOURS / DAYS & HOURS) FROM CURRENT DATE TO NEXT OPEN DAY
function calculateTime(openDay, skippedDay) {
  let nextOpenDate = new Date(
    `${today.getMonth()} ${
      today.getDate() + skippedDay
    },${today.getFullYear()} ${openDay.open} `
  ).getTime();
  let seconds = (nextOpenDate - currentMilis) / 1000;
  let Hours = Math.floor(seconds / (60 * 60));
  let Days = parseInt(Hours / 24);
  let Minutes = Math.floor(seconds / 60) % 60;
  let remainingHours = Hours - Days * 24;
  console.log(
    `Closed, Shop will open after ${
      Days > 0 ? `${Days} day ` : ``
    }${remainingHours} hours ${Minutes} minutes `
  );
}
