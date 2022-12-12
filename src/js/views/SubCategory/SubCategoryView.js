import React, { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import moment from "moment";



const CategoryView = ({data,closeDetails}) => {

    const {original}=data
    const renderValue = (value, isDate) => {
        console.log('value888', value)
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
                    <h3 tabIndex="-1" id="mainForm" className="table-sub-title typo-h3">Sub Category details</h3><button className="cross-btn" onClick={() => closeDetails()}><i className="fa fa-times"></i></button>
                    <Table id="Summary" bordered={true} hover size="sm" responsive className='summary-detail-first'>
                        <tbody>
                            
                           
                            
                            <tr>
                                <td>
                                    <p className='form-label-title'>Name</p>
                                    <div className='label-detail'>{renderValue(original.name)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>Category</p>
                                    <div className='label-detail'>{renderValue(original.category_id)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>image</p>
                                    <div className='label-detail'>{renderValue(original.image)}</div>
                                </td>
                            </tr> <tr>
                                <td>
                                    <p className='form-label-title'>status</p>
                                    <div className='label-detail'>{renderValue(original.status)}</div>
                                </td>
                            </tr> <tr>
                                <td>
                                    <p className='form-label-title'>Is Video</p>
                                    <div className='label-detail'>{renderValue(original.is_video)}</div>
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

export default CategoryView