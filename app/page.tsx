"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const isAdmin = localStorage.getItem("userRole") === "ADMIN";
  const router = useRouter();

  const handleLogin = () => {
    router.push("/Login");
    // window.location.reload();
  };
  return (
    <>
      <body>
        <section id="hero">
          <div
            id="heroCarousel"
            data-bs-interval="5000"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img
                  src="assets/img/slide/libr.jpeg"
                  alt=""
                  className="img-fluid"
                />
                <div className="carousel-container">
                  <div className="carousel-content animate__animated animate__fadeInUp">
                    <h2>LIBRARY MANAGEMENT SOFTWARE</h2>
                    <p>Complete, Automated Library Management Software</p>
                    <div className="text-center">
                      {/* <Link href="/Login"> */}
                        <button
                          className="btn-get-started"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ol
              className="carousel-indicators"
              id="hero-carousel-indicators"
            ></ol>
          </div>
        </section>

        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Company</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a href="#" className="twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="google-plus">
              <i className="bx bxl-skype"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </body>
    </>
  );
}
