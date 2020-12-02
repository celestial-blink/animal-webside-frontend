import './stylesheets/galery.css';
import PhotoImagen from '../components/photoimagen/PhotoImagen';
import Search from '../components/search/Search';

const Galery = () => {
    return (
        <>
                    <Search />
                    <div className="wrapper-images">
                        <div className="img-large">
                            <PhotoImagen />
                        </div>
                        <div className="img-medium">
                            <PhotoImagen />
                        </div>
                        <div className="img-small">
                            <PhotoImagen />
                        </div>
                        <div className="img-large">
                            <PhotoImagen />
                        </div>
                        <div className="img-small">
                            <PhotoImagen />
                        </div>
                    </div>
        </>
    );
};

export default Galery;