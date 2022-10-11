import React from 'react'
import PrivateRoute from './PrivateRoute'
import Sidebar from './components/Siderbar/Sidebar';
import Header from './components/Siderbar/Header';
import Home from './views/Home/Home';
import ContactUs from "./views/ContactUs/ContactUs";
import AboutUs from "./views/AboutUs/AboutUs";
import BookMark from "./views/BookMark/BookMark";
import Category from "./views/Category/Category";
import Subscriber from "./views/Subscriber/Subscriber"
import UserManagement from "./views/UserManagement/UserManagement";

const EventDashbard = () => {
  return (
    <div>
          <Sidebar/>
          <Header/>
          <div class="content">
           <PrivateRoute exact path='/' component={Home}/>
           <PrivateRoute exact path='/contact' component={ContactUs}/>
           <PrivateRoute exact path='/about' component={AboutUs}/>
           <PrivateRoute exact path='/book-mark' component={BookMark}/>
           <PrivateRoute exact path='/category' component={Category}/>
           <PrivateRoute exact path='/subscriber' component={Subscriber}/>
           <PrivateRoute exact path='/user-management' component={UserManagement}/>
          </div> 
    </div>
  )
}

export default EventDashbard