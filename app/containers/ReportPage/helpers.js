/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import moment from 'moment';
import Axios from 'axios';
import { CONSTANT } from '../../enum';
import { X_API_KEY } from '../../config/env';
const { API_URL } = CONSTANT;

export const getMyTeamData = async (startDate, endDate) => {
  const sDate = moment(startDate).format('YYYY-MM-DD');
  const eDate = moment(endDate).format('YYYY-MM-DD');
  const dates = [];
  let weeklyData;
  // let isLoading = true;
  let success = false;
  let message = '';
  let tokenExp = '';
  const currDate = moment(startDate)
    .subtract(1, 'day')
    .startOf('day');
  const lastDate = moment(endDate)
    .add(1, 'day')
    .startOf('day');
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const url = `${API_URL}/invite/getInvitedMemberWorkspace?startdate=${sDate}&enddate=${eDate}`;
  await Axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
        'x-api-key': X_API_KEY,
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
      tokenExp = err.response;
      // eslint-disable-next-line prefer-destructuring
      message = err.response.data.message;
    });

  if (!success) return { message, success, tokenExp };
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
