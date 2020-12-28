import {useState} from 'react';

import './stylesheets/login.css';

import FormLogin from "../components/formlogin/FormLogin";
import FormRegister from "../components/formregister/FormRegister";
import MinFooter from '../components/minfooter/MinFooter';

import MLoader from '../components/MLoader/MLoader';
import Imagen1 from './images/image1.jpg';
import Logo from './images/logo.svg';

const Login =()=>{
    const [showLoader,setShowLoader]=useState(false);

    return (
        <>  
            {(showLoader)?<MLoader/>:null}
            <div className="header-shape">
                <img src={Imagen1} alt="backgroundimage"/>
            </div>
            <a href="/" className="login-logo">
                    <img src={Logo}  alt="logo"/>
            </a>
            <div className="content-login">
                <div className="content-signup">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{'height': '100%','width': '100%'}}><path d="M208.08,0.00 C178.04,41.94 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z" style={{'strok': 'none','fill': '#13c500'}}></path></svg>
                    <FormRegister setShowLoader={setShowLoader}/>
                </div>
                <div className="content-signin">
                    <h1>WELCOME!</h1>
                    <h5>enter your username or password to continue</h5>
                    <FormLogin setShowLoader={setShowLoader}/>
                </div>
            </div>
            
            <MinFooter />
        </>
    );
};

export default Login;