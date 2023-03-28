// import CardList from "../landingPage/components/cardList";
import { PageTitle } from "../../../_metronic/layout/core";
import { GetAllMyKB } from "./employeeKBListRedux/emplyoeeKBListCRUD";
import { useEffect, useState } from "react";
import { isEmptyArray } from "formik";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import useLoader from "../../hooks/useLoader";
import { Spinner } from "../../helpers/Spinner";
import TitleBar from "../landingPage/components/TitleBar";


const EmployeeListPage = () => {
    let token;
    if (Cookies.get('logintoken')) {
        token = Cookies.get('logintoken')
    } else {
        token = ""
    }
    const test: any = jwt_decode(token);

    const [myData, setMyData] = useState([]);

    /**
  * @Author 
  * @Method data
  * @Purpose this will show all the kb written by logedin user
  * @param {} 
  * @Since Oct 2022
 */

    const data = () => {
        GetAllMyKB({ email: test.device_token.email, practice: test.device_token.practice })
            .then((response: any) => {
                setMyData(response.data.result);
            })
            .catch((err: any) => {
                console.log("There is some error on server side");
            })
    }
    useEffect(() => {
        document.title = "DEV IT - My KBs";
        data();
    }, []);

    let emaillist = "";
    myData.forEach((element: any) => {
        emaillist += "," + element.created_by
    });
    const userEmailArray = emaillist.split(",")
    userEmailArray.shift();

    const isShown = useLoader();



    return (<>
        <PageTitle>My_KB_List</PageTitle>
        <TitleBar title="Add Post" label={"KBs"} url="addkb"
            page="mykbList" data={myData} userEmailArray={isEmptyArray(userEmailArray)} userlist={userEmailArray} isShown={isShown} />
    </>)

}

export default EmployeeListPage