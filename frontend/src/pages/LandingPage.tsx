import styled from "styled-components";
import {Link} from "react-router-dom";

type LandingPageProps = {
    login: () => void;
    logout: () => void;
    username: string;
};

export default function LandingPage(props: Readonly<LandingPageProps>){
    return (
        <StyledContainer>
            <StyledHeadline>Welcome to your Diary</StyledHeadline>
            <StyledLink to={"/diary"}>Go to your diary</StyledLink>
            <br/>
            <br/>
            <MobileOnlyWrapper>
            <StyledText>Hello {props.username}</StyledText>
            <br/>
            {(!props.username || props.username === "anonymousUser") ? (
                <Button onClick={props.login}>Login</Button>
            ) : (
                <Button onClick={props.logout}>Logout</Button>
            )}
            </MobileOnlyWrapper>
        </StyledContainer>
    );
}

const MobileOnlyWrapper = styled.div`
    @media (min-width: 650px) {
        display: none;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    //padding: 20px 20px 40px;
    padding: 40px;
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


const Button = styled.button`
    background-color: transparent;
    color: black;
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
    color: black;
    margin: 0;
    font-weight: bold;
`;