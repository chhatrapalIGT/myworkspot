/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Spinner from 'react-bootstrap/Spinner';
// import Office from '../../images/off.svg';
// import Swiggy from '../../images/swiggy.png';
// import Talabat from '../../images/talabat.png';
import location from '../../images/location.png';
import Zoomin from '../../images/zoomin.png';
import Zoomout from '../../images/zoomout.png';
import map1 from '../../images/Map_1.svg';
import map2 from '../../images/MapWF2.svg';
import map3 from '../../images/Map_3.svg';
import map4 from '../../images/Map_4.svg';
import map5 from '../../images/Map_5.svg';
import map6 from '../../images/Map_6.svg';
import map7 from '../../images/Map_7.svg';
import map8 from '../../images/Map_8.svg';
import map9 from '../../images/Map_9.svg';
import map10 from '../../images/Map_10.svg';
import WF2 from '../Resource/WF2';
import WF3 from '../Resource/WF3';
import WF4 from '../Resource/WF4';
import WF8 from '../Resource/WF8';
import RB1 from '../Resource/RB1';
import RB2 from '../Resource/RB2';
import RB3F1 from '../Resource/RB3F1';
import RB3F2 from '../Resource/RB3F2';
import BRB1 from '../Resource/BRB1';
import BLB1 from '../Resource/BLB1';
const OfficeWDC = ({
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  state,
  officeLocation,
  officeLocationErrorHandle,
}) => {
  const isDraggable = state.scale > 1;
  const [office, setOffice] = useState('Washington, DC');
  const [floor, setFloor] = useState();
  const [finalFloor, setFinalFloor] = useState('Floor 2');
  const [imgSrc, setImgSrc] = useState('');
  const [imgResource, setImgResource] = useState('');

  const finalFloorData =
    officeLocation &&
    officeLocation[0] &&
    officeLocation[0].building &&
    officeLocation[0].building.map(obj => obj);

  useEffect(() => {
    if (office.length) {
      setFloors(office);
    }
    Icon();
  }, [office]);

  const setFloors = value => {
    let Data = [];

    const switchValue = value || office;
    Data =
      officeLocation &&
      officeLocation.find(obj =>
        obj.location === switchValue ? obj.building : '',
      );
    setFloor(Data && Data.building);
    setFinalFloor(Data && Data.building[0]);
    Icon(
      switchValue,
      officeLocation && officeLocation[0] && officeLocation[0].building,
    );
  };
  const Icon = (valOffice, valFinalFloor) => {
    const switchOffice = valOffice || office;
    const switchFinalFloor = valFinalFloor || finalFloor;
    let imageSrc = '';
    let imageDataResource = '';

    switch (switchOffice) {
      case 'Washington, DC':
        switch (switchFinalFloor) {
          case 'Floor 2':
            imageSrc = map2;
            imageDataResource = WF2;
            break;
          case 'Floor 3':
            imageSrc = map1;
            imageDataResource = WF3;
            break;
          case 'Floor 4':
            imageSrc = map3;
            imageDataResource = WF4;
            break;
          case 'Floor 8':
            imageSrc = map4;
            imageDataResource = WF8;
            break;
        }
        break;
      case 'Richmond, VA':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = map5;
            imageDataResource = RB1;
            break;
          case 'Building 2':
            imageSrc = map6;
            imageDataResource = RB2;
            break;
          case 'Building 3, Floor 1':
            imageSrc = map7;
            imageDataResource = RB3F1;
            break;
          case 'Building 3, Floor 2':
            imageSrc = map8;
            imageDataResource = RB3F2;
            break;
        }
        break;
      case 'Birmigham, AL':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = map10;
            imageDataResource = BRB1;
            break;
        }
        break;

      case 'Bloomington, MN':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = map9;
            imageDataResource = BLB1;
            break;
        }
        break;

      default:
    }
    setImgSrc(imageSrc);
    setImgResource(imageDataResource);
  };

  return (
    <>
      {officeLocationErrorHandle &&
        !officeLocationErrorHandle.success &&
        officeLocationErrorHandle.error && (
          <div className="alert-dismissible fade show popup_err" role="alert">
            <p className="text-center m-auto">
              {officeLocationErrorHandle && !officeLocationErrorHandle.success
                ? officeLocationErrorHandle.error
                : ''}
            </p>
          </div>
        )}
      {officeLocation && !officeLocation.length ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
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
                      className="set_drop"
                    >
                      {officeLocation &&
                        officeLocation.map(obj => (
                          <>
                            <option
                              value={obj.location}
                              key={obj.location}
                              id="building"
                            >
                              {obj.location}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>
                  <div className="selction_one">
                    <label htmlFor="Building/Floor">Building/Floor</label>
                    <select
                      className={
                        office === 'Birmigham, AL' ||
                        office === 'Bloomington, MN'
                          ? ''
                          : 'set_drop'
                      }
                      name=""
                      id=""
                      disabled={
                        office === 'Birmigham, AL' ||
                        office === 'Bloomington, MN'
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
                              <option value={obj} key={obj} id="floors">
                                {obj}
                              </option>
                            </>
                          ))
                        : finalFloorData &&
                          finalFloorData.map(data => (
                            <option value={data} key={data} id="floors">
                              {data}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="office-structure mt-4">
            <div className="container">
              <div className="card office-structure-inner">
                {imgResource || ''}
                <div className="right-map">
                  <Draggable disabled={!isDraggable} key={state.version}>
                    <div
                      className="drag_image"
                      style={isDraggable ? { cursor: 'move' } : null}
                    >
                      <img
                        src={imgSrc}
                        alt=""
                        style={imgStyle}
                        draggable="false"
                      />
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
      )}
    </>
  );
};

OfficeWDC.propTypes = {
  imgStyle: PropTypes.object,
  state: PropTypes.object,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
  officeLocationErrorHandle: PropTypes.string,
  officeLocation: PropTypes.object,
};
export default OfficeWDC;
