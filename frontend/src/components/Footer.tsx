import styled from "styled-components";

export default function Footer() {
    return (
        <StyledFooter>
            <FooterText>© 2024 DiaryApp. Alle Rechte vorbehalten.</FooterText>
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`;

const FooterText = styled.p`
    margin: 0;
    font-size: 0.9rem;
`;