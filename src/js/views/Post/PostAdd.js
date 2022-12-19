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
    media:"Please enter a valid media",
    multiple_image:"Please select image ",
    city:"Please enter a valid city",
    map_link:"Please enter a valid link",
    travel_awaits:"Please enter a valid tavel link",
    category_id:"Please enter a valid category",
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

    const [formError, setFormError] = useState({})
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        media:"",
        multiple_image:"",
        city:"",
        map_link:"",
        travel_awaits:"",
        category_id:"",
        subcategory_id:"",

    })
   
   

    const toggle=() =>{
        setmodal(!modal)
       
    }
    useEffect(()=>{
        let arrayData=[];
        // let listdata=props.categoryList || dumData
        let listdata=dumData
        Object.keys(listdata).length>0 && listdata.map((item,index)=>{
           arrayData.push({label:item.name,value:item.id})
        })
        setGetCategory(arrayData)
    },[])

    const validateAll=()=>{
        let errors={},isFormValid=true;
        let fileds={...formData}
        for (let type  in fileds){
            console.log('filedsif',fileds, formData[type])
           if(!fileds[type] && (type=='media' || type=='title')){
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
            delete errors['category_id']
            setFormError({...errors})
          setFormData({...formData,category_id:selectedOption})
    } 
    const handleSelectOption=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['city']
            setFormError({...errors})
          setFormData({...formData,'city':selectedOption})
    } 

    const formSubmitHandler=()=>{
       if(validateAll()){

        let generateFormData = new FormData();
        // generateFormData.append('name',formData['name'])
        for (let type  in formData){
            console.log('formData44434',type,formData )
            if(type!='subcategory_id' || type!='subcategory_id')
             generateFormData.append(type,formData[type])
        }
        generateFormData.append('subcategory_id',formData['subcategory_id'].value)
        generateFormData.append('category_id',formData['category_id'].value)

         console.log('generateFormData333', generateFormData)
         
            if(data?.id){
                // props.UpdateCategory(data.id,generateFormData)
                toggleEvent()
                // edit api call
            }else{
                // props.AddCategory(generateFormData)
                props.AddPostAction(generateFormData)
                toggleEvent()
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

    console.log('data={isOpenDetail.data}', data)
    const SignupSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    media: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    multiple_image :  Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    city :  Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    map_link :  Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

    travel_awaits: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

    subcategory_id: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

    category_id: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    });
    
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

    console.log('formdata555', formData)
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
                  {/* <Formik
                    initialValues={{
                        title:data?.title ? data.title :'',
                        multiple_image:data?.multiple_image ? data.multiple_image :'',
                        status:data?.status ? data.status :'',
                        is_video:data?.is_video ? data.is_video :'',
                        description:data?.description ? data.description :'',

                        category_id:data?.category_id ? data.category_id :'',

                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        submitHandler(values)
                        // same shape as initial values
                        console.log(values);
                    }}
                    >
                    {({ errors, touched }) => (
                        <Form> */}
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
                        <p className="form-label-title">Media</p>
                        {/* <Input name="media" type="file" className="form-control" onChange={(e)=>onChangeHandler(e)}/> */}
                        <div>
                            <UploadLogo
                                id={'image'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleImage(value) }
                                // disabled={field.disabled}
                                name='media'
                            />
                        </div>
                        {formError.media ? <div className='text-danger'>{formError.media}</div> : null}
                        </div>

                       <div className='p-3'>
                      <p className="form-label-title">multiple_Image </p>
                        <Input name="multiple_image" className="form-control" />
                        {formError.multiple_image ? (
                            <div className='text-danger'>{formError.multiple_image}</div>
                        ) : null}
                      </div>
                        <div className='p-3'>
                          <p className="form-label-title" >City </p>
                          <Select
                            value={formData?.city }
                            onChange={handleSelectOption}
                            options={getCategory}
                            name="city"
                        />
                       

                        {formError.city ? <div className='text-danger'>{formError.city}</div> : null}
                        </div>


                        <div className='p-3'>
                        <p className="form-label-title">Map Links</p>
                        <Input name="map_link" type="text" className="form-control" onChange={(e)=>onChangeHandler(e)}/>
                        {formError.map_link ? <div className='text-danger'>{formError.map_link}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Travel Awaits</p>
                        <Input name="travel_awaits" type="text" className="form-control" onChange={(e)=>onChangeHandler(e)}/>
                        {formError.travel_awaits ? <div className='text-danger'>{formError.travel_awaits}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Select
                            value={formData?.category_id }
                            onChange={handleCategory}
                            options={getCategory}
                            name="category_id"
                        />
                        {formError?.category_id ? <div className='text-danger'>{formError?.category_id}</div> : null}

                       </div>
                        
                       <div className='p-3'>
                        <p className="form-label-title">Subcategory</p>
                        
                        <Select
                            value={formData?.subcategory_id }
                            onChange={handleSubCategory     }
                            options={getCategory}
                            name="subcategory_id"
                        />
                        {formError?.subcategory_id ? <div className='text-danger'>{formError?.subcategory_id}</div> : null}

                       </div>
                        {/* <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Input name="category_id" type="text" className="form-control"/>
                        {formError.category_id ? <div className='text-danger'>{formError.category_id}</div> : null}
                        </div>
                        <div className='p-3'>
                        <p className="form-label-title">sub Category</p>
                        <Input name="subcategory_id" type="text" className="form-control"/>
                        {formError.subcategory_id ? <div className='text-danger'>{formError.subcategory_id}</div> : null}
                        </div> */}
                        
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
   
    const {loader,categoryList}  = state.categoryReducer;
    return {categoryList};
  }
  export default connect(mapStateToProps,{AddPostAction})(PostAdd);
  