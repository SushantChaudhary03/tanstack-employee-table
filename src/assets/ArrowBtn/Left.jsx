import React from 'react';
const DropLeft = (props) => {
    return (
        <svg
            width={props.size ? props.size : '2.2rem'}
            height={props.height ? props.height : '2.2rem'}
            fill={props.color ? props.color : '#000'}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
        >
            <g>
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </g>
        </svg>
    );
}
export default DropLeft;