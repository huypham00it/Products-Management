import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background-image: url('https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=996&t=st=1653636168~exp=1653636768~hmac=24b46e72c3668999cb902d2e14f9d6f463ae4f79e35b4e58906a957d1f88a642');
      background-size: cover;
      background-repeat: no-repeat;
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--primary-100);
      padding-left: 3rem;
      color: var(--grey-900);
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .nav-link:hover .icon {
      color: var(--primary-500);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--primary-900);
    }
    .active .icon {
      color: var(--primary-500);
    }
  }
`
export default Wrapper
