import styled from "styled-components";
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <StyledNavbar>
            <StyledLogo>DiaryApp</StyledLogo>
            <StyledNavItems>
            <StyledNavItem to={"/"}>Home</StyledNavItem>
            <StyledNavItem to={"/diary"}>Diary</StyledNavItem>
            </StyledNavItems>
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

const StyledNavItem = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 4px 2px;
    transition: background-color 0.3s ease;

    @media (min-width: 650px) {
        font-size: 1.2rem;
        padding: 8px 16px;
    }

    &:hover {
        background-color: #34495e;
        border-radius: 5px;
    }
`;

const StyledNavItems = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledLogo = styled.h1`
    font-size: 1.5rem;
    color: white;
    margin: 0;
    font-weight: bold;
`;