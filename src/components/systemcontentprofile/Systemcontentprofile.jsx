import {useState,useEffect} from 'react';

import imagen1 from './profile.svg';
import './Systemcontentprofile.css';
import Userform from '../userform/Userform';


const Systemcontentprofile = ({dataUser,handleManageLoader}) => {

    const [openMore,setOpenMore]=useState(true);

    const handleOpenMore=(e)=>{
        e.preventDefault();
        let container=document.querySelector("#container-forms");
        if(openMore){
            container.style.height="100%";
        }else{
            container.style.height="0%";    
        }
        setOpenMore(!openMore);
    }

    const handleShowPassword=(e)=>{
        e.preventDefault();
        let input=e.currentTarget.previousElementSibling;
        if(input.getAttribute('type')==="password"){
            input.setAttribute('type','text');
        }else{
            input.setAttribute('type','password');
        }
    }

    useEffect(()=>{
        handleManageLoader(false);
    },[handleManageLoader]);

    return (
        <>
            <div className="wrapper-systemcontent-profile">
                <div className="profile-information">
                <img src={imagen1} alt="imagen-profile" />
                    <h4>user name</h4>       <p>{dataUser.user}</p>
                    <h4>full name</h4>       <p>{dataUser.fullname}</p>
                    <h4>e-mail</h4>          <p>{dataUser.email}</p>
                    <h4>creation date</h4>  <p>{dataUser.date}</p>
                </div>
                <a href="more" onClick={handleOpenMore} className="more">edit profile {(openMore)?<i className="fa fa-caret-down" aria-hidden="true"></i>:<i className="fa fa-caret-up" aria-hidden="true"></i>}</a>
                <div className="container-form" id="container-forms">
                    <Userform mdataUser={dataUser}/>
                    <div className="wrapper-change-password">
                        <p className="response">response server</p>
                        <form action="">
                            <legend>change your password</legend>
                            <span>
                                <input type="password" name="" placeholder="new password"/>
                                <a href="show" onClick={handleShowPassword}>
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </a>
                            </span>
                            <span>
                                <input type="password" name="" placeholder="repeat new password"/>
                                <a href="show" onClick={handleShowPassword}>
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </a>
                            </span>
                            <span>
                                <input type="password" name="" placeholder="current password"/>
                                <a href="show" onClick={handleShowPassword}>
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </a>
                            </span>
                            <input type="submit" value="SAVE" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Systemcontentprofile;