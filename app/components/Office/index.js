/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Spinner from 'react-bootstrap/Spinner';

import location from '../../images/location.png';
import Zoomin from '../../images/zoomin.png';
import Zoomout from '../../images/zoomout.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';

const Office = ({
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  state,
  handleUserSelect,
  officeLocation,
  requestFileUpload,
  officeUpdateSuccess,
  officeUpdateMessage,
  handleCloseIcon,
}) => {
  const isDraggable = state.scale > 1;

  const [floor, setFloor] = useState('2,null');
  const [color, setColor] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [setActive, setActiveState] = useState('');
  const [imageUpdateData, setImageUpdateData] = useState();

  const content = useRef(null);
  function toggleAccordion(id) {
    setImageUpdateData(id);
    setDisplayColor('');
    setColor('');
    if (id === setActive) {
      setActiveState('');
    } else {
      setActiveState(id);
    }
  }

  useEffect(() => {
    if (state.selectedNames === 'BHM' || state.selectedNames === 'BLM') {
      setFloor('');
      setDisplayColor('');
    }
  }, [state.selectedNames]);

  const finalLocationVal =
    officeLocation && officeLocation.filter(obj => obj.id !== 'RW');

  const floorData =
    officeLocation &&
    officeLocation.find(data =>
      data.id === state.selectedNames ? data.FloorBuilding : '',
    );
  const defaultImage =
    floorData &&
    floorData.FloorBuilding.find(img =>
      img.floorAndBuilding === imageUpdateData ? img.image : '',
    );

  const finalNeighbouhoodImage =
    defaultImage &&
    defaultImage.neighborhood.find(final =>
      final.colorcode === color ? final.neighborhoodImage : '',
    );
  const dataFinal = floor && floor.split(',');

  const onFileUpload = event => {
    const name = event.target.files[0];
    const id = state.selectedNames;

    const formData = new FormData();
    if (floor) {
      formData.append(
        'floor',
        dataFinal && dataFinal[0] !== 'null' ? dataFinal[0] : '',
      );
      formData.append(
        'building',
        dataFinal && dataFinal[1] !== 'null' ? dataFinal[1] : '',
      );
    }
    if (color) {
      formData.append('isNeighborhood', true);
      formData.append('colorcode', color);
    } else {
      formData.append('isNeighborhood', false);
    }
    formData.append('locationid', id);
    formData.append('image', name);

    if (id === 'BHM' || id === 'BLM') {
      formData.append('building', 1);
    }
    if (event.target.value.length) {
      requestFileUpload({ formData });
    }
    event.target.value = '';
  };

  const updateVal = () => {
    document.getElementById('fileUpload').click();
  };

  return (
    <>
      <div className="wrapper_main">
        {officeUpdateMessage && (
          <div
            className={`alert fade show mx-auto ${
              officeUpdateSuccess ? 'alert alert-success' : 'alert alert-danger'
            }`}
          >
            <div>
              <img
                src={officeUpdateSuccess ? checkedCircle : crossCircle}
                alt=""
                style={{ paddingRight: '5px', marginBottom: ' 4px' }}
              />
              {officeUpdateMessage || ''}
            </div>
            <div
              aria-hidden="true"
              style={{
                float: 'right',
                fontSize: 'large',
                marginLeft: '10px',
              }}
              onClick={handleCloseIcon}
              className="day-pointer"
            >
              &#10006;
            </div>
          </div>
        )}
        <div className="office_maps">
          <div className="container">
            <div className="head d-flex align-items-center between">
              <div>
                <h4 className="common-title mb-4">Office Maps</h4>
              </div>
              <div className="office-selections wrap">
                <div className="selction_one ww-100">
                  <label htmlFor="ofc">Office</label>
                  <select
                    style={{ color: '#00355F' }}
                    name=""
                    id=""
                    value={state.selectedNames}
                    onChange={handleUserSelect}
                    className="set_drop"
                  >
                    {finalLocationVal &&
                      finalLocationVal.map(obj => (
                        <>
                          <option
                            value={obj.id}
                            key={obj.locationname}
                            id="building"
                          >
                            {obj.locationname}
                          </option>
                        </>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="office-maps">
              {officeLocation && !officeLocation.length ? (
                <div className="row">
                  <Spinner
                    className="app-spinner"
                    animation="grow"
                    variant="dark"
                  />
                </div>
              ) : (
                <div className="row">
                  {(state.selectedNames === 'DC' ||
                    state.selectedNames === 'RIC') && (
                    <div className="col-md-3 part-right">
                      <div className="accordion_box p-2">
                        {floorData &&
                          floorData.FloorBuilding &&
                          floorData.FloorBuilding.map(obj => (
                            <>
                              <div
                                aria-hidden="true"
                                className={`accordion pad-left-0 bg-blue ${
                                  setActive === obj.floorAndBuilding
                                    ? 'active'
                                    : ''
                                }`}
                                key={obj.floor}
                                id={obj.floor}
                                onClick={() => {
                                  setFloor(`${obj.floor},${obj.building}`);
                                  toggleAccordion(obj.floorAndBuilding);
                                }}
                              >
                                <span className="dash-menu-item">
                                  {obj.building && `Building ${obj.building}`}{' '}
                                  {obj.floor && `Floor ${obj.floor}`}
                                </span>
                              </div>

                              <div
                                ref={content}
                                className={`panel ${
                                  setActive === obj.floorAndBuilding
                                    ? ''
                                    : 'display_acc'
                                }`}
                              >
                                {obj &&
                                  obj.neighborhood.map(floor => (
                                    <div
                                      aria-hidden="true"
                                      className="panel-list"
                                      onClick={() => {
                                        setColor(floor.colorcode);
                                        setDisplayColor(floor.neighborhoodname);
                                      }}
                                    >
                                      <div className="dash-menu-list pad-left-23">
                                        <div
                                          className={`dash-menu-item2 ${
                                            color === floor.colorcode
                                              ? 'acc_active'
                                              : ''
                                          }`}
                                        >
                                          <span
                                            className={`sq-${floor.neighborhoodname.toLowerCase()}`}
                                          />
                                          {floor.neighborhoodname}{' '}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  )}
                  <div
                    className={`pl-0 pr-0 ${
                      state.selectedNames === 'BHM' ||
                      state.selectedNames === 'BLM'
                        ? 'col-md-12'
                        : 'col-md-9'
                    }`}
                  >
                    <div className="floor2">
                      <div className="d-flex align-items-center justify-content-between pad-tri">
                        <div className="">
                          <div
                            style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#00355F',
                            }}
                          >
                            {floorData && floorData.locationname}{' '}
                            {dataFinal &&
                            dataFinal[1] !== 'null' &&
                            dataFinal[0] !== 'null'
                              ? `| Building ${dataFinal[1]}, Floor ${
                                  dataFinal[0]
                                }`
                              : dataFinal && dataFinal[1] !== 'null'
                              ? `| Building ${dataFinal[1]}`
                              : dataFinal && dataFinal[0] !== 'null'
                              ? `| Floor ${dataFinal[0]}`
                              : ''}{' '}
                            {displayColor ? `| ${displayColor}` : ''}
                          </div>
                          <div className="of-mp-head" />
                          <div className="of-mp-para">
                            {color && color.length
                              ? 'Upload .SVG file to update the map.'
                              : 'Upload .SVG file to update the map. Neighborhood assignment maps will not be updated automatically.'}
                          </div>
                        </div>

                        <div className="">
                          <input
                            type="file"
                            id="fileUpload"
                            accept=".png,.svg,.jpg"
                            onChange={onFileUpload}
                            className="blue-bg-btn1"
                          />
                          <input
                            type="button"
                            id="btnUpload"
                            onClick={updateVal}
                            className="blue-bg-btn1"
                            value="Upload New Map"
                          />
                        </div>
                      </div>

                      <div className="border-bot" />

                      <div className="p-3 office_update">
                        <Draggable disabled={!isDraggable} key={state.version}>
                          <div
                            className="tx-center "
                            style={isDraggable ? { cursor: 'move' } : null}
                          >
                            <img
                              src={
                                // eslint-disable-next-line no-nested-ternary
                                finalNeighbouhoodImage &&
                                finalNeighbouhoodImage.neighborhoodImage
                                  ? finalNeighbouhoodImage &&
                                    finalNeighbouhoodImage.neighborhoodImage
                                  : defaultImage
                                  ? defaultImage.image
                                  : floorData &&
                                    floorData.FloorBuilding[0] &&
                                    floorData.FloorBuilding[0].image
                              }
                              style={imgStyle}
                              draggable="false"
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                        </Draggable>
                      </div>

                      <div className="map-control">
                        <div
                          className="map-btn"
                          onClick={() => handleDefault()}
                          aria-hidden="true"
                        >
                          <img
                            src={location}
                            className="img-fluid img-fix"
                            alt="data"
                          />
                        </div>
                        <div
                          aria-hidden="true"
                          className="map-btn mt-2"
                          onClick={() => handleZoomIn()}
                        >
                          <img
                            src={Zoomin}
                            className="img-fluid img-fix"
                            alt="data"
                          />
                        </div>

                        <div
                          className="map-btn"
                          aria-hidden="true"
                          onClick={() => handleZoomOut()}
                        >
                          <img
                            src={Zoomout}
                            className="img-fluid img-fix"
                            alt="data"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Office.propTypes = {
  imgStyle: PropTypes.object,
  state: PropTypes.object,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
  officeLocation: PropTypes.object,
  handleUserSelect: PropTypes.func,
  requestFileUpload: PropTypes.func,
  handleCloseIcon: PropTypes.func,
  officeUpdateSuccess: PropTypes.bool,
  officeUpdateMessage: PropTypes.string,
};
export default Office;
