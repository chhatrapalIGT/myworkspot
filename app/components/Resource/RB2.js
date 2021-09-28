/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function RB2() {
  return (
    <div className="left-panel" style={{ height: ' 60vh' }}>
      <div className="office-info">
        <p className="name">Richmond, VA</p>
        <span className="floor">Building 2</span>
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
          <label htmlFor="my-spot">Bill Royall</label>
        </div>
      </div>
    </div>
  );
}

export default RB2;
