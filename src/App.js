import './App.css';
import GlobalstateProvider from './context/GlobalstateContext';
import { Login,Dashboard,ProjectDetails,AssignmentDetails, Profile, Engineers } from './pages';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  return(
    <>
    <GlobalstateProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/api/dashboard' element={<Dashboard/>}/>
      <Route path="/api/projects/:id" element={<ProjectDetails/>}/>
      <Route path="/api/assignments/:id" element={<AssignmentDetails/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/engineers" element={<Engineers/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </GlobalstateProvider>
    
    </>
  )
}

export default App;
