import React, { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import moment from "moment";



const UserManagementView = ({data,closeDetails}) => {

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
                            <tr>
                                <td>
                                    <p className='form-label-title'>name</p>
                                    <div className='label-detail'>{renderValue(original.name)}</div>
                                </td>
                            </tr> 
                        {original.profileImage &&<tr>
                                <td>
                                    <p className='form-label-title'>Profile Image</p>
                                    <div className='label-detail img-wrp'><img src={original.profileImage}/></div>
                                </td>
                            </tr> }
                            <tr>
                                <td>
                                    <p className='form-label-title'>Gender</p>
                                    <div className='label-detail'>{renderValue(original.gender)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>Email</p>
                                    <div className='label-detail'>{renderValue(original.email)}</div>
                                </td>
                            </tr> 
                            <tr>
                                <td>
                                    <p className='form-label-title'>Status</p>
                                    <div className='label-detail'>{original.status==true?"Active":"Deactive"}</div>
                                </td>
                            </tr> 
                            <tr>
                                <td>
                                    <p className='form-label-title'>Country</p>
                                    <div className='label-detail'>{renderValue(original.country)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>City</p>
                                    <div className='label-detail'>{renderValue(original.city)}</div>
                                </td>
                            </tr>
                             
                            <tr>
                                <td>
                                    <p className='form-label-title'>Google Id</p>
                                    <div className='label-detail'>{renderValue(original.googleId)}</div>
                                </td>
                            </tr> 
                              
                            <tr>
                                <td>
                                    <p className='form-label-title'>Apple Id</p>
                                    <div className='label-detail'>{renderValue(original.appleId)}</div>
                                </td>
                            </tr>
                           
                            <tr>
                                <td>
                                    <p className='form-label-title'>Facebook UId</p>
                                    <div className='label-detail'>{renderValue(original.facebookId)}</div>
                                </td>
                            </tr> 
                             <tr>
                                <td>
                                    <p className='form-label-title'>Google UId</p>
                                    <div className='label-detail'>{renderValue(original.google_uid)}</div>
                                </td>
                            </tr> 
                            
                           
                           
                            <tr>
                                <td>
                                    <p className='form-label-title'>Social Media</p>
                                    <div className='label-detail'>{renderValue(original.socialMedia)}</div>
                                </td>
                            </tr> 
                            {/* <tr>
                                <td>
                                    <p className='form-label-title'>Job Key</p>
                                    <div className='label-detail'>{renderValue(original.jobKey)}</div>
                                </td>
                            </tr> */}
                           
                       
                        </tbody>
                    </Table>
                   
                 
                    
                </Col>
            </Row>
          
        </div>
    )
}

export default UserManagementView