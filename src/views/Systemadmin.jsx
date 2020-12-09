import {useState} from 'react';

import './stylesheets/Systemadmin.css';
import Logo from './images/logo.svg';
import Laptop from './images/laptop.svg';
import Modal from '../components/modal/modal';
import Systemcontentanimal from '../components/systemcontentanimal/Systemcontentanimal';
import Systemcontentimage from '../components/systemcontentimage/Systemcontentimage';
import Systemcontentknow from '../components/systemcontentknow/Systemcontentknow';
import Systemcontentmain from '../components/systemcontentmain/Systemcontentmain';
import Systemcontentprofile from '../components/systemcontentprofile/Systemcontentprofile';
import MLoader from '../components/MLoader/MLoader';

const Systemadmin=()=>{

    const [showModal,setShowModal]=useState(false);
    const [showLoader,setShowLoader]=useState(false);
    const [nameComponent,setNameComponent]=useState("home");
    

    const handleManageLoader=(show=true)=>{
        setShowLoader(show);
    }

    const handleSelectComponent=(e)=>{
        e.preventDefault();
        let name=e.currentTarget.getAttribute('href');
        setNameComponent(name);
    }
    
    const selectComponent=(component)=>{
        switch (component){
            case "home":
                return <Systemcontentmain setNameComponent={setNameComponent}/>
            case "animal":
                return <Systemcontentanimal setShowModal={setShowModal}/>
            case "images":
                return <Systemcontentimage setShowModal={setShowModal}/>
            case "know":
                return <Systemcontentknow setShowModal={setShowModal}/>;
            case "profile":
                return <Systemcontentprofile/>
            default :
                return null;
        }
    }
    
    return (
        <>
        {(showLoader)?<MLoader/>:null}
        {(showModal)?<Modal namecomponent={nameComponent} setShowModal={setShowModal}/>:null}
            <div className="wrapper-system">
                <div className="system-navbar">
                    <a href="/" className="system-logo">
                        <img src={Logo} alt="logo"/>
                    </a>
                    <a href="profile" className="system-imagen" onClick={handleSelectComponent}>
                        <img src={Laptop} alt="imagen"/>
                        <h4>username</h4>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a href="close-session" className="system-logout"><i className="fa fa-sign-out" aria-hidden="true"></i> log-out</a>

                    <nav className="system-content">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <a href="home" onClick={handleSelectComponent}>home</a>

                        <i className="fa fa-paw" aria-hidden="true"></i>
                        <a href="animal" onClick={handleSelectComponent}>Animal</a>
                        
                        <i className="fa fa-question" aria-hidden="true"></i>
                        <a href="know" onClick={handleSelectComponent}>Did you know?</a>
                        
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                        <a href="images" onClick={handleSelectComponent}>Images</a>
                    </nav>

                    <footer className="system-footer">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magni, molestias deserunt quasi id quis.
                    </footer>

                </div>
                <div className="system-main-content">
                    {selectComponent(nameComponent)}
                </div>
            </div>
        </>
    );
}

export default Systemadmin;