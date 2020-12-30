import {useState,useEffect} from 'react';

import './Userform.css';
const Userform=({mdataUser,msetDataUser,handleManageLoader})=>{
    const [dataUser,setDataUser]=useState({
        _id:"",
        user:"",
        email:"",
        fullname:"",
        action:"update"
    });
    const handleSetData=(e)=>{
        let val=e.target.value;
        switch(e.target.name){
            case "user":
                setDataUser({
                    ...dataUser,
                    ...{user:val}
                });
                break;
            case "fullname":
                setDataUser({
                    ...dataUser,
                    ...{fullname:val}
                });
                break;
            case "email":
                    setDataUser({
                        ...dataUser,
                        ...{email:val}
                    });
                    break;
            default:
                break;
        
        }
    }

    const sendDataFromServer=async()=>{
        let sendData=await fetch(`/user/${dataUser._id}`,{
            method:'PUT',
            credentials:'same-origin',
            body:JSON.stringify(dataUser),
            headers:{
                'Content-Type':'application/json'
            }
        });
        return await sendData.json();
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        let element=e.target.previousElementSibling;
        if(
            dataUser._id!=="" &&
            dataUser.action!=="" &&
            dataUser.email!=="" &&
            dataUser.fullname!=="" &&
            dataUser.user!==""
        ){
            handleManageLoader(true);
            sendDataFromServer().then(res=>{
                if(res.state){
                    element.classList.remove('error');
                    element.textContent="success";
                    msetDataUser({
                        _id:res.info._id,
                        user:res.info.user,
                        email:res.info.email,
                        fullname:res.info.fullname,
                        date:res.info.date
                    });
                }else{
                element.classList.add('error');
                element.textContent=res.info;
                }
            }).catch(err=>{
                element.classList.add('error');
                element.textContent="se produjo un error.";
                console.log(err);
            }).finally(()=>{
                setTimeout(() => {
                    element.textContent="";
                }, 7000);
                handleManageLoader(false);
            });
        }
    };

    useEffect(()=>{
        if(mdataUser!==undefined || JSON.stringify(mdataUser)!=='{}'){
            setDataUser({
                _id:mdataUser._id,
                user:mdataUser.user,
                email:mdataUser.email,
                fullname:mdataUser.fullname,
                action:"update"  
            });
        }
    },[mdataUser]);

    return (
        <>
        <div className="wrapper-form-user">
            <p className="response"></p>
            <form method="post" onSubmit={handleFormSubmit}>
                <legend>my personal information</legend>
                <input type="text" name="user" value={dataUser.user} onChange={handleSetData} placeholder="ingrese usuario, no debe tener espacios"/>
                <input type="text" name="fullname" value={dataUser.fullname} onChange={handleSetData} placeholder="ingrese nombre completo"/>
                <input type="email" name="email" value={dataUser.email} onChange={handleSetData} placeholder="correo electrónico"/>
                <input type="submit" value="MODIFIED"/>
            </form>
        </div>
        </>
    );

};
export default Userform;