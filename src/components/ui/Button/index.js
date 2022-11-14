import React from 'react';
import styles from './Button.module.css'
const Button = ({
    color='blue',
    size='default',
    text = 'text',
    onClick,
}) => {
    const params = { className: `${styles.component} ${styles.component} ${size ? styles[size] : ''} ${color ? styles[color] : ''} ` };

    return  (
        <button type='button' onClick={onClick} {...params}>
            {text}
        </button>
    );

};

export default Button;
