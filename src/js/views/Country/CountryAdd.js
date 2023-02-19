import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { AddCountryAction,UpdateCountryAction } from '../../actions/countryAction';
import { connect } from 'react-redux'


const errorMsgs = {
    "name":"Please enter a valid country name",
   
    }
const CountryAdd = (props) => {

    const {toggleEvent,showModalEvent,data={},countryLoader=false}=props
    const [modal, setmodal] = useState(false)
    // const [,] = useState(second)
    const [formError, setFormError] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    const [formData, setFormData] = useState({
        name:data.label,
    })

 
    const toggle=() =>{
        setmodal(!modal)
       
    }

    console.log('formData444',data,"formData", formData)
  
    console.log('data={isOpenDetail.data}',formData,"data",data)
    
   
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
    console.log('formError',errorMsg, formError)
    const formSubmitHandler=()=>{
       if(validateAll()){
       let finalData;
       finalData={...formData}
        
            if(data?.value){
                props.UpdateCountryAction(data.value,finalData,(res)=>{
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                    window.location.reload()
                 }
                })
                // toggleEvent()
                // edit api call
            }else{
                props.AddCountryAction(finalData,(res)=>{
                    console.log('res44', res)
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                    window.location.reload()

                 }
                })
                //add call
            }
       }else{
        console.log('form has error')
       }
    }
   
  
 
    const onChangeHandler=(e)=>{
        console.log('dsgfdsvgfsd', e)
        let errors= {...formError}
        delete errors[e.target.name]
        setFormError({...errors})
        setFormData({...formData,[e.target.name]:e.target.value})
    }
  
    
    return (
        <div>
         
          <Modal isOpen={showModalEvent} toggle={toggleEvent} size='xl' backdrop={false}>
            
            <ModalBody>
                 <div className='event-header'>
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'Country' : 'Add New Country'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                  
                        <div className='p-3'>
                            <p className="form-label-title">Country Name </p>
                            <Input name="name" onChange={(e)=>onChangeHandler(e)} value={formData.name}/>
                            {formError?.name ? <div className='text-danger'>
                              {formError?.name}
                            </div> : null}

                       </div>

                    
                        
                       {errorMsg ? <div className='text-danger pl-3'>{errorMsg}</div> : null}
                       
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit' onClick={formSubmitHandler}> {countryLoader ? (
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

// export default CountryAdd

const mapStateToProps = state =>{

   
    const {countryLoader,countryList}  = state.countryReducer;
    return {countryList,countryLoader};
  }
  export default connect(mapStateToProps,{AddCountryAction,UpdateCountryAction})(CountryAdd);
  