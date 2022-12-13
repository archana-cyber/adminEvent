import React,{useState} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AddSubCategory,UpdateSubCategory } from '../../actions/subcategoryAction';
import { connect } from 'react-redux'


const SubCategoryAdd = (props) => {

    const {toggleEvent,showModalEvent,data={},loader=false}=props

    const [modal, setmodal] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        image:"",
        status:"",
        is_video:"",
        category_id:""
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
    image :  Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
   
    is_video: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

    category_id: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    });
    
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
                  <Formik
                    initialValues={{
                        name:data?.name ? data.name :'',
                        image:data?.image ? data.image :'',
                        status:data?.status ? data.status :'',
                        is_video:data?.is_video ? data.is_video :'',
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
                        <Form>
                        <div className='p-3'>
                            <p className="form-label-title">Name </p>
                            <Field name="name" className="form-control"/>
                            {errors.name && touched.name ? (
                                <div className='text-danger'>{errors.name}</div>
                            ) : null}
                       </div>

                       <div className='p-3'>
                      <p className="form-label-title">Image </p>
                        <Field name="image" className="form-control" />
                        {errors.image && touched.image ? (
                            <div className='text-danger'>{errors.image}</div>
                        ) : null}
                      </div>
                        <div className='p-3'>
                      <p className="form-label-title">Status </p>
                        <Field name="status" type="text" className="form-control"/>
                        {errors.status && touched.status ? <div className='text-danger'>{errors.status}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Is Video</p>
                        <Field name="is_video" type="text" className="form-control"/>
                        {errors.is_video && touched.is_video ? <div className='text-danger'>{errors.is_video}</div> : null}
                        </div>
                        
                        <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Field name="category_id" type="text" className="form-control"/>
                        {errors.category_id && touched.category_id ? <div className='text-danger'>{errors.category_id}</div> : null}
                        </div>
                        
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit'> {false ? (
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




const mapStateToProps = state =>{
   
    const {loader,subcategoryList}  = state.categoryReducer;
    return {subcategoryList,loader};
  }
export default connect(mapStateToProps,{AddSubCategory,UpdateSubCategory})(SubCategoryAdd);
  