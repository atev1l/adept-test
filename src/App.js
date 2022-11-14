import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchCompanies, removeCompany, removeWorker} from "./asyncActions";
import {useEffect, useState} from "react";
import Checkbox from "./components/ui/Checkbox";
import Button from "./components/ui/Button";
import FormAddCompany from "./components/FormAddCompany";
import FormEditCompany from "./components/FormEditCompany";
import FormAddWorker from "./components/FormAddWorker";
import FormEditWorker from "./components/FormEditWorker";

const App = () => {
    const dispatch = useDispatch()
    const companiesList = useSelector(state => state?.companies.data)
    const [workersList, setWorkersList] = useState([])
    const [checkboxAllCompanies, setCheckboxAllCompanies] = useState(false)
    const [checkboxAllWorkers, setCheckboxAllWorkers] = useState(false)
    const [modalFormAddCompany, setModalFormAddCompany] = useState(false)
    const [modalFormAddWorker, setModalFormAddWorker] = useState(false)
    const [modalFormEditCompany, setModalFormEditCompany] = useState(false)
    const [modalFormEditWorker, setModalFormEditWorker] = useState(false)
    const [activeCompaniesCheckboxes, setActiveCompaniesCheckbox] = useState([])
    const [activeWorkersCheckboxes, setActiveWorkersCheckbox] = useState([])

    const handleAddCompany = () => {
        setModalFormAddCompany(!modalFormAddCompany)
    }

    const handleAddWorker = () => {
        setModalFormAddWorker(!modalFormAddWorker)
    }
    const handleEditCompany = () => {
        console.log(activeCompaniesCheckboxes, 'chec')
        console.log(activeCompaniesCheckboxes.length, 'cgeck dlina')
        if (activeCompaniesCheckboxes[0] && activeCompaniesCheckboxes.length < 2) {
            setModalFormEditCompany(!modalFormEditCompany)
        } else {
            alert('Выберите для редактирования одну компанию')
        }
    }

    const handleEditWorker = () => {
        if (activeWorkersCheckboxes[0] && activeWorkersCheckboxes.length < 2){
            setModalFormEditWorker(!modalFormEditWorker)
        } else {
            alert('Выберите для редактирования одного сотрудника')
        }
    }

    const handleDeleteCompany = (id) => {
        dispatch(removeCompany(id))
    }
    const handleDeleteWorker = (id, workersList) => {
        dispatch(removeWorker(id, workersList))
    }

    const handleAddCheckboxCompanyInList = (id) => {
        setActiveCompaniesCheckbox([...activeCompaniesCheckboxes, ...[id]])
        setActiveWorkersCheckbox([])
        setCheckboxAllWorkers(false)
    };
    const handleRemoveCheckboxCompanyInList = (id) => {
        setActiveCompaniesCheckbox(activeCompaniesCheckboxes.filter(item => item !== id))
        setActiveWorkersCheckbox([])
        setCheckboxAllWorkers(false)
    };
    const handleAddCheckboxWorkerInList = (id) => {
        setActiveWorkersCheckbox([...activeWorkersCheckboxes, ...[id]])
    };
    const handleRemoveCheckboxWorkerInList = (id) => {
        setActiveWorkersCheckbox(activeWorkersCheckboxes.filter(item => item !== id))
    };

    const handleChecking = (id) => {
        return !!activeCompaniesCheckboxes.filter(item => item === id).length
    }

    const handleCheckingWorker = (id) => {
        return !!activeWorkersCheckboxes.filter(item => item === id).length
    }

    const handleCheckingAllCompanies = (valueCheckbox) => {
        setCheckboxAllCompanies(valueCheckbox)
        if (valueCheckbox) {
            let activeList = []
            companiesList.forEach(item => activeList.push(item.id))
            setActiveCompaniesCheckbox(activeList)
            setActiveWorkersCheckbox([])
            setCheckboxAllWorkers(false)
        } else {
            setCheckboxAllCompanies(valueCheckbox)
            setActiveCompaniesCheckbox([])
        }
    }
    const handleCheckingAllWorkers = (valueCheckbox) => {
        setCheckboxAllWorkers(valueCheckbox)
        if (valueCheckbox) {
            setActiveWorkersCheckbox(workersList.map(item => item.id))
        } else {
            setCheckboxAllWorkers(valueCheckbox)
            setActiveWorkersCheckbox([])
        }
    }
    const handleCheckWorkers = () => {
        return activeCompaniesCheckboxes.length &&
            companiesList.filter(item => activeCompaniesCheckboxes.includes(item.id)) &&
            companiesList.filter(item => activeCompaniesCheckboxes.includes(item.id)).map(({workers}) => workers)
    }

    const handleGetWorkers = () => {
        let workersList = []
        if (handleCheckWorkers()){
            companiesList.filter(item => activeCompaniesCheckboxes.includes(item.id)).map(({workers}) => {
                if (workers) workersList = [...workersList, ...workers]
            })
        }
        setWorkersList(workersList)
    }

    useEffect(() => {
        handleGetWorkers()
    }, [companiesList, activeCompaniesCheckboxes])

    useEffect(()=>{
        dispatch(fetchCompanies())
    }, [dispatch])

    return (
        <div className="App">
            <FormAddCompany onClose={setModalFormAddCompany} isOpen={modalFormAddCompany}/>
            <FormAddWorker onClose={setModalFormAddWorker} isOpen={modalFormAddWorker} companiesList={companiesList}/>
            <FormEditWorker
                onClose={setModalFormEditWorker}
                companiesList={companiesList}
                isOpen={modalFormEditWorker}
                worker={workersList.filter(item => item.id === activeWorkersCheckboxes[0])[0]}
            />
            <FormEditCompany
                company={companiesList?.filter(item => item.id === activeCompaniesCheckboxes[0])['0']}
                onClose={setModalFormEditCompany}
                isOpen={modalFormEditCompany}
            />
            <div className="card-table__container company-table">
                <div className="buttons_container">
                    <div className="table_label">
                        Компании
                    </div>
                    <div className="buttons_container__items">
                        <Button onClick={() => handleAddCompany()} text='Добавить' color='white-green' ></Button>
                        <Button onClick={() => handleEditCompany()} text='Редактировать' ></Button>
                        <Button onClick={() => handleDeleteCompany(activeCompaniesCheckboxes)} color='red' text='Удалить' ></Button>
                    </div>
                </div>
                <div className="scroll-table">
                    <table>
                        <thead>
                            <tr align="center" style={{borderBottom: '1px solid #eee'}}>
                                <th colSpan="125" bgcolor="#D3EDF6" align="center">
                                    <div className="select_all">
                                        <div className="select_all__checkbox">
                                            <Checkbox
                                                checked={checkboxAllCompanies}
                                                handleCheck={() => handleCheckingAllCompanies(!checkboxAllCompanies)}
                                            />
                                        </div>
                                        <div className="text">Выделить все</div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th colSpan='10'></th>
                                <th className="word-wrap" colSpan='35'>Название компании</th>
                                <th className="word-wrap" colSpan='40'>Количество сотрудников</th>
                                <th className="word-wrap" colSpan='40'>Адрес</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="scroll-table-body">
                        <table>
                            <tbody>
                            {companiesList.map(item => (
                                <tr className={`${activeCompaniesCheckboxes.includes(item.id) ? 'tr_row-color' : ''}`} key={item.id}>
                                    <td className="td_checkbox">
                                        <Checkbox
                                            checked={handleChecking(item.id)}
                                            handleCheck={() => handleChecking(item.id) ? handleRemoveCheckboxCompanyInList(item.id) : handleAddCheckboxCompanyInList(item.id)}
                                        />
                                    </td>
                                    <td className="word-wrap">{item.name}</td>
                                    <td>{item.workers?.length ? item.workers.length : 0}</td>
                                    <td className="word-wrap">{item.address}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card-table__container">
                <div className="buttons_container">
                    <div className="table_label">
                        Сотрудники
                    </div>
                    <div className="buttons_container__items">
                        <Button onClick={() => handleAddWorker()} text='Добавить' color='white-green' ></Button>
                        {handleCheckWorkers()  && workersList.length ?
                            <>
                                <Button onClick={() => handleEditWorker()} text='Редактировать' ></Button>
                                <Button onClick={() => handleDeleteWorker(activeCompaniesCheckboxes, activeWorkersCheckboxes)} color='red' text='Удалить' ></Button>
                            </> : null
                        }
                    </div>
                </div>
                {handleCheckWorkers() && workersList.length ?
                    <div className="scroll-table">
                        <table>
                            <thead>
                            <tr align="center" style={{borderBottom: '1px solid #eee'}}>
                                <th colSpan="125" bgcolor="#D3EDF6" align="center">
                                    <div className="select_all">
                                        <div className="select_all__checkbox">
                                            <Checkbox
                                                checked={checkboxAllWorkers}
                                                handleCheck={() => handleCheckingAllWorkers(!checkboxAllWorkers)}
                                            />
                                        </div>
                                        <div className="text">Выделить все</div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="word-wrap" colSpan='10'></th>
                                <th className="word-wrap" colSpan='35'>Фамилия</th>
                                <th className="word-wrap" colSpan='40'>Имя</th>
                                <th className="word-wrap" colSpan='40'>Долженность</th>
                            </tr>
                            </thead>
                        </table>
                        <div className="scroll-table-body" id="scroll-table-workers">
                            <table>
                                <tbody id="workers">
                                {workersList.length ? (
                                    <>
                                        {workersList.map(item => (
                                            <tr className={`${activeCompaniesCheckboxes.includes(item.id) ? 'tr_row-color' : ''}`} key={item.id}>
                                                <td className="td_checkbox">
                                                    <Checkbox
                                                        checked={handleCheckingWorker(item.id)}
                                                        handleCheck={() => handleCheckingWorker(item.id) ? handleRemoveCheckboxWorkerInList(item.id) : handleAddCheckboxWorkerInList(item.id)}
                                                    />
                                                </td>
                                                <td className="word-wrap">{item.name}</td>
                                                <td>{item.surname}</td>
                                                <td className="word-wrap">{item.position}</td>
                                            </tr>
                                        ))}
                                    </>
                                ) : null}
                                </tbody>
                            </table>
                        </div>
                    </div> : null
                }

            </div>
        </div>
  );
}

export default App;
