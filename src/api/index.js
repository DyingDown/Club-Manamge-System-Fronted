/*
 * 包含多个接口请求函数的模块
 * 函数的返回值：promise对象
 */
import ajax from './ajax'

const BASE_URL = '/api'
    // export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

/******* Login and  Register ********/
// username and password login
export const reqLogin = (userId, passWord) => ajax(BASE_URL + '/login', { username: userId, password: passWord }, 'POST')

// username and password register
export const reqRegister = (userId, userName, passWord1) => ajax(BASE_URL + '/register', { number: userId, nickname: userName, password: passWord1 }, 'POST')

// keep login status
export const reqIsLogged = () => ajax(BASE_URL + '/user/logged-user')

// get user info
export const reqUserInfo = (userId) => ajax(`${BASE_URL}/user/${userId}/info`)

// modify user info
export const reqMUserInfo = (userId, nickname, realname,
    sex, enrollmentDate, graduationDate, avatarId,
    profession, email, tel, qq, introduction
) => ajax(`${BASE_URL}/user/${userId}/info`, {
    nickname,
    realname,
    sex,
    enrollmentDate,
    graduationDate,
    avatarId,
    profession,
    email,
    tel,
    qq,
    introduction
}, 'PUT')

// modify contact info of user
export const reqMContactInfo = (userId, realname, email, tel, profession) =>
    ajax(`${BASE_URL}/user/${userId}/info`, { realname, email, tel, profession }, 'PUT')

// change password
export const reqChangePW = (userId, password) => ajax(`${BASE_URL}/user/${userId}/info`, { password }, 'PUT')


/******* club items *********/
// save club application
export const reqClubApplication = (name, type, initiatorId, consultantName,
    consultantTel, coreValues,
    plans, practicallyAnalysis,
    progress
) => ajax(BASE_URL + '/club', {
    name,
    type,
    initiatorId,
    consultantName,
    consultantTel,
    coreValues,
    plans,
    practicallyAnalysis,
    progress
}, 'POST')

// modify club application
export const reqMClubApplication = (club_id, avatarId, introduction, progress) => ajax(`${BASE_URL}/club/${club_id}/info`, { avatarId, introduction, progress }, 'PUT')

// approve a club 
export const reqApproveClub = (club_id, progress) => ajax(`${BASE_URL}/club/${club_id}/info`, { progress }, 'PUT')
    // post a new message
export const reqNewMessage = (title, content, clubId, draftMark, type, authorId) => ajax(BASE_URL + '/message', { title, content, clubId, draftMark, type, authorId }, "POST")

// a club's all message
export const reqClubMessages = (club_id) => ajax(`${BASE_URL}/club/${club_id}/message`)

// delete a message 
export const reqDeletMessage = (message_id) => ajax(`${BASE_URL}/message/${message_id}`, {}, 'DELETE')

// post a draft message
export const reqPostDraft = (message_id, draftMark) => ajax(`${BASE_URL}/message/${message_id}`, { draftMark }, 'PUT')

// modify a draft message
export const reqModifyDraft = (message_id, draftMark, title, content, type, authorId, ) => ajax(`${BASE_URL}/message/${message_id}`, { draftMark, title, content, type, authorId }, 'PUT')

// get the picture
export const reqGetImage = (avatar_id) => ajax(`${BASE_URL}/image/${avatar_id}`)

// get user's message
export const reqGetUserMessage = () => ajax(`${BASE_URL}/user/messages`)

// get a message's detail information
export const reqGetMesssageDetail = (message_id) => ajax(`${BASE_URL}/message/${message_id}`)

// my created clubs
export const reqMyCreateClub = () => ajax(BASE_URL + "/user/created-club")

// get all clubs
export const reqAllClubs = () => ajax(BASE_URL + "/club")

// get clubs application 
export const reqClubsInCheck = () => ajax(BASE_URL + "/club/apply")