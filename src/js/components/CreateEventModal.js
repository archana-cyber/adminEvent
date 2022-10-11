import React,{useState} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"


const CreateEventModal = ({toggleEvent,showModalEvent}) => {

    const [modal, setmodal] = useState(false)
    const toggle=() =>{
        setmodal(!modal)
       
      }
    
    return (
        <div>
          {/* <Button color="danger" onClick={toggle}>{props.buttonLabel}</Button> */}
          <Modal isOpen={showModalEvent} toggle={toggleEvent} size='xl' backdrop={false}>
            {/* <ModalHeader toggle={toggleEvent}>
                Add New Event
                <p>X</p>
                </ModalHeader> */}
            
            <ModalBody>
                 <div className='event-header'>
                  <h5 class="modal-title">Add New Event</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
              <Table bordered={true} size="sm" responsive>
              <tbody>
                
                      <tr>
                          <td>
                              <p className="form-label-title">Job Name
                              </p>
                              <Input type="text" />
                              {/* {err.hasOwnProperty('jobName') &&
                                  <label className="text-danger" style={{ fontSize: '14px' }}>
                                      {err.jobName}
                                  </label>} */}
                            </td>
                      </tr>
                      <tr>
                          <td>
                              <p className="form-label-title">Title
                              </p>
                              <Input type="text" />
                              {/* {err.hasOwnProperty('jobName') &&
                                  <label className="text-danger" style={{ fontSize: '14px' }}>
                                      {err.jobName}
                                  </label>} */}
                            </td>
                      </tr>
                      <tr>
                          <td>
                              <p className="form-label-title">Company
                              </p>
                              <Input type="text" />
                              {/* {err.hasOwnProperty('jobName') &&
                                  <label className="text-danger" style={{ fontSize: '14px' }}>
                                      {err.jobName}
                                  </label>} */}
                            </td>
                      </tr>
                      <tr>
                          <td>
                              <p className="form-label-title">Description
                              </p>
                              <Input type="text" />
                              {/* {err.hasOwnProperty('jobName') &&
                                  <label className="text-danger" style={{ fontSize: '14px' }}>
                                      {err.jobName}
                                  </label>} */}
                            </td>
                      </tr>
                      <tr>
                          <td>
                              <p className="form-label-title">Schedule Date
                              </p>
                              <Input type="text" />
                              {/* {err.hasOwnProperty('jobName') &&
                                  <label className="text-danger" style={{ fontSize: '14px' }}>
                                      {err.jobName}
                                  </label>} */}
                            </td>
                      </tr>
                    
              
              </tbody>
              </Table>
              <div className="text-right mt-2 ml-2">
                    <Button> {false ? (
                        <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                    ) : "Submit"}</Button>
                </div>
            </ModalBody>
            
          </Modal>
        </div>
      );
}

export default CreateEventModal