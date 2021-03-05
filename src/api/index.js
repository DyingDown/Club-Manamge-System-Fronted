/*
 * 包含多个接口请求函数的模块
 * 函数的返回值：promise对象
 */
import ajax from './ajax'

const BASE_URL = '/api'
    // export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

/******* Login and  Register and Logout ********/
// username and password login
export const reqLogin = (userId, passWord) => ajax(BASE_URL + '/login', { username: userId, password: passWord }, 'POST')

// username and password register
export const reqRegister = (userId, userName, passWord1) => ajax(BASE_URL + '/register', { number: userId, nickname: userName, password: passWord1 }, 'POST')

// keep login status
export const reqIsLogged = () => ajax(BASE_URL + '/user/logged-user')

// login ip, device, time
export const reqLoginData = (userId) => ajax(`${BASE_URL}/user/${userId}/login-data`)

// logout
export const reqLogout = () => ajax(BASE_URL + '/logout', {}, 'POST')

/******** USER INFORMATION */
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


// modify userInfo when apply for a club
export const reqMSUserInfo = (userId, realname, sex, profession, tel, qq) =>
    ajax(`${BASE_URL}/user/${userId}/info`, { realname, sex, profession, tel, qq }, 'PUT')

// change password
export const reqChangePW = (old, newP) => ajax(`${BASE_URL}/user/password?oldPassword=${old}&newPassword=${newP}`, {}, 'PUT')


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

//get a clubs detail information
export const reqClubInfo = (clubId) => ajax(`${BASE_URL}/club/${clubId}/info`)

// a club's all message
export const reqClubMessages = (club_id) => ajax(`${BASE_URL}/club/${club_id}/message`)

// delete a message 
export const reqDeletMessage = (message_id) => ajax(`${BASE_URL}/message/${message_id}`, {}, 'DELETE')

// read a message
export const reqReadMessage = (message_id) => ajax(`${BASE_URL}/message/${message_id}/read`, {}, 'PUT')

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

// get all clubs and seperates
export const reqAllClubs = (pageSize, pageNum, progress) => ajax(BASE_URL + "/club", { pageSize, pageNum, progress })

// all clubs not seperate
export const reqAllClubsN = () => ajax(BASE_URL + "/club")

// delete a club
export const reqDeleteClub = (clubId) => ajax(`${BASE_URL}/club/${clubId}`, {}, 'DELETE')

// create club applications 
export const reqClubsInCheck = () => ajax(BASE_URL + "/club/apply")

// change a club's chairman
export const reqChangeChairman = (club_id, new_id) => ajax(`${BASE_URL}/club/${club_id}/president?newPresidentId=${new_id}`, {}, 'PUT')

// get my clubs
export const reqMyClubs = () => ajax(BASE_URL + "/user/joined-club")


/********** club members ***********/

// user of apply to join a club
export const reqClubApplys = (club_id, grade, introduction) => ajax(`${BASE_URL}/club/${club_id}/apply`, { grade, introduction }, "POST")

// all the members of a club
export const reqClubMembers = (club_id) => ajax(`${BASE_URL}/club/${club_id}/member`)

// change club member's role
export const reqChangeRole = (club_id, user_id, role) => ajax(`${BASE_URL}/club/${club_id}/user/${user_id}/role`, { role }, 'PUT')

// delete club member 
export const reqDeleteMember = (club_id, user_id) => ajax(`${BASE_URL}/club/${club_id}/user/${user_id}`, {}, 'DELETE')

/********* SEARCH ***********/
// search user through student ID
export const reqStudentId = (number, num, size) => ajax(`${BASE_URL}/search/user/number/${number}`, { pageNum: num, pageSize: size }, 'GET')

// search for clubs in join in club page
export const reqSearchClub = (word, num, size) => ajax(`${BASE_URL}/search/club/${word}`, { pageNum: num, pageSize: size, progress: 3 }, 'GET')