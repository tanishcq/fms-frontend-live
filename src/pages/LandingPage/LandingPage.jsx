/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/fcamLogo.png';
import contactImg from '../../assets/images/contact.png';
// import harshImg from '../../assets/images/Harsh.png';
// import morrisImg from '../../assets/images/Morrisjpg.jpg';
// import tanishukeImg from '../../assets/images/Tanishukejfif.jfif';
// import abhiImg from '../../assets/images/Abhijpg.jpg';
import { restUrl } from '../../endpoints';

const LandingPage = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [navtoggle, setnavtoggle] = useState(false);
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const onContactUs = (e) => {
        e.preventDefault();
        // setIsLoading(true);

        axios({
            method: 'post',
            url: `${restUrl}/users/feedback`,
            // url: `http://ec2-13-112-113-114.ap-northeast-1.compute.amazonaws.com:5000//users/feedback`,
            data: {
                email,
                description,
            },
        })
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                    console.log(response.data);

                    toast.success('message sent successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    // setIsLoading(false);
                } else {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    // setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 400) {
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    // setIsLoading(false);
                } else {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                // setIsLoading(false);
            });
    };

    return (
        <div className="landingpage">
            <header>
                <div className="landingContainer">
                    <a href="#" className="logo">
                        <img src={logo} width="70px" alt="logo" />
                    </a>

                    <div className="landingNavbar-wrapper">
                        <button
                            type="submit"
                            className="landingNavbar-menu-btn homepageBtn"
                            data-navbar-toggle-btn
                            onClick={() => {
                                setnavtoggle((prev) => !prev);
                            }}
                        >
                            <i className="fa-solid fa-bars" />
                        </button>

                        <nav
                            className={
                                navtoggle
                                    ? 'landingNavbar active'
                                    : 'landingNavbar'
                            }
                            data-navbar
                        >
                            <ul className="landingNavbar-list">
                                <li className="nav-item">
                                    <a href="#home" className="nav-link">
                                        Home
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a href="#about" className="nav-link">
                                        Features
                                    </a>
                                </li>

                                {/* <li className="nav-item">
                                    <a href="#features" className="nav-link">
                                        Our Team
                                    </a>
                                </li> */}

                                <li className="nav-item">
                                    <a href="#contact" className="nav-link">
                                        Contact
                                    </a>
                                </li>
                            </ul>

                            <button
                                type="button"
                                className="btn btn-primary homepageBtn"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                {token ? 'Dashboard' : 'Login'}
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            <main>
                <article>
                    {/* <!-- 
        - #superHero
      --> */}
                    <section className="superHero" id="home">
                        <div className="landingContainer">
                            <div className="superHero-content">
                                <h1 className="h1 superHero-title">
                                    Maintain your Feedbacks like never before.
                                </h1>

                                <p className="superHero-text">
                                    A way for schools and college faculties to
                                    organise and maintain their feedbacks
                                    digitally with minimal efforts. All your
                                    progress under one roof.
                                </p>
                            </div>

                            <div className="superHero-banner" />
                        </div>
                    </section>

                    {/* <!-- 
        - #ABOUT
      --> */}

                    <section className="about" id="about">
                        <div className="custom-shape-divider-top-1673187737">
                            <svg
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                                    className="shape-fill"
                                />
                            </svg>
                        </div>
                        <div className="landingContainer">
                            <div className="about-top">
                                <h2 className="h2 section-title">
                                    Features to Help your feedbacks thrive
                                </h2>

                                <p className="section-text">
                                    Our feedback management app is designed to
                                    help admins collect, organize, and act on
                                    Students feedback. Our app includes a range
                                    of features to support these objectives such
                                    as :
                                </p>

                                <ul className="about-list">
                                    <li>
                                        <div className="about-card">
                                            <div className="card-icon">
                                                {/* <ion-icon name="briefcase-outline"></ion-icon> */}
                                            </div>

                                            <h3 className="h3 card-title">
                                                Collection of feedback
                                            </h3>

                                            <p className="card-text">
                                                It allows you to gather feedback
                                                from students about faculty on
                                                various parameters through
                                                google forms along with inbuilt
                                                template.
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="about-card">
                                            <div className="card-icon">
                                                {/* <ion-icon name="chatbubbles-outline"></ion-icon> */}
                                            </div>

                                            <h3 className="h3 card-title">
                                                Organized Data
                                            </h3>

                                            <p className="card-text">
                                                Transforms feedback into action
                                                by helping you organize the data
                                                in a way that makes it easy to
                                                understand and executable.
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="about-card">
                                            <div className="card-icon">
                                                {/* <ion-icon name="rocket-outline"></ion-icon> */}
                                            </div>

                                            <h3 className="h3 card-title">
                                                Analysis of feedback
                                            </h3>

                                            <p className="card-text">
                                                Generating a report is as easy
                                                as clicking a button. It helps
                                                you identify trends and patterns
                                                to extract insights of feedback
                                                given by student.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="custom-shape-divider-bottom-1673189152">
                                <svg
                                    data-name="Layer 1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1200 120"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                                        className="shape-fill"
                                    />
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* <!-- 
        - #Team
      --> */}

                    {/* <section className="features" id="features">
                        <div className="landingContainer">
                            <h2 className="h2 section-title">
                                Meet the talented and dedicated individuals who
                                make up our team
                            </h2>

                            <p className="section-text">
                                We believe that collaboration and open
                                communication are key to our success, and our
                                team members are encouraged to share their ideas
                                and insights. This creates a dynamic and
                                innovative work environment that fosters
                                creativity and continuous improvement.
                            </p>

                            <ul className="features-list">
                                <li className="features-item">
                                    <figure className="features-item-banner">
                                        <img src={morrisImg} alt="Ayush" />
                                    </figure>

                                    <div className="feature-item-content">
                                        <h3 className="h2 item-title">
                                            Ayush Pun
                                        </h3>
                                        <p className="item-text">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Libero
                                            ea consectetur est nihil aperiam,
                                            officiis molestias rem aliquam
                                            obcaecati, vel at assumenda odio
                                            accusantium ducimus! Voluptates,
                                            corporis nemo. Vero, officiis.
                                        </p>
                                    </div>
                                </li>
                                <li className="features-item">
                                    <figure className="features-item-banner">
                                        <img src={harshImg} alt="Harsh" />
                                    </figure>

                                    <div className="feature-item-content">
                                        <h3 className="h2 item-title">
                                            Harsh Verma
                                        </h3>

                                        <p className="item-text">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Libero
                                            ea consectetur est nihil aperiam,
                                            officiis molestias rem aliquam
                                            obcaecati, vel at assumenda odio
                                            accusantium ducimus! Voluptates,
                                            corporis nemo. Vero, officiis.
                                        </p>
                                    </div>
                                </li>
                                <li className="features-item">
                                    <figure className="features-item-banner">
                                        <img
                                            src={tanishukeImg}
                                            alt="Tanishcq"
                                        />
                                    </figure>

                                    <div className="feature-item-content">
                                        <h3 className="h2 item-title">
                                            Tanishcq Mehta
                                        </h3>

                                        <p className="item-text">
                                            Lorem ipsum dolor sit, amet
                                            consectetur adipisicing elit.
                                            Tenetur illum, modi placeat maiores
                                            laudantium officiis. Nemo ex quia
                                            earum mollitia sint voluptatum
                                            distinctio assumenda, nulla,
                                            consectetur inventore fugit
                                            temporibus suscipit!
                                        </p>
                                    </div>
                                </li>

                                <li className="features-item">
                                    <figure className="features-item-banner">
                                        <img src={abhiImg} alt="Abhishek" />
                                    </figure>

                                    <div className="feature-item-content">
                                        <h3 className="h2 item-title">
                                            Abhishek Sachdeva
                                        </h3>

                                        <p className="item-text">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Repudiandae numquam facere non
                                            tenetur vero ducimus voluptatibus
                                            voluptate commodi! Voluptatem rerum
                                            quisquam id vero nemo! Animi nisi
                                            quis ea mollitia enim.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section> */}

                    {/* <!-- 
        - #CONTACT
      --> */}

                    <section className="contact" id="contact">
                        <div className="landingContainer">
                            <div className="contact-content">
                                <h2 className="h2 contact-title">
                                    Get in touch with our team
                                </h2>

                                <figure className="contact-banner">
                                    <img
                                        src={contactImg}
                                        alt="contact banner"
                                    />
                                </figure>
                            </div>

                            <form
                                className="contact-form"
                                onSubmit={onContactUs}
                            >
                                <div className="input-wrapper">
                                    <label for="name" className="input-label">
                                        Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        placeholder="Type Name"
                                        className="input-field"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label for="phone" className="input-label">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="Type Phone Number"
                                        className="input-field"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label for="email" className="input-label">
                                        Email Address *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        placeholder="Type Email Address"
                                        className="input-field"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        required
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label
                                        for="message"
                                        className="input-label"
                                    >
                                        How can we help? *
                                    </label>

                                    <textarea
                                        name="message"
                                        id="message"
                                        placeholder="Type Description"
                                        required
                                        value={description}
                                        className="input-field"
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary homepageBtn"
                                >
                                    Send Message
                                </button>

                                {/* <LoaderButton
                                    display="Log In"
                                    style={
                                        isLoading
                                            ? {
                                                  backgroundColor:
                                                      'rgb(0, 145, 0, 0.5)',
                                                  cursor: 'not-allowed',
                                              }
                                            : {}
                                    }
                                    isLoading={isLoading}
                                    type="submit"
                                /> */}
                            </form>
                        </div>
                    </section>
                </article>
            </main>

            {/* <!-- 
    - #FOOTER
  --> */}

            <footer>
                {/* <!-- <div className="footer-top"> -->
      <!-- <div className="landingContainer">

        <div className="footer-brand">

          <a href="#" className="logo">
            <img src="" alt="FMS logo">
          </a>

          <p className="footer-text">Follow us on</p>

          <ul className="social-list">

            <li>
              <a href="https://github.com/codewithsadee" className="social-link">
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>

            <li>
              <a href="https://instagram.com/codewithsadee" className="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="https://youtube.com/c/codewithsadee" className="social-link">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

          </ul>

        </div>

        <div className="footer-link-box"> -->

          <!-- <ul className="footer-link-list">

            <li>
              <h3 className="h4 link-title">Company</h3>
            </li>

            <li>
              <a href="#" className="footer-link">About Us</a>
            </li>

            <li>
              <a href="#" className="footer-link">Features</a>
            </li>

            <li>
              <a href="#" className="footer-link">Contact Us</a>
            </li>

          </ul> -->

          <!-- <ul className="footer-link-list">

            <li>
              <h3 className="h4 link-title">Products</h3>
            </li>

            <li>
              <a href="#" className="footer-link">Blog</a>
            </li>

            <li>
              <a href="#" className="footer-link">Help Center</a>
            </li>

            <li>
              <a href="#" className="footer-link">Contact</a>
            </li>

          </ul> -->

          <!-- <ul className="footer-link-list">

            <li>
              <h3 className="h4 link-title">Resources</h3>
            </li>

            <li>
              <a href="#" className="footer-link">FAQ’S</a>
            </li>

            <li>
              <a href="#" className="footer-link">Testimonial</a>
            </li>

            <li>
              <a href="#" className="footer-link">Terms & Conditions</a>
            </li>

          </ul> -->

          <!-- <ul className="footer-link-list">

            <li>
              <h3 className="h4 link-title">Relevent</h3>
            </li>

            <li>
              <a href="#" className="footer-link">Why</a>
            </li>

            <li>
              <a href="#" className="footer-link">Products</a>
            </li>

            <li>
              <a href="#" className="footer-link">Customers</a>
            </li>

          </ul> -->

        <!-- </div>

      </div>
    </div> --> */}

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; 2023 FCAM System All right reserved
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
