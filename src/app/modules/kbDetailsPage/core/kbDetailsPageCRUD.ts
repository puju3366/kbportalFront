import http from "../../../../commonhttps";

const KBAll_URL = `${process.env.REACT_APP_NODE_API_URL + "kb"}`

export function GetOneKB(id: number) {
  return http.PortThree.get(`${KBAll_URL}/kb-getone/${id}`);
}
export function getCommentsOfKB(id: number) {
  return http.PortThree.get(`${KBAll_URL}/getKBComments/${id}`);
}
export function postComments(data: any) {
  return http.PortThree.post(`${KBAll_URL}/kbComment`, data);
}
export function getRelatedPosts(tag: string, id: number) {
  return http.PortThree.post(`${KBAll_URL}/getRelativeKB`, { tag: tag, id: id })
}
export function getUserRatingofKB(data: any) {
  return http.PortThree.post(`${KBAll_URL}/getUserRating/${data.id}`, data)
}

export function getKbRatings(rating: any) {
  return http.PortThree.get(`${KBAll_URL}/getRating/${rating.kb_detail_id}`)
}
export function postRating(rating: any) {
  return http.PortThree.post(`${KBAll_URL}/postRating`, rating)
}

export function getKbViewCount(KbViewData: any) {
  return http.PortThree.get(`${KBAll_URL}/kbviewcount/${KbViewData.kb_detail_id}`)
}
export function checkIsView(KbViewData: any) {
  return http.PortThree.post(`${KBAll_URL}/checkingKBViews`, KbViewData)
}
export function postKbLike(KbLikeData: any) {
  return http.PortThree.post(`${KBAll_URL}/postKbLike`, KbLikeData)
}
export function kbPostViewed(KbViewData: any) {
  return http.PortThree.post(`${KBAll_URL}/enterViewedKBPost`, KbViewData)
}

export function isUseFul(isUseFuldata: any) {
  return http.PortThree.post(`${KBAll_URL}/isUseFul`, isUseFuldata)
}

export function rbackEmailFetch(userEmailArray: any) {
  return http.PortThree.post(`${KBAll_URL}/emailData`, { email: userEmailArray });
}