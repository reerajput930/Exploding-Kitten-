import {Route,Routes} from "react-router-dom"
import Front from "./Front"
import Home from "./Home"
import ScoreDashboard from "./ScoreDashboard"

export default function(){
  
  return(
    <>

    <Routes>
      <Route  path="/gamestart" element={<Home/>}/>
      <Route  path="/" element={<Front/>}/>
      <Route  path="/end" element={<ScoreDashboard/>}/>
 
    </Routes>

    </>

  )
}