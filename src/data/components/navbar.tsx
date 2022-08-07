import { Link } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { Buttons, If } from './components'

const NavbarWrapper = styled.nav`
    background: ${props => props.theme.colors.background};
    padding: 1rem;
    display:flex;
    align-items: center;
    justify-content: space-between;
`

const Navbar = () => {
    return (
        <NavbarWrapper>
            <div className="left">
                <Title title='Tushar Jain' subtitle='Software Engineer' />
            </div>
            <div className="right">
                <ContactDetails />
            </div>
            {/* <ThemeSwitcher/> */}
        </NavbarWrapper>
    )
}

const ContactDetailsWrapper = styled.ul`
    font-size: small;
    text-align: end;    
    list-style: none;
    font-style: italic;
`

const ContactDetails = () => {
    const details = {
        email: 'tusharjain3105@gmail.com',
        phone: '+91 8433100018',
        linkedin: 'https://www.linkedin.com/in/tushar-jain-21827415b',
    }
    return <ContactDetailsWrapper>
        <li>
            <a href={`mailto:${details.email}`} target="_blank">
                {details.email}
            </a>
        </li>
        <li>{details.phone}</li>
        <li>
            <a href={details.linkedin} target="_blank">
                {details.linkedin}

            </a>
        </li>
    </ContactDetailsWrapper>
}

const TitleWrapper = styled.div`
    font-weight: bold;
    .title{
        font-size: larger;
    }
    .subtitle{

    }
`

const Title = ({ title, subtitle }) => {
    return <TitleWrapper>
        <div className="title">{title}</div>
        <If condition={subtitle} onPass={
            <div className="subtitle">{subtitle}</div>
        } />
    </TitleWrapper>
}

export default Navbar