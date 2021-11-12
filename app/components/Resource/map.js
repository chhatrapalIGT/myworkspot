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
import mapDCF2Teal from '../assets/images/MapFL2teal.svg';
import mapDCF2Blue from '../assets/images/MapFL2blue.svg';
import mapDCF2Orange from '../assets/images/MapFL2orange.svg';
import mapDCF2Yellow from '../assets/images/MapFL2yellow.svg';
import mapDCF3Blue from '../assets/images/MapF3Blue.svg';
import mapDCF3Orange from '../assets/images/MapF3orange.svg';
import mapDCF3Teal from '../assets/images/MapF3Teal.svg';
import mapDCF3Yellow from '../assets/images/MapF3yellow.svg';
import mapDCF4 from '../assets/images/MapF4.svg';
import mapDCF4Blue from '../assets/images/MapF4blue.svg';
import mapDCF4Orange from '../assets/images/MapF4orange.svg';
import mapDCF4Teal from '../assets/images/MapF4teal.svg';
import mapDCF4Yellow from '../assets/images/MapF4yellow.svg';
import mapDCF8Blue from '../assets/images/MapF8blue.svg';
import mapDCF8Orange from '../assets/images/MapF8orange.svg';
import mapDCF8Teal from '../assets/images/MapF8Teal.svg';
import mapDCF8Yellow from '../assets/images/MapF8Yellow.svg';
import mapRICB1Teal from '../assets/images/MapB1teal.svg';
import mapRICB1Blue from '../assets/images/Mapb1blue.svg';
import mapRICB1Orange from '../assets/images/Mapb1orange.svg';
import mapRICB1Yellow from '../assets/images/Mapb1yellow.svg';
import mapRICB2Blue from '../assets/images/Mapb2blue.svg';
import mapRICB2Orange from '../assets/images/Mapb2orange.svg';
import mapRICB2Teal from '../assets/images/Mapb2teal.svg';
import mapRICB2Yellow from '../assets/images/Mapb2yellow.svg';
import mapRICB3F1Teal from '../assets/images/Mapb3f1teal.svg';
import mapRICB3F1Blue from '../assets/images/Mapb3f1blue.svg';
import mapRICB3F1Orange from '../assets/images/Mapb3f1orange.svg';
import mapRICB3F2Orange from '../assets/images/Mapb3f2orange.svg';
import mapRICB3F2Teal from '../assets/images/Mapb3f2teal.svg';
import mapRICB3F2Blue from '../assets/images/Mapb3f2blue.svg';
import mapBHMB1 from '../assets/images/MapBirmingham.svg';
import mapBLMB1 from '../assets/images/MapBloomington.svg';

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
  colorCode,
}) => {
  const isDraggable = state.scale > 1;
  const [finalImg, setFinalImg] = useState('');
  const [officeRest, setOfficeRest] = useState('');
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
  }, []);

  const imgData = async (
    neighborhoodImg,
    neighborhoodBuild,
    neighborhoodColor,
  ) => {
    let imageSrc = '';
    let officeRes = '';
    switch (neighborhoodImg) {
      case 'DC':
        switch ((neighborhoodBuild, neighborhoodColor)) {
          case '2' && 'Blue':
            imageSrc = mapDCF2Blue;
            officeRes = (
              <WF2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Teal':
            imageSrc = mapDCF2Teal;
            officeRes = (
              <WF2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Orange':
            imageSrc = mapDCF2Orange;
            officeRes = (
              <WF2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Yellow':
            imageSrc = mapDCF2Yellow;
            officeRes = (
              <WF2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '3' && 'Blue':
            imageSrc = mapDCF3Blue;
            officeRes = (
              <WF3 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '3' && 'Orange':
            imageSrc = mapDCF3Orange;
            officeRes = (
              <WF3 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '3' && 'Teal':
            imageSrc = mapDCF3Teal;
            officeRes = (
              <WF3 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '3' && 'Yellow':
            imageSrc = mapDCF3Yellow;
            officeRes = (
              <WF3 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '4':
            imageSrc = mapDCF4;
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '4' && 'Yellow':
            imageSrc = mapDCF4Yellow;
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '4' && 'Blue':
            imageSrc = mapDCF4Blue;
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '4' && 'Orange':
            imageSrc = mapDCF4Orange;
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '4' && 'Teal':
            imageSrc = mapDCF4Teal;
            officeRes = (
              <WF4 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '8' && 'Blue':
            imageSrc = mapDCF8Blue;
            officeRes = (
              <WF8 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '8' && 'Orange':
            imageSrc = mapDCF8Orange;
            officeRes = (
              <WF8 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '8' && 'Teal':
            imageSrc = mapDCF8Teal;
            officeRes = (
              <WF8 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '8' && 'Yellow':
            imageSrc = mapDCF8Yellow;
            officeRes = (
              <WF8 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;
      case 'RIC':
        switch ((neighborhoodBuild, neighborhoodColor)) {
          case '31' && 'Teal':
            imageSrc = mapRICB3F1Teal;
            officeRes = (
              <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '31' && 'Orange':
            imageSrc = mapRICB3F1Orange;
            officeRes = (
              <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '31' && 'Blue':
            imageSrc = mapRICB3F1Blue;
            officeRes = (
              <RB3F1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '32' && 'Teal':
            imageSrc = mapRICB3F2Teal;
            officeRes = (
              <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '32' && 'Orange':
            imageSrc = mapRICB3F2Orange;
            officeRes = (
              <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '32' && 'Blue':
            imageSrc = mapRICB3F2Blue;
            officeRes = (
              <RB3F2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '1' && 'Teal':
            imageSrc = mapRICB1Teal;
            officeRes = (
              <RB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '1' && 'Orange':
            imageSrc = mapRICB1Orange;
            officeRes = (
              <RB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '1' && 'Yellow':
            imageSrc = mapRICB1Yellow;
            officeRes = (
              <RB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '1' && 'Blue':
            imageSrc = mapRICB1Blue;
            officeRes = (
              <RB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Teal':
            imageSrc = mapRICB2Teal;
            officeRes = (
              <RB2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Orange':
            imageSrc = mapRICB2Orange;
            officeRes = (
              <RB2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Yellow':
            imageSrc = mapRICB2Yellow;
            officeRes = (
              <RB2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
          case '2' && 'Blue':
            imageSrc = mapRICB2Blue;
            officeRes = (
              <RB2 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;
      case 'BHM':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = mapBHMB1;
            officeRes = (
              <BRB1 from={from} ColleagueUserName={ColleagueUserName} />
            );
            break;
        }
        break;

      case 'BLM':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = mapBLMB1;
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
  colorCode: PropTypes.string,
};

export default MapComponent;
