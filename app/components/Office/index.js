/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import location from '../../images/location.png';
import Zoomin from '../../images/zoomin.png';
import Zoomout from '../../images/zoomout.png';

const Office = ({
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  state,
  handleUserSelect,
  officeLocation,
  requestFileUpload,
}) => {
  const isDraggable = state.scale > 1;

  const [floor, setFloor] = useState();
  const [color, setColor] = useState();
  const [flToggle, setFlToggle] = useState(false);
  const floorData =
    officeLocation &&
    officeLocation.find(data =>
      data.id === state.selectedNames ? data.FloorBuilding : '',
    );

  const defaultImage =
    floorData &&
    floorData.FloorBuilding.find(img => (img.floor === floor ? img.image : ''));

  const onFileUpload = event => {
    const name = event.target.files[0];
    const id = state.selectedNames;

    const formData = new FormData();
    if (floor) {
      formData.append('floor', floor);
    }
    if (color) {
      formData.append('isNeighborhood', true);
    } else {
      formData.append('isNeighborhood', false);
    }
    formData.append('locationid', id);
    formData.append('image', name);
    requestFileUpload({ formData });
  };

  const updateVal = () => {
    document.getElementById('fileUpload').click();
  };

  const add = () => {
    setFlToggle(true);
    const acc = document.getElementsByClassName('accordion');

    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < acc.length; i++) {
      // eslint-disable-next-line func-names
      acc[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + '10px';
        }
      });
    }
  };

  return (
    <div className="wrapper_main">
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
                  name=""
                  id=""
                  value={state.selectedNames}
                  onChange={handleUserSelect}
                  className="set_drop"
                >
                  {officeLocation &&
                    officeLocation.map(obj => (
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
                              flToggle ? 'active' : ''
                            }`}
                            key={obj.id}
                            id="floor2"
                            onClick={() => {
                              add();
                              setFloor(obj.floor);
                            }}
                          >
                            <span className="dash-menu-item">
                              {obj.building && `Building${obj.building}`}{' '}
                              {obj.floor && `Floor${obj.floor}`}
                            </span>
                          </div>
                          <div
                            className="panel"
                            style={{ maxHeight: '20810px' }}
                          >
                            {obj &&
                              obj.neighborhood.map(floor => (
                                <div
                                  aria-hidden="true"
                                  className="panel-list"
                                  onClick={() => {
                                    setColor(floor.neighborhoodname);
                                  }}
                                >
                                  <div className="dash-menu-list pad-left-23">
                                    <div className="dash-menu-item2">
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
              <div className="col-md-9 pl-0 pr-0">
                <div className="floor2">
                  <div className="d-flex align-items-center justify-content-between pad-tri">
                    <div className="">
                      {floorData && floorData.locationname}
                      <div className="of-mp-head" />
                      <div className="of-mp-para">
                        Upload .PDF file to update the map. Notice,
                        neighbourhood maps WON’T be updated automaticlly.
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
                            defaultImage
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
          </div>
        </div>
      </div>
    </div>
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
};
export default Office;
