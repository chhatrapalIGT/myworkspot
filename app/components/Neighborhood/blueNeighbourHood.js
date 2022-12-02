import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.scss';
import '../assets/css/adminStyle.css';
import '../assets/css/style.css';
// import PropTypes from 'prop-types';

const BlueNeighbourHood = ({ neighbourHood }) => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      {pathName === '/locationId=DC&floor=8&neighborhoodName=Blue' && (
        <div className="header_tbl">
          <div className="emp-table">
            <h3>Floor 8 | Blue Neighborhood </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '25px',
                          textAlign: 'left',
                          wordSpacing: '-5px',
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
      {pathName === '/locationId=DC&floor=2&neighborhoodName=Blue' && (
        <div className="header_tbl">
          <div className="emp-table">
            <h3>Floor 2 | Blue Neighborhood </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '25px',
                          textAlign: 'left',
                          wordSpacing: '-5px',
                        }}
                      >
                        {ele.firstname}
                        &nbsp; &nbsp;
                        {ele.lastname}
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
      {pathName === '/locationId=DC&floor=4&neighborhoodName=Blue' && (
        <div className="header_tbl">
          <div className="emp-table">
            <h3>Floor 4 | Blue Neighborhood </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '25px',
                          textAlign: 'left',
                          wordSpacing: '-5px',
                        }}
                      >
                        {ele.firstname}
                        &nbsp; &nbsp;
                        {ele.lastname}
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
      {pathName === '/locationId=DC&floor=3&neighborhoodName=Blue' && (
        <div className="header_tbl">
          <div className="emp-table">
            <h3>Floor 3 | Blue Neighborhood </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '25px',
                          textAlign: 'left',
                          wordSpacing: '-5px',
                        }}
                      >
                        {ele.firstname}
                        &nbsp; &nbsp;
                        {ele.lastname}
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
      {pathName ===
        '/locationId=BLM&floor=Building_1&neighborhoodName=Yellow' && (
        <div className="header_tbl">
          <div className="emp-table">
            <h3>Building 1 | Yellow Neighborhood </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '25px',
                          textAlign: 'left',
                          wordSpacing: '-5px',
                        }}
                      >
                        {ele.firstname}
                        &nbsp; &nbsp;
                        {ele.lastname}
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
      {pathName === '/locationId=RIC&floor=Floor_2&neighborhoodName=Green' && (
        <div className="header_tbl">
          <div className="emp-table">
            <h3>Floor 2 | Green Neighborhood </h3>
            <table>
              <tr className="empTable_hdr d-flex flex-wrap">
                {neighbourHood && neighbourHood.length > 0 ? (
                  neighbourHood.map(ele => (
                    <>
                      <th
                        style={{
                          width: '25%',
                          fontSize: '25px',
                          textAlign: 'left',
                          wordSpacing: '-5px',
                        }}
                      >
                        {ele.firstname}
                        &nbsp; &nbsp;
                        {ele.lastname}
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
