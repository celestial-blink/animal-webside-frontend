import './stylesheets/Systemadmin.css';
import Logo from './images/logo.svg';
import Laptop from './images/laptop.svg';
// import Systemcontentlist from '../components/systemcontentlist/Systemcontentlist';
import Systemcontentcard from '../components/systemcontentcard/Systemcontentcard';

const Systemadmin=()=>{
    return (
        <>
            <div className="wrapper-system">
                <div className="system-navbar">
                    <a href="/" className="system-logo">
                        <img src={Logo} alt="logo"/>
                    </a>
                    <a href="/profile" className="system-imagen">
                        <img src={Laptop} alt="imagen"/>
                        <h4>username</h4>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a href="close-session" className="system-logout"><i className="fa fa-sign-out" aria-hidden="true"></i> log-out</a>

                    <nav className="system-content">
                        <i className="fa fa-paw" aria-hidden="true"></i>
                        <a href="Animal">Animal</a>
                        
                        <i className="fa fa-question" aria-hidden="true"></i>
                        <a href="know">Did you know?</a>
                        
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                        <a href="Images">Images</a>
                    </nav>

                    <footer className="system-footer">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magni, molestias deserunt quasi id quis.
                    </footer>

                </div>
                <div className="system-main-content">
                    <Systemcontentcard/>
                </div>
            </div>
        </>
    );
}

export default Systemadmin;