import React,{useEffect,useState} from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute({component:Component, ...rest}) {
    //const currentUser=useSelector(({signup})=>signup.currentUser)
     const [user, setUser] = useState(false)
    // console.log('authDatdata', localStorage.getItem( "authData"))
    // let userData=localStorage.getItem('authData')
    // let user=false
    useEffect(()=>{
        console.log('first',localStorage.getItem('authData') )
        if(localStorage.getItem('authData')){
            const data=JSON.parse(atob( localStorage.getItem( "authData")))
            // console.log('first',data,Object.keys(data).length)
             setUser(Object.keys(data).length)
        }
    },[localStorage.getItem('authData')])
   
    
  console.log('user', user)
    const user1=localStorage.getItem('authData')?true:false
//    const user=false
  return (
    <Route
      {...rest}
      render={props => {
        return user1? <Component {...props} /> : <Redirect to='/login' />

        // return user?.emailVerified ? <Component {...props} /> : <Redirect to='/signin' />
    }}>
    </Route>
  )
}