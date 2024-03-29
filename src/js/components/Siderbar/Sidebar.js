

import React,{useState} from 'react'
import { Link,useLocation  } from 'react-router-dom'

const Sidebar = () => {
    const location =useLocation ()
    const [showDropdown, setShowDropdown] = useState(false)
    console.log('location ', location )
  return (
    <div class="sidebar">
        <Link to='/' className={`${location.pathname=='/'?'active':''}`}><i className="fa fa-home"></i><span className='icon-text'>Home</span></Link>
        <Link to='/category' className={`${location.pathname=='/category'?'active':''}`}><i className="fa fa-th-large"></i><span className='icon-text'>Category</span></Link>
        <Link to='/sub-category' className={`${location.pathname=='/sub-category'?'active':''}`}><i className="fa fa-th-large"></i><span className='icon-text'>Sub Category</span></Link>
        <Link to='/post' className={`${location.pathname=='/post'?'active':''}`}><i className="fa fa-th-large"></i><span className='icon-text'>Post</span></Link>
        
        <Link to='/user-management' className={`${location.pathname=='/user-management'?'active':''}`}><i className="fa fa-users"></i><span className='icon-text'>User Management</span></Link>
        {/* <Link to='/book-mark' className={`${location.pathname=='/book-mark'?'active':''}`}><i className="fa fa-map-pin"></i><span className='icon-text'>Book Mark</span></Link>
        <Link to='/subscriber' className={`${location.pathname=='/subscriber'?'active':''}`}><i className="fa fa-user"></i><span className='icon-text'>Subscriber</span></Link> */}
        {/* <Link to='/about' className={`${location.pathname=='/about'?'active':''}`}><i className="fa fa-address-card"></i><span className='icon-text'>About Us</span></Link>
        <Link to='/contact' className={`${location.pathname=='/contact'?'active':''}`}><i className="fa fa-address-book"></i><span className='icon-text'>Contact Us</span></Link> */}
        <button class="dropdown-btn" onClick={()=>setShowDropdown(!showDropdown)}>
          <i className="fa fa-map-pin"></i>
          <span className='icon-text'>Location</span>
          <i class="fa fa-caret-down"></i>
       </button>
        <div className='dropdown-wrp' style={{display:showDropdown?'block':'none'}}>
        <Link to='/country' className={`${location.pathname=='/country'?'active':''}`}><i className="fa fa-users"></i><span className='icon-text'>Country</span></Link>
        <Link to='/state' className={`${location.pathname=='/state'?'active':''}`}><i className="fa fa-map-pin"></i><span className='icon-text'>State</span></Link>
        <Link to='/city' className={`${location.pathname=='/city'?'active':''}`}><i className="fa fa-user"></i><span className='icon-text'>City</span></Link>
        </div>

    {/* <a class="active" href="#home">Home</a>
    <a href="#news">News</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a> */}
    </div>
  )
}

export default Sidebar