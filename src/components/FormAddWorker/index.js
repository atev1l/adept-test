import React, {useEffect, useState} from 'react';
import Modal from "../ui/Modal";
import styles from './FormAddWorker.module.css'
import Input from "../ui/Input";
import Button from "../ui/Button";
import {createWorker} from "../../asyncActions";
import {useDispatch} from "react-redux";
import generateUUID from "../../helpers/generateUUID";
import Select from "../ui/Select";

const FormAddWorker = ({isOpen, onClose, companiesList}) => {
    const dispatch = useDispatch()
    const [companiesListForWorker, setCompaniesListForWorker] = useState([]);
    const [state, setState] = useState({id: '', companyId: '', name: '', surname: '', position: ''})
    const handleAddWorker = () => {
        dispatch(createWorker({...state, id: generateUUID()}))
        onClose()
    }
    const handleChangeCompany = (id) => {
        setState({ ...state, companyId: id })
    }
    useEffect(() => {
        let list = []
        companiesList.map(item => {
            list.push({id: item.id, value: item.name})
        })
        setCompaniesListForWorker(list)

    }, [companiesList])
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} title="Добавление сотрудника">
                <div className={styles.input_company}>
                    <div className={styles.label_input}>
                        Фамилия
                    </div>
                    <Input size='big' defaultValue={state.surname} onChange={e => setState({ ...state, surname: e.target.value })} placeholder='Фамилия сотрудника' />
                </div>
                <div className={styles.input_address}>
                    <div className={styles.label_input}>
                        Имя
                    </div>
                    <Input size='big' defaultValue={state.name} onChange={e => setState({ ...state, name: e.target.value })} placeholder='Имя сотрудника' />
                </div>
                <div className={styles.input_address}>
                    <div className={styles.label_input}>
                        Долженность
                    </div>
                    <Input size='big' defaultValue={state.position} onChange={e => setState({ ...state, position: e.target.value })} placeholder='Долженность сотрудника' />
                </div>
                <div className={styles.input_address}>
                    <div className={styles.label_input}>
                        Выберите компанию
                    </div>
                    <Select
                        size='h60'
                        value={companiesListForWorker}
                        placeholder='Компания сотрудника'
                        defaultValue=''
                        onChange={(_, id) => handleChangeCompany(id)}
                        visibleFiveElements
                        template='orderForm'
                    />
                </div>
                <div className={styles.button_container}>
                    <Button color='white-green' text='Добавить' onClick={() => handleAddWorker()}/>
                </div>
            </Modal>
        </div>
    );
};

export default FormAddWorker;
