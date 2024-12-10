import styled from "styled-components";

export const ContainerLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 5rem auto;
    grid-template-areas:
    "header header"
    "sidebar content";
`

export const Header = styled.div`
    grid-area: header;
    background-color: #ffffff;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    z-index: 3;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ContainerLogo = styled.div`
    display: flex;
    gap: 2rem;
`

export const Logo = styled.div`
    height: 2rem;
    width: 2rem;
    transform: rotate(45deg);
    background-color: #1a237e;
`

export const Slogan = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a237e;
`

export const ContainerUser = styled.div`
    color: #666666;
    font-size: 1.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`

export const SideBar = styled.div`
    grid-area: sidebar;
    background-color: #ffffff;
    box-shadow: 0.5rem 0 1rem 0 rgba(0, 0, 0, 0.1);
    z-index: 2;
    padding: 3rem 2rem;
    min-height: calc(100vh - 5rem); /* Subtract header height */
    
    display: flex;
    flex-direction: column;
`

export const NavLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const ExitButtonContainer = styled.div`
    margin-top: auto;
`

// Update your layout component usage:
export const ButtonPages = styled.button`
    width: 100%;
    padding: 1rem 3rem;
    background-color: #1a237e;
    outline: 0;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    color: #ffffff;
    text-align: start;

    a {
        color: #ffffff;
    }

    &:hover {
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #1a237e;
        color: #1a237e;

        & > a {
            color: #1a237e;
        }
    }
`

export const Content = styled.div`
    grid-area: content;
    background-color: #f0f2f5;
    z-index: 1;

    overflow: hidden;
`