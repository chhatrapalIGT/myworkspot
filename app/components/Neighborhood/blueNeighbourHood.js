/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.scss';
import '../assets/css/adminStyle.css';
import '../assets/css/style.css';
import { useParams } from 'react-router';
import moment from 'moment';
// import PropTypes from 'prop-types';
import sliceIntoChunks from '../../utils/sliceIntoChunks';

const BlueNeighbourHood = ({ neighbourHood, requestGetOfficeAssignments }) => {
  const [splittedData, setSplittedData] = useState([]);
  const current = new Date();
  const location = useLocation();
  const pathName = location.pathname;
  const { locationId, floor, neighborhoodName } = useParams();
  const neighborData = {
    locId: locationId,
    flor: floor,
    neighborhood: neighborhoodName,
  };

  const url = `/NeighBorhoodLocation/${locationId}/${floor}/${neighborhoodName}`;

  useEffect(() => {
    if (url) {
      sessionStorage.setItem(
        'neighborData',
        JSON.stringify({ ...neighborData }),
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      requestGetOfficeAssignments({
        locationId: neighborData.locId,
        floor: neighborData.flor,
        neighborhoodName: neighborData.neighborhood,
        todayDate: moment(current).format('yyyy-MM-D'),
      });
    }, 120000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const dividedData =
      neighbourHood &&
      neighbourHood.data &&
      neighbourHood.data.data &&
      neighbourHood.data.data.length > 4
        ? Math.floor(neighbourHood.data.data.length / 4)
        : 1;
    if (
      neighbourHood &&
      neighbourHood.data &&
      neighbourHood.data.data &&
      neighbourHood.data.data.length > 0
    ) {
      const splittedDataTemp = sliceIntoChunks(
        neighbourHood.data.data,
        dividedData,
      );
      setSplittedData(splittedDataTemp);
    }
  }, [neighbourHood]);

  return (
    <>
      {pathName === url && (
        <div className="header_tbl">
          <div className="new-emp-table">
            <h3 style={{ fontSize: '20px' }}>
              Floor {floor} | {neighborhoodName} Neighborhood{' '}
            </h3>
            <table>
              <tbody>
                <tr className="empTable_hdr d-flex flex-wrap justify-content-between">
                  {splittedData && splittedData.length > 0 ? (
                    <>
                      {splittedData.map(arrEle => (
                        <th
                          className="common-th-width"
                          style={{
                            fontSize: '12px',
                            textAlign: 'left',
                            wordSpacing: '-2px',
                            marginRight: '-74px',
                          }}
                        >
                          {arrEle &&
                            arrEle.length > 0 &&
                            arrEle.map(ele => (
                              <ul>
                                <li>
                                  {ele.firstname}
                                  &nbsp; {ele.lastname}
                                </li>
                              </ul>
                            ))}
                        </th>
                      ))}
                    </>
                  ) : (
                    <div className="table_center">
                      <h2>No Data Found</h2>
                    </div>
                  )}
                </tr>

                <tr>
                  <td style={{ padding: '8px' }} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
BlueNeighbourHood.propTypes = {
  neighbourHood: PropTypes.object,
  requestGetOfficeAssignments: PropTypes.func,
};

export default BlueNeighbourHood;
