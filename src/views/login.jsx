import './stylesheets/login.css';

import FormLogin from "../components/formlogin/FormLogin";
import FormRegister from "../components/formregister/FormRegister";
import MinFooter from '../components/minfooter/MinFooter';

import Imagen1 from './images/image1.jpg';
import Logo from './images/logo.svg';

const Login =()=>{
    return (
        <>
            <div className="header-shape">
                <img src={Imagen1} alt="backgroundimage"/>
            </div>
            <div className="content-login">
                <FormLogin />
                <FormRegister />
                <a href="/">
                    <img src={Logo} alt="logo"/>
                </a>
                <img src={Logo} alt="logo"/>
            </div>
            <MinFooter />
        </>
    );
};

export default Login;