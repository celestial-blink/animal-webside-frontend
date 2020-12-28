import {useState} from 'react';
import {useHistory} from 'react-router-dom';

import './FormRegister.css';

const FormRegister = ({setShowLoader}) =>{
    const [dataRegister,setDataRegister]=useState({
        user:"",
        password:"",
        repeat:"",
        fullname:"",
        email:""
    });
    const changeStateLoader=(bol)=>{
        setShowLoader(bol);
    };
    const addDataRegister=(e)=>{
        let value=e.target.value;
        switch(e.target.getAttribute('name')){
            case "user":
                setDataRegister({
                    ...dataRegister,
                    ...{user:value}
                });
                break;
            case "password":
                setDataRegister({
                    ...dataRegister,
                    ...{password:value}
                });
                break;
            case "repeat":
                setDataRegister({
                    ...dataRegister,
                    ...{repeat:value}
                });
                break;
            case "fullname":
                setDataRegister({
                    ...dataRegister,
                    ...{fullname:value}
                });
                break;
            case "email":
                setDataRegister({
                    ...dataRegister,
                    ...{email:value}
                });
                break;
            default :
                break;
        }
    };

    const setResponse=(object)=>{
        let element=object.element;
        if(object.type==="err"){
            element.classList.add('error');
            element.textContent=object.message;
        }else{
            element.classList.remove('error'); 
            element.textContent=object.message;
        }
        setTimeout(()=>{
            element.textContent="";
        },7000);
    }

    let history=useHistory();
    const handleSubmitRegister=(e)=>{
        e.preventDefault();
        changeStateLoader(true);
        sendDataFromServer(dataRegister).then(res=>{
            if(res.state){
                setResponse({element:e.target.previousElementSibling,type:"success",message:'success, espere unos segundos'});
                setTimeout(()=>{
                    history.push("/system/admin");
                },2000);
            changeStateLoader(false);
            }else{
            setResponse({element:e.target.previousElementSibling,type:"err",message:res.info});
            changeStateLoader(false);
            }
        }).catch(err=>{
            setResponse({element:e.target.previousElementSibling,type:"err",message:err.message});
            changeStateLoader(false);
        });
        console.log(dataRegister);
    }
    
    const sendDataFromServer=async(mjson)=>{
        let send=await fetch('/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'same-origin',
            body:JSON.stringify(mjson)
        });

        return await send.json();
    }

    return (
        <>
                <p className="response"></p>
            <form className="wrapper-form-registration" onSubmit={handleSubmitRegister}>
                <legend>Form Register</legend>
                <input type="text" name="user" onChange={addDataRegister} placeholder="ingrese usuario"/>
                <input type="password" name="password" onChange={addDataRegister} placeholder="ingrese contraseña"/>
                <input type="password" name="repeat" onChange={addDataRegister} placeholder="repetir contraseña" />
                <input type="text" name="fullname" onChange={addDataRegister} placeholder="nombre completo" />
                <input type="email" name="email" onChange={addDataRegister} placeholder="correo electrónico" />
                <input type="submit" value="Registrarme"/>
            </form>
        </>
    );
};

export default FormRegister;