import axios from "axios";

export const AUTH_API_URL = process.env.NODE_AUTH_API_URL;
// const GETALLKB = 
// kb/kb-getall
 const PortThree =  axios.create({
    baseURL: 'https://adfsintegration.com/api/v1/',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ',
    }
  });

  export const PortOne = axios.create({
    baseURL:'https://rbac.devitsandbox.com/node/api/v1/user/user-details',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VfdG9rZW4iOnsiaWQiOjMxNywidXNlcm5hbWUiOiJBYmhpc2hlayBUaGFrYXIiLCJmaXJzdF9uYW1lIjoiQWJoaXNoZWsiLCJsYXN0X25hbWUiOiJUaGFrYXIiLCJyb2xlSWQiOiIxIiwiZW1haWwiOiJBYmhpc2hlay5UaGFrYXJAZGV2aXRwbC5jb20iLCJwaG9uZSI6bnVsbCwiaXNWZXJpZmllZCI6MSwicm9sZV9pZCI6IjEiLCJwcm9maWxlX2ltYWdlIjpudWxsLCJ1c2VyX3Blcm1pc3Npb24iOiJbe1wicmJhY1wiOntcIm1lbnVcIjpbXCJtZW51L2NyZWF0ZVwiLFwibWVudS9kZWxldGVcIixcIm1lbnUvdXBkYXRlXCIsXCJtZW51L3ZpZXdcIl0sXCJtb2R1bGVcIjpbXCJtb2R1bGUvY3JlYXRlXCIsXCJtb2R1bGUvZGVsZXRlXCIsXCJtb2R1bGUvdXBkYXRlXCIsXCJtb2R1bGUvdmlld1wiXSxcInJpZ2h0c1wiOltcInJpZ2h0cy9jcmVhdGVcIixcInJpZ2h0cy9kZWxldGVcIixcInJpZ2h0cy91cGRhdGVcIixcInJpZ2h0cy92aWV3XCJdLFwicm9sZVwiOltcInJvbGUvY3JlYXRlXCIsXCJyb2xlL2RlbGV0ZVwiLFwicm9sZS91cGRhdGVcIixcInJvbGUvdmlld1wiXSxcInVzZXJcIjpbXCJ1c2VyL2RlbGV0ZVwiLFwidXNlci91cGRhdGVcIixcInVzZXIvdmlld1wiLFwidXNlci9jcmVhdGVcIl0sXCJwb3J0YWxcIjpbXCJwb3J0YWwvY3JlYXRlXCIsXCJwb3J0YWwvZGVsZXRlXCIsXCJwb3J0YWwvdXBkYXRlXCIsXCJwb3J0YWwvdmlld1wiXX0sXCJwZXJzb25hXCI6e1wicGVyc29uYVwiOltcInBlcnNvbmEvaW1wb3J0XCIsXCJwZXJzb25hL2xpc3RcIixcInBlcnNvbmEvdXBkYXRlXCIsXCJwZXJzb25hL3ZpZXdcIl19fV0iLCJwZXJtaXNzaW9ucyI6Ilt7XCJyYmFjXCI6e1wibWVudVwiOltcIm1lbnUvY3JlYXRlXCIsXCJtZW51L2RlbGV0ZVwiLFwibWVudS91cGRhdGVcIixcIm1lbnUvdmlld1wiXSxcIm1vZHVsZVwiOltcIm1vZHVsZS9jcmVhdGVcIixcIm1vZHVsZS9kZWxldGVcIixcIm1vZHVsZS91cGRhdGVcIixcIm1vZHVsZS92aWV3XCJdLFwicmlnaHRzXCI6W1wicmlnaHRzL2NyZWF0ZVwiLFwicmlnaHRzL2RlbGV0ZVwiLFwicmlnaHRzL3VwZGF0ZVwiLFwicmlnaHRzL3ZpZXdcIl0sXCJyb2xlXCI6W1wicm9sZS9jcmVhdGVcIixcInJvbGUvZGVsZXRlXCIsXCJyb2xlL3VwZGF0ZVwiLFwicm9sZS92aWV3XCJdLFwidXNlclwiOltcInVzZXIvZGVsZXRlXCIsXCJ1c2VyL3VwZGF0ZVwiLFwidXNlci92aWV3XCIsXCJ1c2VyL2NyZWF0ZVwiXSxcInBvcnRhbFwiOltcInBvcnRhbC9jcmVhdGVcIixcInBvcnRhbC9kZWxldGVcIixcInBvcnRhbC91cGRhdGVcIixcInBvcnRhbC92aWV3XCJdfSxcInBlcnNvbmFcIjp7XCJwZXJzb25hXCI6W1wicGVyc29uYS9pbXBvcnRcIixcInBlcnNvbmEvbGlzdFwiLFwicGVyc29uYS91cGRhdGVcIixcInBlcnNvbmEvdmlld1wiXX19XSJ9LCJpYXQiOjE2NjMxMzY5MDl9.g5CZUmSKaon4Haj0ATfJbBOodcWldhaV9TEYM7BN6bI',
    }
  })
export default {PortThree,PortOne};
