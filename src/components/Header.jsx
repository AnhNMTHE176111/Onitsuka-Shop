
const Header = () => {
    return (
        <header className="bg-dark">
            <nav className="navbar navbar-expand-md bg-dark flex-column">
                <div className="container col-12">

                    <div className="col-sm-12 col-lg-1 col-md-4 logo">
                        <a href="home" className="navbar-brand">
                            <img src="./images/logo.jpg" alt="" width="100px" />
                        </a>
                    </div>

                    <div className="justify-content-center search-field col-sm-12 col-lg-5 col-md-4">
                        <button className="navbar-toggler btn-bar" type="button" data-toggle="collapse"
                            data-target="#collapseExample" aria-expanded="false" aria-label="Toggle navigation"
                            id="btn-bar">
                            <i className="fa-solid fa-bars " style={{color: '#ffffff', fontSize: '25px'}}></i>
                        </button>
                        <form action="" className="form-inline">
                            <div className="row">

                                <input type="text" className="form-control mr-sm-2 col-9" placeholder="Search Onitsuka Shoes..."
                                    id="input-nek" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="btn-container col-sm-12 col-lg-2 col-md-4">
                        <button className="btn btn-outline-primary">
                            <a href="/signin">Sign in </a>
                        </button>
                        <button className="btn btn-outline-info">
                            <a href="/signup">Sign up </a>
                        </button>
                    </div>

                </div>


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



            </nav>

        </header>
    )
}

export default Header;