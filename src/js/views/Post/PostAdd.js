import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import FormData from "form-data"
import { AddPostAction } from '../../actions/postAction'; 
import { connect } from 'react-redux'
import UploadLogo from '../../components/UploadLogo';


const errorMsgs = {
    title:"Please enter a valid title",
    description:"Please enter a valid description",
    image:"Please enter a valid image",
    multiple_image:"Please select image ",
    city:"Please enter a valid city",
    mapLink:"Please enter a valid link",
    travelAwaits:"Please enter a valid tavel link",
    categoryId:"Please enter a valid category",
    subcategory_id:"Please enter a valid sub category",
    }
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
const PostAdd = (props) => {
 
    const {toggleEvent,showModalEvent,data={},loader=false} =props
    const [modal, setmodal] = useState(false)
    const [getCategory, setGetCategory] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [cityList, setCityList] = useState([])

    const [errorMsg, setErrorMsg] = useState('')

    const [formError, setFormError] = useState({})
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        image:"",
        multiple_image:"",
        city:"",
        mapLink:"",
        travelAwaits:"",
        categoryId:"",
        subcategory_id:"",

    })
   
   

    const toggle=() =>{
        setmodal(!modal)
       
    }
    useEffect(()=>{
        if(props.cityList.length){
            let arrayData=[];
            let listdata=props.cityList 
            // let listdata=dumData
            Object.keys(listdata).length>0 && listdata.map((item,index)=>{
            arrayData.push({label:item.name,value:item.id})
            })
            setCityList(arrayData)
       }
    },[props.cityList])

    useEffect(()=>{
        if(props.subcategoryList.length){
             let arrayData=[];
             let listdata=props.subcategoryList 
             // let listdata=dumData
             Object.keys(listdata).length>0 && listdata.map((item,index)=>{
             arrayData.push({label:item.label,value:item.value})
             })
             setSubCategoryList(arrayData)
        }
        
     },[props.subcategoryList])

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
    //  const validateAll=()=>{
    //     let errors={},isFormValid=true;
    //     let fileds={...formData}
    //     for (let type  in fileds){
    //         console.log('filedsif',fileds, formData[type])
    //        if(!fileds[type] && type!='image' && type!='status'){
    //         console.log('fileds[type]',type,fileds, fileds[type])
    //         isFormValid=false
    //           errors[type]=errorMsgs[type]
    //        }
    //     }
    //     console.log('errors444', errors)
    //     setFormError({...errors})
    //     return isFormValid
    // }
    const validateAll=()=>{
        let errors={},isFormValid=true;
        let fileds={...formData}
        for (let type  in fileds){
            console.log('filedsif',fileds, formData[type])
           if(!fileds[type] ){
            console.log('fileds[type]',type,fileds, fileds[type])
            isFormValid=false
              errors[type]=errorMsgs[type]
           }
        }
        // if(!fileds['multiple_image'] && errors['multiple_image']){
        //     isFormValid=true
        //     delete errors['multiple_image']
        // }
        console.log('errors444', errors)
        setFormError({...errors})
        return isFormValid
    }
    console.log('formError', formError)

    const handleSubCategory=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['subcategory_id']
            setFormError({...errors})
            setFormData({...formData,subcategory_id:selectedOption})
    } 
    const handleCategory=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['categoryId']
            setFormError({...errors})
          setFormData({...formData,categoryId:selectedOption})
    } 
    const handleSelectOption=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['city']
            setFormError({...errors})
          setFormData({...formData,'city':selectedOption})
    } 

    const formSubmitHandler=()=>{
        console.log('validateAll', validateAll(),formError)
       if(validateAll()){

        let generateFormData = new FormData();
        // generateFormData.append('name',formData['name'])
        for (let type  in formData){
            console.log('formData44434',type,formData )
            if(type!='subcategory_id' && type!='categoryId' && type!='city')
             generateFormData.append(type,formData[type])
        }
        generateFormData.append('city',formData['city'].label)
        
        if(formData['subcategory_id'])
        generateFormData.append('subcategory_id',formData['subcategory_id'].value)
        
        generateFormData.append('categoryId',formData['categoryId'].value)

         console.log('generateFormData333',formData, generateFormData)
         
            if(data?.id){
                // props.UpdateCategory(data.id,generateFormData)
                console.log('if inside')
                toggleEvent()
                // edit api call
            }else{
                console.log('if inside else')

                props.AddPostAction(generateFormData,(res)=>{
                    console.log('res44', res)
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                 }
                })
                // props.AddCategory(generateFormData)
                // props.AddPostAction(generateFormData)
                // toggleEvent()
                //add call
            }
       }else{
        console.log('form has error')
       }
    }
    const handleImage=(value)=>{
        let errors= {...formError}
        delete errors['image']
        setFormError({...errors})
        setFormData({...formData,image:value}) 
    }
    const handleMultiImage=(value)=>{
        let errors= {...formError}
        delete errors['multiple_image']
        setFormError({...errors})
        setFormData({...formData,multiple_image:value}) 
    }

    console.log('data={isOpenDetail.data}', data)
  
    
    const submitHandler=(values)=>{
       if(data?.id){
        // edit api call
       }else{
        //add call
       }
       console.log('values', values)
    }
    const onChangeHandler=(e)=>{
        console.log('dsgfdsvgfsd', e)
        let errors= {...formError}
        delete errors[e.target.name]
        setFormError({...errors})
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    console.log('formdata555',subCategoryList,data, formData)
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
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'Sub Category' : 'Add New Post'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                 
                        <div className='p-3'>
                            <p className="form-label-title">Title </p>
                            <Input name="title" className="form-control" onChange={(e)=>onChangeHandler(e)}/>
                            {formError.title ? (
                                <div className='text-danger'>{formError.title}</div>
                            ) : null}
                       </div>

                       <div className='p-3'>
                        <p className="form-label-title">Description</p>
                        <Input name="description" type="text" className="form-control" onChange={(e)=>onChangeHandler(e)}/>
                        {formError.description ? <div className='text-danger'>{formError.description}</div> : null}
                        </div>

                        <div className='p-3'>
                          <p className="form-label-title" >City </p>
                          <Select
                            value={formData?.city }
                            onChange={handleSelectOption}
                            options={cityList}
                            name="city"
                            className='zindex-for-select1'
                        />

                        {formError.city ? <div className='text-danger'>{formError.city}</div> : null}
                        </div>


                        <div className='p-3'>
                        <p className="form-label-title">Map Links</p>
                        <Input name="mapLink" type="text" className="form-control" onChange={(e)=>onChangeHandler(e)}/>
                        {formError.mapLink ? <div className='text-danger'>{formError.mapLink}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Travel Awaits</p>
                        <Input name="travelAwaits" type="text" className="form-control" onChange={(e)=>onChangeHandler(e)}/>
                        {formError.travelAwaits ? <div className='text-danger'>{formError.travelAwaits}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Select
                            value={formData?.categoryId }
                            onChange={handleCategory}
                            options={getCategory}
                            name="categoryId"
                            className='zindex-for-select2'
                        />
                        {formError?.categoryId ? <div className='text-danger'>{formError?.categoryId}</div> : null}

                       </div>
                        
                       <div className='p-3'>
                        <p className="form-label-title">Subcategory</p>
                        
                        <Select
                            value={formData?.subcategory_id }
                            onChange={handleSubCategory     }
                            options={subCategoryList}
                            name="subcategory_id"
                            className='zindex-for-select3'
                        />
                        {formError?.subcategory_id ? <div className='text-danger'>{formError?.subcategory_id}</div> : null}

                       </div>

                        <div className='p-3'>
                        <p className="form-label-title">image</p>
                        {/* <Input name="image" type="file" className="form-control" onChange={(e)=>onChangeHandler(e)}/> */}
                        <div>
                            <UploadLogo
                                id={'image'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleImage(value) }
                                // disabled={field.disabled}
                                name='image'
                            />
                        </div>
                        {formError.image ? <div className='text-danger'>{formError.image}</div> : null}
                        </div>

                        

                       <div className='p-3'>
                      <p className="form-label-title">Multiple Image </p>
                            <UploadLogo
                                id={'image'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleMultiImage(value) }
                                // disabled={field.disabled}
                                name='multiple_image'
                            />
                        {/* <Input name="multiple_image" className="form-control" /> */}
                        {formError.multiple_image ? (
                            <div className='text-danger'>{formError.multiple_image}</div>
                        ) : null}
                      </div>
                       



                       

                      
                        {/* <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Input name="categoryId" type="text" className="form-control"/>
                        {formError.categoryId ? <div className='text-danger'>{formError.categoryId}</div> : null}
                        </div>
                        <div className='p-3'>
                        <p className="form-label-title">sub Category</p>
                        <Input name="subcategory_id" type="text" className="form-control"/>
                        {formError.subcategory_id ? <div className='text-danger'>{formError.subcategory_id}</div> : null}
                        </div> */}
                         {errorMsg ? <div className='text-danger pl-3'>{errorMsg}</div> : null}
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit' onClick={formSubmitHandler}> {loader ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Submit"}
                            </Button>
                        </div>
                        {/* </Form>
                    )}
                    </Formik> */}
                    </div>
                  
             
            
            </ModalBody>
            
          </Modal>
        </div>
      );
}


const mapStateToProps = state =>{
   
    const {categoryList}  = state.categoryReducer;
    const {subcategoryList}  = state.subcategoryReducer;
    const {cityList}  = state.cityReducer;


    return {categoryList,subcategoryList,cityList};
  }
  export default connect(mapStateToProps,{AddPostAction})(PostAdd);
  