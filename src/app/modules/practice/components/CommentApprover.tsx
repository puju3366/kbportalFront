import React, { useEffect, useState } from 'react'
import { getKBComment, getCommentApprove, rbackEmployeeDataFetch } from '../redux/Crud';
import jwt_decode from "jwt-decode";
import useLoader from '../../../hooks/useLoader';
import { Spinner } from '../../../helpers/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../../helpers/Components/Pagination';
import { useSortableData } from '../../../helpers/Components/useSortableData';
import { KTSVG } from '../../../../_metronic/helpers';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const CommentApprover = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const nav = useNavigate();

    const [value, setValue] = useState([{
        id: "",
        username: "",
        comment: "",
        title: "",
        commentedOn: "",
    }])

    const [userEmailList, setUserEmailList] = useState([])
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    /**
  * @Author 
  * @Method getKBCommentData
  * @Purpose list of all kb comments which is not approved
  * @param {} 
  * @Since Oct 2022
 */

    const getKBCommentData = () => {
        getKBComment({ sort: "DESC" })
            .then((res: any) => {
                setValue(res.data.items.result)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        document.title = "DEV IT - KB Comment Approval";
        getKBCommentData();
    }, [])

    /**
  * @Author 
  * @Method handleChange
  * @Purpose To approve the comment
  * @param {e} 
  * @Since Oct 2022
 */

    const handleChange = (e: any) => {
        let object = {
            is_comment_approved: e.target.value,
            id: e.target.id
        }
        getCommentApprove(object)
            .then((res: any) => {
                toast.success(res.data.items.msg);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
            .catch(error => {
                console.log(error);
            })


    }
 
    /**
    * @Author 
    * @Method RabackUserdata
    * @Purpose To get the kblist user data from rback 
    * @param {} 
    * @Since Oct 2022
    */
    const RabackUserdata = () => {
        let emaillist;
        value && value.length > 0 ? value.map((element: any) => {
            if (element && element !== undefined) {
                emaillist += "," + element.created_by
            }
        }) : emaillist = "";
        const userEmailArray = emaillist ? emaillist.split(",") : [];
        userEmailArray.shift()
        rbackEmployeeDataFetch(userEmailArray)
            .then((response: any) => {
                const employeeData: any = jwt_decode(response.data.data.token)
                setUserEmailList(employeeData.device_token)
            })
            .catch(err => {
                console.log("err", err);
            })
    }
    useEffect(() => {
        RabackUserdata()
    }, [value])

    const isShown = useLoader();

    let finaleData: any = [];
    const TableData = userEmailList.forEach((content: any) => {
        value.forEach((element: any) => {
            if (element.created_by && content && element.created_by.toLowerCase() === content.email.toLowerCase()) {
                const finalEmployeeData = {
                    id: element.id,
                    comment: element.comment,
                    title: element.title,
                    commentedOn: element.created_on,
                    username: content.username,
                }
                return finaleData.push(finalEmployeeData)
            }
        })
    })
    const filteredEmployeeData: any = [];
    let uniqueChars = finaleData.filter((element: any, index: any) => {
        const isDuplicate = filteredEmployeeData.includes(element.id);
        if (!isDuplicate) {
            filteredEmployeeData.push(element.id);
            return true;
        }
        return false;
    });

    // Sorting
    /**
        * @Author 
        * @Method Sorting
        * @Purpose To Sort the kblist user comment data  
        * @Since Oct 2022
        */


    const { items, requestSort, sortConfig } = useSortableData(uniqueChars);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : null;
    };


    // Pagination


    const [currentPage, setCurrentPage] = useState(0); //Pagination

    const PER_PAGE = 10;
    const pageCount = Math.ceil(items.length / PER_PAGE);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    return (
        <>
            <div className="toolbar" id="kt_toolbar">
                <div id="kt_toolbar_container" className="d-flex flex-stack">
                    <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
                        <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">KB Comment Approval</h1>
                    </div>
                </div>
            </div>
            <ToastContainer limit={1} />
            {isShown ? <div className="table-responsive"><table className="table table-rounded table-striped border gy-7 gs-7 table-row-dashed tablewidth bg-white ">
                <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200 w-nowrap">
                        <th>
                            No
                        </th>
                        <th>
                            <span
                                onClick={() => requestSort("username", sortConfig.direction ? sortConfig.direction : "DESC")}
                                className={`${getClassNamesFor("username")}`}
                                style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                            >
                                <i
                                    className="bi bi-sort-down-alt"
                                ></i>
                            </span>
                            Name
                        </th>
                        <th>
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
                        <th
                            className="table-adjustment"
                            style={{ display: "flex" }}>
                            <span
                                onClick={() => requestSort("comment", sortConfig.direction ? sortConfig.direction : "DESC")}
                                className={`table-adjustment ${getClassNamesFor("comment")}`}
                                style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                            >
                                <i
                                    className="bi bi-sort-down-alt"
                                ></i>
                            </span>
                            Comment
                        </th>
                        <th>
                            <span
                                onClick={() => requestSort("commentedOn", sortConfig.direction ? sortConfig.direction : "DESC")}
                                className={`${getClassNamesFor("commentedOn")}`}
                                style={{ cursor: "pointer", margin: "0 10px 0 0" }}
                            >
                                <i
                                    className="bi bi-sort-down-alt"
                                ></i>
                            </span>
                            Commented On
                        </th>
                        <th>Status</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody className="align-middle">
                    {
                        uniqueChars && uniqueChars.length > 0 ? uniqueChars.slice(offset, offset + PER_PAGE).map((value, index: any) => {
                            return (
                                <tr key={index}>
                                    <td>{PER_PAGE * (currentPage + 1) + (index - 9)}</td>
                                    <td width="350">{value.username}</td>
                                    <td width="350" >{value.title.replace(/<\/?[^>]+(>|$)/g, " ")}</td>
                                    <td width="350" >{value.comment.split(" ").length > 4 ? value.comment.split(" ").slice(0, 4).join(' ') + "..." : value.comment}</td>
                                    <td width="350" >{ value && monthName[(new Date(value.commentedOn).getMonth())]} {value && new Date(value.commentedOn).getDate()}, {value && new Date(value.commentedOn).getFullYear()}</td>
                                    <td width="350" >{"Pending"}</td>
                                    <td className='d-flex d-flex justify-content-end'>
                                        <button
                                            onClick={handleChange}
                                            value={1} id={value.id}
                                            className='btn btn-outline btn-outline-solid btn-outline-default Button btn-approve'
                                            title='Approve'
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={handleShow}
                                            className='btn btn-outline btn-outline-solid btn-outline-default Button btn-reject'
                                            title='Reject'
                                        >
                                            Reject
                                        </button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Are you sure you want to reject the comment?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose} title="Close">
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleChange} value={2} id={value.id} title="Yes">
                                                Yes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            )
                        }) : <tr >
                            <td colSpan={7}>
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
                    Items={items}
                    offset={offset}
                    pageCount={pageCount}
                    PER_PAGE={PER_PAGE}
                    handlePageClick={handlePageClick}
                    style={{ marginTop: "40px", position: "absolute" }} />
            </div > : <Spinner />
            }
        </>
    )

}

export default CommentApprover
