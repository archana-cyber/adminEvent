import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AddCategory,UpdateCategory } from '../../actions/categoryAction';
import { connect } from 'react-redux'
import UploadLogo from '../../components/UploadLogo';
import avibraLogo from '../../../images/avibraLogo.svg'
import Select from 'react-select';
import FormData from "form-data"


const errorMsgs = {
    "name":"Please enter a valid name",
    "status":"Please enter a valid status",
    "image":"Please upload image",
    "is_sub_category":"Please select anyone from the above"
    }
const CategoryAdd = (props) => {

    const {toggleEvent,showModalEvent,data={},loader=false}=props
    const [modal, setmodal] = useState(false)
    // const [,] = useState(second)
    const [formError, setFormError] = useState({})
    const [formData, setFormData] = useState({
        name:data.name,
        status:data.status,
        image:"",
        is_sub_category: '',
    })

   const [imageData, setImageData] = useState()
    const toggle=() =>{
        setmodal(!modal)
       
    }

    console.log('formData444',data, formData)
    useEffect(()=>{
      if(Object.keys(data).length){
        console.log('data8899', data)
        if(data?.is_subcategory==true || data?.is_subcategory=='true')
         setFormData({...formData,is_sub_category: { value: 'true', label: 'True' }})

        if(data?.is_subcategory==false || data?.is_subcategory=='false')
        setFormData({...formData,is_sub_category: { value: 'false', label: 'False' }}) 
      }
    },[data])

    console.log('data={isOpenDetail.data}',formData,"data",data)
    const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    status: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    image :  Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
   
    is_sub_category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    });
    
    const submitHandler=(values)=>{
        const payload={}
        let error=[],submitForm=true;
        let {is_sub_category}=formData;

        for (const prop in formData) {

            if(formData.prop==''){
                submitForm=false
                error.push('This field is required')
            }
            // console.log(`obj.${prop} = ${obj[prop]}`);
        }
        setFormData({formData})
        if(submitForm){
                if(data?.id){
                    props.UpdateCategory(data.id,values)
                    // edit api call
                }else{
                    props.AddCategory(values)
                    toggleEvent()
                    //add call
                }
        } 
    //   else{
    //     setFormError({is_sub_category:"This field is required"})
    //   } 
      
       console.log('values', values)
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

        let generateFormData = new FormData();
        // generateFormData.append('name',formData['name'])
        for (let type  in formData){
            console.log('formData44434',type,formData )
            if(type!='is_sub_category')
             generateFormData.append(type,formData[type])
        }
        generateFormData.append('is_sub_category',formData['is_sub_category'].value)

         console.log('generateFormData333', generateFormData)
         
            if(data?.id){
                props.UpdateCategory(data.id,generateFormData)
                toggleEvent()
                // edit api call
            }else{
                props.AddCategory(generateFormData)
                toggleEvent()
                //add call
            }
       }else{
        console.log('form has error')
       }
    }
    const options = [
        { value: 'true', label: 'True' },
        { value: 'false', label: 'False' },
      ];

    const handleSubcategory=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['is_sub_category']
            setFormError({...errors})
          setFormData({...formData,is_sub_category:selectedOption})
    } 
    const onChangeHandler=(e)=>{
        console.log('dsgfdsvgfsd', e)
        let errors= {...formError}
        delete errors[e.target.name]
        setFormError({...errors})
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleImage=(value)=>{
        let errors= {...formError}
        delete errors['image']
        setFormError({...errors})
        setFormData({...formData,image:value}) 
    }
    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption }, () =>
    //       console.log(`Option selected:`, this.state.selectedOption)
    //     );
    // };
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
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'Category' : 'Add New Category'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                  {/* <Formik
                    initialValues={{
                        name:data?.name ? data.name :'',
                        // name:data?.isSubCategory,

                        // image:data?.image ? data.image :'',
                        status:data?.status ? data.status :'',
                        is_sub_category:data?.isSubCategory ? data.isSubCategory :'',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        submitHandler(values)
                        // same shape as initial values
                        console.log("vLUES99",values);
                    }}
                    > */}
                    {/* {({ errors, touched }) => ( */}
                        {/* <Form> */}
                        <div className='p-3'>
                            <p className="form-label-title">Name </p>
                            <Input name="name" onChange={(e)=>onChangeHandler(e)} value={formData.name}/>
                            {formError?.name ? <div className='text-danger'>
                              {formError?.name}
                            </div> : null}

                       </div>

                       <div className='p-3'>
                      <p className="form-label-title">Image </p>
                        {/* <Field name="image" className="form-control" /> */}
                        {/* setImageData(value) */}
                        <div>
                            <UploadLogo
                                id={'image'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleImage(value) }
                                // disabled={field.disabled}
                                name='image'
                            />
                        </div>
                        {formError?.image ? (
                            <div className='text-danger'>{formError?.image}</div>
                        ) : null}
                        {/* {errors.image && touched.image  ? <div className='text-danger'>{errors.image}</div> : null} */}

                      </div>
                        <div className='p-3'>
                      <p className="form-label-title">Status </p>
                        <Input name="status" type="text" className="form-control" onChange={onChangeHandler} value={formData.status}/>
                        {formError.status ? <div className='text-danger'>{formError.status}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Is Subcategory</p>
                        
                        <Select
                            value={formData?.is_sub_category }
                            onChange={handleSubcategory}
                            options={options}
                            name="is_sub_category"
                        />
                        {formError?.is_sub_category ? <div className='text-danger'>{formError?.is_sub_category}</div> : null}

                       </div>
                        
                       
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit' onClick={formSubmitHandler}> {loader ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Submit"}
                            </Button>
                        </div>
                        {/* </Form> */}
                     {/* )}
                    </Formik> */}
                    </div>
                  
             
            
            </ModalBody>
            
          </Modal>
        </div>
      );
}

// export default CategoryAdd

const mapStateToProps = state =>{
   
    const {loader,categoryList}  = state.categoryReducer;
    return {categoryList};
  }
  export default connect(mapStateToProps,{AddCategory,UpdateCategory})(CategoryAdd);
  