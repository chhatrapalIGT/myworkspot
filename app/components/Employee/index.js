/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Table from './table';

const Employee = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [build, setBuild] = useState(8);

  // console.log('floor', floor);
  // console.log('build', build);
  // console.log('props.state.floor', props.state.floor);

  // const handleChangeData = useCallback(
  //   value => {
  //     props.changeAssignedSpace(value);
  //   },
  //   [value],
  // );

  // const dataref = useRef();
  // const focusInput = () => {
  //   inputRef.current.focus();
  // };

  const data =
    props.workSpace &&
    props.workSpace.find(i =>
      props.state.floor === i.id ? i.FloorBuilding : '',
    );

  const space =
    data &&
    data.FloorBuilding.find(
      obj => obj && obj.floorAndBuilding === props.state.build,
    );
  const workspace = space && space.neighborhood.map(i => i.neighborWorkspace);
  const finalData = [];

  workspace &&
    workspace.map(i => {
      if (i.length > 0) {
        i.map(j => finalData.push({ officeSpace: j.workspacenumber }));
      }
    });

  const columns = React.useMemo(
    () => [
      {
        Header: 'firstname',
        id: 'firstname',
        accessor: d => d.firstname.concat(d.lastname),
      },
      {
        Header: 'Role',
        id: 'userRole',
        accessor: d => d.userRole,
      },
      {
        Header: 'PERMANENT SPACE',
        id: 'assignedSpace',
        accessor: d =>
          d.permanentdesk !== null &&
          d.primaryofficelocation.concat(', ', d.permanentdesk),
      },
      {
        Header: 'EMAIL',
        id: 'EMAIL',
        accessor: d => d.email,
      },
      {
        Header: 'BADGE',
        id: 'badgeId',
        accessor: d => d.badgeId,
      },

      {
        Header: 'Edit',
        id: 'edit',
        filterable: false,
        maxWidth: 70,
        className: 'center',
        accessor: i => (
          <button
            type="button"
            onClick={() => {
              props.editEmployee(i.employeeid);
              handleShow();
            }}
          >
            Edit
          </button>
        ),
      },
    ],
    [],
  );
  return (
    <div className="wrapper-main">
      <h2>Location</h2>
      {console.log('props.stat=====e', props)}
      {/* <table>
        <input type="text" onChange={props.handleSearch} name="searchVal" />
        <select onClick={props.handleSearch} name="rolee">
          <option value="Admin"> admin </option>
          <option value="user"> user </option>
          <option value="Manager"> manager </option>
        </select>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Permenant Space</th>
          <th>Email</th>
          <th>Badge</th>
          <th />
        </tr>
        {props.EmployeeData &&
          props.EmployeeData.map(i => (
            <tr>
              <td>{i.firstname + i.lastname}</td>
              <td>{i.userRole}</td>
              <td>{i.permanentdesk}</td>
              <td>{i.email}</td>
              <td>{i.badgeId}</td>
              <button
                type="submit"
                onClick={() => {
                  props.editEmployee(i.employeeid);
                  handleShow();
                }}
              >
                Edit
              </button>
            </tr>
          ))}
      </table> */}
      {props.EmployeeData && props.EmployeeData.length && (
        <Table
          data={props.EmployeeData}
          columns={columns}
          // loading={loading}
          manual
          page={props.state.page}
          pages={Math.ceil(props.employeeCount / props.state.limit)}
          pageSize={props.state.limit}
          defaultPageSize={props.state.limit}
          onPageChange={props.handlePageChange}
          onPageSizeChange={props.handleLimitChange}
        />
      )}
      {/* <Table
      // columns={columns}
      // data={
      //   props.EmployeeData.length
      //     ? props.EmployeeData && props.EmployeeData
      //     : []
      // }
      /> */}
      {/* <BootstrapTable
        // bootstrap4
        keyField="id"
        data={props.EmployeeData}
        columns={columns}
        // pagination={paginationFactory({ sizePerPage: 5 })}
      /> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.state && props.state.name}{' '}
            {props.singleEmployeeData && props.singleEmployeeData.LastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Role</label>
              <select
                onClick={props.handleSearch}
                defaultValue={props.state.Role || 'user'}
                name="rolee"
              >
                <option value="admin"> admin </option>
                <option value="user"> user </option>
                <option value="Manager"> manager </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">BadgeNumber</label>
              <input
                name="BadgeNumber"
                type="text"
                value={props.state.BadgeNumber}
                className="form-control"
                onChange={props.handleChange}
                placeholder="badgeNumber"
              />
            </div>
            {console.log(
              'props.state.deskLocationname',
              props.state.deskLocationname,
            )}
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Location</label>
              <select
                // onChange={e => {
                //   setFloor(e.target.value);
                // }}
                onChange={props.handleChange}
                name="floor"
                value={props.state.deskLocationname}
              >
                {props.workSpace &&
                  props.workSpace.map(i => (
                    <option
                      // selected={props.state.deskLocationname}
                      name="location"
                      value={i.id}
                    >
                      {i.locationname}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Floor</label>
              <select
                onChange={props.handleChange}
                name="build"
                value={`${props.state.build}`}
                //  value="/4
              >
                {/* <option>Please Select</option> */}
                {data &&
                  data.FloorBuilding.map(i => (
                    <>
                      <option
                        value={
                          i.floor &&
                          i.floor !== null &&
                          i.building &&
                          i.building !== null
                            ? `${i.floor}${i.building}`
                            : i.building && i.building !== null
                            ? `${i.building}`
                            : i.floor && i.floor !== null
                            ? `${i.floor}`
                            : ''
                        }
                      >
                        {i.floor &&
                        i.floor !== null &&
                        i.building &&
                        i.building !== null
                          ? `Building ${i.building}, Floor${i.floor}`
                          : i.building && i.building !== null
                          ? `Building ${i.building}`
                          : i.floor && i.floor !== null
                          ? `Floor ${i.floor}`
                          : ''}
                      </option>
                    </>
                  ))}
              </select>
            </div>
            <div className="form-group">
              {console.log('AssignedSpace', props.state.AssignedSpace)}
              {console.log('finalData[0]', finalData[0])}
              <label htmlFor="formGroupExampleInput2">Space</label>
              <select
                onChange={props.handleChange}
                name="AssignedSpace"
                value={props.state.AssignedSpace}
                defaultValue={finalData[0]}
              >
                {/* <option>Please Select</option> */}
                {finalData &&
                  finalData.map(i => (
                    <option value={i.officeSpace} name="AssignedSpace">
                      {' '}
                      {i && i.officeSpace}{' '}
                    </option>
                  ))}
              </select>
            </div>
            <input type="submit" value="submit" />
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

Employee.propTypes = {
  editEmployee: PropTypes.func,
  EmployeeData: PropTypes.object,
  handleSearch: PropTypes.func,
  singleEmployeeData: PropTypes.object,
  handleRoleSelect: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  workSpace: PropTypes.object,
  state: PropTypes.object,
  employeeCount: PropTypes.number,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
};

export default Employee;
