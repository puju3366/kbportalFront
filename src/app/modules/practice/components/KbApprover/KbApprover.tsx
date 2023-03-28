import React, { useEffect, useState } from 'react'
import {  getKBList } from '../../redux/Crud';
import { useNavigate } from "react-router-dom";
import useLoader from '../../../../hooks/useLoader';
import { Spinner } from '../../../../helpers/Spinner';
import { ToastContainer } from 'react-toastify';
import { Pagination } from '../../../../helpers/Components/Pagination';
import { useSortableData } from "../../../../helpers/Components/Sorting";


const KbApprover = () => {

    const [value, setValue] = useState([{
        id: "",
        title: "",
        category_name: "",
        practice_name: "",
        team: "",
        created_on: "",
        created_by: "",
        kb_expiry_date: "",
    }])
    const nav = useNavigate();
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    /**
   * @Author 
   * @Method getKBListData
   * @Purpose List of all the kb which will be approved by the approver
   * @param {} 
   * @Since Oct 2022
  */
    const getKBListData = () => {
        getKBList({ sort: "DESC", orderName: "id" })
            .then((res: any) => {
                setValue(res.data.items.result)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        document.title = "DEV IT - KB Approval";
        getKBListData();

    }, [])

    const isShown = useLoader();

    // Sorting
    /**
        * @Author 
        * @Method Sorting
        * @Purpose To Sort the kblist user comment data  
        * @Since Oct 2022
        */


    const { items, requestSort, sortConfig } = useSortableData(value);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : null;
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(0); //Pagination

    const PER_PAGE = 10;
    const pageCount = Math.ceil(value.length / PER_PAGE);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    return (
        <>
            <div className="toolbar" id="kt_toolbar">
                <div id="kt_toolbar_container" className="d-flex flex-stack">
                    <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
                        <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">KB Approval</h1>
                    </div>

                </div>
            </div>
            <ToastContainer limit={1} />
            {isShown ? <div className="table-responsive">
                <table
                    className="table table-rounded table-striped border gy-7 gs-7 table-row-dashed tablewidth bg-white ">
                    <thead>
                        <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200 w-nowrap">
                            <th>
                                No</th>
                            <th >
                                <span
                                    onClick={() => requestSort("title", sortConfig.direction ? sortConfig.direction : "DESC")}
                                    className={`${getClassNamesFor("title")}`}
                                    style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                                >
                                    <i
                                        className="bi bi-sort-down-alt"
                                    ></i>
                                </span>
                                Title
                            </th>
                            <th>
                                <span
                                    onClick={() => requestSort("category_name", sortConfig.direction ? sortConfig.direction : "DESC")}
                                    className={`${getClassNamesFor("category_name")}`}
                                    style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                                >
                                    <i
                                        className="bi bi-sort-down-alt"
                                    ></i>
                                </span>
                                Category
                            </th>
                            <th>
                                <span
                                    onClick={() => requestSort("created_by", sortConfig.direction ? sortConfig.direction : "DESC")}
                                    className={`${getClassNamesFor("created_by")}`}
                                    style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                                >
                                    <i
                                        className="bi bi-sort-down-alt"
                                    ></i>
                                </span>
                                Created By
                            </th>
                            <th>
                                <span
                                    onClick={() => requestSort("created_on", sortConfig.direction ? sortConfig.direction : "DESC")}
                                    className={`${getClassNamesFor("created_on")}`}
                                    style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                                >
                                    <i
                                        className="bi bi-sort-down-alt"
                                    ></i>
                                </span>
                                Created On
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="align-middle" id="tbodyOfKB">
                        {

                            value ? value.slice(offset, offset + PER_PAGE).map((value, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{PER_PAGE * (currentPage + 1) + (index - 9)}</td>
                                        <td width="350">{value.title.length > 2 ? value.title.split(' ').slice(0, 4).join(' ') + '...' : value.title}</td>
                                        <td width="350">{value.category_name}</td>
                                        <td width='350'>
                                            {value.created_by.split('@')[0].split('.')[0] + ' ' + value.created_by.split('@')[0].split('.')[1]}
                                        </td>
                                        <td width='350'>{ value && monthName[(new Date(value.created_on).getMonth())]} {value && new Date(value.created_on).getDate()}, {value && new Date(value.created_on).getFullYear()}</td>
                                        <td width="350">{"Pending"}</td>
                                        <td className='d-flex justify-content-end'>
                                            <a id={value.id}
                                                style={{ width: "100px"}}
                                                onClick={() => { nav(`/details-page/${value.id}`) }}
                                                className=""
                                                title="View"><i className="fa fa-eye fa-2x fa-icon" aria-hidden="true"></i></a>
                                        </td>
                                    </tr>
                                )
                            }) : <tr >
                                <td colSpan={6}>
                                    <p
                                        className="text-center mx-5"
                                        style={{ color: "grey" }}
                                    >
                                        No Records
                                    </p>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <Pagination
                    Items={value}
                    offset={offset}
                    pageCount={pageCount}
                    PER_PAGE={PER_PAGE}
                    handlePageClick={handlePageClick} />
            </div> : <Spinner />}


        </>
    )
}

export default KbApprover
