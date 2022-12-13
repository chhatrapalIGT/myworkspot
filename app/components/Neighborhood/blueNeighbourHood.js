import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.scss';
import '../assets/css/adminStyle.css';
import '../assets/css/style.css';
import { useParams } from 'react-router';
// import PropTypes from 'prop-types';

const BlueNeighbourHood = ({ neighbourHood }) => {
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

  return (
    <>
      {pathName === url && (
        <div className="header_tbl">
          <div className="new-emp-table">
            <h3>
              Floor {floor} | {neighborhoodName} Neighborhood{' '}
            </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '20px',
                          textAlign: 'left',
                          wordSpacing: '-2px',
                        }}
                      >
                        {ele.firstname}
                        &nbsp; {ele.lastname}
                      </th>
                    </>
                  ))
                ) : (
                  <div className="table_center">
                    <h2>No Data Found</h2>
                  </div>
                )}
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
