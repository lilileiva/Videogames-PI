import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Pagination from './Pagination.jsx';


test('renders content', () => {
    const pagination = {
        content: 'This is a test',
        important: true
    }

    const component = render(<Pagination gamesPerPage={gamesPerPage} />)
    console.log(component)
})