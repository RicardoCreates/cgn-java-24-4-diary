import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

type NavbarProps = {
    login: () => void;
    logout: () => void;
    username: string;
};

export default function Navbar(props: Readonly<NavbarProps>) {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <StyledNavbar>
            <StyledLogo>DiaryApp</StyledLogo>
            <BurgerMenu onClick={toggleMenu}>
                <div />
                <div />
                <div />
            </BurgerMenu>
            <StyledNavContainer menuOpen={menuOpen}>
                <StyledNavItems>
                    <StyledNavItem to={"/"}>Home</StyledNavItem>
                    <StyledNavItem to={"/diary"}>Diary</StyledNavItem>
                </StyledNavItems>
                <StyledLogin>
                    <StyledText>Hello {props.username}</StyledText>
                    {(!props.username || props.username === "anonymousUser") ? (
                        <Button onClick={props.login}>Login</Button>
                    ) : (
                        <Button onClick={props.logout}>Logout</Button>
                    )}
                </StyledLogin>
            </StyledNavContainer>
        </StyledNavbar>
    );
}

const StyledNavbar = styled.nav`
    background-color: #2c3e50;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledNavContainer = styled.div<{ menuOpen: boolean }>`
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;

    @media (max-width: 650px) {
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background-color: #2c3e50;
        padding: 20px;
        z-index: 1;
        display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
    }
`;

const StyledNavItems = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-grow: 1;
`;

const StyledNavItem = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 4px 2px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #34495e;
        border-radius: 5px;
    }

    @media (min-width: 650px) {
        font-size: 1.2rem;
        padding: 8px 16px;
    }
`;

const StyledLogo = styled.h1`
    font-size: 1.5rem;
    color: white;
    margin: 0;
    font-weight: bold;
`;

const Button = styled.button`
    background-color: transparent;
    color: #ffffff;
    padding: 5px 10px;
    border: 0.5px solid #303030;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: rgba(144, 202, 249, 0.1);
    }

    &:active {
        background-color: rgba(144, 202, 249, 0.2);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const StyledText = styled.p`
    color: white;
    margin: 0;
`;

const StyledLogin = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BurgerMenu = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;

    div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 4px 0;
        transition: 0.4s;
    }

    @media (max-width: 650px) {
        display: flex;
    }
`;
