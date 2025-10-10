import React from 'react';
import './AboutMe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJsSquare, faReact, faAndroid } from '@fortawesome/free-brands-svg-icons';
import { faClipboard, faCode, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

function AboutMe() {
    return (
        <section className="about-section">
            <div className="container-fluid p-0">
                <div className="row no-gutters position-relative">
                    <div className="col-lg-9 col-xl-8">
                        <div className="main-content p-5">
                            <div className="main-header mb-4">
                                <h6 className="sub-heading text-uppercase d-block mb-2">Who I am</h6>
                                <h1 className="main-heading d-inline-block text-uppercase pb-3 border-bottom">&lt; About &gt;</h1>
                            </div>

                            <div className="row mb-5">
                                <div className="mb-5 mb-sm-4 col-md-4">
                                    <img src="../assets/images.png" alt="Colorful Wall" />
                                </div>
                                <div className="col-md-8">
                                    <div className="about__text mb-5 mb-sm-4 mb-md-4">
                                        <h3>I'm Yernar</h3>
                                        <p className="m-0">Student of KBTU</p>
                                    </div>
                                    <div className="about__skills">
                                        <div className="row no-gutters mb-0 mb-sm-4">
                                            <div className="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                                <div className="media">
                                                    <FontAwesomeIcon icon={faReact} className="icon-18 mr-3" />
                                                    <div className="media-body">
                                                        <h4 className="m-0">React</h4>
                                                        <p className="m-0">I wanna know web development. Now I'm learning JS and React.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                                <div className="media">
                                                    <FontAwesomeIcon icon={faAndroid} className="icon-18 mr-3" />
                                                    <div className="media-body">
                                                        <h4 className="m-0">Android</h4>
                                                        <p className="m-0">I'm writing android apps for 1.5 years. Still have no job :(</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="about-data">
                                <div className="row no-gutters pt-5 border-top">
                                    <div className="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">
                                        <div className="media">
                                            <FontAwesomeIcon icon={faCode} className="icon-18 mr-2" />
                                            <div className="media-body">
                                                <p className="data-number m-0 font-weight-bold">8,475,000</p>
                                                <p className="m-0 text-uppercase">Lines of code</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mb-md-0 pl-sm-3 p-md-0 col-sm-6 col-md-3">
                                        <div className="media">
                                            <FontAwesomeIcon icon={faClipboard} className="icon-18 mr-2" />
                                            <div className="media-body">
                                                <p className="data-number m-0 font-weight-bold">1,450</p>
                                                <p className="m-0 text-uppercase">J*b Applications</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">
                                        <div className="media">
                                            <FontAwesomeIcon icon={faXmark} className="icon-18 mr-2" />
                                            <div className="media-body">
                                                <p className="data-number m-0 font-weight-bold">1,439</p>
                                                <p className="m-0 text-uppercase">Declined</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 mb-md-0 pl-sm-3 p-md-0 col-sm-6 col-md-3">
                                        <div className="media">
                                            <FontAwesomeIcon icon={faCheck} className="icon-18 mr-2" />
                                            <div className="media-body">
                                                <p className="data-number m-0 font-weight-bold">-1</p>
                                                <p className="m-0 text-uppercase">Accepted</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;