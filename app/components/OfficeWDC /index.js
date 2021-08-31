/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Office from '../../images/off.svg';
import Swiggy from '../../images/swiggy.png';
import Talabat from '../../images/talabat.png';
import heartImage from '../../images/heart.png';
import location from '../../images/location.png';
import Zoomin from '../../images/zoomin.png';
import Zoomout from '../../images/zoomout.png';
import Floor from '../../images/floormap.png';

const OfficeWDC = ({
  imgRefData,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
}) => {
  const [office, setOffice] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [floor, setFloor] = useState([]);
  const [finalFloor, setFinalFloor] = useState('Floor1');

  useEffect(() => {
    const url = `https://mocki.io/v1/0a505005-9da4-44c7-9000-0447e1dd3fb2`;
    Axios.get(url, {}).then(res => {
      setAllUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (office.length) {
      setFloors(office);
    }
  }, [office]);

  const setFloors = () => {
    let Data = [];

    switch (office) {
      case 'Washington , DC':
        Data = ['Floor1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5'];
        break;
      case 'Richmond , VA':
        Data = ['Floor1', 'Floor 2', 'Floor 3'];
        break;
      case 'Birmigham , AL':
        Data = ['Floor1', 'Floor 2'];
        break;
      case 'Bloomington , MN':
        Data = ['Floor1', 'Floor 2', 'Floor 3', 'Floor 4'];
        break;

      default:
        Data = ['No Floor Found '];
    }
    setFloor(Data);
  };

  const Icon = () => {
    switch (office) {
      case 'Washington , DC':
        switch (finalFloor) {
          case 'Floor1':
            return Floor;
          case 'Floor 2':
            return Talabat;
        }
        break;
      case 'Richmond , VA':
        switch (finalFloor) {
          case 'Floor1':
            return Floor;
          case 'Floor 2':
            return Swiggy;
        }
        break;
      case 'Birmigham , AL':
        switch (finalFloor) {
          case 'Floor1':
            return Office;
          case 'Floor 2':
            return Talabat;
        }
        break;
      default:
    }
    return null;
  };

  return (
    <div className="wrapper_main">
      <div className="office_maps">
        <div className="container">
          <div className="head d-flex align-items-center">
            <h4 className="common-title">Office Maps</h4>
            <div className="office-selections">
              <div className="selction_one">
                <label htmlFor="Office">Office</label>
                <select
                  name=""
                  id=""
                  value={office}
                  onChange={e => {
                    setOffice(e.target.value);
                  }}
                >
                  {allUser &&
                    allUser.map(obj => (
                      <>
                        <option value={obj.name} key={obj.name}>
                          {obj.name}
                        </option>
                      </>
                    ))}
                </select>
              </div>
              <div className="selction_one">
                <label htmlFor="Building/Floor">Building/Floor</label>
                <select
                  name=""
                  id=""
                  onChange={e => {
                    setFinalFloor(e.target.value);
                  }}
                  onClick={() => setFloors(office)}
                >
                  {floor && floor.length
                    ? floor &&
                      floor.map(obj => (
                        <>
                          <option value={obj}>{obj}</option>
                        </>
                      ))
                    : 'No Floor Found'}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="office-structure mt-4">
        <div className="container">
          <div className="card office-structure-inner">
            <div className="left-panel">
              <div className="office-info">
                <p className="name"> {office}</p>
                <span className="floor"> {finalFloor}</span>
              </div>
              <div className="office-resource">
                <p>Office Resources</p>
                <div className="office-part-one yellow">
                  <span className="informer" />
                  <label htmlFor="my-spot">Yellow</label>
                </div>
                <div className="office-part-one teal">
                  <span className="informer" />
                  <label htmlFor="my-spot">Teal</label>
                </div>
                <div className="office-part-one orange">
                  <span className="informer" />
                  <label htmlFor="my-spot">Orange</label>
                </div>
                <div className="office-part-one blue">
                  <span className="informer" />
                  <label htmlFor="my-spot">Blue</label>
                </div>
                <div className="office-part-one teal">
                  <span className="informer">315</span>
                  <label htmlFor="my-spot">Bel-Air</label>
                </div>
                <div className="office-part-one teal">
                  <span className="informer">332</span>
                  <label htmlFor="my-spot">Walkerville</label>
                </div>
                <div className="office-part-one white">
                  <span className="informer">334</span>
                  <label htmlFor="my-spot">Common Room</label>
                </div>
                <div className="office-part-one black">
                  <span className="informer">359</span>
                  <label htmlFor="my-spot">The Post</label>
                </div>
                <div className="office-part-one heart pink">
                  <span className="informer">
                    <img src={heartImage} alt="" />
                  </span>
                  <label htmlFor="my-spot">AED</label>
                </div>
              </div>
            </div>
            <div className="right-map">
              <img
                src={Icon(office, finalFloor)}
                alt=""
                ref={imgRefData}
                style={imgStyle}
              />
              <div className="toolbar">
                <button
                  className="location"
                  type="button"
                  onClick={() => handleDefault()}
                >
                  <img src={location} alt="" />
                </button>
                <button
                  className="zoomin"
                  type="button"
                  onClick={() => handleZoomIn()}
                >
                  <img src={Zoomin} alt="" />
                </button>
                <button
                  className="zoomout"
                  type="button"
                  onClick={() => handleZoomOut()}
                >
                  <img src={Zoomout} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OfficeWDC.propTypes = {
  imgRefData: PropTypes.object,
  imgStyle: PropTypes.object,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
};
export default OfficeWDC;
