/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import heartImage from '../../images/heart.png';
import Lact from '../../images/officeImage/ExcludeLactWdc8.png';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import allGender from '../../images/officeImage/AllGender.png';
import interview from '../../images/officeImage/Interview.png';
import pantry from '../../images/officeImage/PantryWdc.png';
import printer from '../../images/officeImage/Printer.png';
import Aid from '../../images/officeImage/Aidwdc.png';
import Huddle from '../../images/officeImage/HuddleWdc.png';
import Phone from '../../images/officeImage/CallWdc.png';
import Profile from '../../images/officeImage/Wprofile.png';

function WF8() {
  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Washington, DC</p>
        <span className="floor">Floor 8</span>
      </div>
      <div className="office-resource">
        <p>Office Resources</p>
        <div className="office-part-one blue">
          <span className="informer">
            <img src={Profile} alt="" />
          </span>
          <label htmlFor="my-spot">My Workspot</label>
        </div>
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
        <div className="office-part-one yellow">
          <span className="informer">801</span>
          <label htmlFor="my-spot">Anacostia</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">809</span>
          <label htmlFor="my-spot">Benning</label>
        </div>

        <div className="office-part-one teal">
          <span className="informer">826</span>
          <label htmlFor="my-spot">Dupont Circle</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">827</span>
          <label htmlFor="my-spot">Glover Park</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">831</span>
          <label htmlFor="my-spot">Kalorama</label>
        </div>
        <div className="office-part-one orange">
          <span className="informer">836</span>
          <label htmlFor="my-spot">Petworth</label>
        </div>
        <div className="office-part-one orange">
          <span className="informer">837</span>
          <label htmlFor="my-spot">Shaw</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">847</span>
          <label htmlFor="my-spot">Partner Suite</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">248</span>
          <label htmlFor="my-spot">Traveler's Suite</label>
        </div>
        <div className="office-part-one heart pink">
          <span className="informer">
            <img src={heartImage} alt="" />
          </span>
          <label htmlFor="my-spot">AED</label>
        </div>
        <div className="office-part-one heart purple">
          <span className="informer">
            <img src={Lact} alt="" />
          </span>
          <label htmlFor="my-spot">Lactation Room</label>
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

        <div className="office-part-one heart blue">
          <span className="informer">
            <img src={allGender} alt="" />
          </span>
          <label htmlFor="my-spot">All Gender Restroom</label>
        </div>

        <div className="office-part-one white">
          <span className="informer">
            <img src={interview} alt="" />
          </span>
          <label htmlFor="my-spot">Interview Room</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">
            <img src={Huddle} alt="" />
          </span>
          <label htmlFor="my-spot">Huddle Room</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">
            <img src={pantry} alt="" />
          </span>
          <label htmlFor="my-spot">Pantry </label>
        </div>
        <div className="office-part-one white">
          <span className="informer">
            <img src={Phone} alt="" />
          </span>
          <label htmlFor="my-spot">Phone Room </label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">
            <img src={Aid} alt="" />
          </span>
          <label htmlFor="my-spot">First Aid</label>
        </div>
        <div className="office-part-one green">
          <span className="informer">
            <img src={printer} alt="" />
          </span>
          <label htmlFor="my-spot">Copy Station</label>
        </div>
      </div>
    </div>
  );
}

export default WF8;
