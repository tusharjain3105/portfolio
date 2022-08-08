import { useState } from "react"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import styled from "styled-components"
import If from "./ifelse"

const ExpandableWrapper = styled.div`
max-width: 15rem;
margin: 0.5rem;
background: rgb(194, 150, 241);
border-radius: 0.5rem;
color: black;
.header{
    cursor: pointer;
    position: relative;
    width: 100%;
    padding: 0.5rem;
    font-weight: bold;
    .icon{
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
}
&.active{
    .body{
        padding: 0.5rem;
        width: 100%;
        max-height: 20rem;
        opacity: 1;
    }
}
.body{
    max-height: 0;
    height: auto;
    opacity: 0;
    transition: all 0.2s;
}
`

const Expandable = ({title, children, className = "", active = false, ...props}) => {
const [_active, setActive] = useState(active)
const toggle = () => setActive(!_active)

return <ExpandableWrapper className={`${className} ${_active ? 'active' : ''}`} {...props}>
    <div className="header" onClick={toggle}>
       {title} 
        <If condition = {_active} 
        onPass={<MdExpandLess className="icon"/>}
        onFail={<MdExpandMore className="icon"/>}
        />
    </div>
    <div className="body">{children}</div>
</ExpandableWrapper>
}

export default Expandable