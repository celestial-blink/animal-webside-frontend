import {useState,useEffect} from 'react';

import './Userform.css';
const Userform=({mdataUser})=>{
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

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        console.log(dataUser);
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
            <p className="response">server response</p>
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