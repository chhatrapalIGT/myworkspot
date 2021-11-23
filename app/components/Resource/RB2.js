/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useHistory } from 'react-router';
import Profile from '../assets/images/profileof.png';
import firstAid from '../../images/officeImage/firstaid.png';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import Lact from '../../images/officeImage/ExcludeLactWdc8.png';
import Phone from '../../images/officeImage/CallWdc.png';
import Team from '../../images/Vectoruser.png';
import pantry from '../../images/officeImage/Pantry.png';
import Printer from '../../images/officeImage/Printer.png';

function RB2(from) {
  const history = useHistory();
  return (
    <div className="left-panel">
      <div className="office-info">
        <p className="name">Richmond, VA</p>
        <span className="floor">Building 2</span>
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
        <div className="office-part-one black">
          <span className="informer">1</span>
          <label htmlFor="my-spot">Think Tank</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">2</span>
          <label htmlFor="my-spot">Rocket Ramsey</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">3</span>
          <label htmlFor="my-spot">Founder's</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">4</span>
          <label htmlFor="my-spot">Founder's</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">5</span>
          <label htmlFor="my-spot">Bill Royall</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">6</span>
          <label htmlFor="my-spot">Robert Jones</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">7</span>
          <label htmlFor="my-spot">Wally Stettinius</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">8</span>
          <label htmlFor="my-spot">Team Meeting</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">9</span>
          <label htmlFor="my-spot">Team Collab</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">10</span>
          <label htmlFor="my-spot">Talent Conference Room</label>
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
        <div className="office-part-one heart green">
          <span className="informer">
            <img src={Printer} alt="" />
          </span>
          <label htmlFor="my-spot">Copy Station</label>
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
        <div className="office-part-one heart purple">
          <span className="informer">
            <img src={Lact} alt="" />
          </span>
          <label htmlFor="my-spot">Lactation Room</label>
        </div>
        <div className="office-part-one orange">
          <span className="informer">
            <img src={Phone} alt="" />
          </span>
          <label htmlFor="my-spot">Phone Room</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">
            <img src={Team} alt="" />
          </span>
          <label htmlFor="my-spot">Team Room</label>
        </div>
      </div>
    </div>
  );
}

export default RB2;
