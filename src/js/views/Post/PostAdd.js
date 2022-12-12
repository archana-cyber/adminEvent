import React,{useState} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const PostAdd = ({toggleEvent,showModalEvent,data={}}) => {

    const [modal, setmodal] = useState(false)
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
                        <Form>
                        <div className='p-3'>
                            <p className="form-label-title">Title </p>
                            <Field name="title" className="form-control"/>
                            {errors.title && touched.title ? (
                                <div className='text-danger'>{errors.title}</div>
                            ) : null}
                       </div>

                       <div className='p-3'>
                        <p className="form-label-title">Description</p>
                        <Field name="description" type="text" className="form-control"/>
                        {errors.description && touched.description ? <div className='text-danger'>{errors.description}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Media</p>
                        <Field name="media" type="text" className="form-control"/>
                        {errors.media && touched.media ? <div className='text-danger'>{errors.media}</div> : null}
                        </div>

                       <div className='p-3'>
                      <p className="form-label-title">multiple_Image </p>
                        <Field name="multiple_image" className="form-control" />
                        {errors.multiple_image && touched.multiple_image ? (
                            <div className='text-danger'>{errors.multiple_image}</div>
                        ) : null}
                      </div>
                        <div className='p-3'>
                      <p className="form-label-title">City </p>
                        <Field name="city" type="text" className="form-control"/>
                        {errors.city && touched.city ? <div className='text-danger'>{errors.city}</div> : null}
                        </div>


                        <div className='p-3'>
                        <p className="form-label-title">Map Links</p>
                        <Field name="map_link" type="text" className="form-control"/>
                        {errors.map_link && touched.map_link ? <div className='text-danger'>{errors.map_link}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Travel Awaits</p>
                        <Field name="travel_awaits" type="text" className="form-control"/>
                        {errors.travel_awaits && touched.travel_awaits ? <div className='text-danger'>{errors.travel_awaits}</div> : null}
                        </div>

                        
                        <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Field name="category_id" type="text" className="form-control"/>
                        {errors.category_id && touched.category_id ? <div className='text-danger'>{errors.category_id}</div> : null}
                        </div>
                        <div className='p-3'>
                        <p className="form-label-title">sub Category</p>
                        <Field name="subcategory_id" type="text" className="form-control"/>
                        {errors.subcategory_id && touched.subcategory_id ? <div className='text-danger'>{errors.subcategory_id}</div> : null}
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

export default PostAdd