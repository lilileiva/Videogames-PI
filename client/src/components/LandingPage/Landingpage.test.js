import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage.jsx';
import { Link } from 'react-router-dom';


describe("LANDING PAGE", () => {

    // const landingpage = render(<LandingPage />)

    it('Rendered landing page', () => {
        const landingpage = render(<LandingPage />)
        expect(landingpage).toBeTruthy()
    }) 

    // xit('Debería contener un botón que dirija al home', () => {
    //     expect(landingpage.find(Link).at(0).prop('to')).toEqual('/home');
    //   });

});


