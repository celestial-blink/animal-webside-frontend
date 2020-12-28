import {useState} from 'react';
import {useHistory} from 'react-router-dom';

import './FormLogin.css';

const FormLogin =({setShowLoader})=>{
    const [dataLogin,setDataLogin]=useState({
        user:"",
        password:""
    });
    const changeStateLoader=(bol)=>{
        setShowLoader(bol);
    }
    const handleSetdataLogin=(e)=>{
        let value=e.target.value;
        switch (e.target.getAttribute('name')){
            case "user":
                    setDataLogin({
                        ...dataLogin,
                        user:value
                    });
                break;
            case "password":
                    setDataLogin({
                        ...dataLogin,
                        password:value
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
    const handleSubmitData=(e)=>{
        e.preventDefault();
        changeStateLoader(true);
        sendDataFromServer(dataLogin).then(res=>{
            console.log(res);
            if(res.state){
                setResponse({type:'success',element:e.target.firstElementChild,message:"success"});
                setTimeout(()=>{
                    history.push('/system/admin');
                },2000);
            }else{
                setResponse({type:'err',element:e.target.firstElementChild,message:res.info});
            }
            changeStateLoader(false);
        }).catch(err=>{
            changeStateLoader(false);
            setResponse({type:'err',element:e.target.firstElementChild,message:err.message});
        });
    };

    const sendDataFromServer=async(mjson)=>{
        let data=await fetch(`/signin`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'same-origin',
            body:JSON.stringify(mjson)
        });
        return await data.json();
    };

    return(
        <>
            <p className="response success"></p>
            <form className="wrapper-form-login" onSubmit={handleSubmitData}>
                <legend>Form Login</legend>
                <input type="text" name="user" onChange={handleSetdataLogin} placeholder="Usuario"/>
                <input type="password" name="password" onChange={handleSetdataLogin} placeholder="Contraseña"/>
                <input type="submit" value="ingresar"/>
            </form>
        </>
    );
};
export default FormLogin;