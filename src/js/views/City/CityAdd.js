import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { AddCityAction,UpdateCityAction } from '../../actions/cityAction';
import { connect } from 'react-redux'
import Select from 'react-select';
import { GetCountryAction} from '../../actions/countryAction';
import { GetStateAction} from '../../actions/stateAction';



const errorMsgs = {
    "name":"Please enter a valid country name",
   
    }
   
const options = [
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' },
    ]; 

const CityAdd = (props) => {

    const {toggleEvent,showModalEvent,data={},cityLoader=false}=props
    const [modal, setmodal] = useState(false)
    const [getCountry, setGetCountry] = useState([])
    const [getState, setGetState] = useState([])

    // const [,] = useState(second)
    const [formError, setFormError] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    const [formData, setFormData] = useState({
        name:data.label,
        countryId:'',
        stateId:''
    })

 
    const toggle=() =>{
        setmodal(!modal)
       
    }

    console.log('formData444',data,"formData", formData)
  
    console.log('data={isOpenDetail.data}',formData,"data",data)
    
    useEffect(()=>{
        // props.AddCountry()
        if(!props?.countryList?.length)
         props.GetCountryAction()

        if(!props?.stateList?.length)
         props.GetStateAction()
      },[])

    useEffect(()=>{
        if(props.countryList.length){
                let arrayData=[];
                let listdata=props.countryList 
                // let listdata=dumData
                Object.keys(listdata).length>0 && listdata.map((item,index)=>{
                arrayData.push({label:item.label,value:item.value})
                })
                setGetCountry(arrayData)
        }
    
    },[props.countryList])  
    
    useEffect(()=>{
        if(props.stateList.length){
                let arrayData=[];
                let listdata=props.stateList 
                // let listdata=dumData
                Object.keys(listdata).length>0 && listdata.map((item,index)=>{
                arrayData.push({label:item.label,value:item.value})
                })
                setGetState(arrayData)
        }
    
    },[props.stateList])  
   
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
                props.UpdateCityAction(data.value,finalData,(res)=>{
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                 }
                })
                // toggleEvent()
                // edit api call
            }else{
                props.AddCityAction(finalData,(res)=>{
                    console.log('res44', res)
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                 }
                })
                //add call
            }
       }else{
        console.log('form has error')
       }
    }
   
    const handleCountry=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['countryId']
            setFormError({...errors})
          setFormData({...formData,countryId:selectedOption})
    } 
     
    const handleState=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['stateId']
            setFormError({...errors})
          setFormData({...formData,stateId:selectedOption})
    } 
 
    const onChangeHandler=(e)=>{
        console.log('dsgfdsvgfsd', e)
        let errors= {...formError}
        delete errors[e.target.name]
        setFormError({...errors})
        setFormData({...formData,[e.target.name]:e.target.value})
    }
  
    const handleIsPopular=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['isPopular']
            setFormError({...errors})
          setFormData({...formData,isPopular:selectedOption})
    }
    
    return (
        <div>
         
          <Modal isOpen={showModalEvent} toggle={toggleEvent} size='xl' backdrop={false}>
            
            <ModalBody>
                 <div className='event-header'>
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'City' : 'Add New City'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                  
                        <div className='p-3'>
                            <p className="form-label-title">City Name </p>
                            <Input name="name" onChange={(e)=>onChangeHandler(e)} value={formData.name}/>
                            {formError?.name ? <div className='text-danger'>
                              {formError?.name}
                            </div> : null}

                       </div>
                      
                       <div className='p-3'>
                        <p className="form-label-title">Country</p>
                        
                        <Select
                            value={formData?.countryId }
                            onChange={handleCountry}
                            options={getCountry}
                            name="countryId"
                        />
                        {formError?.countryId ? <div className='text-danger'>{formError?.countryId}</div> : null}

                       </div>
                    
                       <div className='p-3'>
                        <p className="form-label-title">State</p>
                        
                        <Select
                            value={formData?.stateId }
                            onChange={handleState}
                            options={getState}
                            name="stateId"
                        />
                        {formError?.stateId ? <div className='text-danger'>{formError?.stateId}</div> : null}

                       </div>
                        
                       <div className='p-3 status-wrp' style={{zIndex:999}}>
                      <p className="form-label-title">Is Popular </p>
                        <Select
                            value={formData?.isPopular }
                            onChange={handleIsPopular}
                            options={options}
                            name="isPopular"
                        />
                        {formError.isPopular ? <div className='text-danger'>{formError.isPopular}</div> : null}
                        </div>

                       {errorMsg ? <div className='text-danger pl-3'>{errorMsg}</div> : null}
                       
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit' onClick={formSubmitHandler}> {cityLoader ? (
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

// export default CityAdd

const mapStateToProps = state =>{
    const {cityLoader,cityList}  = state.cityReducer;
    const {countryList}  = state.countryReducer;
    const {stateList}  = state.stateReducer;
    return {countryList,cityLoader,cityList,stateList};
  }
  export default connect(mapStateToProps,{GetStateAction,AddCityAction,GetCountryAction,UpdateCityAction})(CityAdd);
  