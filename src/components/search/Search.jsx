import './Search.css';

const Search = () => {
    return (
        <>
            <div className="wrapper-search animate__animated animate__lightSpeedInRight">
                <input type="text" placeholder="Buscar..."/>
                <a href="search"><i className="fas fa-search"></i></a>
            </div>
        </>
    );
};

export default Search;