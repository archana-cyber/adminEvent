
import React from 'react'
// import Login from "../js/views/Login/Login"
import "../styles/app.css"
import { Provider } from 'react-redux'


import Routes from './Routes'
import store from './store/store'

 const App = () => {
  return (
    <div>
      <Provider store={store}>
          <Routes/>
      </Provider>
    </div>
  )
}

export default App;