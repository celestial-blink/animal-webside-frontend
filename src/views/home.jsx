import './stylesheets/home.css';
import Card from '../components/card/Card';
import Know from '../components/know/Know';
import Header from '../components/header/Header';
import MinActions from '../components/minaction/action';
const Home = ()=>{
    return (
        <>
            <Header/>
            <MinActions/>
                <div className="wrapper-home">
                    <Card />
                    <Card />
                    <Card />
                    <span className="separator"></span>
                    <Know />
                    <Know />
                    <Know />
                </div>
        </>
    );
};

export default Home;