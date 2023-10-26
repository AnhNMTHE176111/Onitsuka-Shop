import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = ({ onSearch }) => {
    const [searchedValue, setSearchedValue] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const cookieArray = document.cookie.split(';');
        const userIdObject = cookieArray.filter(cookie => cookie.includes('userId'))[0];
        if(userIdObject) {
            const userId = userIdObject.split('=')[1];
            fetch('http://localhost:9999/user/' + userId)
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                setUser(result);
            })
            .catch((err) => {
                console.log('error', err);
            });
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(searchedValue);
    }

    function logOut() {
        document.cookie = `userId=;expires=${(new Date()).getTime()}`;
        setUser({});
    }

    function changeLocation(location) {
        navigate(location);
    }

    return (
        <header className="bg-dark">
            <nav className="navbar navbar-expand-md bg-dark flex-column">
                <div className="container col-12">

                    <div className="col-sm-12 col-lg-1 col-md-4 logo">
                        <Link to="home" className="navbar-brand">
                            <img src="./images/logo.jpg" alt="" width="100px" />
                        </Link>
                    </div>

                    <div className="justify-content-center search-field col-sm-12 col-lg-5 col-md-4">
                        <button className="navbar-toggler btn-bar" type="button" data-toggle="collapse"
                            data-target="#collapseExample" aria-expanded="false" aria-label="Toggle navigation"
                            id="btn-bar">
                            <i className="fa-solid fa-bars " style={{ color: '#ffffff', fontSize: '25px' }}></i>
                        </button>
                        <form action="" className="form-inline" onSubmit={e => handleSubmit(e)}>
                            <div className="row">
                                <input type="text" className="form-control mr-sm-2 col-9" placeholder="Search Onitsuka Shoes..."
                                    id="input-nek" value={searchedValue} onChange={(e) => setSearchedValue(e.target.value)} />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="btn-container col-sm-12 col-lg-2 col-md-4">
                        {
                            user.id ? (
                                <>
                                    <button className="btn btn-outline-warning" onClick={() => navigate(`/cart`)}>
                                        <i className="fa-solid fa-cart-shopping" style={{marginRight: '3px'}}></i>
                                    </button>
                                    {user.role === 'admin' ? (<button onClick={() => changeLocation("/admin")} className="btn btn-outline-primary">
                                        Admin
                                    </button>) : (<button onClick={() => changeLocation("/profile")} className="btn btn-outline-primary">
                                        Profile {user.username}
                                    </button>)}

                                    <button className="btn btn-outline-info" onClick={logOut}>
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => changeLocation("/signin")} className="btn btn-outline-primary">
                                        Sign in
                                    </button>
                                    <button onClick={() => changeLocation("/signup")} className="btn btn-outline-info">
                                        Sign up
                                    </button>
                                </>
                            )
                        }

                    </div>

                </div >


                <div className="row col-md-12 col-lg-12">
                    <ul className="nav collapse navbar-collapse justify-content-center" id="collapseExample">
                        <li className="nav-item"><a href="home" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="bestSeller" className="nav-link">Best Sales</a></li>
                        <li className="nav-item"><a href="newArrives" className="nav-link">New Arrives</a></li>
                        <li className="nav-item"><a href="lookBook" className="nav-link">Looks Book</a></li>
                        <li className="nav-item dropdown">
                            <a href="categories" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                Categories
                            </a>

                            <div className="dropdown-menu">
                                <a href="category" className="dropdown-item">Athletic Shoes</a>
                                <a href="category" className="dropdown-item">Fashion Shoes</a>
                                <a href="category" className="dropdown-item">Men's and Women's Shoes</a>
                                <a href="category" className="dropdown-item">Children's Shoes</a>
                                <a href="category" className="dropdown-item">Work Shoes</a>
                            </div>
                        </li>
                    </ul>
                </div>



            </nav >

        </header >
    )
}

export default Header;