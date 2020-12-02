import './stylesheets/notfound.css';

import Imagen1 from './images/error404.svg';

const NotFound = () => {
    return (
        <>
            <div className="wrapper-notfound animate__animated animate__bounceInLeft">
                <h2 className="notfound-text1">ERROR</h2>
                <h2 className="notfound-text2">404</h2>
                <img src={Imagen1} alt="imagen" />
                <h2 className="notfound-text3">NOT FOUND</h2>
            </div>
        </>
    );
};

export default NotFound;