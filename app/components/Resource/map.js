/* eslint-disable no-sequences */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import locationMap from '../../images/location.png';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';
import WF2 from './WF2';
import WF3 from './WF3';
import WF4 from './WF4';
import WF8 from './WF8';
import RB1 from './RB1';
import RB2 from './RB2';
import RB3F1 from './RB3F1';
import RB3F2 from './RB3F2';
import BLB1 from './BLB1';
import BRB1 from './BRB1';
import useWindowSize from '../../hooks/useWindowSize';
import { CONSTANT } from '../../enum';

const { MAP_IMAGE_URL } = CONSTANT;
const MapComponent = ({
  building,
  floor,
  locationCode,
  state,
  imgStyle,
  dataStyle,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  from,
  ColleagueUserName,
  colorCode,
  mapImage,
}) => {
  const isDraggable = state.scale > 1;
  const [officeRest, setOfficeRest] = useState('');
  const { width } = useWindowSize();
  useEffect(() => {
    if (
      building !== null &&
      floor !== null &&
      (building !== undefined && floor !== undefined)
    ) {
      imgData(locationCode, building && building.concat(floor), colorCode);
    } else if (floor === null || floor === undefined) {
      imgData(locationCode, building, colorCode);
    } else if (building === null || building === undefined) {
      imgData(locationCode, floor, colorCode);
    } else if (locationCode === 'BLM' || locationCode === 'BHM') {
      imgData(locationCode, building);
    } else if (colorCode === null || colorCode === '') {
      imgData(locationCode, building);
    }
  }, [width]);

  const imgData = async (
    neighborhoodImg,
    neighborhoodBuild,
    neighborhoodColor,
  ) => {
    let officeRes = '';

    switch (neighborhoodImg) {
      case 'DC':
        switch (neighborhoodBuild) {
          case '2':
            switch (neighborhoodColor) {
              case 'Blue':
                officeRes = (
                  <WF2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Teal':
                officeRes = (
                  <WF2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <WF2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Yellow':
                officeRes = (
                  <WF2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
            break;
          case '3':
            switch (neighborhoodColor) {
              case 'Blue':
                officeRes = (
                  <WF3 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <WF3 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Teal':
                officeRes = (
                  <WF3 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Yellow':
                officeRes = (
                  <WF3 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
            break;
          case '4':
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            // break;
            switch (neighborhoodColor) {
              case 'Yellow':
                officeRes = (
                  <WF4 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Blue':
                officeRes = (
                  <WF4 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <WF4 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Teal':
                officeRes = (
                  <WF4 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
            break;
          case '8':
            switch (neighborhoodColor) {
              case 'Blue':
                officeRes = (
                  <WF8 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <WF8 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Teal':
                officeRes = (
                  <WF8 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Yellow':
                officeRes = (
                  <WF8 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
        }
        break;
      case 'RIC':
        switch (neighborhoodBuild) {
          case '31':
            switch (neighborhoodColor) {
              case 'Teal':
                officeRes = (
                  <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case '31' && 'Orange':
                officeRes = (
                  <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case '31' && 'Blue':
                officeRes = (
                  <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
            break;
          case '32':
            switch (neighborhoodColor) {
              case 'Teal':
                officeRes = (
                  <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Blue':
                officeRes = (
                  <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
            break;
          case '1':
            switch (neighborhoodColor) {
              case 'Teal':
                officeRes = (
                  <RB1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <RB1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Yellow':
                officeRes = (
                  <RB1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Blue':
                officeRes = (
                  <RB1 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
            break;
          case '2':
            switch (neighborhoodColor) {
              case 'Teal':
                officeRes = (
                  <RB2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Orange':
                officeRes = (
                  <RB2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Yellow':
                officeRes = (
                  <RB2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
              case 'Blue':
                officeRes = (
                  <RB2 from={from} ColleagueUserName={ColleagueUserName} />
                );
                break;
            }
        }
        break;
      case 'BHM':
        switch (neighborhoodBuild) {
          case '1':
            officeRes = (
              <BRB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;

      case 'BLM':
        switch (neighborhoodBuild) {
          case '1':
            officeRes = (
              <BLB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;

      default:
    }

    setOfficeRest(officeRes);
  };

  return (
    <Fragment>
      <>
        <div className="card office-structure-inner" style={{ height: '100%' }}>
          <>
            {officeRest || ''}
            <div className="right-map">
              <Draggable
                disabled={width < 767 ? isDraggable : !isDraggable}
                key={state.version}
              >
                <div
                  className="drag_image"
                  style={isDraggable ? { cursor: 'move' } : null}
                >
                  <img
                    src={`${MAP_IMAGE_URL}/${mapImage || ''}`}
                    alt=""
                    style={width < 767 ? dataStyle : imgStyle}
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
        </div>
      </>
    </Fragment>
  );
};

MapComponent.propTypes = {
  building: PropTypes.string,
  floor: PropTypes.string,
  locationCode: PropTypes.string,
  state: PropTypes.object,
  imgStyle: PropTypes.object,
  dataStyle: PropTypes.object,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleDefault: PropTypes.func,
  from: PropTypes.string,
  ColleagueUserName: PropTypes.string,
  colorCode: PropTypes.string,
  mapImage: PropTypes.string,
};

export default MapComponent;
