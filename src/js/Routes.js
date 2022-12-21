import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import Login from './views/Login/Login';
import PrivateRoute from './PrivateRoute';
import EventDashbard from './EventDashbard';
import VerifyEmail from './views/Login/VerifyEmail';
import ForgetPwd from './views/Login/ForgetPwd';

const Routes = () => {
    return <Router>

        
        <Switch>
        {/* <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/" component={Dashboard} />
           <Route exact path='/verify-email' component={VerifyEmail}/> */}
           <Route exact path='/login' component={Login}/>
           <Route exact path='/verify-email' component={VerifyEmail}/>
           <Route exact path='/forget-password' component={ForgetPwd}/>


           <PrivateRoute  path="/" component={EventDashbard} />

          
        </Switch>
    </Router>
}

export default Routes