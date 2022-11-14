const defaultState = {
    cats: [],
    after: ''
}

const GET_CATS = "GET_CATS"
export const catsReducer = (state = defaultState, action) => {
    switch (action.type){
        case GET_CATS:
            return {...state, cats: [...state.cats, ...action.payload.children], after: action.payload.after}
        default:
            return state
    }
}

export const getCats = (payload) => ({type: GET_CATS, payload})
