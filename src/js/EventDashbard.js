import React from 'react'
import PrivateRoute from './PrivateRoute'
import Sidebar from './components/Siderbar/Sidebar';
import Header from './components/Siderbar/Header';
import Home from './views/Home/Home';
import ContactUs from "./views/ContactUs/ContactUs";
import AboutUs from "./views/AboutUs/AboutUs";
import BookMark from "./views/BookMark/BookMark";
import Category from "./views/Category/Category";
import SubCategory from "./views/SubCategory/SubCategory";
import Post from "./views/Post/Post";
import Country from './views/Country/Country';
import Subscriber from "./views/Subscriber/Subscriber"
import UserManagement from "./views/UserManagement/UserManagement";
import State from './views/State/State';
import City from './views/City/City';
import UpdatePassword from './views/Profile/UpdatePassword';
import Profile from './views/Profile/Profile';

const EventDashbard = () => {
  return (
    <div>
          <Sidebar/>
          <Header/>
          <div class="content">
           <PrivateRoute exact path='/' component={Home}/>
           {/* <PrivateRoute exact path='/contact' component={ContactUs}/>
           <PrivateRoute exact path='/about' component={AboutUs}/> */}
           {/* <PrivateRoute exact path='/book-mark' component={BookMark}/> */}
           <PrivateRoute exact path='/category' component={Category}/>
           <PrivateRoute exact path='/post' component={Post}/>
           <PrivateRoute exact path='/sub-category' component={SubCategory}/>

           <PrivateRoute exact path='/country' component={Country}/>
           <PrivateRoute exact path='/state' component={State}/>
           <PrivateRoute exact path='/city' component={City}/>
           <PrivateRoute exact path='/updatepassword' component={UpdatePassword}/>
           <PrivateRoute exact path='/profile' component={Profile}/>



           {/* <PrivateRoute exact path='/subscriber' component={Subscriber}/> */}
           <PrivateRoute exact path='/user-management' component={UserManagement}/>
          </div> 
    </div>
  )
}

export default EventDashbard