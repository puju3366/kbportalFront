import http from "../../../../commonhttps";

const KBGETALL_URL = `${process.env.REACT_APP_NODE_API_URL + "kb"}`

export function GetAllMyKB(data: any) {
  return http.PortThree.post(KBGETALL_URL + "/employeeKB", data);
}
