"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  const isAdmin = localStorage.getItem("userRole") === "ADMIN" || false;
  const isLogined = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />

      <title>Library Management</title>
      <meta content="" name="description" />
      <meta content="" name="keywords" />

      {/* <!-- Favicons --/> */}
      <link href="assets/img/favicon.png" rel="icon" />
      <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet"
      />

      <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet" />
      <link href="assets/vendor/aos/aos.css" rel="stylesheet" />
      <link
        href="assets/vendor/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/boxicons/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/glightbox/css/glightbox.min.css"
        rel="stylesheet"
      />
      <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
      <link
        href="assets/vendor/swiper/swiper-bundle.min.css"
        rel="stylesheet"
      />

      <link href="assets/css/style.css" rel="stylesheet" />

      <body>
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center">
            <h1 className="logo me-auto">
              <a href="index.html">
                <span>Library </span>Management
              </a>
            </h1>
            <a href="index.html" className="logo me-auto me-lg-0">
              {/* <img src="assets/img/logo.png" alt="" className="img-fluid" /> */}
            </a>

            <nav id="navbar" className="navbar order-last order-lg-0">
              <ul>
                <li>
                  <a href="/" className="active">
                    Home
                  </a>
                </li>
                {isAdmin ? (
                  <>
                    <ul>
                      <li>
                        <Link href="/Admin/librarianList" passHref>
                          Librarian
                        </Link>
                      </li>
                      <li>
                        <Link href="/Admin/studentsList" passHref>
                          Students
                        </Link>
                      </li>
                      <li>
                        <Link href="/Admin/booksList" passHref>
                          Books
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  isLogined && (
                    <>
                    <li>
                      <Link href="/Listing" passHref>
                        Listing
                      </Link>
                    </li>
                     <li>
                     <Link href="/" passHref onClick={handleLogout}>
                       sign out
                     </Link>
                   </li>
                   </>
                  )
                )}

                {isAdmin && (
                  <li>
                    <Link href="/Admin/Suggestions" passHref>
                      Suggestions
                    </Link>
                  </li>
                )}
                {isAdmin ? (
                  <li>
                    <Link href="/" className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/Login"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>

            <div className="header-social-links d-flex">
              <a href="#" className="twitter">
                <i className="bu bi-twitter"></i>
              </a>
              <a href="#" className="facebook">
                <i className="bu bi-facebook"></i>
              </a>
              <a href="#" className="instagram">
                <i className="bu bi-instagram"></i>
              </a>
              <a href="#" className="linkedin">
                <i className="bu bi-linkedin"></i>
              </a>
            </div>
          </div>
        </header>
      </body>
    </>
  );
};

export default Header;
