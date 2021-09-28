import React from 'react';
import computer from '../../images/officeImage/Aidwdc.png';
import pantry from '../../images/officeImage/PantryWdc.png';
import firstAid from '../../images/officeImage/AED.png';
import printer from '../../images/officeImage/Copywdc.png';
import Profile from '../../images/officeImage/Wprofile.png';

function BlB1() {
  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Birmingham, AL</p>
        {/* <span className="floor mr-2">Building 3</span> */}
        <span className="floor">Building 1</span>
        {/* <span className="floor">Floor 4</span> */}
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
        <div className="office-part-one blue">
          <span className="informer">104</span>
          <label htmlFor="my-spot">Front Conference</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">107</span>
          <label htmlFor="my-spot">Pair Programming Room</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">127</span>
          <label htmlFor="my-spot">Back Conference</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">128</span>
          <label htmlFor="my-spot">Kitchen</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">132</span>
          <label htmlFor="my-spot">Healthy Life Room</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">141</span>
          <label htmlFor="my-spot">Network and Supply Room</label>
        </div>

        <div className="office-part-one blue">
          <span className="informer">
            <img src={firstAid} alt="" />
          </span>
          <label htmlFor="my-spot">AED</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">
            <img src={computer} alt="" />
          </span>
          <label htmlFor="my-spot">First Aid</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">
            <img src={pantry} alt="" />
          </span>
          <label htmlFor="my-spot">Kitchen</label>
        </div>
        <div className="office-part-one blue">
          <span className="informer">
            <img src={printer} alt="" />
          </span>
          <label htmlFor="my-spot">Printers</label>
        </div>
      </div>
    </div>
  );
}

export default BlB1;
