import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'

import './stylesheets/Systemadmin.css';
import Logo from './images/logo.svg';
import Laptop from './images/laptop.svg';
import Modal from '../components/modal/modal';
import Systemcontentanimal from '../components/systemcontentanimal/Systemcontentanimal';
import Systemcontentimage from '../components/systemcontentimage/Systemcontentimage';
import Systemcontentknow from '../components/systemcontentknow/Systemcontentknow';
import Systemcontentmain from '../components/systemcontentmain/Systemcontentmain';
import Systemcontentprofile from '../components/systemcontentprofile/Systemcontentprofile';
import MLoader from '../components/MLoader/MLoader';


const Systemadmin=()=>{
    const history=useHistory();

    const [mount,setMount]=useState(false);

    const [showModal,setShowModal]=useState(false);
    const [showLoader,setShowLoader]=useState(true);
    const [nameComponent,setNameComponent]=useState("home");
    const [getDataUpdate,setDataUpdate]=useState({});
    
    // data from server response
    const [dataUser,setDataUser]=useState({
        _id:"",
        user:"",
        email:"",
        fullname:"",
        date:""
    });

    const getSession=async(signa)=>{
        let sgn=(signa)?{signal:signa}:{};
        let msesion=await fetch(`/user/verifiedsession`,sgn);
        return await msesion.json();
    }

    const handleSession=()=>{
        getSession().then(res=>{
            if(res.info.session===false){
                history.push("/login");
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const handleManageLoader=(show=true)=>{
        setShowLoader(show);
    }

    //useEffect when mount component
    useEffect(()=>{
        setTimeout(() => {
            handleManageLoader(false);
        }, 500);
    },[]);


    const handleSelectComponent=(e)=>{
        e.preventDefault();
        let name=e.currentTarget.getAttribute('href');
        handleManageLoader(true);
        setNameComponent(name);
    }
    
    const selectComponent=(component)=>{
        switch (component){
            case "home":
                return <Systemcontentmain 
                        handleSession={handleSession}
                        dataUser={dataUser}
                        handleManageLoader={handleManageLoader}
                        setNameComponent={setNameComponent}
                      />
            case "animal":
                return <Systemcontentanimal
                        handleSession={handleSession}
                        dataUser={dataUser}
                        setDataUpdate={setDataUpdate}
                        handleManageLoader={handleManageLoader}
                        setShowModal={setShowModal}/>
            case "images":
                return <Systemcontentimage
                        handleSession={handleSession}
                        dataUser={dataUser}
                        handleManageLoader={handleManageLoader}
                        setShowModal={setShowModal}/>
            case "know":
                return <Systemcontentknow
                        dataUser={dataUser}
                        handleSession={handleSession}
                        setDataUpdate={setDataUpdate}
                        handleManageLoader={handleManageLoader}
                        setShowModal={setShowModal}/>;
            case "profile":
                return <Systemcontentprofile
                        handleSession={handleSession}
                        dataUser={dataUser}
                        setDataUser={setDataUser}
                        handleManageLoader={handleManageLoader}/>
            default :
                return null;
        }
    };

    const handleLoguot=(e)=>{
        e.preventDefault();
        console.log(dataUser._id,"take");
        if(dataUser._id!=="" || dataUser._id!==undefined){
            fetch("/logout",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'same-origin'
            }).then(res=>{
                return res.json();
            }).then(dataj=>{
                if(dataj.state){
                    history.push("/login");
                }else{
                    console.log(dataj);
                }
            }).catch(err=>{
                console.log(err);
            }).finally(()=>{
                handleManageLoader(false);
            })
        }
    }

     useEffect(()=>{
        setMount(true);
        const abortController=new AbortController();
        const signa=abortController.signal;
         getSession(signa).then(res=>{
             if(res.state){
                 if (res.info.session===false){
                     history.push('/login');
                 }else{
                     setDataUser({
                         _id:res.info.user._id,
                         user:res.info.user.user,
                         email:res.info.user.email,
                         fullname:res.info.user.fullname,
                         date:res.info.user.date
                     })
                 }
             }
         }).catch(err=>{
             console.log(err,"take");
             history.push("/");
         });
         const cleanup=()=>{
            abortController.abort();
         }
         return cleanup;
     },[history]);
    if(!mount){
        return null;
    }
    return (
        <>
        {(showLoader)?<MLoader/>:null}
        {(showModal)?<Modal dataUser={dataUser} getDataUpdate={getDataUpdate} namecomponent={nameComponent} handleManageLoader={handleManageLoader} setShowModal={setShowModal}/>:null}
            <div className="wrapper-system">
                <div className="system-navbar">
                    <a href="/" className="system-logo">
                        <img src={Logo} alt="logo"/>
                    </a>
                    <a href="profile" className="system-imagen" onClick={handleSelectComponent}>
                        <img src={Laptop} alt="imagen"/>
                        <h4>username</h4>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                    <a href="close-session" onClick={handleLoguot} className="system-logout"><i className="fa fa-sign-out" aria-hidden="true"></i> log-out</a>

                    <nav className="system-content">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <a href="home" onClick={handleSelectComponent}>home</a>

                        <i className="fa fa-paw" aria-hidden="true"></i>
                        <a href="animal" onClick={handleSelectComponent}>Animal</a>
                        
                        <i className="fa fa-question" aria-hidden="true"></i>
                        <a href="know" onClick={handleSelectComponent}>Did you know?</a>
                        
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                        <a href="images" onClick={handleSelectComponent}>Images</a>
                    </nav>

                    <footer className="system-footer">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate magni, molestias deserunt quasi id quis.
                    </footer>

                </div>
                <div className="system-main-content">
                    {selectComponent(nameComponent)}
                </div>
            </div>
        </>
    );
}

export default Systemadmin;