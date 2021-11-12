/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useHistory } from 'react-router';

import heartImage from '../../images/heart.png';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import Lact from '../../images/officeImage/Lactwdc.png';
import printer from '../../images/officeImage/Copywdc.png';
import firstAid from '../../images/officeImage/Aidwdc.png';
import Huddle from '../../images/officeImage/HuddleWdc.png';
import Phone from '../../images/officeImage/CallWdc.png';
import Profile from '../assets/images/profileof.png';

function WF3(from) {
  const history = useHistory();

  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Washington, DC</p>
        <span className="floor">Floor 3</span>
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
        <div className="office-part-one blue">
          <span className="informer" />
          <label htmlFor="my-spot">Blue</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer" />
          <label htmlFor="my-spot">Teal</label>
        </div>
        <div className="office-part-one orange">
          <span className="informer" />
          <label htmlFor="my-spot">Orange</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer" />
          <label htmlFor="my-spot">Yellow</label>
        </div>

        <div className="office-part-one teal">
          <span className="informer">315</span>
          <label htmlFor="my-spot">Bel-Air</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">316</span>
          <label htmlFor="my-spot">Hogwarts</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">332</span>
          <label htmlFor="my-spot">Walkerville</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">334</span>
          <label htmlFor="my-spot">Common Room</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">360</span>
          <label htmlFor="my-spot">The Post</label>
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
        <div className="office-part-one heart teal">
          <span className="informer">
            <img src={Lact} alt="" />
          </span>
          <label htmlFor="my-spot">Lactation Room</label>
        </div>
        <div className="office-part-one heart yellow">
          <span className="informer">
            <img src={printer} alt="" />
          </span>
          <label htmlFor="my-spot">Copy Room</label>
        </div>
        <div className="office-part-one heart yellow">
          <span className="informer">
            <img src={firstAid} alt="" />
          </span>
          <label htmlFor="my-spot">First Aid</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">
            <img src={Huddle} alt="" />
          </span>
          <label htmlFor="my-spot">Huddle Room</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">
            <img src={Phone} alt="" />
          </span>
          <label htmlFor="my-spot">Phone Room</label>
        </div>
      </div>
    </div>
  );
}

export default WF3;
