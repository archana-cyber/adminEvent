import React,{useState,useEffect} from 'react'
import { Spinner, Button, Modal, Input, ModalBody, ModalHeader,FormGroup ,Label,Table} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import FormData from "form-data"
import { AddPostAction,UpdatePostAction } from '../../actions/postAction'; 
import { connect } from 'react-redux'
import UploadLogo from '../../components/UploadLogo';


const errorMsgs = {
    title:"Please enter a valid title",
    description:"Please enter a valid description",
    image:"Please enter a valid image",
    multiple_image:"Please select image ",
    city:"Please enter a valid city",
    mapLink:"Please enter a valid link",
    travelAwaits:"Please enter a valid tavel link",
    categoryId:"Please enter a valid category",
    subcategoryId:"Please enter a valid sub category",
    }

const PostAdd = (props) => {
 
    const {toggleEvent,showModalEvent,data={},loader=false} =props
    const [modal, setmodal] = useState(false)
    const [getCategory, setGetCategory] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [cityList, setCityList] = useState([])

    const [errorMsg, setErrorMsg] = useState('')

    const [formError, setFormError] = useState({})
    const [formData, setFormData] = useState({
        title:data.title,
        description:data.description,
        image:data.media,
        multiple_image:data.multipleImage,
        city:'',
        mapLink:data.mapLink,
        travelAwaits:data.travelAwaits,
        categoryId:"",
        subcategoryId:"",

    })
   
    useEffect(()=>{
        if(Object.keys(data).length){
          console.log('data8899', data)
          let categoryData,subCategoryData,cityData
          if(data?.categoryId){
              let tempdata=props.categoryList.find(item=>item.id==data.categoryId)
             if(tempdata)
              categoryData={ value: tempdata.id, label: tempdata.name }
          }
          if(data?.subcategoryId){
            let tempdata=props.subcategoryList.find(item=>item.id==data.subcategoryId)
            console.log('tempdata',props.subcategoryList, tempdata)
            if(tempdata)
             subCategoryData={ value: tempdata.id, label: tempdata.name }
          }

          if(data?.categoryId){
            let tempdata=props.categoryList.find(item=>item.id==data.categoryId)
           if(tempdata)
            categoryData={ value: tempdata.id, label: tempdata.name }
          }

          if(data?.city){
            let tempdata=props.cityList.find(item=>item.name==data.city)
           if(tempdata)
            cityData={ value: tempdata.id, label: tempdata.name }
          }
          //  setFormData({...formData,isSubCategory: { value: 'true', label: 'True' }})
         
  
         setFormData({...formData,categoryId:categoryData,subcategoryId:subCategoryData,city:cityData })
  
        }
      },[data])

    const toggle=() =>{
        setmodal(!modal)
       
    }
    useEffect(()=>{
        if(props.cityList.length){
            let arrayData=[];
            let listdata=props.cityList 
            // let listdata=dumData
            Object.keys(listdata).length>0 && listdata.map((item,index)=>{
            arrayData.push({label:item.name,value:item.id})
            })
            setCityList(arrayData)
       }
    },[props.cityList])

    useEffect(()=>{
        if(props.subcategoryList.length){
             let arrayData=[];
             let listdata=props.subcategoryList 
             // let listdata=dumData
             Object.keys(listdata).length>0 && listdata.map((item,index)=>{
             arrayData.push({label:item.name,value:item.id})
             })
             setSubCategoryList(arrayData)
        }
        
     },[props.subcategoryList])

     useEffect(()=>{
        if(props.categoryList.length){
             let arrayData=[];
             let listdata=props.categoryList 
             // let listdata=dumData
             Object.keys(listdata).length>0 && listdata.map((item,index)=>{
             arrayData.push({label:item.name,value:item.id})
             })
             setGetCategory(arrayData)
        }
        
     },[props.categoryList])
    //  const validateAll=()=>{
    //     let errors={},isFormValid=true;
    //     let fileds={...formData}
    //     for (let type  in fileds){
    //         console.log('filedsif',fileds, formData[type])
    //        if(!fileds[type] && type!='image' && type!='status'){
    //         console.log('fileds[type]',type,fileds, fileds[type])
    //         isFormValid=false
    //           errors[type]=errorMsgs[type]
    //        }
    //     }
    //     console.log('errors444', errors)
    //     setFormError({...errors})
    //     return isFormValid
    // }
    const validateAll=()=>{
        let errors={},isFormValid=true;
        let fileds={...formData}
        for (let type  in fileds){
            console.log('filedsif',fileds, formData[type])
           if(!fileds[type] ){
            console.log('fileds[type]',type,fileds, fileds[type])
            isFormValid=false
              errors[type]=errorMsgs[type]
           }
        }
        // if(!fileds['multiple_image'] && errors['multiple_image']){
        //     isFormValid=true
        //     delete errors['multiple_image']
        // }
        console.log('errors444', errors)
        setFormError({...errors})
        return isFormValid
    }
    console.log('formError', formError)

    const handleSubCategory=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['subcategoryId']
            setFormError({...errors})
            setFormData({...formData,subcategoryId:selectedOption})
    } 
    const handleCategory=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['categoryId']
            setFormError({...errors})
          setFormData({...formData,categoryId:selectedOption})
    } 
    const handleSelectOption=(selectedOption)=>{
        //   formData()
            let errors= {...formError}
            delete errors['city']
            setFormError({...errors})
          setFormData({...formData,'city':selectedOption})
    } 

    const formSubmitHandler=()=>{
        console.log('validateAll', validateAll(),formError)
       if(validateAll()){

        let generateFormData = new FormData();
        // generateFormData.append('name',formData['name'])
        for (let type  in formData){
            console.log('formData44434',type,formData )
            if(type!='subcategoryId' && type!='categoryId' && type!='city')
             generateFormData.append(type,formData[type])
        }
        generateFormData.append('city',formData['city'].label)
        
        if(formData['subcategoryId'])
        generateFormData.append('subcategoryId',formData['subcategoryId'].value)
        
        generateFormData.append('categoryId',formData['categoryId'].value)

         console.log('generateFormData333',formData, generateFormData)
         
            if(data?.id){
                

                if(typeof formData.image !='object'){
                    generateFormData.delete('image')
                }
                console.log("formData.multiple_image", typeof formData.multiple_image ,formData.multiple_image.name)
                if(typeof formData.multiple_image && !formData.multiple_image.name){
                    generateFormData.delete('multiple_image')
                }
                props.UpdatePostAction(data.id,generateFormData,(res)=>{
                    if(res.status==500){
                       setErrorMsg(res.message)
                    }else{
                       toggleEvent()
                    }
                   })
                // edit api call
            }else{
                console.log('if inside else')

                props.AddPostAction(generateFormData,(res)=>{
                    console.log('res44', res)
                 if(res.status==500){
                    setErrorMsg(res.message)
                 }else{
                    toggleEvent()
                 }
                })
                // props.AddCategory(generateFormData)
                // props.AddPostAction(generateFormData)
                // toggleEvent()
                //add call
            }
       }else{
        console.log('form has error')
       }
    }
    const handleImage=(value)=>{
        let errors= {...formError}
        delete errors['image']
        setFormError({...errors})
        setFormData({...formData,image:value}) 
    }
    const handleMultiImage=(value)=>{
        let errors= {...formError}
        delete errors['multiple_image']
        setFormError({...errors})
        setFormData({...formData,multiple_image:value}) 
    }

    console.log('data={isOpenDetail.data}', data)
  
    
    const submitHandler=(values)=>{
       if(data?.id){
        // edit api call
       }else{
        //add call
       }
       console.log('values', values)
    }
    const onChangeHandler=(e)=>{
        console.log('dsgfdsvgfsd', e)
        let errors= {...formError}
        delete errors[e.target.name]
        setFormError({...errors})
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    console.log('formdata555444',subCategoryList,data, formData)
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
                  <h5 class="modal-title">{Object.keys(data).length > 0 ? 'Update Post' : 'Add New Post'}</h5>
                  <p  class="modal-title" onClick={toggleEvent}>X</p>
                </div>
                  <div >
                 
                        <div className='p-3'>
                            <p className="form-label-title">Title </p>
                            <Input name="title" className="form-control" value={formData.title} onChange={(e)=>onChangeHandler(e)}/>
                            {formError.title ? (
                                <div className='text-danger'>{formError.title}</div>
                            ) : null}
                       </div>

                       <div className='p-3'>
                        <p className="form-label-title">Description</p>
                        <Input name="description" type="text" className="form-control" value={formData.description} onChange={(e)=>onChangeHandler(e)}/>
                        {formError.description ? <div className='text-danger'>{formError.description}</div> : null}
                        </div>

                        <div className='p-3'>
                          <p className="form-label-title" >City </p>
                          <Select
                            value={formData?.city }
                            onChange={handleSelectOption}
                            options={cityList}
                            name="city"
                            className='zindex-for-select1'
                        />

                        {formError.city ? <div className='text-danger'>{formError.city}</div> : null}
                        </div>


                        <div className='p-3'>
                        <p className="form-label-title">Map Links</p>
                        <Input name="mapLink" type="text" className="form-control" value={formData.mapLink} onChange={(e)=>onChangeHandler(e)}/>
                        {formError.mapLink ? <div className='text-danger'>{formError.mapLink}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Travel Awaits</p>
                        <Input name="travelAwaits" type="text" className="form-control" value={formData.travelAwaits} onChange={(e)=>onChangeHandler(e)}/>
                        {formError.travelAwaits ? <div className='text-danger'>{formError.travelAwaits}</div> : null}
                        </div>

                        <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Select
                            value={formData?.categoryId }
                            onChange={handleCategory}
                            options={getCategory}
                            name="categoryId"
                            className='zindex-for-select2'
                        />
                        {formError?.categoryId ? <div className='text-danger'>{formError?.categoryId}</div> : null}

                       </div>
                        
                       <div className='p-3'>
                        <p className="form-label-title">Subcategory</p>
                        
                        <Select
                            value={formData?.subcategoryId }
                            onChange={handleSubCategory     }
                            options={subCategoryList}
                            name="subcategoryId"
                            className='zindex-for-select3'
                        />
                        {formError?.subcategoryId ? <div className='text-danger'>{formError?.subcategoryId}</div> : null}

                       </div>

                        <div className='p-3'>
                        <p className="form-label-title">image</p>
                        {/* <Input name="image" type="file" className="form-control" onChange={(e)=>onChangeHandler(e)}/> */}
                        <div>
                            <UploadLogo
                                id={'image'}
                                logoUrl={formData.image}
                                setSelectedLogoImage={(value) =>handleImage(value) }
                                // disabled={field.disabled}
                                name='image'
                            />
                        </div>
                        {formError.image ? <div className='text-danger'>{formError.image}</div> : null}
                        </div>

                        

                       <div className='p-3'>
                      <p className="form-label-title">Multiple Image </p>
                            <UploadLogo
                                id={'image'}
                                logoUrl={''}
                                setSelectedLogoImage={(value) =>handleMultiImage(value) }
                                // disabled={field.disabled}
                                name='multiple_image'
                            />
                        {/* <Input name="multiple_image" className="form-control" /> */}
                        {formError.multiple_image ? (
                            <div className='text-danger'>{formError.multiple_image}</div>
                        ) : null}
                      </div>
                       



                       

                      
                        {/* <div className='p-3'>
                        <p className="form-label-title">Category</p>
                        <Input name="categoryId" type="text" className="form-control"/>
                        {formError.categoryId ? <div className='text-danger'>{formError.categoryId}</div> : null}
                        </div>
                        <div className='p-3'>
                        <p className="form-label-title">sub Category</p>
                        <Input name="subcategoryId" type="text" className="form-control"/>
                        {formError.subcategoryId ? <div className='text-danger'>{formError.subcategoryId}</div> : null}
                        </div> */}
                         {errorMsg ? <div className='text-danger pl-3'>{errorMsg}</div> : null}
                        {/* <button type="submit">Submit</button> */}
                        <div className="text-right mt-2 ml-2">
                            <Button type='submit' onClick={formSubmitHandler}> {loader ? (
                                <div style={{ padding: '0px 6px' }}><Spinner color="light" size="sm" /></div>
                            ) : "Submit"}
                            </Button>
                        </div>
                        {/* </Form>
                    )}
                    </Formik> */}
                    </div>
                  
             
            
            </ModalBody>
            
          </Modal>
        </div>
      );
}


const mapStateToProps = state =>{
   
    const {categoryList}  = state.categoryReducer;
    const {subcategoryList}  = state.subcategoryReducer;
    const {cityList}  = state.cityReducer;


    return {categoryList,subcategoryList,cityList};
  }
  export default connect(mapStateToProps,{AddPostAction,UpdatePostAction})(PostAdd);
  