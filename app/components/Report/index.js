import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { Datepicker } from '@mobiscroll/react';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.scss';
import Axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import Calender from '../Cal/Calender';
import '../FAQ/styles.scss';

const Report = () => {
  const [show, setShow] = useState(false);
  const [allUser, setAllUser] = useState([]);

  const optionData =
    allUser &&
    allUser.map(item => ({
      name: `${item.userName}`,
      id: item.userName,
      value: item.userName,
    }));

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    const url = `https://mocki.io/v1/11523d43-5f93-4a6f-adda-327ee52a8b1f`;
    Axios.get(url).then(res => {
      setAllUser(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="common-title" style={{ marginLeft: '20px' }}>
        My Team
      </h4>
      <Calender defaultSelected="week" setShow={setShow} allUser={allUser} />

      <Modal
        className="modal fade test_modal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Invite Team to the Office
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setShow(false);
                }}
              />
            </div>
            <div className="modal-body modal-body_myteam">
              {/* <div className="invite-team-wrapp mb-3"> */}
              <Multiselect
                options={optionData} // Options to display in the dropdown
                // selectedValues={selected} // Preselected value to persist in dropdown
                // onSelect={this.onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                className="mb-3 tessssss"
              />
              {/* </div> */}
              {/* <div className="access-to">
                  <div className="access-one">
                    <img src={ProfileImg} alt="" />
                    Wade Warren
                    <a className="close_btn" href>
                      <img src="./images/close.svg" alt="" />
                    </a>
                  </div>
                  <div className="access-one">
                    <img src={ProfileImg} alt="" />
                    Cameron Williamson
                    <a className="close_btn" href>
                      <img src="./images/close.svg" alt="" />
                    </a>
                  </div>
                  <div className="access-one">
                    <img src={ProfileImg} alt="" />
                    Cameron Williamson
                    <a className="close_btn" href>
                      <img src="./images/close.svg" alt="" />
                    </a>
                  </div>
                </div> */}
              {/* </div> */}
              <div className="selection">
                <select name="" id="">
                  <option value="">Washington, DC</option>
                  <option value="">Richmond, VA</option>
                  <option value="">Birmingham, AL</option>
                  <option value="">Bloomington, MN</option>
                </select>
              </div>
              <div className="invite-team-wrapp choose-date mt-3">
                <div className="access-to">
                  {/* <div className="access-one">
                    Jun 16th, 2021
                    <a className="close_btn" href>
                      <img src="./images/close.svg" alt="" />
                    </a>
                  </div>
                  <div className="access-one">
                    Jun 18th, 2021
                    <a className="close_btn" href>
                      <img src="./images/close.svg" alt="" />
                    </a>
                  </div> */}
                  <span className="material-icons-outlined">
                    calendar_today
                  </span>
                </div>
                <Datepicker
                  controls={['calendar']}
                  selectMultiple
                  min={moment().toDate()}
                  dateFormat="MMM DD,YYYY"
                  className="dataaaa"
                  selectCounter
                  inputComponent="input"
                  inputProps={{
                    placeholder: 'Select Date(s)',
                  }}
                  marked={[
                    {
                      date: new Date(2021, 8, 2),
                      markCssClass: 'mbsc-calendar-marks1',
                    },
                    {
                      date: new Date(2021, 8, 4),
                      markCssClass: 'mbsc-calendar-marks1',
                    },
                    {
                      date: new Date(2021, 8, 5),
                      markCssClass: 'mbsc-calendar-marks2',
                    },
                    {
                      date: new Date(2021, 8, 7),
                      markCssClass: 'mbsc-calendar-marks3',
                    },
                    {
                      date: new Date(2021, 8, 6),
                      markCssClass: 'mbsc-calendar-marks3',
                    },
                  ]}
                />
              </div>
              <div className="description mt-3">
                <textarea
                  name=""
                  id=""
                  placeholder="Add a Message"
                  cols="30"
                  rows="10"
                />
              </div>
              <p className="notice mb-1 mt-2">
                An email invitation will be sent to the selected team member(s)
                once you click Invite.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn save-data">
                Invite
              </button>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn dismiss"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Report.propTypes = {
  // handleSubmit: PropTypes.func,
};

export default Report;
