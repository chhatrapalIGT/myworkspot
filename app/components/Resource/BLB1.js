import React from 'react';
import { useHistory } from 'react-router';
import computer from '../../images/officeImage/Computer.png';
import pantry from '../../images/officeImage/PantryWdc.png';
import firstAid from '../../images/officeImage/Aidwdc.png';
import printer from '../../images/officeImage/Copywdc.png';
import Profile from '../assets/images/profileof.png';

function BlB1(from) {
  const history = useHistory();
  return (
    <div className="left-panel">
      <div className="office-info">
        <p className="name">Bloomington, MN</p>
        <span className="floor">Building 1</span>
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

        <div className="office-part-one teal">
          <span className="informer" />
          <label htmlFor="my-spot">Teal</label>
        </div>

        <div className="office-part-one blue-area">
          <span className="informer">1</span>
          <label htmlFor="my-spot">Lake Superior</label>
        </div>
        <div className="office-part-one blue-area">
          <span className="informer">2</span>
          <label htmlFor="my-spot">Lake of the Isles</label>
        </div>
        <div className="office-part-one blue-area">
          <span className="informer">3</span>
          <label htmlFor="my-spot">Lake Nokomis</label>
        </div>
        <div className="office-part-one blue-area">
          <span className="informer">4</span>
          <label htmlFor="my-spot">Rainy Lake</label>
        </div>
        <div className="office-part-one blue-area">
          <span className="informer">5</span>
          <label htmlFor="my-spot">Network / Server Room</label>
        </div>
        <div className="office-part-one blue-area">
          <span className="informer">6</span>
          <label htmlFor="my-spot">Pike Lake</label>
        </div>
        <div className="office-part-one blue-area">
          <span className="informer">7</span>
          <label htmlFor="my-spot">Lake Winnibigosh</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">
            <img src={computer} alt="" />
          </span>
          <label htmlFor="my-spot">Computer Supplies</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">
            <img src={printer} alt="" />
          </span>
          <label htmlFor="my-spot">Supplies</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">
            <img src={firstAid} alt="" />
          </span>
          <label htmlFor="my-spot">First Aid</label>
        </div>
        <div className="office-part-one teal">
          <span className="informer">
            <img src={pantry} alt="" />
          </span>
          <label htmlFor="my-spot">Kitchen</label>
        </div>
      </div>
    </div>
  );
}

export default BlB1;
