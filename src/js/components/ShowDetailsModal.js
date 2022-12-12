import React, { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import moment from "moment";



const ShowDetailsModal = ({data,closeDetails}) => {

    const {original}=data
    const renderValue = (value, isDate) => {
        if (!value) {
            return "N/A";
        }

        if (isDate) {
            return moment(value).format('MM-DD-YYYY');
        }
        return value;
    }

    console.log('data3333', data)
    return (
        <div className="profileDetails-container partnerDetails">
            <Row>
                <Col>
                    <h3 tabIndex="-1" id="mainForm" className="table-sub-title typo-h3">Single record details</h3><button className="cross-btn" onClick={() => closeDetails()}><i className="fa fa-times"></i></button>
                    <Table id="Summary" bordered={true} hover size="sm" responsive className='summary-detail-first'>
                        <tbody>
                            
                            {/* <tr>
                                <td>
                                    <p className='form-label-title'>ProfileId</p>
                                    <div className='label-detail'>{renderValue(profiledata.profileid)}

                                        <CopyToClipboard onCopy={onCopy} text={renderValue(profiledata.profileid)}>
                                            <Button
                                                data-tip={"Copied"}
                                                data-for={"copy"}
                                                id="ScheduleUpdateTooltip1"
                                                className="copy-btn"> <span className="copy-clip"><i className="fa fa-copy"></i>
                                                    {renderTooltip()}</span></Button>
                                        </CopyToClipboard></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>MembershipType</p>
                                    <div className='label-detail'>

                                        <div className="membership-status">
                                            <button type="button" style={{ backgroundColor: membershipStatus ? membershipStatus.color : "#fff" }}>
                                                <div className="d-flex" >{renderValue(membershipStatus ? membershipStatus.value : null)}</div>
                                            </button>
                                        </div >

                                    </div>
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td>
                                    <p className='form-label-title'>Partner Name</p>
                                    <div className='label-detail'>{renderValue(original.partnerName)}</div>
                                </td>
                            </tr> */}
                             <tr>
                                <td>
                                    <p className='form-label-title'>Id</p>
                                    <div className='label-detail'>{renderValue(original.id)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>Title</p>
                                    <div className='label-detail'>{renderValue(original.title)}</div>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>
                                    <p className='form-label-title'>Job Key</p>
                                    <div className='label-detail'>{renderValue(original.jobKey)}</div>
                                </td>
                            </tr> */}
                            <tr>
                                <td>
                                    <p className='form-label-title'>Completed</p>
                                    <div className='label-detail'>{renderValue(original.completed)}</div>
                                </td>
                            </tr>
                           
                            <tr>
                                <td>
                                    <p className='form-label-title'> Schedule Time</p>
                                    <div className='label-detail'>{renderValue(original.scheduledAt)}</div>
                                </td>
                            </tr>
                       
                        </tbody>
                    </Table>
                   
                 
                    
                </Col>
            </Row>
          
        </div>
    )
}

export default ShowDetailsModal