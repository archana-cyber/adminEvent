import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { UpdatePasswordAction } from '../../actions/authAction'
import { connect } from 'react-redux'

const errorMsgs = {
  "old_password":"Please enter a valid password",
  "new_password":"Please enter a valid password",
  "confirm_password":"This field is required"
  }

const UpdatePassword = (props) => {

  const [formError, setFormError] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    old_password:"",
    new_password:"",
    confirm_password:""
  })

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
  if(fileds['confirm_password'] && fileds['confirm_password']!=fileds['new_password']){
    errors['confirm_password']='Confirm password is not matching with new password'
    isFormValid=false
  }
  if(fileds['new_password'] && fileds['new_password'].length<8){
    errors['new_password']='Password length must be 8 character'
    isFormValid=false
  }
  console.log('errors444', errors)
  setFormError({...errors})
  return isFormValid
}

const formSubmitHandler=()=>{
  if(validateAll()){

   let generateFormData={...formData}
    delete generateFormData['confirm_password']

   
       // if(data?.id){
       //     props.UpdateSubCategory(data.id,generateFormData)
       //     toggleEvent()
       //     // edit api call
       // }else{
       //     props.AddSubCategory(generateFormData)
       //     toggleEvent()
       //     //add call
       // }
      
         props.UpdatePasswordAction(generateFormData,(res)=>{
          console.log('res UpdatePasswordAction', res )
          if(res.status==500){
             if(typeof res.message == 'object')
              setFormError({...res.message})
             else
              setErrorMsg(res.message)
          }else{
            alert('password updated successfully')
            setFormData({old_password:"",new_password:"",confirm_password:""})
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
  return (
    <div className="row">
        <div className="col-6 col-sm-12 col-md-12 col-lg-8 col-xl-8">
         <h3 className='mb-5'>Update Password</h3>
         <div className=''>
            <p className="form-label-title">Old Password </p>
            <Input name="old_password" className="form-control" onChange={onChangeHandler} value={formData.old_password}/>
            {formError.old_password  ? (
                <div className='text-danger'>{formError.old_password}</div>
            ) : null}
           </div>
           <div className='mt-3'>
            <p className="form-label-title">New Password </p>
            <Input name="new_password" className="form-control" onChange={onChangeHandler} value={formData.new_password}/>
            {formError.new_password  ? (
                <div className='text-danger'>{formError.new_password}</div>
            ) : null}
           </div>
           <div className='mt-3'>
            <p className="form-label-title">Confirm Password </p>
            <Input name="confirm_password" className="form-control" onChange={onChangeHandler} value={formData.confirm_password}/>
            {formError.confirm_password  ? (
                <div className='text-danger'>{formError.confirm_password}</div>
            ) : null}
           </div>

            
           {errorMsg ? <div className='text-danger '>{errorMsg}</div> : null}
                        
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ">
                            <Button type='submit' onClick={formSubmitHandler}> {false ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Submit"}
                            </Button>
                        </div>
        </div>
      
      </div>
    
  )
}




const mapStateToProps = state =>{
   
  const {loader,categoryList}  = state.categoryReducer;
  return {categoryList,loader};
}
export default connect(mapStateToProps,{UpdatePasswordAction})(UpdatePassword);
