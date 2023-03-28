import { PageLink, PageTitle } from '../../../_metronic/layout/core';
import KBDetailsPage from './components/kbDetails/kbDetails';
import { useLocation } from "react-router";
import { useState, useEffect } from 'react';
import { GetOneKB, getCommentsOfKB, getRelatedPosts, getUserRatingofKB } from './core/kbDetailsPageCRUD';
import useLoader from '../../hooks/useLoader';
import { Spinner } from '../../helpers/Spinner';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';

const KBdetailsPagge = () => {


    const [kb, setKB] = useState({});
    const [state, setState] = useState({
        kbUserEmail: "",
        onlyComments: [],
        relatedPosts: {},
        tags: "",
        rating: 0,
    })
    const location = useLocation();
    const kbID = location.pathname.split("/details-page/");
    kbID.shift();
    const id = parseInt(kbID.toString());
    const usersBreadcrumbs: Array<PageLink> = [
        {
            title: "KB_List",
            path: `/kblist`,
            isSeparator: false,
            isActive: false,
        },
        {
            title: "",
            path: '',
            isSeparator: true,
            isActive: false,
        },
    ]

    /* To get user specific data
    Here test includes logged in user email through which we get 
    rating count created by him
    */

    let token;
    if (Cookies.get('logintoken')) {
        token = Cookies.get('logintoken')
    } else {
        token = ""
    }
    const test: any = jwt_decode(token);

    const detail = {
        id: id,
        rated_by: test.device_token.email
    }

    /**
  * @Author 
  * @Method onLoadPage
  * @Purpose To retrieve kb detail page by id
  * @param {} 
  * @Since Oct 2022
 */

    const onLoadPage = () => {
        GetOneKB(id)
            .then((response: any) => {
                setKB({ data: response.data.items.result, msg: response.data.items.msg });
                setState(prev => ({ ...prev, tags: response.data.items.result[0].tag }));
                setState(prev => ({ ...prev, kbUserEmail: response.data.items.result[0].created_by }))
                getCommentsOfKB(response.data.items.result[0].id)
                    .then((res: any) => {
                        if (res.data.code === undefined) {
                            setState(prev => ({ ...prev, onlyComments: res.data.items.result }))
                            getRelatedPosts(response.data.items.result[0].tag, response.data.items.result[0].id)
                                .then((relatedPosts: any) => {
                                    setState(prev => ({ ...prev, relatedPosts: relatedPosts.data.items }))

                                })
                                .catch(error => {
                                    toast.error("Something Went Wrong !")
                                })
                        }
                        else if (res.data.code === 500) {
                            getRelatedPosts(response.data.items.result[0].tag, response.data.items.result[0].id)
                                .then((relatedPosts: any) => {
                                    relatedPosts.data.items ?  setState(prev => ({ ...prev, relatedPosts: relatedPosts.data.items })) :
                                    setState(prev => ({ ...prev, relatedPosts: {} }))

                                })
                                .catch(error => {
                                   toast.error("Something Went Wrong !")
                                })
                        }
                    })
                    .catch(err => {
                        toast.error("Something Went Wrong !")
                    })

                getUserRatingofKB({ detail })
                    .then((res: any) => {
                        res.data.items.result.rating ? setState(prev => ({ ...prev, rating: res.data.items.result.rating })) :
                            setState(prev => ({ ...prev, rating: 0 }))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch((err: any) => {
            })
    }

    useEffect(() => {
        return onLoadPage()
    }, [])

    let emaillist = "";
    state.onlyComments.forEach((element: any) => {
        emaillist += "," + element.created_by
    });
    const userEmailArray = emaillist.split(",")
    userEmailArray.shift()

    const isShown = useLoader();
    const arr = state.tags ? state.tags.split(',') : "";

    return (<>
    <ToastContainer/>
        <PageTitle breadcrumbs={usersBreadcrumbs}>KB_Details</PageTitle>
        {isShown ? <KBDetailsPage data={kb} kbUserEmail={state.kbUserEmail} relatedPosts={state.relatedPosts} comments={state.onlyComments}
            ratings={state.rating}
            tags={arr}
            currUser={test.device_token.email}
            type="employeeKbList" page="kbDetail">{userEmailArray}</KBDetailsPage> : <Spinner />}

    </>)
}
export default KBdetailsPagge

