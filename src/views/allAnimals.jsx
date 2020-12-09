import './stylesheets/allAnimals.css';
import Cards from '../components/card/Card';
import MSearch from '../components/search/Search';
const Allanimals=()=>{
    return (
    <>
        <MSearch/>
        <div className="wrapper-all-animals">
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
        </div>
    </>
    );
}

export default Allanimals;