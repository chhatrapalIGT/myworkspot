/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useHistory } from 'react-router';
import heartImage from '../../images/heart.png';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import printer from '../../images/officeImage/Copywdc.png';
import firstAid from '../../images/officeImage/Aidwdc.png';
import Wellness from '../../images/officeImage/WellWdc.png';
import Studio from '../../images/officeImage/VidWdc.png';
import Huddle from '../../images/officeImage/HuddleWdc.png';
import Phone from '../../images/officeImage/CallWdc.png';
import Profile from '../assets/images/profileof.png';

function WF2(from) {
  const history = useHistory();

  return (
    <div className="left-panel">
      <div className="office-info">
        <p className="name">Washington, DC</p>
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
          <span className="informer">203</span>
          <label htmlFor="my-spot">Acadia</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">204</span>
          <label htmlFor="my-spot">Bryce Canyon</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">226</span>
          <label htmlFor="my-spot">Denali</label>
        </div>

        <div className="office-part-one blue">
          <span className="informer">246</span>
          <label htmlFor="my-spot">Everglades</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">248</span>
          <label htmlFor="my-spot">Traveler's Suite</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">249</span>
          <label htmlFor="my-spot">Grand Canyon</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">252</span>
          <label htmlFor="my-spot">Olympic</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">253</span>
          <label htmlFor="my-spot">Shenandoach</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">254</span>
          <label htmlFor="my-spot">Yellowstone</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">255</span>
          <label htmlFor="my-spot">Zion</label>
        </div>
        <div className="office-part-one white">
          <span className="informer">200</span>
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
            <img src={Wellness} alt="" />
          </span>
          <label htmlFor="my-spot">Wellness Room</label>
        </div>
        <div className="office-part-one yellow">
          <span className="informer">
            <img src={Studio} alt="" />
          </span>
          <label htmlFor="my-spot">Video Studio</label>
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

export default WF2;
