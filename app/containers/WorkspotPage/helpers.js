import moment from 'moment';
import Axios from 'axios';
import { CONSTANT } from '../../enum';
const { API_URL } = CONSTANT;

export const getWorkSpotData = async (startDate, endDate) => {
  const sDate = moment(startDate).format('YYYY-MM-DD');
  const eDate = moment(endDate).format('YYYY-MM-DD');
  const dates = [];
  let weeklyData;
  let isLoading = true;
  const currDate = moment(startDate)
    .subtract(1, 'day')
    .startOf('day');
  const lastDate = moment(endDate)
    .add(1, 'day')
    .startOf('day');

  const url = `${API_URL}/weaklyDefault/getData?startdate=${sDate}&enddate=${eDate}&employeeid=239321`;
  await Axios.get(url, {
    withCredentials: true,
  }).then(res => {
    isLoading = false;
    weeklyData = res.data.data;
  });

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    const newArr =
      weeklyData &&
      weeklyData.find(ele =>
        moment(ele.weekofday)
          .startOf('day')
          .isSame(currDate.toDate(), 'day'),
      );
    const color =
      newArr && newArr.ColorCode === 'aa2121'
        ? 'Red'
        : newArr && newArr.ColorCode === 'a5c3e2' && 'Blue';

    dates.push({
      ...newArr,
      date: currDate.clone().toDate(),
      isLoading,
      color,
    });
  }
  return dates;
};
