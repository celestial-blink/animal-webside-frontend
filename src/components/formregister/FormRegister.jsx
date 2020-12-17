import {useState} from 'react';
import {useHistory} from 'react-router-dom';

import './FormRegister.css';

const FormRegister = ({setShowLoader}) =>{
    const [dataRegister,setDataRegister]=useState({
        action:"insert",
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
            element.classList.replace('success','error');
            element.textContent=object.message;
        }else{
            element.classList.replace('error','success'); 
            element.textContent=object.message;
        }
    }

    let history=useHistory();
    const handleSubmitRegister=(e)=>{
        e.preventDefault();
        changeStateLoader(true);
        sendDataFromServer(dataRegister).then(res=>{
            if(res.state){
                setResponse({element:e.target.firstElementChild,type:"success",message:'success, espere unos segundos'});
                setTimeout(()=>{
                    history.push("/");
                },2000);
            changeStateLoader(false);
            }else{
            setResponse({element:e.target.firstElementChild,type:"err",message:res.info});
            changeStateLoader(false);
            }
        }).catch(err=>{
            setResponse({element:e.target.firstElementChild,type:"err",message:err.message});
            changeStateLoader(false);
        });
        console.log(dataRegister);
    }
    
    const sendDataFromServer=async(mjson)=>{
        let send=await fetch('http://127.0.0.1:3030/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(mjson)
        });

        return await send.json();
    }

    return (
        <>
            <form className="wrapper-form-registration" onSubmit={handleSubmitRegister}>
                <p className="response success"></p>
                <h2>Registrarme</h2>
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