import React from 'react'
import './Buttons.css'

const Button = (props) => {
    return (
        <div>
            <button className='button' onClick={ props.clicked }>{ props.children}</button>
        </div>
    )
}

export default Button
