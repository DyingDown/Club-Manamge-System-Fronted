/**
 * 直接更新state的多个方法的对象
 */
import {
    RECEIVE_USERINFO,
    CURRENT_EDIT_MESSAGE,
    USER_MESSAGES,
    CURRENT_EDIT_CLUB,
    MY_JOINED_CLUBS
} from './mutation-types'

export default {
    [RECEIVE_USERINFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [CURRENT_EDIT_MESSAGE](state, currentEditMessage) {
        state.currentEditMessage = currentEditMessage
    },
    [USER_MESSAGES](state, userMessages) {
        state.userMessages = userMessages
    },
    [CURRENT_EDIT_CLUB](state, clubInfo) {
        state.currentEditClub = clubInfo
    },
    [MY_JOINED_CLUBS](state, myclubs) {
        state.myClubs = myclubs
    }
}