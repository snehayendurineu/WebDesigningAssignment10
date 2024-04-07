import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './component/Layout'
import Home from './component/Home/Home'
import About from './component/About/About'
import Jobs from './component/Jobs/Jobs'
import Contact from './component/Contact/Contact'
import Company from './component/Company/Company'
import Login from './component/Login'
import store from './component/store';
import { Provider } from 'react-redux'; 
import Employee from './component/admin/Employee/Employee';
import CreateJobs from './component/admin/CreateJobs/CreateJobs';


function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/jobs" element={<Jobs/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/company" element={<Company/>} />
            <Route path="/employee" element={<Employee/>} />
            <Route path="/createjob" element={<CreateJobs/>} />
        </Route>
       </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
