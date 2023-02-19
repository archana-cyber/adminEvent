import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { AddCityAction,UpdateCityAction } from '../../actions/cityAction';
import { connect } from 'react-redux'
import Select from 'react-select';
import { GetCountryAction} from '../../actions/countryAction';
import { GetStateAction} from '../../actions/stateAction';
import UploadLogo from '../../components/UploadLogo';
import { isEmpty } from '../../../constant/helper';


const errorMsgs = {
    name:"Please enter a valid country name",
    countryId:'Please select one country',
    stateId:'Please select one state',
    isPopular:'Please select popularity',
    image:"Please select image"
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
        name:data.name,
        countryId:'',
        stateId:'',
        image:'',
        isPopular:''
    })

 
    const toggle=() =>{
        setmodal(!modal)
       
    }

    console.log('formData444',data,"formData", formData)
  
    console.log('data={isOpenDetail.data}',formData,"data",data)
    useEffect(()=>{
        if(Object.keys(data).length){
          console.log('data8899', data)
          let countryData,stateData,isPopularData
         
          if(data?.country)
          countryData={ value: data.country.id, label: data.country.name }
          //   setFormData({...formData,status: { value: 'true', label: 'True' }})
          if(data?.state)
          stateData={ value: data.state.id, label: data.state.name }

          
          if(data?.isPopular==true || data?.isPopular=='true')
          isPopularData={ value: 'true', label: 'True' }
          else
           isPopularData= { value: 'false', label: 'False' }
  
         setFormData({...formData,countryId:countryData,stateId:stateData,isPopular:isPopularData,image:data.image })
  
        }
    },[data])

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
                arrayData.push({label:item.name,value:item.id})
                })
                setGetState(arrayData)
        }
    
    },[props.stateList])  
   
    const handleImage=(value)=>{
        // let errors= {...formError}
        // delete errors['image']
        // setFormError({...errors})
        setFormData({...formData,image:value}) 
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
        if(errors['image']){
            delete errors['image']
            isFormValid=true
        }
        console.log('errors444', errors)
        setFormError({...errors})
        return isEmpty(errors) ? true : false;
    }
    console.log('formError',errorMsg, formError)
    const formSubmitHandler=()=>{
       if(validateAll()){
       let finalData;
       finalData={...formData,stateId:formData.stateId.value,countryId:formData.countryId.value,isPopular:formData.isPopular.value}
       let generateFormData = new FormData();
       // generateFormData.append('name',formData['name'])
       for (let type  in formData){
           console.log('formData44434',type,formData )
           if(type!='countryId' && type!='isPopular' && type!='stateId')
            generateFormData.append(type,formData[type])
       }
       generateFormData.append('countryId',formData['countryId'].value)
       generateFormData.append('stateId',formData['stateId'].value)
       generateFormData.append('isPopular',formData['isPopular'].value)

            if(data?.id){
                if(typeof formData['image'] !='object'){
                    generateFormData.delete('image')
                }
                props.UpdateCityAction(data.id,generateFormData,(res)=>{
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                    window.location.reload()
                 }
                })
                // toggleEvent()P
                // edit api call
            }else{
                props.AddCityAction(generateFormData,(res)=>{
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
                  
                      
                      
                       <div className='p-3 '>
                        <p className="form-label-title">Country</p>
                        
                        <Select
                            value={formData?.countryId }
                            onChange={handleCountry}
                            options={getCountry}
                            name="countryId"
                            className='zindex-for-select1'
                        />
                        {formError?.countryId ? <div className='text-danger'>{formError?.countryId}</div> : null}

                       </div>
                    
                       <div className='p-3 '>
                        <p className="form-label-title">State</p>
                        
                        <Select
                            value={formData?.stateId }
                            onChange={handleState}
                            options={getState}
                            name="stateId"
                            className='zindex-for-select2'
                        />
                        {formError?.stateId ? <div className='text-danger'>{formError?.stateId}</div> : null}

                       </div>

                       <div className='p-3'>
                            <p className="form-label-title">City Name </p>
                            <Input name="name" onChange={(e)=>onChangeHandler(e)} value={formData.name}/>
                            {formError?.name ? <div className='text-danger'>
                              {formError?.name}
                            </div> : null}

                       </div>
                        
                       <div className='p-3 status-wrp' >
                      <p className="form-label-title">Is Popular </p>
                        <Select
                            value={formData?.isPopular }
                            onChange={handleIsPopular}
                            options={options}
                            name="isPopular"
                        />
                        {formError.isPopular ? <div className='text-danger'>{formError.isPopular}</div> : null}
                        </div>

                        <div className='p-3'>
                      <p className="form-label-title">Image </p>
                        {/* <Field name="image" className="form-control" /> */}
                        {/* setImageData(value) */}
                        <div>
                            <UploadLogo
                                id={'image'}
                                logoUrl={formData.image}
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
  