import {useEffect} from 'react';

import './Systemcontentmain.css';
import imagen1 from './profile.svg';
import imagen2 from './animal.svg';
import imagen3 from './know.svg';
import imagen4 from './image.svg';

const Systemcontentmain=({setNameComponent,handleManageLoader})=>{
    const handleGetNameComponent=(e)=>{
        e.preventDefault();
        setNameComponent(e.target.getAttribute('href'));
    }
    useEffect(()=>{
        handleManageLoader(false);
    },[handleManageLoader])
    return (
        <>
         <div className="wrapper-systemcontent-main">
                <h1>ADMINISTRACIÓN  DE LA PÁGINA WEB</h1>
                <div className="main-profile">
                    <img src={imagen1} alt="user-imagen"/>
                    <h2>my profile</h2>
                    <p>edit and change password</p>
                    <a href="profile" onClick={handleGetNameComponent}>go</a>
                </div>

                <div className="main-profile">
                    <img src={imagen2} alt="animal-imagen"/>
                    <h2>manage animal</h2>
                    <p>edit and delete</p>
                    <a href="animal" onClick={handleGetNameComponent}>go</a>
                </div>    

                <div className="main-profile">
                    <img src={imagen3} alt="know-imagen"/>
                    <h2>manage know</h2>
                    <p>edit and delete</p>
                    <a href="know" onClick={handleGetNameComponent}>go</a>
                </div>             

                <div className="main-profile">
                    <img src={imagen4} alt="images-imagen"/>
                    <h2>manage images</h2>
                    <p>edit  and delete</p>
                    <a href="images" onClick={handleGetNameComponent}>go</a>
                </div>    
         </div>
        </>
    );
}

export default Systemcontentmain;