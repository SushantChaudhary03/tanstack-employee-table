import React from 'react';
const DropRight = (props) => {
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
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </g>
        </svg>
    );
}
export default DropRight;