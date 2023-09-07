import { Link } from 'react-router-dom'


const NavBar = () => {
    return (
        <div className="navBar">
            <div className="infoUser">
                <img src="https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-nguoi-dep-chup-goc-nghieng.jpg" />
                <h3 className='userName'>User Name</h3>
            </div>
            <div className="loginSignin">
                <a href="/login" className='navBtn'>
                    Log In
                </a>
                <a href="/signin" className='navBtn'>
                    Sign In
                </a>
            </div>
            <nav className="navBar_options">
                <Link to="/home">
                    <i className="fa-solid fa-house"></i>
                    Home
                </Link>
                <Link to="/search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    Search
                </Link>
            </nav>
            {/* components Library */}
        </div>
    );
};

export default NavBar;