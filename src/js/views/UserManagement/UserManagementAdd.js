import React,{useState} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserManagementAdd = ({toggleEvent,showModalEvent,data={}}) => {

    const [modal, setmodal] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        profile_image:"",
        email:"",
        gender:"",
        country:"",
        city:"",
        password:"",
        social_media:""
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
    gender: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    profile_image :  Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    country: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    city: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    social_media:Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')

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
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'User Management' : 'Add New User'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                  <Formik
                    initialValues={{
                        name:data?.name ? data.name :'',
                        profile_image:data?.profile_image ? data.profile_image :'',
                        email:data?.email ? data.email :'',
                        gender:data?.gender ? data.gender :'',
                        country:data?.country ? data.country :'',
                        city:data?.city ? data.city :'',
                        password:data?.password ? data.password :'',
                        social_media:data?.social_media ? data.social_media :'',
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
                      <p className="form-label-title">Profile Image </p>
                        <Field name="profile_image" className="form-control" />
                        {errors.profile_image && touched.profile_image ? (
                            <div className='text-danger'>{errors.profile_image}</div>
                        ) : null}
                      </div>
                        <div className='p-3'>
                      <p className="form-label-title">Email </p>
                        <Field name="email" type="email" className="form-control"/>
                        {errors.email && touched.email ? <div className='text-danger'>{errors.email}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Gender</p>
                        <Field name="gender" type="gender" className="form-control"/>
                        {errors.gender && touched.gender ? <div className='text-danger'>{errors.gender}</div> : null}
                        </div>
                        
                        <div className='p-3'>
                        <p className="form-label-title">Country</p>
                        <Field name="country" type="country" className="form-control"/>
                        {errors.country && touched.country ? <div className='text-danger'>{errors.country}</div> : null}
                       </div>                      
 
                       <div className='p-3'>
                        <p className="form-label-title">City</p>
                        <Field name="city" type="city" className="form-control"/>
                        {errors.city && touched.city ? <div className='text-danger'>{errors.city}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Password</p>
                        <Field name="password" type="password" className="form-control"/>
                        {errors.password && touched.password ? <div className='text-danger'>{errors.password}</div> : null}
                       </div>

                       <div className='p-3'>
                        <p className="form-label-title">Social Media</p>
                        <Field name="social_media" type="social_media" className="form-control"/>
                        {errors.social_media && touched.social_media ? <div className='text-danger'>{errors.social_media}</div> : null}
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

export default UserManagementAdd