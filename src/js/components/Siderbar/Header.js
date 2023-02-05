import React,{useState} from 'react'
// import logo from "../../../images/eventlogo1.png"
import { Link,useHistory } from 'react-router-dom'

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)    
    const logoutHandler=()=>{
       localStorage.removeItem('authData')
        //history.push('/login')
    }
    const toggle=()=>{
       setDropdownOpen(!dropdownOpen)
    }
  return (
    <div className='navbar-container'>

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          {/* <Link class="navbar-brand" to="/">Conlux </Link> */}
        </div>
        <div className="collapse navbar-collapse">
                                        <ul className="nav nav-pills">
                                           
                                            <li className="nav-item dropdown" >
                                                <div className="nav-link dropdown-toggle" onClick={()=>toggle()} role="button">icon</div>
                                                <div className="dropdown-menu" style={{display: dropdownOpen ? 'block' : 'none'}}>
                                                    <Link className="dropdown-item" onClick={()=>toggle()} to={"/agent/dashboard/profile"}>Profile</Link>
                                                    <Link className="dropdown-item" onClick={()=>toggle()} to={"/agent/dashboard/updatepassword"}>Update Password</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <Link className="dropdown-item" onClick={logoutHandler} style={{cursor:'pointer'}}>Sign out</Link>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                    </div>
        <ul class="nav navbar-nav">
          {/* <li onClick={logoutHandler}><Link to='/login'>Logout</Link></li> */}
          <li className="nav-item dropdown" >
                                                <div className="nav-link" style={{cursor:"pointer"}} onClick={()=>toggle()} role="button">
                                                  <i class="fas fa-user-circle" style={{fontSize: "30px"}}></i> 
                                                </div>
                                                <div className="dropdown-menu" style={{display: dropdownOpen ? 'block' : 'none',position:'absolute',left:"-143px"}}>
                                                    <Link className="dropdown-item" onClick={()=>toggle()} to={"/profile"}>Profile</Link>
                                                    <Link className="dropdown-item" onClick={()=>toggle()} to={"/updatepassword"}>Update Password</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <Link className="dropdown-item" onClick={logoutHandler} style={{cursor:'pointer'}}>Sign out</Link>
                                                </div>
                                            </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Header