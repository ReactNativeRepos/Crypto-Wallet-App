import * as tabActionTypes from './tabActions';

const initialStates = {
    isTradeModalVisible: false
}

const tabReducer = (state = initialStates, action) => {
    switch (action.type) {
        case tabActionTypes.SET_TRADE_MODAL_VISIBILITY:
            return {
                ...state,
                isTradeModalVisible: action.payload.isVisible
            }

        default:
            return state;
    }
}

export default tabReducer;