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

const MapComponent = ({
  building,
  floor,
  locationCode,
  state,
  imgStyle,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  from,
  ColleagueUserName,
}) => {
  const isDraggable = state.scale > 1;
  const [finalImg, setFinalImg] = useState('');
  const [officeRest, setOfficeRest] = useState('');
  useEffect(() => {
    if (building !== null && floor !== null) {
      imgData(locationCode, building && building.concat(floor));
    } else if (floor === null) {
      imgData(locationCode, building);
    } else if (building === null) {
      imgData(locationCode, floor);
    }
  }, []);

  const imgData = async (neighborhoodImg, neighborhoodBuild) => {
    let imageSrc = '';
    let officeRes = '';
    switch (neighborhoodImg) {
      case 'DC':
        switch (neighborhoodBuild) {
          case '2':
            imageSrc = map2;
            officeRes = (
              <WF2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '3':
            imageSrc = map1;
            officeRes = (
              <WF3 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '4':
            imageSrc = map3;
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '8':
            imageSrc = map4;
            officeRes = (
              <WF8 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;
      case 'RIC':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map5;
            officeRes = (
              <RB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2':
            imageSrc = map6;
            officeRes = (
              <RB2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '31':
            imageSrc = map7;
            officeRes = (
              <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '32':
            imageSrc = map8;
            officeRes = (
              <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;
      case 'BHM':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map10;
            officeRes = (
              <BRB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;

      case 'BLM':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map9;
            officeRes = (
              <BLB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;

      default:
    }

    setFinalImg(imageSrc);
    setOfficeRest(officeRes);
  };

  return (
    <Fragment>
      <>
        <div className="card office-structure-inner" style={{ height: '100%' }}>
          <>
            {officeRest || ''}
            <div className="right-map">
              <Draggable disabled={!isDraggable} key={state.version}>
                <div
                  className="drag_image"
                  style={isDraggable ? { cursor: 'move' } : null}
                >
                  <img
                    src={finalImg}
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
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleDefault: PropTypes.func,
  from: PropTypes.string,
  ColleagueUserName: PropTypes.string,
};

export default MapComponent;
