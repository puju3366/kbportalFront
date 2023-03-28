import { PageTitle } from "../../../_metronic/layout/core";
import { useEffect, useState } from "react";
import {
    GetKbProjectCount,
    GetAllKbCount,
    GetUnreviewedKbCount,
    KbPerResolvedIssue,
} from "./employeeDashboardRedux/employeeDashboardCRUD";
import {
    MixedWidget2,
} from "../CommonComponents/coponentIndex";
import useLoader from "../../hooks/useLoader";
import { Spinner } from "../../helpers/Spinner";
import PracticePerCount from "../practice/components/AdminDashboard/PracticePerCount";
import KbPerProject from "./Pages/KbPerProject";
import TechnologyPerKb from "./Pages/TechnologyPerKb";
import { KbReview } from "./Pages/KbReview";
import { KbRequestResolved } from "./Pages/KbRequestResolved";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";


const DashboardPage = (props: any) => {
    return (<>
        <div className="toolbar" id="kt_toolbar">
            <div id="kt_toolbar_container" className="d-flex flex-stack">
                <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
                    <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">Dashboard</h1>
                </div>
            </div>
        </div>
        {/* begin::Row */}
        {/* <div className="row mx-5 my-5 breadcrum">
        Dashboard
        </div> */}
        <div className='row gy-5 g-xl-12'>
            <div className='col-xxl-4'>
                <MixedWidget2
                    allKbCount={props.allKbCount}
                    className='card-xl-stretch mb-xl-8'
                    chartColor='danger'
                    chartHeight='200px'
                    strokeColor='#cb1e46'
                />
            </div>
            <div className='col-xxl-4'>
                <KbReview
                    unreviewedKbCount={props.unreviewedKbCount}
                    className='card-xl-stretch mb-xl-8'
                    chartColor='danger'
                    chartHeight='200px'
                    strokeColor='#cb1e46'
                />
            </div>
            <div className='col-xxl-4'>
                <KbRequestResolved
                    kbPerResolvedIssue={props.kbPerResolvedIssue}
                    className='card-xl-stretch mb-xl-8'
                    chartColor='danger'
                    chartHeight='200px'
                    strokeColor='#cb1e46'
                />
            </div>
            {/* <div className='col-xxl-4'>
                <ListsWidget5 className='card-xxl-stretch' />
            </div> */}
            <div className='col-xxl-4'>
                <PracticePerCount />
            </div>
            <div className='col-xxl-4'>
                <KbPerProject />
            </div>
            <div className='col-xxl-4'>
                <TechnologyPerKb />
            </div>

        </div>

        {/* end::Row */}
    </>)
}
const EmployeeDashboardPage = () => {

    const [state, setState] = useState({
        kbProjectCount: [],
        allKbCount: [],
        unreviewedKbCount: [],
        kbPerResolvedIssue: []
    })

    let token;

    if (Cookies.get('logintoken')) {
        token = Cookies.get('logintoken')
    } else {
        token = ""
    }
    var practice: any = jwt_decode(token);

    const dashboardDataToFetch = () => {
        GetKbProjectCount(practice.device_token.practice)
            .then((response: any) => {
                setState(prev => ({ ...prev, kbProjectCount: response.data.items.result }))

            })
            .catch(err => {
                console.log(`error OnloadPageFetchData ${err}`)
            })

        GetAllKbCount()
            .then((response: any) => {
                setState(prev => ({ ...prev, allKbCount: response.data.items.result }))

            })
            .catch(err => {
                console.log(`GetAllKbCount Error, ${err}`)
            })

        GetUnreviewedKbCount()
            .then((response: any) => {
                setState(prev => ({ ...prev, unreviewedKbCount: response.data.items.result }))
            })
            .catch(err => {
                console.log(`error GetUnreviewedKbCount, ${err}`)
            })

        KbPerResolvedIssue()
            .then((response: any) => {
                setState(prev => ({ ...prev, kbPerResolvedIssue: response.data.items.result }))
            })
            .catch(err => {
                console.log(`error KbPerResolvedIssue, ${err}`)
            })
    }

    useEffect(() => {
        document.title = "DEV IT - Dashboard";
        dashboardDataToFetch()
    }, [state.kbProjectCount.length])

    const isShown = useLoader();

    return (
        <>
            <PageTitle breadcrumbs={[]}>Employee Dashboard Page</PageTitle>
            {isShown ? <DashboardPage allKbCount={state.allKbCount} unreviewedKbCount={state.unreviewedKbCount} kbPerResolvedIssue={state.kbPerResolvedIssue} /> : <Spinner />}
        </>
    )
}

export default EmployeeDashboardPage