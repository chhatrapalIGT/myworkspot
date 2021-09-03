/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
// import Office from '../../images/off.svg';
// import Swiggy from '../../images/swiggy.png';
// import Talabat from '../../images/talabat.png';
import heartImage from '../../images/heart.png';
import location from '../../images/location.png';
import Zoomin from '../../images/zoomin.png';
import Zoomout from '../../images/zoomout.png';
import map1 from '../../images/Map_1.svg';
import map2 from '../../images/Map_2.svg';
import map3 from '../../images/Map_3.svg';
import map4 from '../../images/Map_4.svg';
import map5 from '../../images/Map_5.svg';
import map6 from '../../images/Map_6.svg';
import map7 from '../../images/Map_7.svg';
import map8 from '../../images/Map_8.svg';
import map9 from '../../images/Map_9.svg';
import map10 from '../../images/Map_10.svg';

const OfficeWDC = ({
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  state,
}) => {
  const isDraggable = state.scale > 1;
  const [office, setOffice] = useState('Washington , DC');
  const [allUser, setAllUser] = useState([]);
  const [floor, setFloor] = useState([]);
  const [finalFloor, setFinalFloor] = useState('Floor 2');
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    const url = `https://mocki.io/v1/947b4269-a50f-4e16-8157-30d04fb8879a`;
    Axios.get(url, {}).then(res => {
      setAllUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (office.length) {
      setFloors(office);
    }
  }, [office]);

  const setFloors = value => {
    let Data = [];

    const switchValue = value || office;

    switch (switchValue) {
      case 'Washington , DC':
        Data = ['Floor 2', 'Floor 3', 'Floor 4', 'Floor 8'];
        break;
      case 'Richmond , VA':
        Data = [
          'Building 1',
          'Building 2',
          'Building 3 , Floor 1',
          'Building 3 , Floor 2',
        ];
        break;
      case 'Birmigham , AL':
        Data = ['Building 1'];
        break;
      case 'Bloomington , MN':
        Data = ['Building 1'];
        break;

      default:
        Data = ['No Floor Found '];
    }
    setFloor(Data);
    Icon(switchValue, Data[0]);
  };
  const Icon = (valOffice, valFinalFloor) => {
    const switchOffice = valOffice || office;
    const switchFinalFloor = valFinalFloor || finalFloor;
    let imageSrc = '';

    switch (switchOffice) {
      case 'Washington , DC':
        switch (switchFinalFloor) {
          case 'Floor 2':
            imageSrc = map2;
            break;
          case 'Floor 3':
            imageSrc = map1;
            break;
          case 'Floor 4':
            imageSrc = map3;
            break;
          case 'Floor 8':
            imageSrc = map4;
            break;
        }
        break;
      case 'Richmond , VA':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = map5;
            break;
          case 'Building 2':
            imageSrc = map6;
            break;
          case 'Building 3 , Floor 1':
            imageSrc = map7;
            break;
          case 'Building 3 , Floor 2':
            imageSrc = map8;
            break;
        }
        break;
      case 'Birmigham , AL':
        imageSrc = map10;
        break;

      case 'Bloomington , MN':
        imageSrc = map9;
        break;

      default:
    }
    setImgSrc(imageSrc);
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
                    setFloors(e.target.value);
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
                  disabled={
                    office === 'Birmigham , AL' || office === 'Bloomington , MN'
                  }
                  onChange={e => {
                    Icon(office, e.target.value);
                    setFinalFloor(e.target.value);
                  }}
                >
                  {floor && floor.length
                    ? floor &&
                      floor.map(obj => (
                        <>
                          <option value={obj} key={obj}>
                            {obj}
                          </option>
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
              <Draggable disabled={!isDraggable} key={state.version}>
                <div
                  className="drag_image"
                  style={isDraggable ? { cursor: 'move' } : null}
                >
                  <img src={imgSrc} alt="" style={imgStyle} draggable="false" />
                </div>
              </Draggable>

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
  imgStyle: PropTypes.object,
  state: PropTypes.object,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
};
export default OfficeWDC;
