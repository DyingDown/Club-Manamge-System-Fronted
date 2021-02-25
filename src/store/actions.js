/**
 * 通过mutations间接更新state的多个方法的对象
 */
import {
    RECEIVE_USERINFO,
    CURRENT_EDIT_MESSAGE,
    USER_MESSAGES,
    CURRENT_EDIT_CLUB
} from './mutation-types'

export default {
    // 同步记录用户信息
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USERINFO, userInfo)
    },
    // 暂存消息编辑
    recordEditMessage({ commit }, currentEdit) {
        commit(CURRENT_EDIT_MESSAGE, currentEdit)
    },
    // record messages of user
    recordUserMessage({ commit }, userMessages) {
        commit(USER_MESSAGES, userMessages)
    },
    recordEditClub({ commit }, clubInfo) {
        commit(CURRENT_EDIT_CLUB, clubInfo)
    }
}