import FavoriteTile from '../../components/FavoriteTile/FavoriteTile';
import NavBar from '../../components/NavBar/NavBar';

const FavoritesPage = () => {
    require('./FavoritesPage.css');

    const dummyuser = {
        first_name: 'naan',
        last_name: 'sheri',
        email: 'urmom@gmail.com',
    }

    return (
        <div className='favorites-main'>
            <NavBar info={dummyuser} page="favorites" />
            <div className='favorites-right'>
                <h1 className="favorites-title">FAVORITE SPACES</h1>
                <FavoriteTile/>
            </div>
        </div>
    );
}

export default FavoritesPage;