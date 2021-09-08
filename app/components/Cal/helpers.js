/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import moment from 'moment';

export const getWeekStartEndDate = (date, direction) => {
  if (direction === 'prev') {
    const newDate = moment(date);
    date = newDate.subtract(2, 'days');
  }
  const currentDate = moment();
  const startDate = moment(date)
    .startOf('week')
    .add(1, 'days')
    .toDate();
  const endDate = moment(date)
    .endOf('week')
    .add(1, 'days')
    .toDate();
  const firstDay = startDate.getDate();
  const lastDay = endDate.getDate();
  const currentDay = currentDate.toDate().getDate();
  const endOfMonth = moment(date)
    .endOf('month')
    .format('DD-MM-YYYY');
  const prevEndOfMonth = moment(date)
    .subtract(1, 'months')
    .endOf('month')
    .format('DD-MM-YYYY');
  const dateToDisplay = [];
  let isMonthEnd = false;
  let newIndex = 0;
  for (let i = firstDay; i < firstDay + 5; i++) {
    dateToDisplay.push({
      value: isMonthEnd ? ++newIndex : i,
      disable: false,
      day: moment(startDate)
        .add(i - firstDay, 'days')
        .format('dddd'),
      date: moment(startDate).add(i - firstDay, 'days'),
    });
    const date = moment(startDate).add(i - firstDay, 'days');
    if (
      date.format('DD-MM-YYYY') === endOfMonth ||
      date.format('DD-MM-YYYY') === prevEndOfMonth
    ) {
      isMonthEnd = true;
    }
  }
  return {
    currentDate,
    startDate,
    endDate,
    firstDay,
    lastDay,
    currentDay,
    dateToDisplay,
  };
};

export const getMonthStartEndDate = date => {
  const currentDate = moment(); // Today's date => return date
  const startOfMonth = moment(date)
    .startOf('month')
    .toDate(); // Start date of month for provided date => return date
  const endOfMonth = moment(date)
    .endOf('month')
    .toDate(); // End date of month for provided date => return date
  const lastDay = endOfMonth.getDate(); // Last day of month for provided date => return number
  const currentDay = currentDate.toDate().getDate();
  const firstWeekDay = startOfMonth.getDay(); // Return number for first day of month e.g sunday => 0, monday => 1, saturday => 6
  const lastMonthLastDate = moment(date)
    .subtract(1, 'months')
    .endOf('month')
    .toDate(); // Get prev month last date of provided date => return date
  const lastMonthLastDay = lastMonthLastDate.getDate(); // Get last day of last month => return number => e.g 28,30,31
  let currentMonthLastDay = endOfMonth.getDay();
  const dateToDisplay = [];
  for (let i = firstWeekDay - 1; i >= 0; i--) {
    // Add previous month date's until first date
    dateToDisplay.push({
      date: moment(lastMonthLastDate).subtract(i, 'days'),
      value: lastMonthLastDay - i,
      disable: true,
      day: moment(lastMonthLastDate)
        .subtract(i, 'days')
        .format('dddd'),
    });
  }
  Array.from(Array(lastDay)).forEach((item, i) => {
    const date = moment(startOfMonth).add(i, 'days');

    const newObj = {
      value: i + 1,
      disable: false,
      date,
      day: moment(startOfMonth)
        .add(i, 'days')
        .format('dddd'),
    };
    if (date.weekday() === 0 || date.weekday() === 6) {
      newObj['weekend'] = true;
      newObj['disable'] = true;
    }

    dateToDisplay.push(newObj); // Add current month date's
  });
  let nextMonthDate = 1;
  while (currentMonthLastDay < 6) {
    // Add next month date's until next saturday
    dateToDisplay.push({
      date: moment(date)
        .add(1, 'months')
        .startOf('month')
        .add(nextMonthDate - 1, 'days'),
      value: nextMonthDate++,
      disable: true,
      day: moment(date).format('dddd'),
    });
    currentMonthLastDay++;
  }
  const finalDateArray = [];
  let mainIndex = -1;
  dateToDisplay.forEach((date, idx) => {
    // Created 2D array to display
    if (idx % 7 === 0) {
      finalDateArray[++mainIndex] = [];
      finalDateArray[mainIndex].push(date);
    } else {
      finalDateArray[mainIndex].push(date);
    }
  });
  return {
    currentDate,
    startDate: startOfMonth,
    endDate: endOfMonth,
    lastDay,
    currentDay,
    dateToDisplay: finalDateArray,
  };
};

export const getWeekTitle = dateObj => {
  const startMonth = moment(dateObj.startDate).format('MMMM');
  const endMonth = moment(dateObj.endDate)
    .subtract(2, 'days')
    .format('MMMM');
  const endDate = moment(dateObj.endDate)
    .subtract(2, 'days')
    .toDate();
  if (startMonth === endMonth) {
    return `${endMonth} ${dateObj.firstDay}-${endDate.getDate()}, ${moment(
      dateObj.startDate,
    ).year()}`;
  } else {
    return `${startMonth} ${
      dateObj.firstDay
    }-${endMonth} ${endDate.getDate()}, ${moment(dateObj.startDate).year()}`;
  }
};
