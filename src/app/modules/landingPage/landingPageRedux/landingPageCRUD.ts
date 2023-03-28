import http from "../../../../commonhttps";

const KBGETALL_URL = `${process.env.REACT_APP_NODE_API_URL + "kb"}`

//get all kb
export function GetAllKB(data: string) {
    return http.PortThree.post(KBGETALL_URL + "/kb-getall", { practice: data });
}
export function GetAllKBByCat(data: string) {
    return http.PortThree.post(KBGETALL_URL + "/kb-getallByCat", { category: data });
}
//get all employee data
export function getallEmployeeData(userEmails: any) {
    return http.PortThree.post(KBGETALL_URL + "/employeeDetails", { email: userEmails });
}
//get data by title in search
export function searchKb(data: any) {
    return http.PortThree.post(KBGETALL_URL + "/kbSearch", data);
}

export function getMenuToken(data: any) {
    return http.PortThree.post(KBGETALL_URL + "/menudata", data);
}

