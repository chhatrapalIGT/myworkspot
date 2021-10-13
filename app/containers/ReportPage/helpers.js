/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import moment from 'moment';
import Axios from 'axios';
import { CONSTANT } from '../../enum';
const { API_URL } = CONSTANT;

export const getMyTeamData = async (startDate, endDate) => {
  const sDate = moment(startDate).format('YYYY-MM-DD');
  const eDate = moment(endDate).format('YYYY-MM-DD');
  const dates = [];
  let weeklyData;
  // let isLoading = true;
  let success = false;
  let message = '';
  const currDate = moment(startDate)
    .subtract(1, 'day')
    .startOf('day');
  const lastDate = moment(endDate)
    .add(1, 'day')
    .startOf('day');
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const url = `${API_URL}/invite/getInvitedMemberWorkspace?startdate=${sDate}&enddate=${eDate}&employeeid=239323`;
  await Axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    },
    //    {
    //   withCredentials: true,
    // }
  )
    .then(res => {
      // isLoading = false;
      weeklyData = res.data.response;
      success = true;
    })
    .catch(err => {
      success = false;
      // eslint-disable-next-line prefer-destructuring
      message = err.response.data.message;
    });

  if (!success) return { message, success };
  const weekArr = [];
  weeklyData &&
    weeklyData.filter(obj => {
      const arr = [];
      obj.data.filter((ele, i) => {
        while (currDate.add(1, 'days').diff(lastDate) < 0) {
          const a = moment(ele.date)
            .startOf('day')
            .isSame(currDate.toDate(), 'day');
          if (a) {
            ele = { ...ele, currDate: currDate.clone().toDate() };
            arr.push(ele);
          }
        }
        currDate.add(-6, 'days');
      });
      obj = { ...obj, data: arr };
      weekArr.push(obj);
    });

  return { data: weekArr, success: true };
};
