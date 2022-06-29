import styled from 'styled-components';

const Wrapper = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 600px;
        display: block;
        margin-bottom: 30px;
    }

    a {
        text-decoration: none;
        text-transform: uppercase;
        color: var(--primary-500);
    }
`

export default Wrapper;