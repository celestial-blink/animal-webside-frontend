import './AsideMenu.css';
const AsideMenu = () =>{
    return (
        <span className="wrapper-aside-menu animate__animated animate__bounceInRight">
            <ul className="aside-menu-clasification">
                <h2>CLASIFICACIÓN</h2>
                <li><a href="vertebrados">vertebrados</a></li>
                <li><a href="invertebrados">invertebrados</a></li>
                <li><a href="maniferos">maniferos</a></li>
                <li><a href="aves">aves</a></li>
                <li><a href="peces">peces</a></li>
                <li><a href="reptiles">reptiles</a></li>
                <li><a href="anfibios">anfibios</a></li>
            </ul>
        </span>
    );
};

export default AsideMenu;