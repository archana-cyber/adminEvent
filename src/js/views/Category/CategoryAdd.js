import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AddCategory,UpdateCategory } from '../../actions/categoryAction';
import { connect } from 'react-redux'


const CategoryAdd = (props) => {

    const {toggleEvent,showModalEvent,data={},loader=false}=props
    const [modal, setmodal] = useState(false)
    const [formError, setFormError] = useState({})
    const [formData, setFormData] = useState({
        name:"",
        // image:"",
        status:"",
        is_sub_category:"",
    })
   
    const toggle=() =>{
        setmodal(!modal)
       
    }

   
    console.log('data={isOpenDetail.data}', data)
    const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    status: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    // image :  Yup.string()
    // .min(2, 'Too Short!')
    // .max(50, 'Too Long!')
    // .required('Required'),
   
    is_sub_category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    });
    
    const submitHandler=(values)=>{
        const payload={}
        let error=[];
    //   if(formData.is_sub_category){
        if(data?.id){
            props.UpdateCategory(data.id,values)
            // edit api call
           }else{
            props.AddCategory(values)
            toggleEvent()
            //add call
           }
    //   } else{
    //     setFormError({is_sub_category:"This field is required"})
    //   } 
      
       console.log('values', values)
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
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'Category' : 'Add New Category'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                  <Formik
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
                    >
                    {({ errors, touched }) => (
                        <Form>
                        <div className='p-3'>
                            <p className="form-label-title">Name </p>
                            <Field name="name" className="form-control"/>
                            {errors.name && touched.name ? (
                                <div className='text-danger'>{errors.name}</div>
                            ) : null}
                       </div>

                       {/* <div className='p-3'>
                      <p className="form-label-title">Image </p>
                        <Field name="image" className="form-control" />
                        {errors.image && touched.image ? (
                            <div className='text-danger'>{errors.image}</div>
                        ) : null}
                      </div> */}
                        <div className='p-3'>
                      <p className="form-label-title">Status </p>
                        <Field name="status" type="text" className="form-control"/>
                        {errors.status && touched.status ? <div className='text-danger'>{errors.status}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Is Subcategory</p>
                        {/* <select name="is_sub_category" className="form-control" value={data?.is_sub_category ? data.is_sub_category :''}>
                            <option value=''>Select</option>

                            <option value="true" selected>true</option>
                            <option value="false" >false</option>
                            
                        </select> */}
                        <Field as='select' name="is_sub_category" type="text" className="form-control">
                        <option value=''>Select</option>

                        <option value="true" selected={true}>true</option>
                        <option value="false" >false</option>
                        </Field>
                        {errors.is_sub_category && touched.is_sub_category  ? <div className='text-danger'>{errors.is_sub_category}</div> : null}
                        </div>
                        
                       
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit'> {loader ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Submit"}
                            </Button>
                        </div>
                        </Form>
                    )}
                    </Formik>
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
  