import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { GetProfileDataAction,UpdateProfileDataAction } from '../../actions/authAction'
import { connect } from 'react-redux'

const errorMsgs = {
  "name":"Please enter a valid name",
  "new_password":"Please enter a valid password",
  "confirm_password":"This field is required"
  }

const Profile = (props) => {

  const [formError, setFormError] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const {profileData={}}=props
  const [formData, setFormData] = useState({
    name:profileData.name,
    email:profileData.email,
    status:profileData.status
  })

  useEffect(()=>{
    if(!Object.keys(props.profileData).length){
        props.GetProfileDataAction()
        // setFormData({
        //     name:props.profileData.name,
        //     email:props.profileData.email,
        //     status:props.profileData.status
        // })
    }
  },[])
  useEffect(()=>{
    if(Object.keys(props.profileData).length)
      setFormData({
            name:props.profileData.name,
            email:props.profileData.email,
            status:props.profileData.status
        })
  },[props.profileData])
  const onChangeHandler=(e)=>{
    console.log('pswd', e)
    let errors= {...formError}
    delete errors[e.target.name]
    setFormError({...errors})
    setFormData({...formData,[e.target.name]:e.target.value})
}

const validateAll=()=>{
  let errors={},isFormValid=true;
  let fileds={...formData}
  for (let type  in fileds){
     if(!fileds[type]){
      isFormValid=false
        errors[type]=errorMsgs[type]
     }
  }
//   if(fileds['confirm_password'] && fileds['confirm_password']!=fileds['new_password']){
//     errors['confirm_password']='Confirm password is not matching with new password'
//     isFormValid=false
//   }
//   if(fileds['new_password'] && fileds['new_password'].length<8){
//     errors['new_password']='Password length must be 8 character'
//     isFormValid=false
//   }
  console.log('errors444', errors)
  setFormError({...errors})
  return isFormValid
}

    const formSubmitHandler=()=>{
    if(validateAll()){

    let generateFormData={name:formData.name}
    // delete generateFormData['confirm_password']


        // if(data?.id){
        //     props.UpdateSubCategory(data.id,generateFormData)
        //     toggleEvent()
        //     // edit api call
        // }else{
        //     props.AddSubCategory(generateFormData)
        //     toggleEvent()
        //     //add call
        // }
        
            props.UpdateProfileDataAction(generateFormData,(res)=>{
            console.log('res UpdateProfileDataAction', res.status )
            if(res.status==500){
                if(typeof res.message == 'object')
                setFormError({...res.message})
                else
                setErrorMsg(res.message)
            }else{
            alert('name updated successfully')
            // setFormData({})
            setErrorMsg('')
            //  toggleEvent()
            }
            })
            // toggleEvent()
            // edit api call
        

    }else{
    console.log('form has error')
    }
    }

    console.log('formData', formData)
  return (
    <div className="row">
       {props.loader ? <div className='col-12'>
        <div style={{ display:"flex",justifyContent:"center" }}><Spinner color="red" size="sm" /></div>

        </div> :
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
         <h3 className='mb-5'>My Profile</h3>
         <div className=''>
            <p className="form-label-title">Name </p>
            <Input name="name" className="form-control" onChange={onChangeHandler} value={formData.name}/>
            {formError.name  ? (
                <div className='text-danger'>{formError.name}</div>
            ) : null}
           </div>
           <div className='mt-3'>
            <p className="form-label-title">Email </p>
            <Input name="email" className="form-control"  value={formData.email} disabled/>
           
           </div>
           <div className='mt-3'>
            <p className="form-label-title">Status </p>
            <Input name="status" className="form-control"  value={formData.status} disabled/>
           
           </div>
          
            
           {errorMsg ? <div className='text-danger '>{errorMsg}</div> : null}
                        
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ">
                            <Button type='submit' onClick={formSubmitHandler}> {false ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Update"}
                            </Button>
                        </div>
        </div>}
      
      </div>
    
  )
}




const mapStateToProps = state =>{
   
  const {profileData,loader}  = state.authReducer;
  return {profileData,loader};
}
export default connect(mapStateToProps,{GetProfileDataAction,UpdateProfileDataAction})(Profile);
