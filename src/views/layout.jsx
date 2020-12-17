

import './stylesheets/index.css';
import NavBar from '../components/NavBar/NavBar';
import AsideMenu from '../components/asidemenu/AsideMenu';
import Footer from '../components/footer/Footer';

const Layout =({children})=> {
    return(
        <>
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