export default function Navbar() {
    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div class="container">
      <a class="navbar-brand" href="index.html" style={{marginRight: '70px', marginLeft: '-30px'}}>
        <span> <img style={{width: '15%'}} src="images/logo.png" alt="" /></span>Leopard Salon
      </a>

      {/* <!-- Navigation Menu --> */}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#ftco-nav"
        aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="fa fa-bars"></span> Menu
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="ftco-nav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="index.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="about.html" class="nav-link" style={{whiteSpace: 'nowrap'}}>About Us</a>
          </li>
          <li class="nav-item">
            <a href="stylist.html" class="nav-link">Stylist</a>
          </li>
          <li class="nav-item">
            <a href="services.html" class="nav-link">Services</a>
          </li>
          <li class="nav-item">
            <a href="gallery.html" class="nav-link">Gallery</a>
          </li>
          <li class="nav-item">
            <a href="blog.html" class="nav-link">Blog</a>
          </li>
          <li class="nav-item">
            <a href="contact.html" class="nav-link">Contact</a>
          </li>
        </ul>
      </div>

      {/* <!-- User Icon Section --> */}
      <li class="nav-item dropdown d-flex align-items-center" style={{marginLeft: '50px'}}>
        <a href="#" class="nav-link" id="userDropdown">
          <img src="images/user.png" alt="User" style={{width: '30px', borderRadius: '50%', verticalAlign: 'middle'}} />
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown" style={{position: 'absolute'}}>
          <a class="dropdown-item" href="profile.html">
            <i class="fa-solid fa-user"></i>View Profile
          </a>
          <a class="dropdown-item" href="#">
            <i class="fa-solid fa-medal"></i>Loyal Point
          </a>
          <a class="dropdown-item" href="#">
            <i class="fa-solid fa-right-from-bracket"></i>Logout
          </a>
        </div>
      </li>
      <button class="login-button" type="button" data-bs-toggle="modal" data-bs-target="#loginSelectionModal">
        <i class="fa-solid fa-lock" style={{whiteSpace: 'nowrap'}}> Login</i>
      </button>
    </div>
  </nav>
        </div>
    );
}