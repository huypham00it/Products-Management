import styled from 'styled-components';

const Wrapper = styled.section`
    display: grid;
    align-items: center;

    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.4rem;
    }

    .form-container {
        display: grid;
        grid-template-columns: 1fr 1fr;

        img {
            width: 100%;
        }
    }

    .form {
        max-width: 400px;
        border-top: 5px solid var(--primary-500);
        background-image: url('https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=996&t=st=1653636168~exp=1653636768~hmac=24b46e72c3668999cb902d2e14f9d6f463ae4f79e35b4e58906a957d1f88a642');
        position: relative;

        .leaf {
            position: absolute;
            max-width: 150px;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .form-input:focus {
        outline: none;
        border-bottom: 1px solid var(--green-dark);
    }

    h3 {
        text-align: center;
    }

    p {
        margin: 0;
        margin-top: 1rem;
        text-align: center;
    }

    .btn {
        margin-top: 1rem;
        text-transform: uppercase;
    }

    .member-btn {
        background-color: transparent;
        border: transparent;
        color: var(--primary-500);
        cursor: pointer;
        letter-spacing: var(--letterSpacing);
    }

    @media screen and (max-width: 768px){
        .form-container {
            grid-template-columns: 1fr;
        }

        .bg {
            display: none;
        }
    }
`;

export default Wrapper;