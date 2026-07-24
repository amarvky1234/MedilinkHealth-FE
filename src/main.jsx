import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import "./index.css";
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FindDoctors from './features/finddoctors/FindDoctors.jsx';
import VideoConsult from './features/videoconsult/VideoConsult.jsx';
import LabTest from './features/labtests/LabTest.jsx';
import Surgeries from './features/surgeries/Surgeries.jsx';
import LoginAndSignup from './features/loginandsignup/LoginAndSignup.jsx';
import Login from './features/loginandsignup/Login.jsx';
import Register from './features/loginandsignup/Register.jsx'
import OTP from './features/loginandsignup/OTP.jsx';
import ConsultDoctor from './components/homepagecomponent/ConsultDoctor.jsx';
import MyDoctors from './features/finddoctors/MyDoctors.jsx';
import Medicines from './features/medicines/Medicines.jsx';
import ProductDescription from './features/medicines/ordermedicine/ProductDescription.jsx';
import DoctorDetails from './features/finddoctors/DoctorDetails.jsx';
import DoctorRegister from './features/loginandsignup/DoctorRegister.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
    },
    {
        path: "/find",
        element: <FindDoctors></FindDoctors>,
    },
    {
        path: "/video",
        element: <VideoConsult></VideoConsult>,
    },
    {
        path: "/lab",
        element: <LabTest></LabTest>,
    },
    {
        path: "/surgeries",
        element: <Surgeries></Surgeries>,
    },
    {
        path: "/medicine",
        element: <Medicines></Medicines>
    },
    
    {
        path: "/loginsignup",
        element: <LoginAndSignup></LoginAndSignup>,
    },
    
    {
        path: "/sendotp",
        element:<OTP></OTP>
    },
    {
        path: "/consult",
        element: <ConsultDoctor></ConsultDoctor>
    },
    {
        path: "/mydoctors",
        element: <MyDoctors />,
    },
    {
        path: "/productdesc",
        element: <ProductDescription />,
    },
    {
        path: "/doctor/:id",
        element: <DoctorDetails />
    },
    {
        path: "/doctor-register",
        element: <DoctorRegister />
    },
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <>
            <RouterProvider router={router} />
        </>
    </Provider>
)
