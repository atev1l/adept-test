import companies from "../items.json";

const defaultState = {
    data: [],
}

const GET_COMPANIES = "GET_COMPANIES"
const ADD_COMPANY = "GET_COMPANY"
const DELETE_COMPANY = "DELETE_COMPANY"
const UPDATE_COMPANY = "UPDATE_COMPANY"
const DELETE_WORKER = "DELETE_WORKER"
const ADD_WORKER = "ADD_WORKER"
const UPDATE_WORKER = "UPDATE_WORKER"

export const companiesReducer = (state = defaultState, action) => {
    switch (action.type){
        case GET_COMPANIES:
            return {...state, data: [...state.data, ...action.payload]}

        case ADD_COMPANY:
            console.log(action.payload, 'companiya')
            localStorage.setItem('companies', JSON.stringify([...state.data, ...action.payload]));
            return {...state, data: [...state.data, ...action.payload]}

        case UPDATE_COMPANY:
            localStorage.setItem('companies', JSON.stringify(state.data.map(item => {
                if (item.id === action.payload['0'].id){
                    return action.payload['0']
                }

                return item
            })));
            return {...state, data: state.data.map(item => {
                if (item.id === action.payload['0'].id){
                        return action.payload['0']
                    }

                    return item
                })
            }

        case DELETE_COMPANY:
            localStorage.setItem('companies', JSON.stringify(state.data.filter(item => !action.payload.includes(item.id))));
            return {data: state.data.filter(item => !action.payload.includes(item.id))}

        case ADD_WORKER:
            localStorage.setItem('companies', JSON.stringify(state.data.map(item => {
                if (item.id === action.payload.companyId) {
                    item.workers = [...item.workers, ...[action.payload]]
                }
                return item
            })));

            return {...state, data: JSON.parse(localStorage.getItem('companies'))}

        case UPDATE_WORKER:
            localStorage.setItem('companies', JSON.stringify(state.data.map(item => {
                if (item.id === action.payload.oldCompanyId) {
                    item.workers = [...item.workers.filter(item => item.id !== action.payload.id)]
                }
                if (item.id === action.payload.companyId) {
                    item.workers = [...item.workers.filter(item => item.id !== action.payload.id), ...[action.payload]]
                }
                return item
            })));

            return {...state, data: JSON.parse(localStorage.getItem('companies'))}

        case DELETE_WORKER:
            localStorage.setItem('companies', JSON.stringify(state.data.map(item => {
                if (item.workers) {
                    item.workers = item.workers.filter(item => !action.payload.workersList.includes(item.id))
                }
                return item
            })));

            return {
                data: state.data.map(item => {
                    if (item.workers) {
                        item.workers = item.workers.filter(item => !action.payload.workersList.includes(item.id))
                    }
                    return item
                })
            }
        default:
            return state
    }
}

export const getCompanies = (payload) => ({type: GET_COMPANIES, payload})
export const addCompany = (payload) => ({type: ADD_COMPANY, payload})
export const updateCompany = (payload) => ({type: UPDATE_COMPANY, payload})
export const deleteCompany = (payload) => ({type: DELETE_COMPANY, payload})
export const deleteWorker = (payload) => ({type: DELETE_WORKER, payload})
export const addWorker = (payload) => ({type: ADD_WORKER, payload})
export const updateWorker = (payload) => ({type: UPDATE_WORKER, payload})
