import {
    getCompanies,
    addCompany,
    deleteCompany,
    updateCompany,
    deleteWorker,
    addWorker, updateWorker
} from "../store/companiesReducer";
import companies from "../items.json"

export const fetchCompanies = () => {
    const dataCompanies = JSON.parse(localStorage.getItem('companies'));
    if (dataCompanies) {
        return (dispatch) => {dispatch(getCompanies(dataCompanies))}
    } else {
        localStorage.setItem('companies', JSON.stringify(companies));
        return (dispatch) => {dispatch(getCompanies(companies))}
    }
}

export const createCompany = (item) => {
    return (dispatch) => dispatch(addCompany(item))
}

export const changeCompany = (item) => {
    return (dispatch) => dispatch(updateCompany(item))
}

export const removeCompany = (id) => {
    return (dispatch) => dispatch(deleteCompany(id))
}

export const createWorker = (item) => {
    return (dispatch) => dispatch(addWorker(item))
}

export const changeWorker = (item) => {
    return (dispatch) => dispatch(updateWorker(item))
}

export const removeWorker = (id, workersList) => {
    return (dispatch) => dispatch(deleteWorker({idCompanies: id, workersList: workersList}))
}
