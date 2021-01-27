// types
const SET_FIRST_DAY_SHOW = 'SET_FIRST_DAY_SHOW'
const SET_UNIT_IN_MONTH = 'SET_UNIT_IN_MONTH'

// actions
export const setFirstDayShow = (dispatch, data) => {
    return dispatch({
        type: SET_FIRST_DAY_SHOW,
        data: {
            firstDayToShow: data
        }
    })
}

export const setUnitInMonth = (dispatch, data) => {
    return dispatch({
        type: SET_FIRST_DAY_SHOW,
        data: {
            unitInMonth: data
        }
    })
}


// init functions
const initSettings = () => ({
    firstDayToShow: 0, // 第一天默认是星期天，星期一为1，以此类推
    unitInMonth: false, // 默认都展示 
})

// reducer
export default function setting(state = initSettings(), action) {
    switch (action.type) {
        case SET_FIRST_DAY_SHOW: return Object.assign(state, action.data)
        case SET_UNIT_IN_MONTH: return Object.assign(state, action.data)
        default: return state
    }
}
