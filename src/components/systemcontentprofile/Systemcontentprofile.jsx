import {useState,useEffect} from 'react';

import imagen1 from './profile.svg';
import './Systemcontentprofile.css';
import Userform from '../userform/Userform';


const Systemcontentprofile = ({dataUser,setDataUser,handleManageLoader,handleSession}) => {

    const [dataChangePassword,setDataChangePassword]=useState({
        action:"change-password",
        password:"",
        repeat:"",
        currentpassword:"",
        _id:dataUser._id
    });
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
    };

    const handleShowPassword=(e)=>{
        e.preventDefault();
        let input=e.currentTarget.previousElementSibling;
        if(input.getAttribute('type')==="password"){
            input.setAttribute('type','text');
        }else{
            input.setAttribute('type','password');
        }
    };

    const handleSetDataPassword=(e)=>{
        let val=e.target.getAttribute('name');
        switch(val){
            case "password":
                setDataChangePassword({
                    ...dataChangePassword,
                    ...{password:e.target.value}
                });
                break;
            case "repeat":
                setDataChangePassword({
                    ...dataChangePassword,
                    ...{repeat:e.target.value}
                });
                break;
            case "currentpassword":
                setDataChangePassword({
                    ...dataChangePassword,
                    ...{currentpassword:e.target.value}
                });
                break;
            default:
                break;
        }
    };

    const updatePasswordToServer=async()=>{
        let change=await fetch('/user',{
            method:'POST',
            body:JSON.stringify(dataChangePassword),
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json'
            }
        });
        return await change.json();
    };

    const handleSubmitFormChangePassword=(e)=>{
        e.preventDefault();
        let resp=e.target.previousElementSibling;
        let arr=Object.values(dataChangePassword);
        if(!arr.includes('')){
            handleManageLoader(true);
            updatePasswordToServer().then(res=>{
                if(res.state){
                    resp.classList.remove('error');
                    resp.textContent="success";
                }else{
                    resp.classList.add('error');
                    resp.textContent=res.info;
                }
            }).catch(err=>{
                resp.classList.add('error');
                resp.textContent="error";
                console.log(err);
            }).finally(()=>{
                setTimeout(()=>{
                    resp.textContent="";
                },8000);
                handleManageLoader(false);
            })

        }
    }

    useEffect(()=>{
        handleManageLoader(false);
        handleSession();
    },[handleManageLoader,handleSession]);

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
                    <Userform mdataUser={dataUser} msetDataUser={setDataUser} handleManageLoader={handleManageLoader}/>
                    <div className="wrapper-change-password">
                        <p className="response"></p>
                        <form onSubmit={handleSubmitFormChangePassword}>
                            <legend>change your password</legend>
                            <span>
                                <input type="password" name="password" placeholder="new password" onChange={handleSetDataPassword} />
                                <a href="show" onClick={handleShowPassword}>
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </a>
                            </span>
                            <span>
                                <input type="password" name="repeat" placeholder="repeat new password" onChange={handleSetDataPassword} />
                                <a href="show" onClick={handleShowPassword}>
                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                </a>
                            </span>
                            <span>
                                <input type="password" name="currentpassword" placeholder="current password" onChange={handleSetDataPassword} />
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