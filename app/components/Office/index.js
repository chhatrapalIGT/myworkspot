/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import '../style.scss';
import { Accordion, Card, Button } from 'react-bootstrap';
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
    formData.append('floor', floor);
    if (color) {
      formData.append('isNeighborhood', true);
    } else {
      formData.append('isNeighborhood', false);
    }
    formData.append('locationid', id);
    formData.append('image', name);
    requestFileUpload({ formData });
  };

  return (
    <div className="wrapper-main" style={{ marginTop: ' 10%' }}>
      <div className="office_maps">
        <div className="container">
          <div className="head d-flex align-items-center">
            <h4 className="common-title">Office Maps</h4>
            <div className="office-selections">
              <div className="selction_one">
                <label htmlFor="val">Office</label>

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
        </div>
      </div>

      <div className="office-structure mt-4">
        <div className="container">
          <div className="card office-structure-inner">
            <div className="left-panel">
              <div className="office-info">
                <p className="name">{floorData && floorData.locationname}</p>
              </div>
              {(state.selectedNames === 'DC' ||
                state.selectedNames === 'RIC') && (
                <div className="office-resource">
                  {floorData &&
                    floorData.FloorBuilding &&
                    floorData.FloorBuilding.map(obj => (
                      <Accordion
                        // defaultActiveKey="0"
                        onClick={e => {
                          setFloor(obj.floor);
                        }}
                      >
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey="0"
                              value={obj.floor}
                            >
                              {obj.building && `Building${obj.building}`}{' '}
                              {obj.floor && `Floor${obj.floor}`}
                            </Accordion.Toggle>
                          </Card.Header>

                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              {obj &&
                                obj.neighborhood.map(floor => (
                                  <>
                                    <div
                                      className={`office-part-one ${floor.neighborhoodname.toLowerCase()}`}
                                    >
                                      <span className="informer" />

                                      <span
                                        aria-hidden="true"
                                        value={floor.neighborhoodname}
                                        onClick={() => {
                                          setColor(floor.neighborhoodname);
                                        }}
                                      >
                                        {floor.neighborhoodname}
                                      </span>
                                    </div>
                                  </>
                                ))}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    ))}
                </div>
              )}
            </div>
            <div className="d-flex" style={{ width: '25%' }}>
              <div style={{ marginRight: '4px' }}>
                {floorData && floorData.locationname}
              </div>
              <div style={{ marginRight: '4px' }} className="mr-8">
                Floor {floor}
              </div>
              <div style={{ marginRight: '4px' }} className="mr-8">
                {color}
              </div>
            </div>

            <div className="right-map">
              <input
                type="file"
                accept=".png,.svg,.jpg"
                content="Add New Map"
                onChange={onFileUpload}
                style={{ width: 'inherit', marginBottom: ' 105%' }}
              />

              <Draggable disabled={!isDraggable} key={state.version}>
                <div
                  className="drag_image"
                  style={isDraggable ? { cursor: 'move' } : null}
                >
                  <img
                    alt=""
                    src={defaultImage ? defaultImage.image : ''}
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
