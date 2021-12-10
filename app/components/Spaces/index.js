/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import lock from '../../images/lock.png';
import unLock from '../../images/unlock.png';

const Spaces = ({
  state,
  handleUserSelect,
  officeLocation,
  handleCloseUpdate,
  spaceUpdate,
  setSpaceUpdate,
  officeSuccess,
  requestUpdateActiveStatus,
}) => {
  const [floor, setFloor] = useState();
  const [color, setColor] = useState();
  const [setActive, setActiveState] = useState('');
  const [updateState, setUpdateState] = useState('');
  const [manageLoader, setManageLoader] = useState('');
  const [spaceData, setSpaceData] = useState('');

  function toggleAccordion(id) {
    setColor('');
    if (id === setActive) {
      setActiveState('');
    } else {
      setActiveState(id);
    }
  }

  function toggleSecondAccordion(id) {
    if (id === updateState) {
      setUpdateState('');
    } else {
      setUpdateState(id);
    }
  }

  const handleCheckbox = (data, val, final) => {
    const dataFinal = floor && floor.split(',');
    setManageLoader(final);
    if (final === 'FloorClick') {
      const dataVal = data && data.split(',');
      const payload = {
        floor: dataVal && dataVal[0] !== 'null' ? dataVal[0] : '',
        building: dataVal && dataVal[1] !== 'null' ? dataVal[1] : '',
        isLocationBuildingFloor: true,
        locationid: state.selectedNames,
        active: !val,
      };
      requestUpdateActiveStatus(payload);
    } else if (final === 'colorCLick') {
      const payload = {
        active: !val,
        locationid: state.selectedNames,
        floor: dataFinal && dataFinal[0] !== 'null' ? dataFinal[0] : '',
        building: dataFinal && dataFinal[1] !== 'null' ? dataFinal[1] : '',
        colorcode: data,
        isWorkspace: false,
      };
      requestUpdateActiveStatus(payload);
    } else if (final === 'neighborhoodClick') {
      const payload = {
        active: val,
        locationid: state.selectedNames,
        floor: dataFinal && dataFinal[0] !== 'null' ? dataFinal[0] : '',
        building: dataFinal && dataFinal[1] !== 'null' ? dataFinal[1] : '',
        isWorkspace: true,
        isWorkspaceId: data,
      };
      requestUpdateActiveStatus(payload);
    }
  };

  const floorData =
    officeLocation &&
    officeLocation.find(data =>
      data.id === state.selectedNames ? data.FloorBuilding : '',
    );
  const finalLocate =
    officeLocation &&
    officeLocation.filter(
      obj => obj.id !== 'BHM' && obj.id !== 'RW' && obj.id !== 'BLM',
    );

  return (
    <div className="wrapper_main">
      {setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage && (
        <div
          className={`alert fade show mx-auto ${
            setSpaceUpdate && setSpaceUpdate.showUpdateStatusSuccess
              ? 'alert alert-success'
              : 'alert alert-danger'
          }`}
        >
          <div>
            <img
              src={
                setSpaceUpdate && setSpaceUpdate.showUpdateStatusSuccess
                  ? checkedCircle
                  : crossCircle
              }
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />
            {(setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage) || ''}
          </div>
          <div
            aria-hidden="true"
            style={{
              float: 'right',
              fontSize: 'large',
              marginLeft: '10px',
            }}
            onClick={handleCloseUpdate}
            className="day-pointer"
          >
            &#10006;
          </div>
        </div>
      )}
      <div className="office_maps">
        <div className="container">
          <div className="head d-flex align-items-center">
            <div>
              <h4 className="common-title mb-4">Spaces</h4>
            </div>
            <div className="office-selections wrap">
              <div className="selction_one ww-100">
                <label htmlFor>Office</label>
                <select
                  name=""
                  id=""
                  value={state.selectedNames}
                  onChange={handleUserSelect}
                  className="set_drop"
                >
                  {finalLocate &&
                    finalLocate.map(obj => (
                      <>
                        <option
                          value={obj.id}
                          key={obj.locationname}
                          id="building"
                        >
                          {obj.locationname}
                        </option>
                      </>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="spaces-section">
            {officeLocation && !officeLocation.length ? (
              <Spinner
                className="app-spinner"
                animation="grow"
                variant="dark"
              />
            ) : (
              <>
                {floorData &&
                  floorData.FloorBuilding &&
                  floorData.FloorBuilding.map(obj => (
                    <div className="accordion_box">
                      <input
                        type="checkbox"
                        id={obj.floorAndBuilding}
                        name="checkedItem"
                        value="add"
                        checked={
                          obj.lockedWorkspaceNumber === obj.totalWorkspace
                        }
                        className="lock invisible"
                        onChange={e => {
                          handleCheckbox(
                            `${obj.floor},${obj.building}`,
                            e.target.checked,
                            'FloorClick',
                          );
                          setFloor(`${obj.floor},${obj.building}`);
                        }}
                      />
                      <label
                        htmlFor={obj.floorAndBuilding}
                        style={{ display: 'block', height: '0px' }}
                      >
                        <img
                          src={
                            obj.lockedWorkspaceNumber === obj.totalWorkspace
                              ? lock
                              : unLock
                          }
                          title={
                            obj.lockedWorkspaceNumber === obj.totalWorkspace
                              ? 'unLock'
                              : 'lock'
                          }
                          className="lock"
                          alt=""
                        />
                        {spaceUpdate &&
                          spaceUpdate.loading &&
                          manageLoader === 'FloorClick' && (
                            <div
                              className={
                                `${obj.floor},${obj.building}` === floor
                                  ? 'spinner-border load_space'
                                  : ''
                              }
                            />
                          )}
                      </label>
                      <div
                        aria-hidden="true"
                        className={`accordion3 line ${
                          setActive === obj.floorAndBuilding ? 'active' : ''
                        }`}
                        key={obj.floor}
                        id={obj.floor}
                        onClick={() => {
                          setFloor(`${obj.floor},${obj.building}`);
                          toggleAccordion(obj.floorAndBuilding);
                        }}
                      >
                        <span className="dash-menu-item">
                          {obj.building !== null && obj.floor !== null
                            ? `Building ${obj.building},
                                    Floor ${obj.floor}`
                            : obj.building !== null
                            ? `Building ${obj.building}`
                            : obj.floor !== null
                            ? `Floor ${obj.floor}`
                            : ''}
                        </span>{' '}
                        <span className="acc-small">{`${
                          obj.lockedWorkspaceNumber
                        }/${obj.totalWorkspace} Locked`}</span>
                      </div>

                      <div
                        className={`panel2 ${
                          setActive === obj.floorAndBuilding
                            ? ''
                            : 'display_acc'
                        }`}
                      >
                        <div className="panel-list">
                          <div className="dash-menu-list">
                            {obj &&
                              obj.neighborhood.map(floor => (
                                <>
                                  <input
                                    type="checkbox"
                                    id={obj.floorAndBuilding.concat(
                                      floor.neighborhoodname,
                                    )}
                                    checked={
                                      floor.neighborhoodLockedSpace ===
                                      floor.neighborhoodTotalSpace
                                    }
                                    name="checkedItem1"
                                    value="add1"
                                    className="lock2 invisible"
                                    onChange={e => {
                                      handleCheckbox(
                                        floor.colorcode,
                                        e.target.checked,
                                        'colorCLick',
                                      );
                                      setColor(floor.neighborhoodname);
                                    }}
                                  />
                                  <label
                                    htmlFor={obj.floorAndBuilding.concat(
                                      floor.neighborhoodname,
                                    )}
                                  >
                                    <img
                                      src={
                                        floor.neighborhoodLockedSpace ===
                                        floor.neighborhoodTotalSpace
                                          ? lock
                                          : unLock
                                      }
                                      title={
                                        floor.neighborhoodLockedSpace ===
                                        floor.neighborhoodTotalSpace
                                          ? 'unLock'
                                          : 'lock'
                                      }
                                      className="lock2"
                                      alt=""
                                    />

                                    {spaceUpdate &&
                                      spaceUpdate.loading &&
                                      manageLoader === 'colorCLick' && (
                                        <div
                                          className={
                                            floor.neighborhoodname === color
                                              ? 'spinner-border space_loading'
                                              : ''
                                          }
                                        />
                                      )}
                                  </label>

                                  <div
                                    className={`accordion2 ${
                                      updateState === floor.neighborhoodname
                                        ? 'active'
                                        : ''
                                    }`}
                                    aria-hidden="true"
                                    onClick={() => {
                                      setColor(floor.neighborhoodname);
                                      toggleSecondAccordion(
                                        floor.neighborhoodname,
                                      );
                                    }}
                                  >
                                    <span className="dash-menu-item1 line">
                                      <span
                                        className={`sq-${floor.neighborhoodname.toLowerCase()}`}
                                      />{' '}
                                      {floor.neighborhoodname}{' '}
                                    </span>
                                    <span className="acc-small">{`${
                                      floor.neighborhoodLockedSpace
                                    }/${
                                      floor.neighborhoodTotalSpace
                                    } Locked`}</span>
                                  </div>

                                  <div
                                    className={`panel1 ${
                                      updateState === floor.neighborhoodname
                                        ? ''
                                        : 'display_acc'
                                    }`}
                                  >
                                    {floor &&
                                      floor.neighborWorkspace &&
                                      floor.neighborWorkspace.map(space => (
                                        <>
                                          <input
                                            type="checkbox"
                                            id={space.id}
                                            name="checkedItem2"
                                            value="add2"
                                            checked={space.active}
                                            className="lock3 invisible"
                                            onChange={e => {
                                              handleCheckbox(
                                                space.id,
                                                e.target.checked,
                                                'neighborhoodClick',
                                              );
                                              setSpaceData(
                                                space.workspacenumber,
                                              );
                                            }}
                                          />
                                          <label htmlFor={space.id}>
                                            <img
                                              src={space.active ? unLock : lock}
                                              title={
                                                space.active ? 'lock' : 'Unlock'
                                              }
                                              className="lock3"
                                              alt=""
                                            />
                                            {spaceUpdate &&
                                              spaceUpdate.loading &&
                                              manageLoader ===
                                                'neighborhoodClick' && (
                                                <div
                                                  className={
                                                    space.workspacenumber ===
                                                    spaceData
                                                      ? 'spinner-border space_Update_load'
                                                      : ''
                                                  }
                                                />
                                              )}
                                          </label>
                                          <div
                                            className="dash-menu-list2"
                                            value={space.workspacenumber}
                                          >
                                            {space.workspacenumber}{' '}
                                          </div>
                                        </>
                                      ))}
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Spaces.propTypes = {
  state: PropTypes.object,
  officeLocation: PropTypes.object,
  handleUserSelect: PropTypes.func,
  requestUpdateActiveStatus: PropTypes.func,
  handleCloseUpdate: PropTypes.func,
  spaceUpdate: PropTypes.object,
  officeSuccess: PropTypes.object,
  setSpaceUpdate: PropTypes.object,
};
export default Spaces;
