
import { createMuiTheme } from "@material-ui/core/styles";


const SET_USE_DARK_THEME = "SET_USE_DARK_THEME";

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
    useDarkTheme: false, // 启用暗黑主题
    theme: lightTheme
});

// reducer
export default function setting(state = initSettings(), action) {
    switch (action.type) {
        case SET_USE_DARK_THEME:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
