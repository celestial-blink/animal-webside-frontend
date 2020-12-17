import './Search.css';

const Search = ({setFilter}) => {
    const handleSearch=(e)=>{
        let val=e.target.value;
        e.target.onsearch=()=>{
            setFilter(val);
        }
        if(val===""){
            setFilter(val);
        }
    }
    return (
        <>
            <div className="wrapper-search animate__animated animate__lightSpeedInRight">
                <input id="m-search" onChange={handleSearch} type="search" placeholder="Buscar..."/>
            </div>
        </>
    );
};

export default Search;