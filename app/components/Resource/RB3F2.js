/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useHistory } from 'react-router';
import maleImage from '../../images/officeImage/Mrest.png';
import womenImage from '../../images/officeImage/Wrest.png';
import Lact from '../../images/officeImage/ExcludeLactWdc8.png';
import firstAid from '../../images/officeImage/firstaid.png';
import pantry from '../../images/officeImage/Pantry.png';
import Printer from '../../images/officeImage/Printer.png';
import Profile from '../assets/images/profileof.png';

function RB3F2(from) {
  const history = useHistory();
  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Richmond, VA</p>
        <span className="floor mr-2">Building 3</span>
        <span className="floor">Floor 2</span>
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

        <div className="office-part-one blue-area">
          <span className="informer">1</span>
          <label htmlFor="my-spot">Richard Whiteside</label>
        </div>
        <div className="office-part-one heart pink">
          <span className="informer">
            <img src={firstAid} alt="" />
          </span>
          <label htmlFor="my-spot">First Aid</label>
        </div>
        <div className="office-part-one heart orange">
          <span className="informer">
            <img src={pantry} alt="" />
          </span>
          <label htmlFor="my-spot">Pantry</label>
        </div>
        <div className="office-part-one heart purple">
          <span className="informer">
            <img src={Lact} alt="" />
          </span>
          <label htmlFor="my-spot">Lactation Room</label>
        </div>
        <div className="office-part-one heart green">
          <span className="informer">
            <img src={Printer} alt="" />
          </span>
          <label htmlFor="my-spot">Copy Room</label>
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

export default RB3F2;
