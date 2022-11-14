import styles from './Input.module.css';

import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import isWindowDefined from '../../../helpers/isWindowDefined';

const Input = ({
   placeholder = '',
   floatingPlaceholder,
   r,
   template = 'grey-border',
   size = 'medium',
   error = null,
   defaultValue,
   mask,
   onChange,
   onKeyPress,
   onClick,
   onBlur,
   type,
   visibleInnerButton = false,
   resize = false,
   required = false,
 }) => {
  const [inputValue, handleInputValue] = useState('');
  const [visibleButton, setVisibleButton] = useState(false);
  const fieldRef = useRef();
  const inputRef = useRef();
  const isMobile = isWindowDefined() && window.innerWidth <= 450;
  const textareaCondition = resize && !mask;

  let status = 'blank';
  if (inputValue) status = 'filled';
  if (error) status = 'error';

  useEffect(() => {
    handleInputValue(defaultValue);

    setTimeout(() => {
      if (textareaCondition && inputRef.current && fieldRef.current) {
        inputRef.current.style.height = '3.4722rem';
        inputRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
      }
    }, 100);

    if (isMobile) setVisibleButton(false);
    else setVisibleButton(visibleInnerButton);
  }, [defaultValue, visibleInnerButton]);


  const handleChange = (e) => {
    if (onChange) onChange(e);
    handleInputValue(e.target.value);
    if (textareaCondition && inputRef.current) {
      inputRef.current.style.height = '3.4722rem';
      inputRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleKeyPress = (e) => {
    if (onKeyPress) onKeyPress(e);
  };

  const handleClick = (e) => {
    if (onClick) return onClick(e);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
    setTimeout(() => {
      if (isMobile && visibleInnerButton) setVisibleButton(false);
    }, 0);
    e.target.classList.remove(styles.focused);
  };

  const handleFocus = (e) => {
    if (isMobile && visibleInnerButton) setVisibleButton(true);
    e.target.classList.add(styles.focused);
  };

  const handlePlaceholder = () => {
    if (floatingPlaceholder) return null;
    if (visibleInnerButton && placeholder.length > 43) return `${placeholder.slice(0, 41)}...`;
    return placeholder;
  };

  const params = {
    onBlur: handleBlur,
    onKeyPress: handleKeyPress,
    onChange: handleChange,
    onClick: handleClick,
    onFocus: handleFocus,
    value: inputValue || '',
    placeholder: handlePlaceholder(),
  };

  const paramsInput = {
    className: styles.field,
    type: type || 'text',
    alwaysShowMask: false,
    mask: mask || null,
    autoComplete: 'off',
    inputRef: (e) => {
      fieldRef.current = e;

      if (r instanceof Function) return r(e);
    }
  };

  const paramsTextarea = {
    className: styles.textarea,
    ref: (e) => {
      fieldRef.current = e;
      if (r instanceof Function) return r(e);
    }
  };

  return (
      <div className={`${styles.component} ${size ? styles[size] : ''} ${template ? styles[template] : ''} ${status ? styles[status] : ''}`} ref={inputRef}>
        <div className={`${styles.section} ${styles.sectionField}`}>
          {textareaCondition ? (<textarea {...paramsTextarea} {...params} />) : (<InputMask {...paramsInput} {...params} />)}
          {placeholder && floatingPlaceholder ? <span className={styles.placeholder}>{placeholder}</span> : null}
        </div>
        {required && !visibleButton && !inputValue ? (
            <div className={`${styles.section} ${styles.sectionRequired}`}>
              *
            </div>
        ) : null}
        {error && typeof error !== 'boolean' ? (
            <div className={`${styles.section} ${styles.sectionError}`}>
              <div className={styles.errorItem}>{error}</div>
            </div>
        ) : null}
      </div>
  );
};
export default Input;
