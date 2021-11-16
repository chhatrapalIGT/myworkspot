/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useHistory } from 'react-router';

import heartImage from '../../images/heart.png';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import Profile from '../assets/images/profileof.png';

function WF4(from) {
  const history = useHistory();

  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Washington, DC</p>
        <span className="floor">Floor 4</span>
      </div>
      <div className="office-resource">
        <p>Office Resources</p>
        {history.location.pathname !== '/office' && !from && (
          <div className="office-part-one blue">
            <span className="informer">
              <img src={Profile} alt="" />
            </span>
            <label htmlFor="my-spot">My Workspot</label>
          </div>
        )}
        {history.location.pathname !== '/office' && from.from && (
          <div className="office-part-one blue">
            <span className="informer">
              <img src={Profile} alt="" className="search-colleague-img" />
            </span>
            <label htmlFor="my-spot">{`${
              from.ColleagueUserName
            }'s Workspot`}</label>
          </div>
        )}
        <div className="office-part-one white">
          <span className="informer">401</span>
          <label htmlFor="my-spot">Bethune</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">402</span>
          <label htmlFor="my-spot">Gallaudet</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">403</span>
          <label htmlFor="my-spot">Montessori</label>
        </div>

        <div className="office-part-one white">
          <span className="informer">404</span>
          <label htmlFor="my-spot">Rogers</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">432</span>
          <label htmlFor="my-spot">Common Room</label>
        </div>
        <div className="office-part-one heart pink">
          <span className="informer">
            <img src={heartImage} alt="" />
          </span>
          <label htmlFor="my-spot">AED</label>
        </div>
        <div className="office-part-one teal_border">
          <span className="informer">
            <img src={womenImage} alt="" />
          </span>
          <label htmlFor="my-spot">Women's Restroom</label>
        </div>

        <div className="office-part-one teal_border">
          <span className="informer">
            <img src={maleImage} alt="" />
          </span>
          <label htmlFor="my-spot">Men's Restroom</label>
        </div>
      </div>
    </div>
  );
}

export default WF4;
