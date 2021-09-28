/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import womenImage from '../../images/officeImage/Wrest.png';
import maleImage from '../../images/officeImage/Mrest.png';
import printer from '../../images/officeImage/Printer.png';
import pantry from '../../images/officeImage/Vector.png';
import Wellness from '../../images/officeImage/WellWdc.png';
import Lact from '../../images/officeImage/ExcludeLactWdc8.png';

function RB1() {
  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Richmond, VA</p>
        <span className="floor">Building 1</span>
      </div>
      <div className="office-resource">
        <p>Office Resources</p>
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
          <label htmlFor="my-spot">1983</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">2</span>
          <label htmlFor="my-spot">David Ogilvy</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">3</span>
          <label htmlFor="my-spot">Sample Room</label>
        </div>
        <div className="office-part-one black">
          <span className="informer">4</span>
          <label htmlFor="my-spot">Archer</label>
        </div>
        <div className="office-part-one orange">
          <span className="informer">
            <img src={pantry} alt="" />
          </span>
          <label htmlFor="my-spot">Pantry</label>
        </div>
        <div className="office-part-one heart green">
          <span className="informer">
            <img src={printer} alt="" />
          </span>
          <label htmlFor="my-spot">Copy Station</label>
        </div>

        <div className="office-part-one heart teal">
          <span className="informer">
            <img src={womenImage} alt="" />
          </span>
          <label htmlFor="my-spot">Women's Restroom</label>
        </div>

        <div className="office-part-one heart teal">
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
        <div className="office-part-one heart blue">
          <span className="informer">
            <img src={Wellness} alt="" />
          </span>
          <label htmlFor="my-spot">Wellness Room</label>
        </div>
      </div>
    </div>
  );
}

export default RB1;
