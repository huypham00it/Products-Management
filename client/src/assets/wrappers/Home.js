import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  .title {
    font-size: 2rem;
    text-transform: uppercase;
    color: var(--primary-800);
    text-align: left;
  }
  h1 {
    font-weight: 700;
    font-size: 10rem;
  }
  p {
    color: var(--grey-600);
    font-size: 1.8rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    transform: skew(-15deg);

    &:hover {
      box-shadow: 0 0 0.5rem 0 var(--primary-500);
    }
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }

  @media screen and (max-width: 768px) {
    .title {
      font-size: 1.8rem;
    }

    h1 {
      font-size: 5.6rem;
    }

    .container {
      margin-top: 10px;
    }

    nav {
      background-color: var(--primary-100);
      margin: 0;
      padding: 1rem;
      width: 100%;
    }
  }
`;

export default Wrapper;
