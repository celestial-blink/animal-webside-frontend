import {useState,useEffect} from 'react';

import './stylesheets/home.css';
import Card from '../components/card/Card';
import Know from '../components/know/Know';
import Header from '../components/header/Header';
import MinActions from '../components/minaction/action';

const Home = ()=>{
    const [dataHome,setDataHome]=useState({
       card:[],
       know:[]
    });

    useEffect(()=>{
        getDataFromServer().then(res=>{
            setShowContent(true);
            if(res.dataCard.state){
                setDataHome({
                    ...{card:res.dataCard.info,
                        know:res.dataKnow.info}
                });  
            }
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    const [showContent,setShowContent]=useState(false);

    const getDataFromServer=async()=>{
        let getDataknow=await fetch('http://127.0.0.1:3030/know?action=get-all-data',{
            method:'GET'
        });
        
        let getDataCard=await fetch('http://127.0.0.1:3030/animal?action=get-data-animals',{
            method:'GET'
        });

        return {
            dataCard:(await getDataCard.json()),
            dataKnow:(await getDataknow.json())
        }
    }


    return (
        <>
            <Header/>
            <MinActions/>
                <div className="wrapper-home">
                    <h2>new animals</h2>
                    {(showContent===false)?<p className="loading">loading...</p>
                        :
                         dataHome.card.map((data,key)=>{
                             return (key<5)?<span key={key}> <Card
                                 title={data.title} 
                                 description={data.description} 
                                 date={data.date} 
                                 imagen={data.imagen.pathimagen} 
                                 alldate={data}
                             /> </span>:null;
                         })
                    }
                    <span className="separator"></span>
                    <h2>did you know?</h2>
                    {(showContent===false)?<p className="loading">loading...</p>
                    :dataHome.know.map((data,key)=>{
                        return (key<3)?<span key={key}> <Know 
                            title={data.title} 
                            content={data.content} 
                            imagen={data.imagen[0].pathimagen}
                        /> </span>:null;
                    })
                    }
                </div>
        </>
    );
};

export default Home;