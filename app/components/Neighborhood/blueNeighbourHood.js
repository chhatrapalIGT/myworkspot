/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.scss';
import '../assets/css/adminStyle.css';
import '../assets/css/style.css';
import { useParams } from 'react-router';
// import PropTypes from 'prop-types';

const BlueNeighbourHood = ({ neighbourHood }) => {
  const [firstData, setFirstData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const [fourthData, setFourthData] = useState([]);

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
    if (neighbourHood && neighbourHood.data && neighbourHood.data.length) {
      setFirstData(neighbourHood.data.splice(0, 14));
    }
    if (neighbourHood && neighbourHood.data && neighbourHood.data.length) {
      setSecondData(neighbourHood.data.splice(0, 14));
    }
    if (neighbourHood && neighbourHood.data && neighbourHood.data.length) {
      setThirdData(neighbourHood.data.splice(0, 14));
    }
    if (neighbourHood && neighbourHood.data && neighbourHood.data.length) {
      setFourthData(neighbourHood.data.splice(0, 14));
    }
  }, [neighbourHood]);

  return (
    <>
      {pathName === url && (
        <div className="header_tbl">
          <div className="new-emp-table">
            <h3>
              Floor {floor} | {neighborhoodName} Neighborhood{' '}
            </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap justify-content-between">
                {firstData.length > 0 ||
                secondData.length > 0 ||
                thirdData.length > 0 ||
                fourthData.length > 0 ? (
                  <>
                    <th
                      className="common-th-width"
                      style={{
                        fontSize: '20px',
                        textAlign: 'left',
                        wordSpacing: '-2px',
                      }}
                    >
                      {firstData &&
                        firstData.length > 0 &&
                        firstData.map(ele => (
                          <ul>
                            <li>
                              {ele.firstname}
                              &nbsp; {ele.lastname}
                            </li>
                          </ul>
                        ))}
                    </th>
                    <th
                      className="common-th-width"
                      style={{
                        fontSize: '20px',
                        textAlign: 'left',
                        wordSpacing: '-2px',
                      }}
                    >
                      {secondData &&
                        secondData.length > 0 &&
                        secondData.map(ele => (
                          <ul>
                            <li>
                              {ele.firstname}
                              &nbsp; {ele.lastname}
                            </li>
                          </ul>
                        ))}
                    </th>
                    <th
                      className="common-th-width"
                      style={{
                        fontSize: '20px',
                        textAlign: 'left',
                        wordSpacing: '-2px',
                      }}
                    >
                      {thirdData &&
                        thirdData.length > 0 &&
                        thirdData.map(ele => (
                          <ul>
                            <li>
                              {ele.firstname}
                              &nbsp; {ele.lastname}
                            </li>
                          </ul>
                        ))}
                    </th>
                    <th
                      className="last-th-width"
                      style={{
                        fontSize: '20px',
                        textAlign: 'left',
                        wordSpacing: '-2px',
                      }}
                    >
                      {fourthData &&
                        fourthData.length > 0 &&
                        fourthData.map(ele => (
                          <ul>
                            <li>
                              {ele.firstname}
                              &nbsp; {ele.lastname}
                            </li>
                          </ul>
                        ))}
                    </th>
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
            </table>
          </div>
        </div>
      )}
    </>
  );
};
BlueNeighbourHood.propTypes = {
  neighbourHood: PropTypes.object,
};

export default BlueNeighbourHood;
