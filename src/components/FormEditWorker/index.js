import React, {useEffect, useState} from 'react';
import Modal from "../ui/Modal";
import styles from './FormEditWorker.module.css'
import Input from "../ui/Input";
import Button from "../ui/Button";
import {changeWorker} from "../../asyncActions";
import {useDispatch} from "react-redux";
import Select from "../ui/Select";

const FormEditWorker = ({isOpen, onClose, worker, companiesList}) => {
    const dispatch = useDispatch()
    const [companiesListForWorker, setCompaniesListForWorker] = useState([]);
    const [state, setState] = useState({id: '', companyId: '', name: '', surname: '', position: '', oldCompanyId: ''})
    const handleAddWorker = () => {
        dispatch(changeWorker({...state}))
        onClose()
    }
    const handleChangeCompany = (id) => {
        setState({ ...state, companyId: id })
    }

    useEffect(() => {
        setState({
            ...state,
            id: worker?.id,
            companyId: state.companyId ? state.companyId : worker?.companyId,
            name: worker?.name,
            surname: worker?.surname,
            position: worker?.position,
            oldCompanyId: worker?.companyId
        })
    }, [worker])

    useEffect(() => {
        let list = []
        companiesList.map(item => {
            list.push({id: item.id, value: item.name})
        })
        setCompaniesListForWorker(list)

    }, [companiesList])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} title="Редактирование сотрудника">
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
                        placeholder={worker?.companyId ? companiesList?.filter(item => item.id === worker?.companyId)['0'].name : 'Выберите из списка' }
                        onChange={(_, id) => handleChangeCompany(id)}
                        visibleFiveElements
                        template='orderForm'
                    />
                </div>
                <div className={styles.button_container}>
                    <Button color='white-green' text='Изменить' onClick={() => handleAddWorker()}/>
                </div>
            </Modal>
        </div>
    );
};

export default FormEditWorker;
