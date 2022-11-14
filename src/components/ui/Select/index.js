import styles from './Select.module.css';

import React, { useState, useEffect, useRef } from 'react';

const Select = ({
  value,
  defaultValue,
  placeholder = 'Выберите из списка',
  id,
  multi,
  onChange,
  type,
  size,
  visibleFiveElements,
  template = 'default',
  templateTextSelect = 'default',
}) => {
  let _defaultSelected = null;
  if (multi) _defaultSelected = defaultValue || [];
  else _defaultSelected = defaultValue && defaultValue.length > 0 ? value.find(item => item.id === Number(defaultValue)) : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(_defaultSelected);
  const wrapperRef = useRef();
  const optionsRef = useRef();
  const fieldRef = useRef();

  useEffect(() => {
    if (wrapperRef.current && wrapperRef.current.children.length > 6) {
      if (visibleFiveElements) wrapperRef.current.classList.add(styles.scroll_wrapper_five);
      else wrapperRef.current.classList.add(styles.wrapper);
    }
    if (defaultValue && defaultValue.length > 0) setSelected(value.find(item => item.id === Number(defaultValue)));
    else if (defaultValue && defaultValue.length === 0) setSelected(undefined);
  }, [defaultValue]);

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleOptionsPosition = () => {
    optionsRef.current.classList.remove(styles.top);

    const rect = optionsRef.current.getBoundingClientRect();

    if (rect.top + rect.height >= window.innerHeight) {
      optionsRef.current.classList.add(styles.top);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);

    setTimeout(() => handleOptionsPosition(), 0);
  };

  const handleSelect = (option) => {
    if (multi) {
      onChange(id, option, type, multi);
      setSelected([...selected, option.id]);

      if (selected.includes(option.id)) {
        const array = [...selected];
        const index = array.indexOf(option.id);

        if (index !== -1) {
          array.splice(index, 1);
          setSelected(array);
        }
      }
    } else {
      onChange(id, option.id, type);
      setSelected(option);
      handleToggle();
    }
  };

  const settings = {
    className: `${styles.field} ${styles[isOpen ? 'opened' : 'closed']} ${styles[size]}`,
    onClick: handleToggle,
    role: 'select'
  };

  let children;

  if (multi) {
    children = selected.length > 0 ? value.map(el => selected.includes(el.id) && `${el.value}, `) : placeholder;
  } else {
    children = selected ? <div className={`${styles[`selected_test_drop__${templateTextSelect}`]}`}>{selected.value}</div> : <div className={`${styles[`piece_of_placeholder__${templateTextSelect}`]}`}>{placeholder}</div>;
  }

  return (
    <div role='button' className={`${styles.component} ${template ? styles[template] : ''}`} tabIndex={-1} onBlur={handleBlur}>
      <div className={`${styles.section} ${styles.sectionField}`}>
        <div {...settings}>
          {children}
          <input
            className={styles.hidden}
            ref={fieldRef}
            onChange={() => { }}
            value={selected ? selected.id : null}
          />
        </div>
      </div>
      <div className={`${styles.section} ${styles.sectionOptions}`} ref={optionsRef}>
        <div className={`${styles.options} ${styles[isOpen ? 'options--active' : 'options--inactive']}`}>
          <div ref={wrapperRef}>
            {value && value.map((option) => {
              const active = (multi && selected.includes(option.id)) || selected === option;
              const params = {
                onClick: () => handleSelect(option),
                className: `${styles.optionsSection} ${styles[active ? 'optionsSection--active' : 'optionsSection--inactive']}`
              };

              return (
                <div key={`${id}_${option.id}`} {...params}>
                  <div className={styles.value}>{option.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.sectionSelected}`}>
        {multi && (
          value.map((el) => {
            if (selected.includes(el.id)) {
              return (
                <div role='option' tabIndex={-1} key={el.id} onClick={() => handleSelect(el)} className={styles.selected}>
                  {el.value}
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Select;
