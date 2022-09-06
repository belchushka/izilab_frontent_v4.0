import React from 'react';
import {Header, LandingBanner, About, Advantages, Service, Faq, Feedback, Footer} from "@box/widgets";
import {AnimateWrapper} from "@box/shared";
import {Order} from "@box/pages";

export const Landing = () => {
    return (
        <AnimateWrapper>
            <Header/>
            <LandingBanner/>
            <Order/>
            <Advantages/>
            <About/>
            <Service/>
            <Faq/>
           <Feedback/>
            <Footer/>
        </AnimateWrapper>
    );
};

