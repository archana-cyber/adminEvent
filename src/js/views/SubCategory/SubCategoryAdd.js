import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AddSubCategory,UpdateSubCategory } from '../../actions/subcategoryAction';
import { connect } from 'react-redux'
import UploadVideo from '../../components/UploadVideo';
import UploadLogo from '../../components/UploadLogo';
import { AddCategory,GetCategoryAction,DeleteCategory } from "../../actions/categoryAction";
import Select from 'react-select';
import _ from 'lodash';

const errorMsgs = {
    "name":"Please enter a valid name",
    "status":"Please enter a valid status",
    "image":"Please upload image",
    "video":"Please upload video",
    "category_id":"Please select anyone from the above"
    }
const options = [
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' },
    ];
const dumData=[{
    "id": 1,
    "name": "Peter",
    "image": "Delgaty",
    "status": "true",
    "is_subcategory": true,
    "created_at": "5/22/2022",
    "updated_at": "8/8/2022"
  }, {
    "id": 2,
    "name": "Cchaddie",
    "image": "Corser",
    "status": true,
    "is_subcategory": false,
    "created_at": "6/4/2022",
    "updated_at": "6/7/2022"
  }, {
    "id": 3,
    "name": "Hortense",
    "image": "Broadnicke",
    "status": false,
    "is_subcategory": false,
    "created_at": "3/17/2022",
    "updated_at": "6/20/2022"
  }, {
    "id": 4,
    "name": "Bamby",
    "image": "Ewols",
    "status": false,
    "is_subcategory": true,
    "created_at": "2/23/2022",
    "updated_at": "9/4/2022"
  }]
const SubCategoryAdd = (props) => {

    const {toggleEvent,showModalEvent,data={},loader=false}=props
    const [getCategory, setGetCategory] = useState([])
    const [modal, setmodal] = useState(false)
    const [formError, setFormError] = useState({})
    const [formData, setFormData] = useState({
        name:data.name,
        image:data.image,
        status:data.status,
        is_video:data.is_video,
        category_id:data.category_id
    })
   
    useEffect(()=>{
       if(props.categoryList.length){
            let arrayData=[];
            let listdata=props.categoryList 
            // let listdata=dumData
            Object.keys(listdata).length>0 && listdata.map((item,index)=>{
            arrayData.push({label:item.name,value:item.id})
            })
            setGetCategory(arrayData)
       }
       
    },[props.categoryList])
    
   console.log('data subcategory==>', data)

   useEffect(()=>{
    if(Object.keys(data).length){
      console.log('data8899', data)
      let categoryData,statusData
      if(data?.category_id){
        let categoryInfo = props.categoryList.length>0 ? props.categoryList : [];

        let updatedList = _.find(categoryInfo, function(item) { return item.id == 12});
         console.log('updatedList444', updatedList)
        categoryData={ value: updatedList.id, label: updatedList.name }
          
      }
      //  setFormData({...formData,isSubCategory: { value: 'true', label: 'True' }})
     

      if(data?.status==true || data?.status=='true')
         statusData={ value: 'true', label: 'True' }
      //   setFormData({...formData,status: { value: 'true', label: 'True' }})
      else{
      //    setFormData({...formData,status: { value: 'false', label: 'False' }}) 
         statusData= { value: 'false', label: 'False' }
     } 

     setFormData({...formData,status:statusData,category_id:categoryData })

    }
  },[data])

    const toggle=() =>{
        setmodal(!modal)
       
    }

    console.log('data={isOpenDetail.data}',formData, data)
  
    
    const submitHandler=(values)=>{
        if(data?.id){
            props.UpdateSubCategory(data.id,values)
            // edit api call
           }else{
            props.AddSubCategory(values)
            toggleEvent()
            //add call
           }
       console.log('values', values)
    }

    const handleImage=(value)=>{
        let errors= {...formError}
        delete errors['image']
        setFormError({...errors})
        setFormData({...formData,image:value}) 
    }
    const handleVideo=(value)=>{
        let errors= {...formError}
        delete errors['is_video']
        setFormError({...errors})
        setFormData({...formData,is_video:value}) 
    }
    const handleSubcategory=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['category_id']
            setFormError({...errors})
          setFormData({...formData,category_id:selectedOption})
    } 
    const handleStatus=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['status']
            setFormError({...errors})
          setFormData({...formData,status:selectedOption})
    }
    const onChangeHandler=(e)=>{
        console.log('dsgfdsvgfsd', e)
        let errors= {...formError}
        delete errors[e.target.name]
        setFormError({...errors})
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const validateAll=()=>{
        let errors={},isFormValid=true;
        let fileds={...formData}
        for (let type  in fileds){
            console.log('filedsif',fileds, formData[type])
           if(!fileds[type]){
            console.log('fileds[type]',type,fileds, fileds[type])
            isFormValid=false
              errors[type]=errorMsgs[type]
           }
        }
        console.log('errors444', errors)
        setFormError({...errors})
        return isFormValid
    }
    console.log('formError', formError)

    const formSubmitHandler=()=>{
       if(validateAll()){

        let generateFormData={...formData,status:formData.status.value,category_id:formData.category_id.value}
        

        // let generateFormData = new FormData();
        // // generateFormData.append('name',formData['name'])
        // for (let type  in formData){
        //     console.log('formData44434',type,formData )
        //     if(type!='category_id' && type!='status')
        //      generateFormData.append(type,formData[type])
        // }
        // generateFormData.append('category_id',formData['category_id'].value)
        // generateFormData.append('status',formData['status'].value)


         console.log('generateFormData333', generateFormData)
         
            if(data?.id){
                props.UpdateSubCategory(data.id,generateFormData)
                toggleEvent()
                // edit api call
            }else{
                props.AddSubCategory(generateFormData)
                toggleEvent()
                //add call
            }
       }else{
        console.log('form has error')
       }
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
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'Sub Category' : 'Add New Sub Category'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                 
                        <div className='p-3'>
                            <p className="form-label-title">Name </p>
                            <Input name="name" className="form-control" onChange={onChangeHandler} value={formData.name}/>
                            {formError.name  ? (
                                <div className='text-danger'>{formError.name}</div>
                            ) : null}
                       </div>

                      
                        <div className='p-3 status-wrp' style={{zIndex:999}}>
                      <p className="form-label-title">Status </p>
                        {/* <Input name="status" type="text" className="form-control" onChange={onChangeHandler}/> */}
                        <Select
                            value={formData?.status }
                            onChange={handleStatus}
                            options={options}
                            name="status"
                        />
                        {formError.status ? <div className='text-danger'>{formError.status}</div> : null}
                        </div>
                        <div className='p-3 status-wrp' >
                        <p className="form-label-title">Category</p>
                        <Select
                            value={formData?.category_id }
                            onChange={handleSubcategory}
                            options={getCategory}
                            name="category_id"
                        />
                        {/* <Input name="category_id" type="text" className="form-control"/> */}
                        {formError.category_id ? <div className='text-danger'>{formError.category_id}</div> : null}
                        </div>
                        <div className='p-3'>
                      <p className="form-label-title">Image </p>
                      <div>
                            <UploadLogo
                                id={'image'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleImage(value) }
                                // disabled={field.disabled}
                                name='image'
                            />
                        </div>
                       
                        {formError.image ? (
                            <div className='text-danger'>{formError.image}</div>
                        ) : null}
                      </div>

                        <div className='p-3'>
                        <p className="form-label-title">Is Video</p>
                        <div>
                            <UploadLogo
                                id={'video'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleVideo(value) }
                                // disabled={field.disabled}
                                name='video'
                            />
                        </div>
                        {formError.is_video ? <div className='text-danger'>{formError.is_video}</div> : null}
                        </div>
                        
                      
                        
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit' onClick={formSubmitHandler}> {false ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Submit"}
                            </Button>
                        </div>
                        
                   
                    </div>
                  
             
            
            </ModalBody>
            
          </Modal>
        </div>
      );
}




const mapStateToProps = state =>{
   
    const {loader,categoryList,subcategoryList}  = state.categoryReducer;
    return {subcategoryList,categoryList,loader};
  }
export default connect(mapStateToProps,{GetCategoryAction,AddSubCategory,UpdateSubCategory})(SubCategoryAdd);
  