/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import heartImage from '../../images/heart.png';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import printer from '../../images/officeImage/Copywdc.png';
import firstAid from '../../images/officeImage/Aidwdc.png';
import Wellness from '../../images/officeImage/WellWdc.png';
import Huddle from '../../images/officeImage/HuddleWdc.png';
import Phone from '../../images/officeImage/CallWdc.png';
import Lact from '../../images/officeImage/Lactwdc.png';
import Profile from '../../images/officeImage/Wprofile.png';

function WF4() {
  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Washington, DC</p>
        <span className="floor">Floor 4</span>
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
          <span className="informer">401</span>
          <label htmlFor="my-spot">Bethune</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">402</span>
          <label htmlFor="my-spot">Gallaudet</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">403</span>
          <label htmlFor="my-spot">Montessori</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">404</span>
          <label htmlFor="my-spot">Rogers</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">421</span>
          <label htmlFor="my-spot">Sessions</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">231</span>
          <label htmlFor="my-spot">Washington</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">454</span>
          <label htmlFor="my-spot">Young</label>
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
        <div className="office-part-one heart blue">
          <span className="informer">
            <img src={womenImage} alt="" />
          </span>
          <label htmlFor="my-spot">Women's Restroom</label>
        </div>

        <div className="office-part-one heart blue">
          <span className="informer">
            <img src={maleImage} alt="" />
          </span>
          <label htmlFor="my-spot">Men's Restroom</label>
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
        <div className="office-part-one yellow">
          <span className="informer">
            <img src={printer} alt="" />
          </span>
          <label htmlFor="my-spot">Copy Room</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">
            <img src={firstAid} alt="" />
          </span>
          <label htmlFor="my-spot">First Aid</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">
            <img src={Lact} alt="" />
          </span>
          <label htmlFor="my-spot">Lactation Room</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">
            <img src={Wellness} alt="" />
          </span>
          <label htmlFor="my-spot">Wellness Room</label>
        </div>
      </div>
    </div>
  );
}

export default WF4;
