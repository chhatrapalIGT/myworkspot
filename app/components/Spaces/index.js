/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';

const Spaces = ({
  state,
  handleUserSelect,
  officeLocation,
  handleCloseUpdate,
  spaceUpdate,
  officeSuccess,
  requestUpdateActiveStatus,
}) => {
  const [floor, setFloor] = useState();
  const [color, setColor] = useState();

  const handleCheckbox = (data, val, final) => {
    const dataFinal = floor && floor.split(',');
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
        active: !val,
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
    <div className="wrapper-main" style={{ marginTop: ' 10%' }}>
      {spaceUpdate && spaceUpdate.message && (
        <div
          className={`alert fade show mx-auto ${
            spaceUpdate && spaceUpdate.success
              ? 'alert alert-success'
              : 'alert alert-danger'
          }`}
        >
          <div>
            <img
              src={
                spaceUpdate && spaceUpdate.success ? checkedCircle : crossCircle
              }
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />
            {(spaceUpdate && spaceUpdate.message) || ''}
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
            <h4 className="common-title">Spaces</h4>
            <div className="office-selections">
              <div className="selction_one">
                <label htmlFor="office">Office</label>
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
        </div>
      </div>

      <div className="office-structure mt-4">
        <div className="container">
          <div
            className="card office-structure-inner"
            style={{ padding: ' 20px' }}
          >
            {officeLocation && !officeLocation.length ? (
              <Spinner
                className="app-spinner"
                animation="grow"
                variant="dark"
              />
            ) : (
              <div>
                {/* <div className="office-info"> */}
                {/* <p className="name">{floorData && floorData.locationname}</p> */}
                {/* </div> */}
                {(state.selectedNames === 'DC' ||
                  state.selectedNames === 'RIC') && (
                  <div className="office-resource" style={{ width: '100%' }}>
                    {floorData &&
                      floorData.FloorBuilding &&
                      floorData.FloorBuilding.map(obj => (
                        <Accordion
                          // defaultActiveKey="0"
                          onClick={() => {
                            setFloor(`${obj.floor},${obj.building}`);
                          }}
                        >
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0"
                                value={
                                  obj.floor &&
                                  obj.floor !== null &&
                                  obj.building &&
                                  obj.building !== null
                                    ? `${obj.floor}${obj.building}`
                                    : obj.building && obj.building !== null
                                    ? `${obj.building}`
                                    : obj.floor && obj.floor !== null
                                    ? `${obj.floor}`
                                    : ''
                                }
                                style={{ display: 'flex' }}
                              >
                                <p style={{ marginRight: '10px' }}>
                                  {obj.building && `Building${obj.building}`}{' '}
                                  {obj.floor && `Floor${obj.floor}`}
                                </p>{' '}
                                <Form.Check
                                  id="data2"
                                  // name="dataVal"
                                  type="checkbox"
                                  defaultChecked={obj.inactive}
                                  onChange={e => {
                                    handleCheckbox(
                                      `${obj.floor},${obj.building}`,
                                      e.target.checked,
                                      'FloorClick',
                                    );
                                    setFloor(`${obj.floor},${obj.building}`);
                                  }}
                                  style={{
                                    marginLeft: '6px',
                                    margin: ' 5px',
                                  }}
                                />
                                <p style={{ color: 'grey' }}>{`(${
                                  obj.lockedWorkspaceNumber
                                } /
                                ${obj.totalWorkspace} Locked)`}</p>
                              </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                {obj &&
                                  obj.neighborhood.map(floor => (
                                    <>
                                      <div
                                        className={`office-part-one ${floor.neighborhoodname.toLowerCase()}`}
                                      >
                                        <span className="informer" />

                                        <a
                                          href
                                          aria-hidden="true"
                                          value={floor.neighborhoodname}
                                          onClick={() => {
                                            setColor(floor.neighborhoodname);
                                          }}
                                        >
                                          <div style={{ display: 'flex' }}>
                                            <span
                                              className={`sq-${floor.neighborhoodname.toLowerCase()} space_data`}
                                            />
                                            <p style={{ marginLeft: '40px' }}>
                                              {floor.neighborhoodname}
                                            </p>
                                            <input
                                              id="data2"
                                              name="dataVal"
                                              type="checkbox"
                                              defaultChecked={floor.inactive}
                                              onChange={e => {
                                                handleCheckbox(
                                                  floor.colorcode,
                                                  e.target.checked,

                                                  'colorCLick',
                                                );
                                              }}
                                              style={{
                                                marginLeft: '6px',
                                                margin: ' 5px',
                                              }}
                                            />

                                            <p
                                              style={{
                                                color: 'grey',
                                                marginLeft: '10px',
                                              }}
                                            >{`(${
                                              floor.neighborhoodLockedSpace
                                            } /
                                ${floor.neighborhoodTotalSpace} Locked)`}</p>
                                          </div>

                                          {floor &&
                                            floor.neighborWorkspace &&
                                            floor.neighborWorkspace.map(
                                              space => (
                                                <Accordion.Collapse
                                                  className="show"
                                                  value={space.workspacenumber}
                                                >
                                                  <Card.Body>
                                                    {space.workspacenumber}
                                                    <input
                                                      id="data1"
                                                      type="checkbox"
                                                      defaultChecked={
                                                        space.inactive
                                                      }
                                                      onChange={e => {
                                                        handleCheckbox(
                                                          space.id,
                                                          e.target.checked,
                                                          'neighborhoodClick',
                                                        );
                                                      }}
                                                      style={{
                                                        marginLeft: '6px',
                                                      }}
                                                    />
                                                  </Card.Body>
                                                </Accordion.Collapse>
                                              ),
                                            )}
                                        </a>
                                      </div>
                                    </>
                                  ))}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      ))}
                  </div>
                )}
              </div>
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
};
export default Spaces;
