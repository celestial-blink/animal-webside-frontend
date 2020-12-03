import {useState} from 'react';

import './stylesheets/index.css';
import NavBar from '../components/NavBar/NavBar';
import AsideMenu from '../components/asidemenu/AsideMenu';
import Footer from '../components/footer/Footer';
import MLoader from '../components/MLoader/MLoader';

const Layout =({children})=> {
    const [showLoader,setShowLoader]=useState(false);
    return(
        <>
            {(showLoader)?<MLoader/>:null}
            <NavBar/>
            <div className="container">
                <div className="content">
                    {children}
                    <AsideMenu/>
                    <Footer/>
                </div>
            </div>
        </>
    )
};

export default Layout;