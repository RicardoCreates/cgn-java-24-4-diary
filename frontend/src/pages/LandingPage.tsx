import styled from "styled-components";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return (
        <StyledContainer>
            <StyledHeadline>Welcome to your Diary</StyledHeadline>
            <StyledLink to={"/diary"}>Go to your diary</StyledLink>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #f7f9fc;
    padding: 20px 20px 40px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #3498db;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid #bcdaf5;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ffffff;
    }
`

const StyledHeadline = styled.h1`
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
`