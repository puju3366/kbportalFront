import httpCommon from "../../../../httpcommon"

const Global_URL = `${process.env.REACT_APP_NODE_API_URL + "kb"}`
const Approve_URL = `${process.env.REACT_APP_NODE_API_URL + "kbapprover"}`
const Dashboard_URL = `${process.env.REACT_APP_NODE_API_URL + "dashboard"}`

// To create new kb post
export function createModule(module: any) {
    return httpCommon.PortThree.post(`${Global_URL}/kb-create`, module);
}

// To Edit new kb post
export function editKb(module: any, id: any) {
    return httpCommon.PortThree.patch(`${Global_URL}/kb-update/` + id, module);
}
//Get kb data by id
export function getKBById(id: any) {
    return httpCommon.PortThree.get(`${Global_URL}/kb-getone/${id}`);
}
//Get kb comment list which is not approved
export function getKBComment(sort) {
    const order = sort.sort
    return httpCommon.PortThree.get(`${Global_URL}/kb-comment-details?sort=${order}`);
}
//Api for approving comment
export function getCommentApprove(data: any) {
    const { id, is_comment_approved } = data
    return httpCommon.PortThree.post(`${Approve_URL}/kbfeedback/` + id, { is_comment_approved });
}

//Get kb list                                                                                                      
export function getKBList(sort) {
    const order = sort.sort
    return httpCommon.PortThree.get(`${Global_URL}/kbapproved?sort=${order}&orderName=${sort.orderName}`);
}
//Api for approving kb
export function getKBApproved(data: any) {
    const { id, is_kb_approved,approve_reject_comment,created_by } = data
    return httpCommon.PortThree.post(`${Approve_URL}/kbvalidate/` + id, { is_kb_approved,approve_reject_comment,created_by });
}
//Get total count of kb
export function getAllKbCount() {
    return httpCommon.PortThree.get(`${Dashboard_URL}/getAllKbCount`);
}
// Get kb by month
export function getKBByMonth() {
    return httpCommon.PortThree.get(`${Dashboard_URL}/getkbbymonth`);
}
//Get kb per practice
export function getKbPracticeCount() {
    return httpCommon.PortThree.get(`${Dashboard_URL}/getKbPracticeCount`);
}
//Get employee data from rback
export function rbackEmployeeDataFetch(userEmailArray: any) {
    return httpCommon.PortThree.post(`${Global_URL}/employeeDetails`, { email: userEmailArray });
}
//Get categories list from database
export function getCategories() {
    return httpCommon.PortThree.get(`${Global_URL}/categories`)
}
//Get project list from database
export function getProject() {
    return httpCommon.PortThree.get(`${Global_URL}/project`)
}
//Get Practice list from Master practice table
export function getPractice() {
    return httpCommon.PortThree.get(`${Global_URL}/practice`)
}
//Get Team list from Master team table
export function getTeam() {
    return httpCommon.PortThree.get(`${Global_URL}/team`)
}

export function getQuarterOneCount(data: any) {
    return httpCommon.PortThree.post(`${Dashboard_URL}/getQuarterOneCount`, data)
}
export function getQuarterPreviousCount(data: any) {
    return httpCommon.PortThree.post(`${Dashboard_URL}/getQuarterOneCount`, data)
}
