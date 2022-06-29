import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: 15px;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h4 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .Delivering {
    background: #017bc1;
    color: #fff;
  }
  .Delivered {
    background: #22a579;
    color: #fff;
  }
  .Cancelled {
    color: #fff;
    background: #eeac35;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .actions {
    display: flex;
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    text-align: center;
    background: none;
    position: relative;
    isolation: isolate;
  }
  .edit-btn {
    color: var(--green-dark);
    margin-right: 0.5rem;
    border: 1px solid var(--green-light);
  }
  .delete-btn {
    color: var(--red-dark);
    border: 1px solid var(--red-light);
  }

  .edit-btn:before {
    content: "";
    height: 100%;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--green-light);
    z-index: -1;
    transition: width 0.25s ease-in;
  }

  .delete-btn:before {
    content: "";
    height: 100%;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--red-light);
    z-index: -1;
    transition: width 0.25s ease-in;
  }

  .edit-btn:hover:before,
  .delete-btn:hover:before {
    width: 100%;
  }

  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
