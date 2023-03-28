import React, { useEffect, useState } from 'react'
import { GetAllMyKB } from '../../../employeeKBListPage/employeeKBListRedux/emplyoeeKBListCRUD'
import { useNavigate } from 'react-router-dom'
import useLoader from '../../../../hooks/useLoader'
import { Spinner } from '../../../../helpers/Spinner'
import { toast, ToastContainer } from 'react-toastify'
import { Pagination } from '../../../../helpers/Components/Pagination'
import { useSortableData } from '../../../../helpers/Components/Sorting'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const MyKBs = () => {
    let token
    if (Cookies.get('logintoken')) {
        token = Cookies.get('logintoken')
    } else {
        token = ''
    }
    const test: any = jwt_decode(token)

    const [value, setValue] = useState([
        {
            id: '',
            title: '',
            category_name: '',
            created_on: '',
            created_by: '',
            is_kb_approved: '',
        },
    ])

    const nav = useNavigate()

    /**
     * @Author
     * @Method getMyKBList
     * @Purpose List of all the kb which is written by the user who is logedin
     * @param {}
     * @Since Oct 2022
     */
    const getMyKBList = () => {
        GetAllMyKB({ email: test.device_token.email })
            .then((response: any) => {
                setValue(response.data.result)
            })
            .catch((err: any) => {
                console.log('There is some error on server side')
            })
    }

    useEffect(() => {
        document.title = 'DEV IT - My KBs'
        getMyKBList()
    }, [])

    const monthName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const isShown = useLoader()

    // Sorting
    /**
     * @Author
     * @Method Sorting
     * @Purpose To Sort the kblist user comment data
     * @Since Oct 2022
     */
    const { items, requestSort, sortConfig } = useSortableData(value)
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : null
    }

    // Pagination
    const [currentPage, setCurrentPage] = useState(0) //Pagination

    const PER_PAGE = 10
    const pageCount = Math.ceil(value.length / PER_PAGE)
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE

    return (
        <>
            <div className='toolbar' id='kt_toolbar'>
                <div id='kt_toolbar_container' className='d-flex flex-stack'>
                    <div
                        data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
                        className='page-title d-flex align-items-center flex-wrap me-3 mb-lg-0'
                    >
                        <h1 className='d-flex text-dark fw-bolder fs-2 align-items-center my-1'>My KBs</h1>
                    </div>
                </div>
            </div>
            <ToastContainer limit={1} />
            {isShown ? (
                <div className='table-responsive'>
                    <table className='table table-rounded table-striped border gy-7 gs-7 table-row-dashed tablewidth bg-white '>
                        <thead>
                            <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200 w-nowrap'>
                                <th>No</th>
                                <th>
                                    <span
                                        onClick={() =>
                                            requestSort('title', sortConfig.direction ? sortConfig.direction : 'DESC')
                                        }
                                        className={`${getClassNamesFor('title')}`}
                                        style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
                                    >
                                        <i className='bi bi-sort-down-alt'></i>
                                    </span>
                                    Title
                                </th>
                                <th>
                                    <span
                                        onClick={() =>
                                            requestSort(
                                                'category_name',
                                                sortConfig.direction ? sortConfig.direction : 'DESC'
                                            )
                                        }
                                        className={`${getClassNamesFor('category_name')}`}
                                        style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
                                    >
                                        <i className='bi bi-sort-down-alt'></i>
                                    </span>
                                    Category
                                </th>
                                <th>
                                    <span
                                        onClick={() =>
                                            requestSort(
                                                'created_on',
                                                sortConfig.direction ? sortConfig.direction : 'DESC'
                                            )
                                        }
                                        className={`${getClassNamesFor('created_on')}`}
                                        style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
                                    >
                                        <i className='bi bi-sort-down-alt'></i>
                                    </span>
                                    Created On
                                </th>
                                <th>
                                    <span
                                        onClick={() =>
                                            requestSort(
                                                'created_on',
                                                sortConfig.direction ? sortConfig.direction : 'DESC'
                                            )
                                        }
                                        className={`${getClassNamesFor('created_on')}`}
                                        style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
                                    >
                                        <i className='bi bi-sort-down-alt'></i>
                                    </span>
                                    Rejection Comments
                                </th>
                                <th>
                                    <span
                                        onClick={() =>
                                            requestSort(
                                                'is_kb_approved',
                                                sortConfig.direction ? sortConfig.direction : 'DESC'
                                            )
                                        }
                                        className={`${getClassNamesFor('is_kb_approved')}`}
                                        style={{ cursor: 'pointer', margin: '0 10px 0 0' }}
                                    >
                                        <i className='bi bi-sort-down-alt'></i>
                                    </span>
                                    Status
                                </th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className='align-middle' id='tbodyOfKB'>
                            {value && value.length > 0 ? 
                                value.slice(offset, offset + PER_PAGE).map((value: any, index: any) => {

                                    return (
                                        <tr key={index}>
                                            <td>{PER_PAGE * (currentPage + 1) + (index - 9)}</td>
                                            <td width='350'>
                                                {value.title.length > 2
                                                    ? value.title.split(' ').slice(0, 4).join(' ') + '...'
                                                    : value.title}
                                            </td>
                                            <td width='350'>{value.category_name}</td>
                                            <td width='350'>
                                                {value && monthName[new Date(value.created_on).getMonth()]}{' '}
                                                {value && new Date(value.created_on).getDate()},{' '}
                                                {value && new Date(value.created_on).getFullYear()}
                                            </td>
                                            <td width='350'>
                                                {value.is_kb_approved == '2' ? value.approve_reject_comment : '-'}
                                            </td>
                                            <td width='350'>
                                                {value.is_kb_approved == '2' ? 'Rejected' : value.is_kb_approved == '1' ? 'Approved' : 'Pending '}
                                            </td>
                                            <td className='d-flex'>
                                                <a
                                                    id={value.id}
                                                    style={{ width: 'auto' }}
                                                    onClick={() => {
                                                        nav(`/details-page/${value.id}`)
                                                    }}
                                                    className='mx-3'
                                                    title='View'
                                                >
                                                    <i className='fa fa-eye fa-2x fa-icon' aria-hidden='true'></i>
                                                </a>
                                                <a
                                                    id={value.id}
                                                    style={{ width: 'auto' }}
                                                    onClick={() => {
                                                        nav(`/editkb/${value.id}`)
                                                    }}
                                                    title='Edit'
                                                >
                                                    <i className='fa fa-edit fa-2x fa-icon' aria-hidden='true'></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                }) : 
                                <tr>
                                    <td colSpan={7}>
                                        <p className='text-center mx-5' style={{ color: 'grey' }}>
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
                        handlePageClick={handlePageClick}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default MyKBs
