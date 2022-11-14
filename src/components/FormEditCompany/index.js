import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {changeCompany} from "../../asyncActions";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import styles from './FormEditCompany.module.css'

const FormEditCompany = ({company, isOpen, onClose}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        id: '',
        name: '',
        address: '',
        workers: []
    })
    const handleEditCompany = () => {
        dispatch(changeCompany([state]))
        onClose()
    }
    useEffect(() => {
        setState({
            ...state,
            id: company?.id,
            name: company?.name,
            address: company?.address,
            workers: company?.workers
        })
    }, [company])
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} title="Редактирование компании">
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
                    <Button color='blue' text='Редактировать' onClick={() => handleEditCompany()}/>
                </div>
            </Modal>
        </div>
    );
};

export default FormEditCompany;
