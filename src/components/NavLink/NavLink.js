import React from 'react';
import { Link } from 'react-router-dom';

const isExternal = path => {
    return /^http/.test(path);
}

const NavLink = props => {
    if (!props.to || !props.to.length) {
        return <div {...props}>{props.children}</div>;
    }

    if(isExternal(props.to)) {
        return (
            <a href={props.to} {...props}>
                {props.children}
            </a>
        )
    }
    return <Link {...props}>{props.children}</Link>;
}

export default NavLink;