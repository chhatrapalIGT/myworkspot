/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { MapInteractionCSS } from 'react-map-interaction';
import locationMap from '../../images/location.png';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';
import useWindowSize from '../../hooks/useWindowSize';
import { CONSTANT } from '../../enum';

const { MAP_IMAGE_URL } = CONSTANT;
const MapComponent = ({
  building,
  floor,
  state,
  imgStyle,
  dataStyle,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  mapImage,
  officeResource,
  locationName,
}) => {
  const isDraggable = state.scale > 1;
  const { width } = useWindowSize();
  return (
    <Fragment>
      <>
        <div className="card office-structure-inner" style={{ height: '100%' }}>
          <>
            {width > 767 ? (
              <>
                <div className="left-panel">
                  <div className="office-info">
                    <p className="name">{locationName}</p>

                    {building !== null &&
                    building !== undefined &&
                    (floor !== null && floor !== undefined) ? (
                      <>
                        <span className="floor"> {`Building ${building}`}</span>
                        <span className="floor"> {`Floor ${floor}`}</span>
                      </>
                    ) : building !== null && building !== undefined ? (
                      <span className="floor">{`Building ${building}`}</span>
                    ) : (
                      floor !== null &&
                      floor !== undefined && (
                        <span className="floor"> {`Floor ${floor}`}</span>
                      )
                    )}
                  </div>
                  <div className="office-resource">
                    <p>Office Resources</p>

                    {officeResource.length > 0 &&
                      officeResource.map(res => (
                        <div className="office-part-one teal">
                          <span>
                            <img
                              src={`${MAP_IMAGE_URL}/${res.image || ''}`}
                              alt=""
                              style={{ marginRight: '13px' }}
                            />
                          </span>
                          {'  '}
                          <label htmlFor="my-spot">{res.name}</label>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="right-map">
                  <Draggable disabled={!isDraggable} key={state.version}>
                    <div
                      className="drag_image"
                      style={isDraggable ? { cursor: 'move' } : null}
                    >
                      <img
                        src={`${MAP_IMAGE_URL}/${mapImage || ''}`}
                        alt=""
                        className="map_data"
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
                      <img src={locationMap} alt="" />
                    </button>
                    <button
                      className="zoomin"
                      type="button"
                      onClick={() => handleZoomIn()}
                    >
                      <img src={zoomin} alt="" />
                    </button>
                    <button
                      className="zoomout"
                      type="button"
                      onClick={() => handleZoomOut()}
                    >
                      <img src={zoomout} alt="" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="right-map px-0">
                  <MapInteractionCSS>
                    <img
                      alt="test"
                      src={`${MAP_IMAGE_URL}/${mapImage || ''}`}
                      style={dataStyle}
                    />
                  </MapInteractionCSS>
                </div>
                <div className="left-panel">
                  <div className="office-info">
                    <p className="name">{locationName}</p>

                    {building !== null &&
                    building !== undefined &&
                    (floor !== null && floor !== undefined) ? (
                      <>
                        <span className="floor"> {`Building ${building}`}</span>
                        <span className="floor"> {`Floor ${floor}`}</span>
                      </>
                    ) : building !== null && building !== undefined ? (
                      <span className="floor">{`Building ${building}`}</span>
                    ) : (
                      floor !== null &&
                      floor !== undefined && (
                        <span className="floor"> {`Floor ${floor}`}</span>
                      )
                    )}
                  </div>
                  <div className="office-resource">
                    <p>Office Resources</p>

                    {officeResource.length > 0 &&
                      officeResource.map(res => (
                        <div className="office-part-one teal">
                          <span>
                            <img
                              src={`${MAP_IMAGE_URL}/${res.image || ''}`}
                              alt=""
                              style={{ marginRight: '13px' }}
                            />
                          </span>
                          {'  '}
                          <label htmlFor="my-spot">{res.name}</label>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </>
    </Fragment>
  );
};

MapComponent.propTypes = {
  building: PropTypes.string,
  floor: PropTypes.string,
  state: PropTypes.object,
  imgStyle: PropTypes.object,
  dataStyle: PropTypes.object,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleDefault: PropTypes.func,
  mapImage: PropTypes.string,
  officeResource: PropTypes.object,
  locationName: PropTypes.string,
};

export default MapComponent;
