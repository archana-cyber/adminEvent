

import React from 'react'
// import Login from "../js/views/Login/Login"
import "../styles/app.css"

// import Sidebar from "./components/Siderbar/Sidebar"
// import Home from './views/Home'
// import Header from './components/Siderbar/Header'
import Routes from './Routes'

 const App = () => {
  return (
    <div>
      {/* <Login/> */}
        
         {/* <Sidebar/> */}
          {/* <Header/> */}
        
            
           
            <Routes/>

            {/* <div class="row mt-5">
              <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                <h1 class="Profiles-title">Schedule Details</h1>
              </div>
              <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{paddingTop: "10px", paddingRight: "35px",textAlign: "right"}}>
                <button type="button" class="secondary-btn btn btn-secondary">Create Schedule</button>
              </div>
            </div>

            <Home/> */}

         
    </div>
  )
}

export default App;