import styles from './Modal.module.css';

import React, { useEffect, useRef } from 'react';

const Modal = ({
  title = null,
  titleSize = 5,
  description,
  children,
  onClose,
  isOpen = false,
  template = 'default',
  closeButton = true
}) => {
  const modal = useRef();

  useEffect(()=>{
    const body = document.querySelector('body');
    if (isOpen) body.style.overflow = 'hidden';
    else body.style.overflow = 'auto';
  }, [isOpen])

  const handleClose = () => {
    return onClose();
  };

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.active : styles.inactive}`}>
      <div className={styles.component}>
        {onClose && (<div role='button' tabIndex={-2} className={`${styles.section} ${styles.sectionOverlay}`} onClick={handleClose} />)}
        <div className={`${styles.section} ${styles.sectionBody} ${template ? styles[template] : ''}`} tabIndex={0} role='button' ref={modal}>
          <div className={styles.body}>
            {closeButton && (
              <div className={`${styles.bodySection} ${styles.bodySectionClose}`}>
                <div role='button' tabIndex={-1} className={styles.close} onClick={handleClose}>
                  <svg className={styles.closeSrc} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'>
                    <g className={styles.iconZone} fill='none' fillRule='nonzero' stroke='#000000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'>
                      <path d='M10.924 10.588L1.5 1.164M10.924 1.412L1.5 10.836' />
                    </g>
                  </svg>
                </div>
              </div>
            )}
            {title && (
              <div className={`${styles.bodySection} ${styles.bodySectionTitle}`}>
                {title}
              </div>
            )}
            {description && (
              <div className={`${styles.bodySection} ${styles.bodySectionDescription}`}>
                <div className={styles.description}>{description}</div>
              </div>
            )}
            <div className={`${styles.bodySection} ${styles.bodySectionContent}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
