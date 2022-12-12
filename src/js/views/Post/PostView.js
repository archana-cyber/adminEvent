import React, { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import moment from "moment";



const PostView = ({data,closeDetails}) => {

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
                    <h3 tabIndex="-1" id="mainForm" className="table-sub-title typo-h3">Post details</h3><button className="cross-btn" onClick={() => closeDetails()}><i className="fa fa-times"></i></button>
                    <Table id="Summary" bordered={true} hover size="sm" responsive className='summary-detail-first'>
                        <tbody>
                            
                           
                            
                            <tr>
                                <td>
                                    <p className='form-label-title'>title</p>
                                    <div className='label-detail'>{renderValue(original.title)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>description</p>
                                    <div className='label-detail'>{renderValue(original.description)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>Media</p>
                                    <div className='label-detail'>{renderValue(original.media)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>multiple_image</p>
                                    <div className='label-detail'>{renderValue(original.multiple_image)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>City</p>
                                    <div className='label-detail'>{renderValue(original.city)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>travel_awaits</p>
                                    <div className='label-detail'>{renderValue(original.travel_awaits)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>map_link</p>
                                    <div className='label-detail'>{renderValue(original.map_link)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>category_id</p>
                                    <div className='label-detail'>{renderValue(original.category_id)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>subcategory_id</p>
                                    <div className='label-detail'>{renderValue(original.subcategory_id)}</div>
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

export default PostView