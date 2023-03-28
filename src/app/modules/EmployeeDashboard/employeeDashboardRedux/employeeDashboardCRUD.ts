import http from "../../../../commonhttps"

const KB_DASHBOARD_URL = `${process.env.REACT_APP_NODE_API_URL + "dashboard"}`

export function GetAllKbCount(){
    return http.PortThree.get(`${KB_DASHBOARD_URL}/getAllKbCount`);
}
export function GetKbPracticeCount(){
    return http.PortThree.get(`${KB_DASHBOARD_URL}/getKbPracticeCount`);
}
export function GetKbProjectCount(data: string){
    return http.PortThree.post(`${KB_DASHBOARD_URL}/getKbProjectCount`, { practice: data });
}
export function GetUnreviewedKbCount(){
    return http.PortThree.get(`${KB_DASHBOARD_URL}/getUnreviewedKbCount`);
}
export function KbPerTechnology(){
    return http.PortThree.get(`${KB_DASHBOARD_URL}/kbPerTechnology`);
}
export function KbPerResolvedIssue(){
    return http.PortThree.get(`${KB_DASHBOARD_URL}/kbPerResolvedIssue`);
}