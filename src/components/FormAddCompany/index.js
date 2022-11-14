import React, {useState} from 'react';
import Modal from "../ui/Modal";
import styles from './FormAddCompany.module.css'
import Input from "../ui/Input";
import Button from "../ui/Button";
import {createCompany} from "../../asyncActions";
import {useDispatch} from "react-redux";
import generateUUID from "../../helpers/generateUUID";

const FormAddCompany = ({isOpen, onClose}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({id: '', name: '', address: '', workers: []})
    const handleAddCompany = () => {
        dispatch(createCompany([{...state, id: generateUUID()}]))
        onClose()
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} title="Добавление компании">
                <div className={styles.input_company}>
                    <div className={styles.label_input}>
                        Компания
                    </div>
                    <Input size='big' defaultValue={state.name} onChange={e => setState({ ...state, name: e.target.value })} placeholder='Имя компании' />
                </div>
                <div className={styles.input_address}>
                    <div className={styles.label_input}>
                        Адрес
                    </div>
                    <Input size='big' defaultValue={state.address} onChange={e => setState({ ...state, address: e.target.value })} placeholder='Адрес компании' />
                </div>
                <div className={styles.button_container}>
                    <Button color='white-green' text='Добавить' onClick={() => handleAddCompany()}/>
                </div>
            </Modal>
        </div>
    );
};

export default FormAddCompany;
