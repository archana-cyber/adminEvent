import React from 'react'
// import logo from "../../../images/eventlogo1.png"
import { Link,useHistory } from 'react-router-dom'

const Header = () => {
    const history=useHistory()
    const logoutHandler=()=>{
       localStorage.removeItem('authData')
        //history.push('/login')
    }
  return (
    <div className='navbar-container'>

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          {/* <Link class="navbar-brand" to="/">Conlux </Link> */}
        </div>
        <ul class="nav navbar-nav">
          <li onClick={logoutHandler}><Link to='/login'>Logout</Link></li>
        
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Header