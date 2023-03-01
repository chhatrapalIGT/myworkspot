/* eslint-disable no-plusplus */
/* eslint-disable operator-assignment */
/* eslint-disable prefer-const */
const sliceIntoChunks = (arr, chunkSize) => {
  let spliceStart = 0;
  let res = [[], [], [], []];
  for (let i = 0; i < 4; i++) {
    let totalRecord = arr.length % 4 >= i + 1 ? chunkSize + 1 : chunkSize;
    let data = arr.slice(spliceStart, spliceStart + totalRecord);
    res[i] = data;
    spliceStart = spliceStart + totalRecord;
  }
  return res;
};
export default sliceIntoChunks;
