/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Spinner from 'react-bootstrap/Spinner';
// import Office from '../../images/off.svg';
// import Swiggy from '../../images/swiggy.png';
// import Talabat from '../../images/talabat.png';
import { MapInteractionCSS } from 'react-map-interaction';
import location from '../../images/location.png';
import Zoomin from '../../images/zoomin.png';
import Zoomout from '../../images/zoomout.png';
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
import crossCircle from '../../images/x-circle-fill.svg';
import useWindowSize from '../../hooks/useWindowSize';

const OfficeWDC = ({
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  state,
  officeLocation,
  officeLocationErrorHandle,
  handleClearOffice,
  dataStyle,
}) => {
  const isDraggable = state.scale > 1;
  const [office, setOffice] = useState('Washington, DC');
  const [floor, setFloor] = useState();
  const [finalFloor, setFinalFloor] = useState('Floor 2');
  const [imgSrc, setImgSrc] = useState('');
  const [imgResource, setImgResource] = useState('');
  const { width } = useWindowSize();

  const finalFloorData =
    officeLocation &&
    officeLocation[0] &&
    officeLocation[0].LocationHasmanybuilding &&
    officeLocation[0].LocationHasmanybuilding.map(obj => obj.building);

  useEffect(() => {
    if (office.length) {
      setFloors(office);
    }
  }, [officeLocation, width]);

  const setFloors = value => {
    let Data = [];

    const switchValue = value || office;
    Data =
      officeLocation &&
      officeLocation.find(obj =>
        obj.locationname === switchValue ? obj.LocationHasmanybuilding : '',
      );

    setFloor(Data && Data.LocationHasmanybuilding);
    setFinalFloor(Data && Data.LocationHasmanybuilding[0]);
    Icon(
      switchValue,
      Data && Data.LocationHasmanybuilding && Data.LocationHasmanybuilding[0],
    );
  };

  const FinalFloorFunc = value => {
    let finalUpdated = [];
    finalUpdated =
      officeLocation &&
      officeLocation.find(obj =>
        obj.locationname === office ? obj.LocationHasmanybuilding : '',
      );
    const finalValUpdate =
      finalUpdated &&
      finalUpdated.LocationHasmanybuilding.find(val =>
        val.building === value ? val : '',
      );
    Icon(office, finalValUpdate);
  };

  const Icon = (valOffice, valFinalFloor) => {
    const switchOffice = valOffice || office;
    const switchFinalFloor = valFinalFloor && valFinalFloor.building;
    let imageSrc = '';
    let imageDataResource = '';

    switch (switchOffice) {
      case 'Washington, DC':
        switch (switchFinalFloor) {
          case 'Floor 2':
            imageSrc = valFinalFloor.image;
            imageDataResource = WF2;
            break;
          case 'Floor 3':
            imageSrc = valFinalFloor.image;
            imageDataResource = WF3;
            break;
          case 'Floor 4':
            imageSrc = valFinalFloor.image;
            imageDataResource = WF4;
            break;
          case 'Floor 8':
            imageSrc = valFinalFloor.image;
            imageDataResource = WF8;
            break;
        }
        break;
      case 'Richmond, VA':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = valFinalFloor.image;
            imageDataResource = RB1;
            break;
          case 'Building 2':
            imageSrc = valFinalFloor.image;
            imageDataResource = RB2;
            break;
          case 'Building 3, Floor 1':
            imageSrc = valFinalFloor.image;
            imageDataResource = RB3F1;
            break;
          case 'Building 3, Floor 2':
            imageSrc = valFinalFloor.image;
            imageDataResource = RB3F2;
            break;
        }
        break;
      case 'Birmingham, AL':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = valFinalFloor.image;
            imageDataResource = BRB1;
            break;
        }
        break;

      case 'Bloomington, MN':
        switch (switchFinalFloor) {
          case 'Building 1':
            imageSrc = valFinalFloor.image;
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
          <div className="alert fade alert alert-danger show mx-auto">
            <div style={{ display: 'contents', lineHeight: '30px' }}>
              <img src={crossCircle} alt="" style={{ paddingRight: '5px' }} />
              <div>{officeLocationErrorHandle.error}</div>
            </div>
            <div
              style={{ float: 'right', fontSize: 'large' }}
              onClick={() => handleClearOffice()}
              aria-hidden="true"
              className="day-pointer al_cross"
            >
              &#10006;
            </div>
          </div>
        )}

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
                      handleDefault();
                    }}
                    className="set_drop"
                  >
                    {officeLocation &&
                      officeLocation.map(obj => (
                        <>
                          <option
                            value={obj.locationname}
                            key={obj.locationname}
                            id="building"
                          >
                            {obj.locationname}
                          </option>
                        </>
                      ))}
                  </select>
                </div>
                <div className="selction_one">
                  <label htmlFor="Building/Floor">Building/Floor</label>
                  <select
                    className={
                      office === 'Birmingham, AL' ||
                      office === 'Bloomington, MN'
                        ? ''
                        : 'set_drop'
                    }
                    name=""
                    id=""
                    disabled={
                      office === 'Birmingham, AL' ||
                      office === 'Bloomington, MN'
                    }
                    onChange={e => {
                      FinalFloorFunc(e.target.value);
                      handleDefault();
                    }}
                  >
                    {floor && floor.length
                      ? floor &&
                        floor.map(obj => (
                          <>
                            <option
                              value={obj.building}
                              key={obj.building}
                              id="floors"
                            >
                              {obj.building}
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
        <div className="container">
          <div className="office-structure mt-4">
            <div className="card office-structure-inner">
              {imgSrc !== null ? (
                <>
                  {officeLocationErrorHandle &&
                  officeLocationErrorHandle.loading ? (
                    <Spinner
                      className="app-spinner"
                      animation="grow"
                      variant="dark"
                    />
                  ) : (
                    <>
                      {width > 767 ? (
                        <>
                          {imgResource || ''}
                          <div className="right-map">
                            <Draggable
                              disabled={!isDraggable}
                              key={state.version}
                            >
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
                        </>
                      ) : (
                        <>
                          <div className="right-map">
                            <MapInteractionCSS>
                              <img src={imgSrc} alt="test" style={dataStyle} />
                            </MapInteractionCSS>
                          </div>
                          {imgResource || ''}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <h2 style={{ margin: '5% auto' }}>No Image Found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
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
  handleClearOffice: PropTypes.func,
  dataStyle: PropTypes.object,
};
export default OfficeWDC;
