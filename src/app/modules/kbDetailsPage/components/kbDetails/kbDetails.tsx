import { useState, useEffect } from 'react'
import {
  postComments,
  postRating,
  checkIsView,
  kbPostViewed,
  isUseFul,
  getKbViewCount,
  getKbRatings,
  postKbLike,
  rbackEmailFetch,
} from '../../core/kbDetailsPageCRUD'
import { useLocation } from 'react-router'
import { Markup } from 'interweave'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { auto } from '@popperjs/core'
import jwt_decode from 'jwt-decode'
import { getallEmployeeData } from '../../../landingPage/landingPageRedux/landingPageCRUD'
import { isEmptyArray } from 'formik'
import Cookies from 'js-cookie'
import { getCommentsOfKB } from '../../core/kbDetailsPageCRUD'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TitleBar from '../../../landingPage/components/TitleBar'
import { Link, useNavigate } from 'react-router-dom'
import ReactStarsRating from 'react-awesome-stars-rating'
import { getKBApproved } from '../../../practice/redux/Crud'
import { MenuItems } from '../../../../helpers/configData/optionData'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const KBDetailsPage = (props: any) => {
  const nav = useNavigate()
  let token
  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ''
  }
  var test: any = jwt_decode(token)
  const location = useLocation()
  const kbID = location.pathname.split('/details-page/')
  kbID.shift()
  const id = parseInt(kbID.toString())
  const data = props.data
  const kbUserEmail = props.kbUserEmail
  const emailList = props.children
  const relatedPosts = props.relatedPosts
  const tags = props.tags
  const [rating, setRating] = useState(props.ratings)
  const [isShown, setisShown] = useState(false)

  const [state, setState] = useState({
    isView: '',
    isUseFull: false,
    isUsefullData: '',
    showRating: false,
    description: '',
    kbCreatotData: [],
    userData: [],
    comments: '',
    userComments: [],
    isUsefulReason: '',
  })
  const [approverEmail, setEmailApprover] = useState()

  var hours =
    new Date(data.data[0].created_on).getHours() > 12
      ? new Date(data.data[0].created_on).getHours() - 12
      : new Date(data.data[0].created_on).getHours()
  var am_pm = new Date(data.data[0].created_on).getHours() >= 12 ? 'PM' : 'AM'
  var minutes =
    new Date(data.data[0].created_on).getMinutes() < 10
      ? '0' + new Date(data.data[0].created_on).getMinutes()
      : new Date(data.data[0].created_on).getMinutes()
  var time = hours + ':' + minutes + ' ' + am_pm

  let emaillist = ''
  let title = ''
  state.userComments &&
    state.userComments.forEach((element: any) => {
      emaillist += ',' + element.created_by
      title = element.title
    })
  const userEmailArray = emaillist.split(',')
  userEmailArray.shift()

  /**
   * @Author
   * @Method getCommentsData
   * @Purpose To get data of commented user by id
   * @param {}
   * @Since Oct 2022
   */
  const getCommentsData = () => {
    getCommentsOfKB(id)
      .then((response: any) => {
        if (response.data.status_code) {
          setState((prev) => ({ ...prev, userComments: response.data.items.result }))
        }
        getallEmployeeData([kbUserEmail])
          .then((res: any) => {
            const GetkbCreatorData: any = jwt_decode(res.data.data.token)
            setState((prev) => ({ ...prev, kbCreatotData: GetkbCreatorData.device_token[0] }))
          })
          .catch((err) => {
            console.log(`There is error on server side getEmployeeData ${err}`)
          })
      })
      .catch((err) => {
        getallEmployeeData([kbUserEmail])
          .then((res: any) => {
            const GetkbCreatorData: any = jwt_decode(res.data.data.token)
            setState((prev) => ({ ...prev, kbCreatotData: GetkbCreatorData.device_token[0] }))
          })
          .catch((err) => {
            console.log(`There is error on server side getEmployeeData ${err}`)
          })
      })
  }

  const getEmployeeData = () => {
    getallEmployeeData(emailList)
      .then((response: any) => {
        const employeeData: any = jwt_decode(response.data.data.token)
        setState((prev) => ({ ...prev, userData: employeeData.device_token }))
        //
      })
      .catch((err) => {
        console.log(`There is error on server side getEmployeeData ${err}`)
      })
  }
  let finaleData: any = []
  const cardData = state.userData.map((content: any) => {
    state.userComments &&
      state.userComments.map((element: any) => {
        if (element.created_by.toUpperCase() === content.email.toUpperCase()) {
          const finalEmployeeData = {
            created_on: element.created_on,
            id: element.id,
            comment: element.comment,
            designation: content.designation,
            email: content.email,
            practice: content.practice,
            team: content.team,
            username: content.username,
            department: content.department,
            likes: element.kb_likes,
            rating: element.avg_rate,
            comments: element.kb_comments,
          }
          return finaleData.push(finalEmployeeData)
        }
      })
  })
  // getEmployeeData()
  useEffect(() => {
    document.title = 'DEV IT - Detail Page'
    getEmployeeData()
    getCommentsData()
    rbackEmailFetch(test.device_token.reporting_manager_name)
      .then((response: any) => {
        setEmailApprover(response.data.data.email)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [isEmptyArray(emailList), kbUserEmail])
  const filteredEmployeeData: any = []
  let uniqueChars = finaleData.filter((element: any, index: any) => {
    const isDuplicate = filteredEmployeeData.includes(element.id)
    if (!isDuplicate) {
      filteredEmployeeData.push(element.id)
      return true
    }
    return false
  })
  let kbCreatotDatatoImplement
  if (isEmptyArray(state.kbCreatotData) === false) {
    kbCreatotDatatoImplement = state.kbCreatotData
  }
  const handleRating = (rate: number) => {
    setRating(rate)
    // note that user details we have to fetch it from the Rback login token which is medatory.
    const ratingDetails = {
      kb_detail_id: id,
      rating: rate,
      created_by: test.device_token.email,
    }
    // if()
    postRating(ratingDetails)
      .then((res: any) => {
        if (res.data.message === 'You already rated this KB') {
          toast.warn(res.data.message)
        } else {
          toast.success(res.data.message)
        }
        setTimeout(() => {
          window.location.reload()
        }, 1200)
      })
      .catch((err) => { })
    setState((prev) => ({ ...prev, showRating: false }))
  }
  const onLoadPage = () => {
    const viewDetails = {
      kb_detail_id: id,
      create_by: test.device_token.email,
      is_view: 1,
    }
    /**
     * @Author
     * @Method getKbViewCount
     * @Purpose To get number of times kb is viewed based on id
     * @param {}
     */
    getKbViewCount(viewDetails)
      .then((res: any) => {
        setState((prev) => ({ ...prev, isView: res.data.result }))
      })
      .catch((error) => {
        console.log(error)
      })
    checkIsView(viewDetails)
      .then((res: any) => {
        if (res.data.code === 404) {
          kbPostViewed(viewDetails)
            .then((response: any) => {
              setState((prev) => ({ ...prev, isView: '1' }))
            })
            .catch((error) => {
              toast.error('Something went Wrong !!')
            })
        }
      })
      .catch((err) => {
        toast.error('Something went Wrong !!')
      })
    getKbRatings(viewDetails)
      .then((res: any) => {
        setRating(res.data.result.rating)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    onLoadPage()
  }, [])
  const onChange = (e: any) => {
    const value: string = e.target.value.trimStart()
    setState((prev) => ({ ...prev, comments: value }))
    state.comments != '' ? setisShown(false) : setisShown(false)
  }
  const isUseFulDescription = (e: any) => {
    const value: string = e.target.value
    setState((prev) => ({ ...prev, description: value }))
  }
  const isUsefull = (e: any) => {
    setState((prev) => ({ ...prev, isUseFull: true }))
    setState((prev) => ({ ...prev, isUsefullData: e.target.value }))
  }
  const isUsefullReason = (e: any) => {
    setState((prev) => ({ ...prev, isUsefulReason: e.target.value }))
  }
  const submitIsUsefull = () => {
    const isUsefullDataToPost = {
      kb_detail_id: id,
      is_useful: state.isUsefullData,
      description: state.description ? state.description : null,
      created_by: test.device_token.email,
      useful_reason_type: state.isUsefulReason ? state.isUsefulReason : null,
    }
    isUseFul(isUsefullDataToPost)
      .then((response: any) => {
        if (response.status === 200) {
          toast.success(response.data.message)
          setTimeout(() => {
            window.location.reload()
          }, 1900)
        }
      })
      .catch((err) => {
        toast.error('Something went wrong !')
      })
  }

  let element = document.getElementById('textareaid')
  if (state.comments.length > 0) {
    element?.classList.remove('is-invalid')
  }
  const onSubmit = () => {
    const postCommentsDetails = {
      comment: state.comments,
      kb_detail_id: id,
      is_comment_approved: 0,
      created_by: test.device_token.email,
      approver_name: test.device_token.reporting_manager_name,
      practice: test.device_token.practice,
      team: test.device_token.team,
      title: data.data[0].title,
    }

    if (state.comments == '' || state.comments == null) {
      setisShown(true)
      element?.classList.add('is-invalid')
    } else {
      setisShown(false)
      postComments(postCommentsDetails)
        .then((response: any) => {
          // ***** have to put navigation or reload page on submit
          if (response.status === 200) {
            toast.success(response.data.message)
            setTimeout(() => {
              window.location.reload()
            }, 1900)
          }
        })
        .catch((err: any) => {
          toast.error(err.data.message)
          setTimeout(() => {
            window.location.reload()
          }, 1900)
        })
      setState((prev) => ({ ...prev, comments: '' }))
    }
  }
  //handle Like
  const likeDetails = {
    kb_detail_id: id,
    create_by: test.device_token.email,
    is_like: 1,
  }
  const handleLike = () => {
    postKbLike(likeDetails)
      .then((res: any) => {
        if (res.data.message === 'You Already Liked This KB') {
          toast.warn(res.data.message)
        } else {
          toast.success(res.data.message)
          setTimeout(() => {
            window.location.reload()
          }, 1900)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
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
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var currentUser = Cookies.get('loginuser')

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

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  const onhandleChange = (e: any) => {
    const value: string = e.target.value.trimStart()
    setState((prev) => ({ ...prev, comments: value }))
    state.comments != '' ? setisShown(false) : setisShown(false)
  }

  return (
    <>
      <ToastContainer limit={1} />
      <TitleBar
        title='Add Post'
        label=''
        url='addkb'
        page={props.page}
        currUser={props.currUser}
        isApprove={props.data.data[0].is_kb_approved}
        id={props.data.data[0].id}
      />
      <div className='row gy-5 g-xl-12'>
        {/* <!--begin::Col--> */}
        <div className='kbDetail'>
          <div className='card new-card cardDetail bdr mb-5 mb-xxl-2'>
            {/* <!--begin::Body--> */}
            <div className='card-body pb-0'>
              <div className='postDetail'>
                <div className='d-flex align-items-center mb-3'>
                  {/* <!--begin::User--> */}
                  <div className='d-flex align-items-start flex-grow-1'>
                    {/* <!--begin::Info--> */}
                    <div className='d-flex flex-column mb-3'>
                      <a
                        href='javascript:void(0)'
                        className='text-hover-primary postName fw-bold mb-3'
                        style={{ fontSize: '1.7rem' }}
                      >
                        {data.data && data.data[0].title}
                      </a>
                      <div className='d-flex align-items-center flex-wrap'>
                        <div className='postDT me-4'>
                          {data.data && dayName[new Date(data.data[0].created_on).getDay()]},
                          <span className='postDate'>
                            {' '}
                            {data.data &&
                              monthName[new Date(data.data[0].created_on).getMonth()]}{' '}
                            {data.data && new Date(data.data[0].created_on).getDate()},{' '}
                            {data.data && new Date(data.data[0].created_on).getFullYear()}{' '}
                          </span>
                          at {time}{' '}
                        </div>
                        <div className='postLabel' style={{ backgroundColor: data.data[0].bg_color }}>{data.data && data.data[0].category_name}</div>
                      </div>
                    </div>
                    {/* <!--end::Info--> */}
                  </div>
                  {/* <!--end::User--> */}
                  {data.data[0].id &&
                    currentUser == data.data[0].created_by ||
                    currentUser == data.data[0].kb_approved_by ? (
                      <Link to={`/editkb/${data.data[0].id}`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          cursor='pointer'
                          width='25'
                          height='25'
                          fill='currentColor'
                          className='bi bi-pen'
                          viewBox='0 0 16 16'
                        >
                          <title>Edit</title>
                          <path
                            d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 
                                        0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z'
                          />
                        </svg>
                      </Link>
                    ):""}
                </div>
                <div className='d-flex mb-3'>
                  {/* <!--begin::Avatar--> */}
                  <div className='symbol symbol-45px me-5'>
                    <span className='symbol-label bg-light-blue'>
                      {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg--> */}
                      <span className='svg-icon svg-icon-1x svg-icon-success'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24.542'
                          height='26.091'
                          viewBox='0 0 24.542 26.091'
                        >
                          <g id='Group_604' data-name='Group 604' transform='translate(0 0)'>
                            <path
                              id='Path_907'
                              data-name='Path 907'
                              d='M442,323.938a5.937,5.937,0,1,0,5.938,5.937A5.937,5.937,0,0,0,442,323.938Z'
                              transform='translate(-429.729 -323.938)'
                              fill='#0066cd'
                            ></path>
                            <path
                              id='Path_908'
                              data-name='Path 908'
                              d='M435.667,338.979a5.938,5.938,0,0,0-5.938,5.938V346.8a2.434,2.434,0,0,0,2.042,2.4,63.49,63.49,0,0,0,20.459,0,2.433,2.433,0,0,0,2.041-2.4v-1.881a5.937,5.937,0,0,0-5.939-5.938h-.538a2.758,2.758,0,0,0-.86.137l-1.371.448a11.478,11.478,0,0,1-7.126,0l-1.37-.448a2.762,2.762,0,0,0-.861-.137Z'
                              transform='translate(-429.729 -323.938)'
                              fill='#0066cd'
                            ></path>
                          </g>
                        </svg>
                      </span>
                      {/* <!--end::Svg Icon--> */}
                    </span>
                  </div>
                  {/* <!--end::Avatar--> */}
                  {/* <!--begin::Info--> */}
                  <div className='emp-info'>
                    {/* <!--begin::Info--> */}
                    <div className=''>
                      <a
                        href='javascript:void(0)'
                        className='emp-name text-hover-primary fw-bold me-2'
                      >
                        {kbCreatotDatatoImplement && kbCreatotDatatoImplement.username}
                      </a>
                      <div className='emp-position fw-semibold fs-7'>
                        {kbCreatotDatatoImplement && kbCreatotDatatoImplement.designation}
                      </div>
                    </div>
                    {/* <!--end::Info--> */}
                  </div>
                  {/* <!--end::Info--> */}
                </div>
              </div>
            </div>
            {/* <!--end::Body--> */}
            <div className='separator my-2'></div>
            <div className='card-body pb-0 pt-4 '>
              <div className='postDetail card-break img_responsive'>
                <Markup content={data.data && data.data[0].body} />
                <div className='separator my-2'></div>
                <div className='d-flex px-3'>
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <p key={'tags_' + index} className='px-4 mx-4 py-1 tag'>
                          {tag}
                        </p>
                      )
                    })}
                </div>
                {data.data[0].is_kb_approved !== 0 && (
                  <div className='d-flex flex-column flex-row-fluid emp-info'>
                    <div className='d-flex align-items-center emp-status mt-2 mb-5 flex-wrap'>
                      {/* <a href="javascript:void(0)" className="py-1 me-4" onClick={handleLike}> */}
                      {/* <!--begin::Svg Icon | path: icons/duotune/general/gen030.svg--> */}
                      {/* <span className="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
                                                    <g id="Group_606" data-name="Group 606" transform="translate(1 1)">
                                                        <circle id="Ellipse_401" data-name="Ellipse 401" cx="8.5" cy="8.5" r="8.5" fill="none" stroke="#13a090" strokeLinecap="round" strokeWidth="2"></circle>
                                                        <path id="Path_758" data-name="Path 758" d="M426.459,544.256a4.242,4.242,0,0,0,1.6.815,7.342,7.342,0,0,0,3.888,0,4.241,4.241,0,0,0,1.6-.815" transform="translate(-421.5 -532.5)" fill="none" stroke="#13a090" strokeLinecap="round" strokeWidth="2"></path>
                                                        <circle id="Ellipse_402" data-name="Ellipse 402" cx="1.083" cy="1.083" r="1.083" transform="translate(4.917 5.75)" fill="#13a090" stroke="#13a090" strokeLinecap="round" strokeWidth="0.5"></circle>
                                                        <circle id="Ellipse_403" data-name="Ellipse 403" cx="1.083" cy="1.083" r="1.083" transform="translate(9.917 5.75)" fill="#13a090" stroke="#13a090" strokeLinecap="round" strokeWidth="0.5"></circle>
                                                    </g>
                                                </svg>
                                                </span> */}
                      {/* Likes ({data.data[0].kb_likes}) */}
                      {/* </a> */}
                      {/* View Count Icon */}
                      {state.isView && (
                        <a
                          href='javascript:void(0)'
                          className='py-1 me-4'
                          style={{ pointerEvents: 'none' }}
                        >
                          {/* <!--begin::Svg Icon | path: icons/duotune/communication/com012.svg--> */}
                          <span className='svg-icon'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='19.5'
                              height='13.5'
                              viewBox='0 0 19.5 13.5'
                            >
                              <g id='Group_607' data-name='Group 607' transform='translate(0 0)'>
                                <path
                                  id='Path_933'
                                  data-name='Path 933'
                                  d='M736.25,867a3.75,3.75,0,1,1,3.75,3.75,3.75,3.75,0,0,1-3.75-3.75Zm3.75-2.25a2.25,2.25,0,1,0,2.25,2.25A2.25,2.25,0,0,0,740,864.75Z'
                                  transform='translate(-730.25 -860.25)'
                                  fill='#13a090'
                                  fillRule='evenodd'
                                />
                                <path
                                  id='Path_934'
                                  data-name='Path 934'
                                  d='M732.323,865.646a1.886,1.886,0,0,0,0,2.708,8.418,8.418,0,0,0,1.77,1.8,9.375,9.375,0,0,0,11.814,0,8.418,8.418,0,0,0,1.77-1.8,1.886,1.886,0,0,0,0-2.708,8.419,8.419,0,0,0-1.77-1.8,9.375,9.375,0,0,0-11.814,0,8.421,8.421,0,0,0-1.77,1.8Zm.856-2.991a10.875,10.875,0,0,1,13.642,0,9.873,9.873,0,0,1,2.088,2.136,3.322,3.322,0,0,1,0,4.418,9.873,9.873,0,0,1-2.088,2.136,10.875,10.875,0,0,1-13.642,0,9.872,9.872,0,0,1-2.088-2.136,3.322,3.322,0,0,1,0-4.418,9.872,9.872,0,0,1,2.088-2.136Z'
                                  transform='translate(-730.25 -860.25)'
                                  fill='#13a090'
                                  fillRule='evenodd'
                                />
                              </g>
                            </svg>
                          </span>
                          ({Object.values(state.isView)})
                        </a>
                      )}
                      {/* <div className='py-1 me-4 rating-star'>
                                                <ReactStarsRating onChange={handleRating} value={rating} size={20} isHalf={true} primaryColor={"#13a090"} />
                                            </div> */}
                      <div className='py-1 me-4 emp-status'>
                        <label>Is Useful?</label>
                        <div className='radio-inline'>
                          <label className='radio'>
                            <input type='radio' value='1' name='Is Useful' onClick={isUsefull} />{' '}
                            <span></span> Yes{' '}
                          </label>
                          <label className='radio'>
                            {' '}
                            <input
                              type='radio'
                              value='0'
                              name='Is Useful'
                              onClick={isUsefull}
                            />{' '}
                            <span></span>No
                          </label>
                        </div>
                        <>
                          {state.isUseFull === true && state.isUsefullData == "1" ? (
                            <div>
                              <h4>Please select reason why it is useful?</h4>
                              <input type="radio" className="mx-2" id="Useful in my project" name="reason" value="Useful in my project" onClick={isUsefullReason} />
                              <label htmlFor="Useful in my project">Useful in my project</label><br></br>
                              <input type="radio" className="mx-2" id="Useful in my code" name="reason" value="Useful in my code" onClick={isUsefullReason} />
                              <label htmlFor="Useful in my code">Useful in my code</label><br></br>
                              <input type="radio" className="mx-2" id="learn something new" name="reason" value="I learn something new from this KB" onClick={isUsefullReason} />
                              <label htmlFor="learn something new">I learn something new from this KB</label><br></br>
                              <input type="radio" className="mx-2  mb-5" id="Others" name="reason" value="Others" onClick={isUsefullReason} />
                              <label htmlFor="Others">Others</label><br></br>
                              {
                                state.isUsefulReason &&
                                <div className='textareablock'>
                                  {' '} {state.isUsefulReason == "Others" &&
                                    <textarea onChange={isUseFulDescription}></textarea>
                                  }
                                  <button
                                    className='btn btn-sm btn-primary'
                                    title='Submit'
                                    onClick={submitIsUsefull}
                                  >
                                    Submit
                                  </button>
                                </div>
                              }
                              
                            </div>
                          ): <div className='textareablock'>
                             <textarea onChange={isUseFulDescription}></textarea>
                            <button
                                    className='btn btn-sm btn-primary'
                                    title='Submit'
                                    onClick={submitIsUsefull}
                                  >
                                    Submit
                                  </button>

                            </div>}
                        </>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='separator my-2'></div>
            <div className='card-body pb-0'>
              <div className='postDetail'>
                {state.userComments.length > 0 ? (
                  <Scrollbars
                    style={{ width: auto, height: auto, minHeight: 200 }}
                    autoHide={true}
                    autoHideTimeout={500}
                  >
                    {state.userComments &&
                      state.userComments.map((items: any) => {
                        return (
                          <div key={items.id}>
                            <div className='d-flex mb-3'>
                              <div className='symbol symbol-45px me-5'>
                                <span className='symbol-label bg-light-blue'>
                                  <span className='svg-icon svg-icon-1x svg-icon-success'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='24.542'
                                      height='26.091'
                                      viewBox='0 0 24.542 26.091'
                                    >
                                      <g
                                        id='Group_604'
                                        data-name='Group 604'
                                        transform='translate(0 0)'
                                      >
                                        <path
                                          id='Path_907'
                                          data-name='Path 907'
                                          d='M442,323.938a5.937,5.937,0,1,0,5.938,5.937A5.937,5.937,0,0,0,442,323.938Z'
                                          transform='translate(-429.729 -323.938)'
                                          fill='#0066cd'
                                        ></path>
                                        <path
                                          id='Path_908'
                                          data-name='Path 908'
                                          d='M435.667,338.979a5.938,5.938,0,0,0-5.938,5.938V346.8a2.434,2.434,0,0,0,2.042,2.4,63.49,63.49,0,0,0,20.459,0,2.433,2.433,0,0,0,2.041-2.4v-1.881a5.937,5.937,0,0,0-5.939-5.938h-.538a2.758,2.758,0,0,0-.86.137l-1.371.448a11.478,11.478,0,0,1-7.126,0l-1.37-.448a2.762,2.762,0,0,0-.861-.137Z'
                                          transform='translate(-429.729 -323.938)'
                                          fill='#0066cd'
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                </span>
                              </div>
                              <div className='emp-info'>
                                <a
                                  href='javascript:void(0)'
                                  className='emp-name text-hover-primary fw-bold me-2'
                                >
                                  {items.created_by}
                                </a>
                                <div className='emp-position fw-semibold fs-7'>
                                  {items.created_on}
                                </div>
                                <div
                                  className='emp-comment mt-1 text-adjustment'
                                  style={{ lineBreak: 'anywhere', maxWidth: '100%' }}
                                >
                                  {items.comment}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </Scrollbars>
                ) : (
                  ''
                )}
                <br />
                {data.data[0].is_kb_approved !== 0 && (
                  <>
                    Comments ({data.data[0].kb_comments})
                    <div className='d-flex flex-column mb-5 mt-5 fv-row fv-plugins-icon-container'>
                      {/* <!--begin::Label--> */}
                      {/* <label htmlFor="exampleFormControlInput1" className="form-label">Comments ({data.data[0].kb_comments})</label> */}
                      {/* <!--end::Label--> */}
                      {/* <!--begin::Input--> */}
                      <textarea
                        id='textareaid'
                        className='form-control form-control-solid'
                        name='comments'
                        spellCheck='false'
                        data-gramm='false'
                        onChange={onChange}
                        placeholder='Add a Comment..'
                        value={state.comments}
                      ></textarea>
                      {/* <!--end::Input--> */}
                    </div>
                    {isShown ? (
                      <p className='text-danger' id='comment-validate'>
                        Please enter a comment!
                      </p>
                    ) : (
                      ''
                    )}
                    <div className='row py-5'>
                      <div className='col-md-12'>
                        <div className='d-flex flex-wrap button-groups-reverse'>
                          {/* <!--begin::Button--> */}
                          <button
                            type='submit'
                            data-kt-ecommerce-settings-type='submit'
                            className='btn btn-primary'
                            onClick={onSubmit}
                          >
                            <span className='indicator-label' title='Comment'>
                              Comment
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {props.data.data[0].is_kb_approved == 0 ? (
                  <div className='row py-5'>
                    <td className='d-flex justify-content-end'>
                      <button
                        onClick={handleChange}
                        value={1}
                        id={props.data.data[0].id}
                        className='btn btn-outline btn-outline-solid btn-outline-default Button btn-approve'
                        title='Approve'
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setShow(true)}
                        // value={2}
                        // id={props.data.data[0].id}
                        className='btn btn-outline btn-outline-solid btn-outline-default Button btn-reject'
                        title='Reject'
                      >
                        Reject
                      </button>
                      <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Are you sure you want to reject the KB?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div>
                            <label
                              htmlFor='exampleFormControlInput1'
                              className='form-label required'
                            >
                              Please add the reason why you are rejecting the KBs?
                            </label>
                            <textarea
                              id='textareaid'
                              className='form-control form-control-solid'
                              name='reject comments'
                              spellCheck='false'
                              data-gramm='false'
                              placeholder='Add a Comment..'
                              onChange={onhandleChange}
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
                          <Button variant='secondary' onClick={() => setShow(false)} title='Close'>
                            Close
                          </Button>
                          <Button
                            variant='primary'
                            onClick={handleChange}
                            value={2}
                            id={props.data.data[0].id}
                            title='Yes'
                          >
                            Yes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            {/* <div className="separator my-2"></div> */}
          </div>
          {/* <!--begin::Col--> */}
          <div className='card new-card related-post bdr mb-5 mb-xxl-2'>
            {/* <!--begin::Body--> */}
            <div className='card-header pb-0 pt-7'>
              <h1 className='d-flex text-dark fw-bolder fs-2 align-items-center mb-3'>
                Related Posts
              </h1>
            </div>
            <div className=''>
              {relatedPosts.result && relatedPosts.result.length <= 0 && (
                <p className='text-center'>
                  <strong>No Records</strong>
                </p>
              )}
            </div>
            <div className='card-body pb-5 pt-2'>
              {/* <!--begin::User--> */}
              {relatedPosts.result &&
                relatedPosts.result.map((elements: any) => {
                  return (
                    <div key={elements.id}>
                      <div className='d-flex align-items-start flex-grow-1 mt-4'>
                        <div className='d-flex flex-column mb-3 w-100'>
                          <a
                            href={`/details-page/${elements.id}`}
                            className='text-hover-primary postName fw-bold title-adjustment'
                          >
                            {elements.title}
                          </a>
                          <div className='d-flex align-items-center flex-wrap'>
                            <div className='postDT me-4'>
                              Posted on {dayName[new Date(elements.created_on).getDay()]},{' '}
                              <span className='postDate'>
                                {monthName[new Date(elements.created_on).getMonth()]}{' '}
                                {new Date(elements.created_on).getDate()},{' '}
                                {new Date(elements.created_on).getFullYear()}
                              </span>{' '}
                              at {new Date(elements.created_on).getHours()}:
                              {new Date(elements.created_on).getMinutes()} PM
                            </div>
                            <div className='postLabel'>{elements.tag_name}</div>
                          </div>
                        </div>
                      </div>
                      <div className='separator my-2'></div>
                    </div>
                  )
                })}
            </div>
            {/* <!--end::Body--> */}
          </div>
          {/* <!--end::Col--> */}
        </div>
        {/* <!--end::Col--> */}
      </div>
    </>
  )
}
export default KBDetailsPage
