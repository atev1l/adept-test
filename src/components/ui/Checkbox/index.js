import styles from './Checkbox.module.css';
import React from 'react';

const Checkbox = ({ checked = false, r, handleCheck, handleChange }) => {
    const params = {
        className: styles.hidden,
        type: 'checkbox',
        ref: (e) => {
            if (r instanceof Function) r(e);
        },
        checked,
        onChange: () => handleChange()
    };

    return (
        <div onClick={handleCheck} className={`${styles.component} ${styles[checked ? 'checked' : 'unchecked']}`}>
            <input {...params} />
        </div>
    );
};
export default Checkbox;
