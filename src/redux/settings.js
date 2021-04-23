
import { createMuiTheme } from "@material-ui/core/styles";

// types
const SET_FIRST_DAY_SHOW = "SET_FIRST_DAY_SHOW";
const SET_UNIT_IN_MONTH = "SET_UNIT_IN_MONTH";
const SET_USE_DARK_THEME = "SET_USE_DARK_THEME";

// actions
export const setFirstDayShow = (dispatch, data) => {
    return dispatch({
        type: SET_FIRST_DAY_SHOW,
        data: {
            firstDayToShow: data,
        },
    });
};

export const setUnitInMonth = (dispatch, data) => {
    return dispatch({
        type: SET_FIRST_DAY_SHOW,
        data: {
            unitInMonth: data,
        },
    });
};

export const setUseDakTheme = (dispatch, data) => {
    return dispatch({
        type: SET_USE_DARK_THEME,
        data: {
            useDarkTheme: data,
            theme: data ? darkTheme : lightTheme
        },
    });
};

const lightTheme = createMuiTheme({
    // spacing: 8,
    overrides: {
        // MuiAppBar: {
        //   colorPrimary: {
        //     backgroundColor: "#f1f1f1",
        //   },
        // },
    },
    palette: {
        type: "light",
        // background: {
        //   paper: "#424242",
        //   default: "#303030",
        // },
    },
    props: {
        MuiAppBar: {
            variant: "elevation",
        },
    },
});

const darkTheme = createMuiTheme({
    // spacing: 8,
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: "#1c1c1c",
            },
        },
    },
    palette: {
        type: "dark",
        background: {
            paper: "#424242",
            default: "#303030",
        },
    },
    props: {
        MuiAppBar: {
            variant: "elevation",
        },
    },
});

// init functions
const initSettings = () => ({
    firstDayToShow: 0, // 第一天默认是星期天，星期一为1，以此类推
    unitInMonth: false, // 默认都展示
    useDarkTheme: false, // 启用暗黑主题
    theme: lightTheme
});

// reducer
export default function setting(state = initSettings(), action) {
    switch (action.type) {
        case SET_FIRST_DAY_SHOW:
            return Object.assign({}, state, action.data);
        case SET_UNIT_IN_MONTH:
            return Object.assign({}, state, action.data);
        case SET_USE_DARK_THEME:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
