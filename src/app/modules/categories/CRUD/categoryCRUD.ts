import http from '../../../../commonhttps'

const KBGETALL_URL = `${process.env.REACT_APP_NODE_API_URL + "kb"}`

export default function addCategoryColor(data: any) {
  return http.PortThree.post(KBGETALL_URL + "/updateCategory", data);
}