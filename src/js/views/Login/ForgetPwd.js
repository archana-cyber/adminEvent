import React, { Component } from 'react'
import "../../../styles/login.css"
import "../../../styles/col.css"
import { ForgetPasswordAction } from '../../actions/authAction'
import { connect } from 'react-redux'


class ForgetPwd extends Component {
    state = {
        data: {
          email: "",
        
          // isDenied: false,
        },
        isShow: false,
        errors: {},
      };

      handlePwd = () => {
        this.setState({ isShow: !this.state.isShow });
      };

      handleChange=(e)=>{
        console.log('e', e,e.target.value)
        // this.setState({})
        this.setState({errors:{...this.state.errors,[e.target.name]:""},data:{...this.state.data,[e.target.name]:e.target.value}})
      }
      formLogin=(e)=>{
         e.preventDefault();
         //const history=useHistory()

        const {data}=this.state
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let error={}
        for(let item in data){
           if(item=='email'){
              if(!data[item]){
                error.email="Email field is required"
              }else if(!re.test(data[item])){
                error.email="Please enter a valid email"
              }
            }
        }
        // if(!email){
        //   error.email="Email field is required"
        // }else if(!password){
        //   error.email="Password is required"
        // }else if(!re.test(email)){
        //   error.email="Please enter a valid email"
        // }
        console.log('this.props', this.props)
        this.setState({errors:error});
        if(!Object.keys(error).length){
           console.log('submit')
           this.props.ForgetPasswordAction(data)
        //    localStorage.setItem("authData",btoa(JSON.stringify(data)))
          //  this.props.history.push('/verify-email')
        }
      }
  render() {

    console.log('this.state.data', this.state)
    const { errors, isDenied, isShow } = this.state;
    const {loader,forgotpswd={}}=this.props 
    const {message=''}=forgotpswd
    console.log('forgotpswd555', forgotpswd)
    return (
      <div className='login-container'>
          <div className=" h-100 login-page">
            <div className="row h-100 login-box">
              <div className="col-md-6 left-side h-100">
                <div className="avibra_login ">
                  <div className="avibra__inner">
                    <h1>Enter your email</h1>
                    <div className="login_form">
                      <div className="main__label">
                        <div className="for-appearance input__label">
                          <input type="text" name="email" placeholder='Email' value={this.state.data.email} onChange={this.handleChange}/>
                          {/* <InputWithLabel
                            placeholder={"Email"}
                            type="email"
                            name="email"
                            value={this.state.data.email}
                            onChange={this.handleChange}
                          /> */}
                          <div
                            className={`error text-danger `}
                          >
                            <div className="error__text pl-3 mb-4">
                             {errors.email}
                            </div>
                            {/* <div className="error__msg">lorem</div> */}
                          </div>
                          <div
                            className={`error text-danger `}
                          >
                            <div className="error__text">
                             {message}
                            </div>
                          
                          </div>
                        </div>
                      </div>
    
                   
                      {/* <ErrorMessage errors={errors.login} /> */}
                      <button
                        className="flex-center mt-3"
                        type="submit"
                       onClick={this.formLogin}
                      >
                          Submit
                        {/* {loading ? (
                          <ReactLoading
                            type={"spin"}
                            color={"white"}
                            style={{
                              fill: "white",
                              width: " 20px",
                              margin: " 0 auto",
                              height: "30px"
                            }}
                          />
                        ) : (
                          "Log in"
                        )} */}
                      </button>
                    </div>
                    {/* <div className="login_link">
                                        <a>Forgot Password</a>
                                        <a>Sign Up</a>
                                    </div> */}
                  </div>

                </div>
               
              </div>
              <div className="col-md-6 right-side">
                <div className="icon__svg">
                 <h1>Logo</h1>
                  {/* <img src={logoavibra} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}


const mapStateToProps = state =>{

  const {forgotpswd,loader}  = state.authReducer;

  return {forgotpswd,loader};
}
export default connect(mapStateToProps,{ForgetPasswordAction})(ForgetPwd);
