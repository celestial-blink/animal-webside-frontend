import {useState} from 'react';

import './stylesheets/login.css';

import FormLogin from "../components/formlogin/FormLogin";
import FormRegister from "../components/formregister/FormRegister";
import MinFooter from '../components/minfooter/MinFooter';

import MLoader from '../components/MLoader/MLoader';
import Imagen1 from './images/image1.jpg';
import Logo from './images/logo.svg';
import Imagen2 from './images/image4.jpg';

const Login =()=>{
    const [showLoader,setShowLoader]=useState(false);

    return (
        <>  
            {(showLoader)?<MLoader/>:null}
            <div className="header-shape">
                <img src={Imagen1} alt="backgroundimage"/>
            </div>
            <div className="content-login">
                <FormLogin setShowLoader={setShowLoader}/>
                <FormRegister setShowLoader={setShowLoader}/>
                <a href="/">
                    <img src={Logo} alt="logo"/>
                </a>
                <img src={Imagen2} alt="logo"/>
            </div>
            <MinFooter />
        </>
    );
};

export default Login;