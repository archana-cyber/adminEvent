import React,{useState} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"


const  DeleteConfirmModal= ({toggleEvent,showModalEvent}) => {

    const [modal, setmodal] = useState(false)
    const toggle=() =>{
        setmodal(!modal)
       
      }
    
    return (
        <div>
          {/* <Button color="danger" onClick={toggle}>{props.buttonLabel}</Button> */}
          <Modal isOpen={showModalEvent} toggle={toggleEvent}  backdrop={false}>
            {/* <ModalHeader toggle={toggleEvent}>
                Add New Event
                <p>X</p>
                </ModalHeader> */}
            
            <ModalBody>
                 <div className='event-header'>
                  <h5 class="modal-title">Do you want to delete?</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
            
                 <div className='delete-btn-wrp'>
                   <button type="button" class="secondary-btn btn btn-secondary" >Yes</button>
                   <button type="button" class="secondary-btn btn btn-secondary" >No</button>
                 </div>
              {/* <div className="text-right mt-2 ml-2">
                    <Button> {false ? (
                        <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                    ) : "Submit"}</Button>
                </div> */}
            </ModalBody>
            
          </Modal>
        </div>
      );
}

export default DeleteConfirmModal