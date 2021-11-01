/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable default-case */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card, Button } from 'react-bootstrap';

const Spaces = ({
  state,
  handleUserSelect,
  officeLocation,
  requestUpdateActiveStatus,
}) => {
  const [floor, setFloor] = useState();
  const [color, setColor] = useState();
  const [checked, setChecked] = useState(true);

  const handleCheckbox = (data, val) => {
    setChecked(!checked);

    const dataFinal = floor.split(',');
    if (val === false) {
      const payload = {
        active: checked,
        locationid: state.selectedNames,
        floor: dataFinal && dataFinal[0] !== 'null' ? dataFinal[0] : '',
        building: dataFinal && dataFinal[1] !== 'null' ? dataFinal[1] : '',
        colorcode: data,
        isWorkspace: false,
      };
      requestUpdateActiveStatus(payload);
    } else {
      const payload = {
        active: checked,
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

  return (
    <div className="wrapper-main" style={{ marginTop: ' 10%' }}>
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
                  {officeLocation &&
                    officeLocation.map(obj => (
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
          <div className="card office-structure-inner">
            <div className="left-panel">
              <div className="office-info">
                <p className="name">{floorData && floorData.locationname}</p>
              </div>
              {(state.selectedNames === 'DC' ||
                state.selectedNames === 'RIC') && (
                <div className="office-resource">
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
                            >
                              {obj.building && `Building${obj.building}`}{' '}
                              {obj.floor && `Floor${obj.floor}`}
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
                                        {floor.neighborhoodname}
                                        <input
                                          id="data2"
                                          // name="dataVal"
                                          type="checkbox"
                                          // defaultChecked={state.checked}
                                          onChange={() =>
                                            handleCheckbox(
                                              floor.colorcode,
                                              false,
                                            )
                                          }
                                          style={{ marginLeft: '6px' }}
                                        />
                                        {floor &&
                                          floor.neighborWorkspace &&
                                          floor.neighborWorkspace.map(space => (
                                            <Accordion.Collapse
                                              className="show"
                                              value={space.workspacenumber}
                                            >
                                              <Card.Body>
                                                {space.workspacenumber}
                                                <input
                                                  id="data1"
                                                  type="checkbox"
                                                  onChange={() =>
                                                    handleCheckbox(
                                                      space.id,
                                                      true,
                                                    )
                                                  }
                                                  style={{ marginLeft: '6px' }}
                                                />
                                              </Card.Body>
                                            </Accordion.Collapse>
                                          ))}
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
            <div className="d-flex" style={{ width: '25%' }}>
              <div style={{ marginRight: '4px' }}>
                {floorData && floorData.locationname}
              </div>

              <div style={{ marginRight: '4px' }} className="mr-8">
                {color}
              </div>
            </div>
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
};
export default Spaces;
