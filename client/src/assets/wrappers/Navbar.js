import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--white);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
    margin: 0;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .user-name {
      font-weight: 500;
    }

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius:10px;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
      }
    }

    .user-action {
      position: relative;
    }

    .drop-down {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 10px;
      right: 0;
      top: 100%;
      min-width: 120px;
      border-radius: 4px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      padding: 8px;
      font-weight: 500;

      &:hover {
        cursor: pointer;
        background-color: var(--primary-500);
        color: var(--white);
      }
    }

  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`
export default Wrapper
