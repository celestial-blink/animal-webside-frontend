import './AsideMenu.css';
const AsideMenu = () =>{

    const handleDropMenu=(e)=>{
        e.preventDefault();
        e.currentTarget.classList.toggle('down');
        if (e.currentTarget.getAttribute('class')==="down"){
            e.currentTarget.nextElementSibling.style.height="calc(var(--i) * 30px)";
            e.currentTarget.lastElementChild.classList.replace('fa-caret-down','fa-caret-up');
        }else{
            e.currentTarget.nextElementSibling.style.height="0%";
            e.currentTarget.lastElementChild.classList.replace('fa-caret-up','fa-caret-down');
        }
    }
    return (
        <span className="wrapper-aside-menu animate__animated animate__bounceInRight">
            <h2>CLASIFICACIÓN</h2>
            <a href="structure" onClick={handleDropMenu}>Estructura &nbsp; <i className="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul style={{"--i":"7"}}>
                <li><a href="vertebrados">vertebrados</a></li>
                <li><a href="invertebrados">invertebrados</a></li>
                <li><a href="maniferos">maniferos</a></li>
                <li><a href="aves">aves</a></li>
                <li><a href="peces">peces</a></li>
                <li><a href="reptiles">reptiles</a></li>
                <li><a href="anfibios">anfibios</a></li>
            </ul>
            <a href="feeding" onClick={handleDropMenu}>Alimentación &nbsp; <i className="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul style={{"--i":"3"}}>
                <li><a href="carnivoros">carnívoros</a></li>
                <li><a href="hervivoros">hervívoros</a></li>
                <li><a href="omnivoros">omnívoros</a></li>
            </ul>
            <a href="reproduction" onClick={handleDropMenu}>Reproducción &nbsp; <i className="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul style={{"--i":"3"}}>
                <li><a href="ovíparos">ovíparos</a></li>
                <li><a href="ovovivíparos">ovovivíparos</a></li>
                <li><a href="vivíparos">vivíparos</a></li>
            </ul>
        </span>
    );
};

export default AsideMenu;