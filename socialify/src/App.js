
import './App.css';
import Left from './components/Left/Left';
import Mid from './components/Mid/Mid';
import Right from './components/Right/Right';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Profile from './components/Profile/Profile';
import HashTag from './components/Hashtag/HashTag';
import TrendingMid from './components/TrendingMid/TrendingMid';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import FullPost from './components/FullPost/FullPost';

function App() {
  return (
<>
<Router>

<div className="mainPage">
<div className="left">
<Left/>
</div>



<div className="mid">
<Routes>
{/* Main Page */}
<Route exact path='/' element={<Mid/>}/>
<Route path ='/profile/:profileId' element ={<Profile/>}/>
<Route path='/hashtag/:taghash' element={<HashTag/>} />
<Route path ='/trending' element={<TrendingMid/>}/>
<Route path='/register' element={<Register/>} />
<Route path='/login' element={<Login/>}/>
<Route path='/post/:post_id' element={<FullPost/>} />
</Routes>
</div>




<div className="right">
<Right/>
</div>

</div>
</Router>
</>
  );
}

export default App;
