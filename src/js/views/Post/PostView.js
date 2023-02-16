import React, { useEffect, useState } from "react"
import { Container, Row, Col, Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import moment from "moment";
import { connect } from 'react-redux'


const PostView = (props) => {

    const {data,closeDetails}=props
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

    const getDataFromApiCategory=(findData,list)=>{
      let tempdata={}
      console.log('list', list)
      tempdata=list.find(item=>item.id==findData)
      return tempdata.name
    }
    const getDataFromApiSubCategory=(findData,list)=>{
        let tempdata={}
      console.log('list1', list)

        tempdata=list.find(item=>item.value==findData)
        return typeof tempdata=='object' ? tempdata.label:"N/A"
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
                            </tr>
                           
                            <tr>
                                <td>
                                    <p className='form-label-title'>City</p>
                                    <div className='label-detail'>{renderValue(original.city)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>travel_awaits</p>
                                    <div className='label-detail'>{renderValue(original.travelAwaits)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>map_link</p>
                                    <div className='label-detail'>{renderValue(original.mapLink)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>category_id</p>
                                    <div className='label-detail'>{getDataFromApiCategory(original.categoryId,props.categoryList)}</div>
                                </td>
                            </tr><tr>
                                <td>
                                    <p className='form-label-title'>subcategory_id</p>
                                    <div className='label-detail'>{getDataFromApiSubCategory(original.subcategoryId,props.subcategoryList)}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='form-label-title'>Media</p>
                                    <div className='label-detail img-wrp'>
                                        <img src={original.media}/>
                                    </div>
                                </td>
                            </tr>
                            {/* <tr>
                                <td>
                                    
                                </td>
                            </tr> */}
                            {/* <tr>
                                <td>
                                    <p className='form-label-title'>Job Key</p>
                                    <div className='label-detail'>{renderValue(original.jobKey)}</div>
                                </td>
                            </tr> */}
                           
                       
                        </tbody>
                    </Table>
                   
                     {original.multipleImage && original.multipleImage.length>0 && 
                     <div className="multi-img-outer">
                     <p className='form-label-title'>multiple_image</p>
                                    <div className='label-detail multi-img-wrp'>
                                        {typeof original.multipleImage=='object' && original.multipleImage.length>0 &&
                                        original.multipleImage.map((item,index)=>{
                                            return <img src={original.multipleImage}/>
                                  
                                        })}
                                    </div>
                     </div>}
                    
                </Col>
            </Row>
          
        </div>
    )
}

// export default PostView

const mapStateToProps = state =>{
   
    const {postList,postLoader}  = state.postReducer;
    const {categoryList}  = state.categoryReducer;
    const {cityList}  = state.cityReducer;
    const {subcategoryList}  = state.subcategoryReducer;
    return {postList,postLoader,subcategoryList,categoryList,cityList};
  }
  export default connect(mapStateToProps,{})(PostView);
  