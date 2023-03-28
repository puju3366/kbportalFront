import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {arrayDeepCopy} from '../../../helpers/CommonService'
import CardList from './cardList'
import {Spinner} from '../../../helpers/Spinner'
import {IoCloseOutline} from 'react-icons/io5'
import {changecat} from '../../../helpers/configData/populateItems'
import {createContext} from 'vm'
import {options} from '../../../helpers/configData/optionData'
import {getKBApproved} from '../../practice/redux/Crud'
import {toast, ToastContainer} from 'react-toastify'
import $ from 'jquery'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const TitleBar = (props) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [searchTitle, setSearchTitle] = useState('')
  const [modal, setModal] = useState(false)
  const [select, setSelect] = useState({
    searchBy: '',
    searchValue: '',
  })
  const [isShown, setisShown] = useState(false)

  const [state, setState] = useState({
    comments: '',
  })
  const filterData = arrayDeepCopy(props.data)
  const [searchData, setSearchData] = useState(filterData)
  const nav = useNavigate()

  let element = document.getElementById('textareaid')
  if (state.comments.length > 0) {
    element?.classList.remove('is-invalid')
  }
  const handlechange = (e) => {
    e.preventDefault()
    setSearchTitle(e.target.value.trim())
    $('.DataTable_pagination__2POfE li:nth-child(2)').children()[0].click()
  }

  const handleChange = (e: any) => {
    let object = {
      is_kb_approved: e.target.value,
      id: e.target.id,
      approve_reject_comment: state.comments,
      created_by: props.currUser,
    }

    if (state.comments == '' || state.comments == null) {
      setisShown(true)
      element?.classList.add('is-invalid')
    } else {
      setisShown(false)
      getKBApproved(object)
        .then((res: any) => {
          toast.success(res.data.items.msg)
          setTimeout(() => {
            nav(`/admindashboard`)
          }, 1900)
        })
        .catch((error) => {
          toast.error('Something Went Wrong !')
        })
    }
  }

  // Search By Title
  var dataSearch =
    filterData &&
    filterData.filter((item) => {
      if (searchTitle) {
        if (item.title.toLowerCase().includes(searchTitle.toLowerCase())) {
          return item
        }
      }
    })

  useEffect(() => {
    if (searchTitle == '' && select.searchBy == '') {
      setSearchData(filterData)
    } else {
      setSearchData(dataSearch)
    }
  }, [searchTitle])

  useEffect(() => {
    setSearchData(props.data)
  }, [props.data])

  // Advance Filter
  const openModal = () => {
    setModal(!modal)
    document.body.style.overflow = 'hidden'
  }

  const handleSearchBy = (e) => {
    changecat(e.target.value)
    setSelect((prev) => ({...prev, searchBy: e.target.value}))
  }
  const handleSearchValue = (e) => {
    setSelect((prev) => ({...prev, searchValue: e.target.value}))
  }

  const handleFilter = () => {
    const advanceFilterData = arrayDeepCopy(filterData)
    var dataSearch =
      advanceFilterData &&
      advanceFilterData.filter((item) => {
        if (select.searchBy == 'Category') {
          if (item.category_name.toLowerCase().includes(select.searchValue.toLowerCase())) {
            return item
          }
        } else if (select.searchBy == 'Practice') {
          if (item.practice_name.toLowerCase().includes(select.searchValue.toLowerCase())) {
            return item
          }
        } else if (select.searchBy == 'Project' && item.project_name !== null) {
          if (item.project_name.toLowerCase().includes(select.searchValue.toLowerCase())) {
            return item
          }
        } else {
          return item
        }
      })

    setSearchData(dataSearch)
    setModal(!modal)
    document.body.style.overflow = 'unset'
  }

  const handleReset = () => {
    setSelect({searchBy: 'Select', searchValue: ''})
    changecat(select.searchBy == 'Select')
  }

  const onChange = (e: any) => {
    const value: string = e.target.value.trimStart()
    setState((prev) => ({...prev, comments: value}))
    state.comments != '' ? setisShown(false) : setisShown(false)
  }

  return (
    <>
      {props.page && props.page == 'kbDetail' ? (
        <div className='d-flex flex-wrap flex-stack mb-2'>
          <div className='col-md-8' style={{marginLeft: '-40px'}}>
            {props.isApprove == 0 ? (
              <td className='d-flex justify-content-end'>
                <button
                  onClick={handleChange}
                  value={1}
                  id={props.id}
                  className='btn btn-outline btn-outline-solid btn-outline-default Button btn-approve'
                  title='Approve'
                >
                  Approve
                </button>
                <button
                  onClick={handleShow}
                  // value={2}
                  // id={props.id}
                  className='btn btn-outline btn-outline-solid btn-outline-default Button btn-reject'
                  title='Reject'
                >
                  Reject
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to reject the KB?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <label htmlFor='exampleFormControlInput1' className='form-label required'>
                        Please add the reason why you are rejecting the KBs?
                      </label>
                      <textarea
                        id='textareaid'
                        className='form-control form-control-solid'
                        name='reject comments'
                        spellCheck='false'
                        data-gramm='false'
                        placeholder='Add a Comment..'
                        onChange={onChange}
                      ></textarea>
                    </div>
                    {isShown ? (
                      <p className='text-danger' id='comment-validate'>
                        Please enter a comment!
                      </p>
                    ) : (
                      ''
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose} title='Close'>
                      Close
                    </Button>
                    <Button
                      variant='primary'
                      onClick={handleChange}
                      value={2}
                      id={props.id}
                      title='Yes'
                    >
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            ) : (
              ''
            )}
          </div>
          <h3 className='fw-bolder my-2'>{props.label}</h3>
          {/* <div className='d-flex flex-wrap my-2'>
            <Link to={`/` + props.url} className='btn btn-sm btn-primary' title={props.title}>
              <span className='svg-icon me-2'>
                <svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19'>
                  <g id='Group_644' data-name='Group 644' transform='translate(-1718 -110)'>
                    <path
                      id='BTN_Label'
                      data-name='BTN / Label'
                      d='M2.062-4.641h3.38v1.975H2.062V1.185h-2.1V-2.667h-3.4V-4.641h3.4v-3.6h2.1Z'
                      transform='translate(1726.436 123.244)'
                      fill='#fff'
                    />
                    <g
                      id='Ellipse_436'
                      data-name='Ellipse 436'
                      transform='translate(1718 110)'
                      fill='none'
                      stroke='#fff'
                      strokeWidth='1'
                    >
                      <circle cx='9.5' cy='9.5' r='9.5' stroke='none' />
                      <circle cx='9.5' cy='9.5' r='9' fill='none' />
                    </g>
                  </g>
                </svg>
              </span>
              {props.title}
            </Link>
          </div> */}
        </div>
      ) : (
        <>
          <div className='d-flex flex-wrap flex-stack mb-6'>
            <h3 className='fw-bolder my-2'>{props.label}</h3>
            <div className='d-flex flex-wrap my-2'>
              <div className='d-flex align-items-center ms-1 ms-lg-7 me-4 search-circle'>
                <input
                  type='text'
                  className='search-input form-control form-control-solid'
                  name='search'
                  placeholder='Search By Title'
                  onChange={handlechange}
                  // onClick={clickBY}
                />
                <div
                  id='kt_header_search'
                  className='header-search d-flex align-items-stretch d-lg-none'
                  data-kt-search-keypress='true'
                  data-kt-search-min-length='2'
                  data-kt-search-enter='enter'
                  data-kt-search-layout='menu'
                  data-kt-menu-trigger='auto'
                  data-kt-menu-overflow='false'
                  data-kt-menu-permanent='true'
                  data-kt-menu-placement='bottom-end'
                >
                  <div
                    className='d-flex align-items-center'
                    data-kt-search-element='toggle'
                    id='kt_header_search_toggle'
                  >
                    <div className='btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'>
                      <span className='svg-icon svg-icon-1'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <rect
                            opacity='0.5'
                            x='17.0365'
                            y='15.1223'
                            width='8.15546'
                            height='2'
                            rx='1'
                            transform='rotate(45 17.0365 15.1223)'
                            fill='currentColor'
                          />
                          <path
                            d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                            fill='currentColor'
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div
                    data-kt-search-element='content'
                    className='menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px'
                  >
                    <div data-kt-search-element='wrapper'>
                      <form
                        data-kt-search-element='form'
                        className='w-100 position-relative'
                        autoComplete='off'
                      >
                        <input
                          type='text'
                          className='form-control form-control-solid'
                          name='search'
                          placeholder='Search'
                          data-kt-search-element='input'
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advance Search */}

              {/* <div className='d-flex align-items-center ms-1 ms-xl-7 ad-search mr-5'>
                <a
                  href='#'
                  className='btn-flex btn-link'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  onClick={openModal}
                >
                  <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='17'
                      height='16.808'
                      viewBox='0 0 17 16.808'
                    >
                      <path
                        id='Path_827'
                        data-name='Path 827'
                        d='M1497.66,176.781l.16.474h0Zm5-1.667.16.474h0Zm5.05-10.821.35.353Zm-4.42,4.414-.35-.353ZM1493,161.5h14v-1h-14Zm-.5,2.086V162h-1v1.586Zm4.56,4.768-4.41-4.415-.71.707,4.41,4.415Zm-.56,1.06v6.892h1v-6.892Zm0,6.892a1,1,0,0,0,1.32.949l-.32-.949Zm1.32.949,5-1.667-.32-.948-5,1.666Zm5-1.667a1.007,1.007,0,0,0,.68-.948h-1Zm.68-.948v-5.226h-1v5.226Zm3.85-10.7-4.41,4.415.71.707,4.41-4.415Zm.15-1.939v1.586h1V162Zm.56,2.646a1.5,1.5,0,0,0,.44-1.06h-1a.478.478,0,0,1-.15.353Zm-4.56,4.768a.477.477,0,0,1,.15-.353l-.71-.707a1.5,1.5,0,0,0-.44,1.06Zm-7.15-.353a.477.477,0,0,1,.15.353h1a1.5,1.5,0,0,0-.44-1.06Zm-4.85-5.475a1.5,1.5,0,0,0,.44,1.06l.71-.707a.477.477,0,0,1-.15-.353ZM1507,161.5a.5.5,0,0,1,.5.5h1a1.5,1.5,0,0,0-1.5-1.5Zm-14-1a1.5,1.5,0,0,0-1.5,1.5h1a.5.5,0,0,1,.5-.5Z'
                        transform='translate(-1491.5 -160.5)'
                        fill='#5c6e80'
                      />
                    </svg>
                  </span>
                  Advance Search
                </a>
              </div> */}
              {/* Modal */}
              {modal && (
                <section className='modal__bg'>
                  <div className='modal__align'>
                    <div className='modal__content'>
                      <div className='modal__video-align'>
                        <div className='d-flex'>
                          <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-3'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='17'
                              height='16.808'
                              viewBox='0 0 17 16.808'
                            >
                              <path
                                id='Path_827'
                                data-name='Path 827'
                                d='M1497.66,176.781l.16.474h0Zm5-1.667.16.474h0Zm5.05-10.821.35.353Zm-4.42,4.414-.35-.353ZM1493,161.5h14v-1h-14Zm-.5,2.086V162h-1v1.586Zm4.56,4.768-4.41-4.415-.71.707,4.41,4.415Zm-.56,1.06v6.892h1v-6.892Zm0,6.892a1,1,0,0,0,1.32.949l-.32-.949Zm1.32.949,5-1.667-.32-.948-5,1.666Zm5-1.667a1.007,1.007,0,0,0,.68-.948h-1Zm.68-.948v-5.226h-1v5.226Zm3.85-10.7-4.41,4.415.71.707,4.41-4.415Zm.15-1.939v1.586h1V162Zm.56,2.646a1.5,1.5,0,0,0,.44-1.06h-1a.478.478,0,0,1-.15.353Zm-4.56,4.768a.477.477,0,0,1,.15-.353l-.71-.707a1.5,1.5,0,0,0-.44,1.06Zm-7.15-.353a.477.477,0,0,1,.15.353h1a1.5,1.5,0,0,0-.44-1.06Zm-4.85-5.475a1.5,1.5,0,0,0,.44,1.06l.71-.707a.477.477,0,0,1-.15-.353ZM1507,161.5a.5.5,0,0,1,.5.5h1a1.5,1.5,0,0,0-1.5-1.5Zm-14-1a1.5,1.5,0,0,0-1.5,1.5h1a.5.5,0,0,1,.5-.5Z'
                                transform='translate(-1491.5 -160.5)'
                                fill='#0a8b7c'
                              />
                            </svg>
                          </span>
                          <h5>Custom Filter</h5>
                          <IoCloseOutline
                            className='modal__close'
                            arial-label='Close modal'
                            onClick={() => {
                              setModal((sm) => !sm)
                              document.body.style.overflow = 'unset'
                            }}
                          />
                        </div>
                        <div className='bg-grey'>
                          <div className='d-flex'>
                            <h5>Field Name</h5>
                            <select
                              name='filterSearch'
                              id='filterSearch'
                              onClick={handleSearchBy}
                              defaultValue={select.searchBy}
                            >
                              {options &&
                                options.map((item) => {
                                  return (
                                    <option key={item.id} value={item.optionValue}>
                                      {item.option}
                                    </option>
                                  )
                                })}
                            </select>
                          </div>
                          <br />
                          <div className='d-flex'>
                            <h5>Field Value</h5>
                            <select name='category' id='categoryA' onClick={handleSearchValue}>
                              <option value={select.searchValue}>{select.searchValue}</option>
                            </select>
                          </div>

                          <div className='d-flex'>
                            <button className='btn btn-primary' onClick={handleFilter}>
                              ok
                            </button>
                            <button className='btn btn-secondary' onClick={handleReset}>
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
          {props ? (
            <CardList
              data={searchData}
              userlist={props.userlist}
              label={props.label}
              page={props.page}
            />
          ) : (
            <Spinner />
          )}
        </>
      )}
    </>
  )
}

export default TitleBar
export const PaginationContext = createContext()
