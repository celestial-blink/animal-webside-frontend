import './NavBar.css';
import Logo from './logo.svg';
import {Link} from 'react-router-dom';

const NavBar = ()=>{

    const handleOpenMenu=(e)=>{
        e.preventDefault();
        let navigator=document.querySelector("#navbar-navigator");
            if (navigator.style.left==="0%"){
                navigator.parentElement.style.overflow="hidden";
                navigator.style.left="100%";
            }else{
                navigator.parentElement.style.overflow="initial";
                navigator.style.left="0%";
            }
    }
    window.onresize=(e)=>{
        let navigator=document.querySelector("#navbar-navigator");
        if (e.target.innerWidth>730){
            navigator.parentElement.style.overflow="initial";
            navigator.style.left="0%";
        }else{
            navigator.parentElement.style.overflow="hidden";
            navigator.style.left="100%";
        }
    }
    const handleCloseMenu=(e)=>{
        if (window.innerWidth<=730){
            let navigator=document.querySelector("#navbar-navigator");
            navigator.parentElement.style.overflow="hidden";
            navigator.style.left="100%";
        }
    }

    return (
        <>
            <nav className="wrapper-navbar">
                <span className="navbar-logo">
                    <Link to={"/"} >
                        <img src={Logo} alt="Logo"/>
                    </Link>
                </span>
                
                <span className="navbar-btn-menu">
                    <a href="menu" onClick={(e)=>{handleOpenMenu(e)}}><i className="fa fa-bars" aria-hidden="true"></i> </a>
                </span>
                
                <span className="navbar-navigator" id="navbar-navigator">
                    <span data-text="Inicio">
                        <Link to={"/"} onClick={(e)=>{handleCloseMenu(e);}}>Inicio</Link>
                    </span>

                    <span data-text="Todos">
                        <Link to="/all" onClick={(e)=>{handleCloseMenu(e);}}>Todos</Link>
                    </span>

                    <span data-text="Galeria">
                        <Link to="/galery" onClick={(e)=>{handleCloseMenu(e);}}>Galeria</Link>
                    </span>

                    <span data-text="Contacto">
                        <Link to="/contact" onClick={(e)=>{handleCloseMenu(e);}}>Contacto</Link>
                    </span>
                </span>
            </nav>
        </>
    );
};

export default NavBar;