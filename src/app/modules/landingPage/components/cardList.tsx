import {useState, useEffect} from 'react'
import {getallEmployeeData} from '../landingPageRedux/landingPageCRUD'
import {Markup} from 'interweave'
import {isEmptyArray} from 'formik'
import jwt_decode from 'jwt-decode'
import {useLocation} from 'react-router'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {Pagination} from '../../../helpers/Components/Pagination'
import useLoader from '../../../hooks/useLoader'
import {Spinner} from '../../../helpers/Spinner'

function CardList(props: any) {
  const location = useLocation()
  const kbID = location.pathname.split('/')
  kbID.shift()

  const data = props.data
  const [userData, setUserData] = useState([])

  let emailData = [...new Set(props.userlist)]

  /**
   * @Author
   * @Method getEmployeeData
   * @Purpose To get data of all the employee which is used in to kb list
   * @param {}
   * @Since Oct 2022
   */

  const getEmployeeData = () => {
    getallEmployeeData(emailData)
      .then((response: any) => {
        const employeeData: any = jwt_decode(response.data.data.token)
        setUserData(employeeData.device_token)
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  useEffect(() => {
    getEmployeeData()
  }, [isEmptyArray(props.userlist) === false])

  let finaleData: any = []
  userData &&
    userData.map((content: any) => {
      data.map((element: any) => {
        if (element.created_by.toUpperCase() === content.email.toUpperCase()) {
          const finalEmployeeData = {
            body: element.body,
            category_color: element.bg_color,
            category_name: element.category_name,
            created_on: element.created_on,
            id: element.id,
            is_approved: element.is_kb_approved,
            practice_name: element.practice_name,
            project_name: element.project_name,
            tag: element.tag,
            title: element.title,
            designation: content.designation,
            email: content.email,
            practice: content.practice,
            team: content.team,
            username: content.username,
            rating: element.avg_rate == null ? 'Rate Now' : element.avg_rate,
            likes: element.kb_likes == null || element.kb_likes == 0 ? 0 : element.kb_likes,
            comments:
              element.kb_comments == null || element.kb_comments == 0 ? 0 : element.kb_comments,
          }
          return finaleData.push(finalEmployeeData)
        }
      })
    })

  const filteredEmployeeData: any = []
  let uniqueChars = finaleData.filter((element: any, index: any) => {
    const isDuplicate = filteredEmployeeData.includes(element.id)
    if (!isDuplicate) {
      filteredEmployeeData.push(element.id)
      return true
    }
    return false
  })

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

  //Pagination
  const [currentPage, setCurrentPage] = useState(0) //Pagination

  const PER_PAGE = 12
  const pageCount = Math.ceil(uniqueChars.length / PER_PAGE)

  function handlePageClick({selected: selectedPage}) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE

  const isShown = useLoader()

  return (
    <>
      {isShown ? (
        <div className='latest-post'>
          <div className='row g-6 g-xl-9'>
            {uniqueChars && Array.isArray(uniqueChars) && uniqueChars.length > 0 ? (
              uniqueChars.slice(offset, offset + PER_PAGE).map((items: any) => {
                return (
                  <div className='col-xxl-4 col-xl-6' key={items.id}>
                    <div className='card new-card mb-5 mb-xxl-2'>
                      <div className='card-body pb-0'>
                        <div
                          className='categoryLable'
                          style={{backgroundColor: items.category_color}}
                        >
                          {items.category_name}
                        </div>

                        <div className='d-flex align-items-center mb-3 mt-2'>
                          <div className='d-flex align-items-start flex-grow-1'>
                            <div className='symbol symbol-50px me-5'>
                              <span className='symbol-label bg-light-success'>
                                <span className='svg-icon svg-icon-2x svg-icon-success'>
                                  <svg
                                    id='icon1'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    width='28.702'
                                    height='28.703'
                                    viewBox='0 0 28.702 28.703'
                                  >
                                    <defs>
                                      <clipPath id='clip-path'>
                                        <path
                                          id='Path_1003'
                                          data-name='Path 1003'
                                          d='M504,445h6.593v5.394H504Z'
                                          transform='translate(-504 -445)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                      <clipPath id='clip-path-2'>
                                        <path
                                          id='Path_1005'
                                          data-name='Path 1005'
                                          d='M573,178h2.412v15.03H573Z'
                                          transform='translate(-573 -178)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                      <clipPath id='clip-path-3'>
                                        <path
                                          id='Path_1007'
                                          data-name='Path 1007'
                                          d='M267,593h13.212v1.2H267Z'
                                          transform='translate(-267 -593)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                      <clipPath id='clip-path-4'>
                                        <path
                                          id='Path_1009'
                                          data-name='Path 1009'
                                          d='M287,523h2.424v5.442H287Z'
                                          transform='translate(-287 -523)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                      <clipPath id='clip-path-5'>
                                        <path
                                          id='Path_1011'
                                          data-name='Path 1011'
                                          d='M139.21,178h19.745v26.351H139.21Z'
                                          transform='translate(-139.21 -178)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                      <clipPath id='clip-path-6'>
                                        <path
                                          id='Path_1013'
                                          data-name='Path 1013'
                                          d='M198,139.21h21.576v19.745H198Z'
                                          transform='translate(-198 -139.21)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                      <clipPath id='clip-path-7'>
                                        <path
                                          id='Path_1018'
                                          data-name='Path 1018'
                                          d='M365,385h13.879v13.806H365Z'
                                          transform='translate(-365 -385)'
                                          fill='#13a090'
                                          stroke='#13a090'
                                          strokeWidth='0.5'
                                        />
                                      </clipPath>
                                    </defs>
                                    <g
                                      id='Group_574'
                                      data-name='Group 574'
                                      transform='translate(22.109 18.533)'
                                      clipPath='url(#clip-path)'
                                    >
                                      <path
                                        id='Path_1002'
                                        data-name='Path 1002'
                                        d='M508.449,450.445v-1.2a1.2,1.2,0,0,0,1.2-1.2v-1.794h-5.382v-1.2h5.98a.6.6,0,0,1,.6.6v2.392a2.392,2.392,0,0,1-2.392,2.392Z'
                                        transform='translate(-504.247 -445.06)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <g
                                      id='Group_575'
                                      data-name='Group 575'
                                      transform='translate(26.29 2.351)'
                                      clipPath='url(#clip-path-2)'
                                    >
                                      <path
                                        id='Path_1004'
                                        data-name='Path 1004'
                                        d='M575.717,193.622h-1.2V180.466a.6.6,0,0,0-.6-.6h-.6v-1.2h.6a1.794,1.794,0,0,1,1.794,1.794Z'
                                        transform='translate(-573.306 -178.632)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <g
                                      id='Group_576'
                                      data-name='Group 576'
                                      transform='translate(7.745 27.503)'
                                      clipPath='url(#clip-path-3)'
                                    >
                                      <path
                                        id='Path_1006'
                                        data-name='Path 1006'
                                        d='M267.47,593.06h13.155v1.2H267.47Z'
                                        transform='translate(-267.442 -593.056)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <g
                                      id='Group_577'
                                      data-name='Group 577'
                                      transform='translate(8.957 23.26)'
                                      clipPath='url(#clip-path-4)'
                                    >
                                      <path
                                        id='Path_1008'
                                        data-name='Path 1008'
                                        d='M287.2,529.375v-1.2a1.125,1.125,0,0,0,1.2-1.2v-2.99h1.2v2.99a2.325,2.325,0,0,1-2.392,2.392Z'
                                        transform='translate(-287.187 -523.933)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <g
                                      id='Group_578'
                                      data-name='Group 578'
                                      transform='translate(0 2.351)'
                                      clipPath='url(#clip-path-5)'
                                    >
                                      <path
                                        id='Path_1010'
                                        data-name='Path 1010'
                                        d='M158.949,204.981a2.325,2.325,0,0,1-2.392-2.392V200.2H141.011a1.794,1.794,0,0,1-1.794-1.794V180.464a1.794,1.794,0,0,1,1.794-1.794h.6v1.2h-.6a.6.6,0,0,0-.6.6V198.4a.6.6,0,0,0,.6.6h16.145a.6.6,0,0,1,.6.6v2.99a1.125,1.125,0,0,0,1.2,1.2Z'
                                        transform='translate(-139.217 -178.63)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <g
                                      id='Group_579'
                                      data-name='Group 579'
                                      transform='translate(3.563)'
                                      clipPath='url(#clip-path-6)'
                                    >
                                      <path
                                        id='Path_1012'
                                        data-name='Path 1012'
                                        d='M199.606,158.945h-1.2V144.594a.6.6,0,0,1,.175-.423l4.784-4.784a.6.6,0,0,1,.423-.175h14.351a1.794,1.794,0,0,1,1.794,1.794V157.75h-1.2V141.007a.6.6,0,0,0-.6-.6h-14.1L199.6,144.84Z'
                                        transform='translate(-198.385 -139.213)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <path
                                      id='Path_1014'
                                      data-name='Path 1014'
                                      d='M213.054,154.466H208.27v-1.2h4.186V149.08h1.2v4.784a.6.6,0,0,1-.6.6Z'
                                      transform='translate(-204.085 -148.486)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1015'
                                      data-name='Path 1015'
                                      d='M467.789,181.669h-1.2v-1.2a.6.6,0,0,0-.6-.6h-1.2v-1.2h1.2a1.794,1.794,0,0,1,1.794,1.794Z'
                                      transform='translate(-445.066 -176.287)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1016'
                                      data-name='Path 1016'
                                      d='M425.33,178.68h1.2v1.2h-1.2Z'
                                      transform='translate(-407.989 -176.288)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <g
                                      id='Group_580'
                                      data-name='Group 580'
                                      transform='translate(13.684 14.896)'
                                      clipPath='url(#clip-path-7)'
                                    >
                                      <path
                                        id='Path_1017'
                                        data-name='Path 1017'
                                        d='M377.357,399.026a1.823,1.823,0,0,1-1.3-.538L365.568,388a.6.6,0,0,1,0-.846l1.749-1.749a.615.615,0,0,1,.845,0l10.49,10.492a1.834,1.834,0,0,1-1.3,3.132Zm-10.521-11.452L376.9,397.643a.653.653,0,0,0,.9,0,.639.639,0,0,0,0-.9L367.74,386.671Z'
                                        transform='translate(-365.369 -385.22)'
                                        fill='#13a090'
                                        stroke='#13a090'
                                        strokeWidth='0.5'
                                      />
                                    </g>
                                    <path
                                      id='Path_1019'
                                      data-name='Path 1019'
                                      d='M338.34,360.66l-1.749-3.5h0a.6.6,0,0,1,.8-.8l3.5,1.746-.538,1.07-1.893-.947.947,1.893Z'
                                      transform='translate(-324.569 -343.14)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1020'
                                      data-name='Path 1020'
                                      d='M188.54,454.93H199.9v1.2H188.54Z'
                                      transform='translate(-185.55 -435.795)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1021'
                                      data-name='Path 1021'
                                      d='M280.23,300.813l.846-.846,2.392,2.392-.846.846Z'
                                      transform='translate(-271.683 -290.224)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1022'
                                      data-name='Path 1022'
                                      d='M249.532,271.058a1.794,1.794,0,1,1,1.268-.526,1.794,1.794,0,0,1-1.268.526Zm0-2.392h0a.6.6,0,1,0,.423.175.6.6,0,0,0-.423-.175Z'
                                      transform='translate(-241.161 -259.697)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1023'
                                      data-name='Path 1023'
                                      d='M446.856,271.058a1.794,1.794,0,1,1,1.268-.526,1.794,1.794,0,0,1-1.268.526Zm0-2.392h0a.6.6,0,1,0,.423.175.6.6,0,0,0-.423-.175Z'
                                      transform='translate(-426.525 -259.697)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                    <path
                                      id='Path_1024'
                                      data-name='Path 1024'
                                      d='M398.62,303.553l3.588-3.588.846.846-3.588,3.588Z'
                                      transform='translate(-382.898 -290.222)'
                                      fill='#13a090'
                                      stroke='#13a090'
                                      strokeWidth='0.5'
                                    />
                                  </svg>
                                </span>
                              </span>
                            </div>

                            <div className='d-flex flex-column'>
                              <Link
                                to={`/details-page/${items.id}`}
                                className='text-hover-primary postName fw-bold title-adjustment'
                              >
                                {items.title.charAt(0).toUpperCase() + items.title.slice(1)}
                              </Link>
                              <div className='postDT'>
                                Posted on {dayName[new Date(items.created_on).getDay()]},{' '}
                                <span className='postDate'>
                                  {monthName[new Date(items.created_on).getMonth()]}{' '}
                                  {new Date(items.created_on).getDate()},{' '}
                                  {new Date(items.created_on).getFullYear()}
                                </span>{' '}
                                at{' '}
                                {new Date(items.created_on).getHours() > 12
                                  ? new Date(items.created_on).getHours() - 12
                                  : new Date(items.created_on).getHours()}
                                :
                                {new Date(items.created_on).getMinutes() < 10
                                  ? '0' + new Date(items.created_on).getMinutes()
                                  : new Date(items.created_on).getMinutes()}{' '}
                                {new Date(items.created_on).getHours() >= 12 ? 'PM' : 'AM'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='card-detail'>
                          <div className='detail-text'>
                            <Markup
                              className='mb-5 postInfo text-adjustment'
                              content={items.body}
                            />
                          </div>
                          <div className='ms-2 mb-1 postDetail'>
                            <div className='d-flex'>
                              <div className='symbol symbol-35px me-5'>
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
                                        />
                                        <path
                                          id='Path_908'
                                          data-name='Path 908'
                                          d='M435.667,338.979a5.938,5.938,0,0,0-5.938,5.938V346.8a2.434,2.434,0,0,0,2.042,2.4,63.49,63.49,0,0,0,20.459,0,2.433,2.433,0,0,0,2.041-2.4v-1.881a5.937,5.937,0,0,0-5.939-5.938h-.538a2.758,2.758,0,0,0-.86.137l-1.371.448a11.478,11.478,0,0,1-7.126,0l-1.37-.448a2.762,2.762,0,0,0-.861-.137Z'
                                          transform='translate(-429.729 -323.938)'
                                          fill='#0066cd'
                                        />
                                      </g>
                                    </svg>
                                  </span>
                                </span>
                              </div>
                              <div className='d-flex flex-column flex-row-fluid emp-info'>
                                <div className='d-flex align-items-center flex-wrap mt-2'>
                                  <a
                                    href='javascript:void(0)'
                                    className='emp-name text-hover-primary fw-bold me-2'
                                  >
                                    {items.username}
                                  </a>
                                  <span className='emp-position fw-semibold fs-7'>
                                    {items.designation}, {items.team}
                                  </span>
                                </div>
                                <div className='d-flex align-items-center emp-status mt-2 mb-5 flex-wrap icons'>
                                  {/* <a href='javascript:void(0)' className='icons'>
                                    <span className='svg-icon'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='19'
                                        height='19'
                                        viewBox='0 0 19 19'
                                      >
                                        <g
                                          id='Group_606'
                                          data-name='Group 606'
                                          transform='translate(1 1)'
                                        >
                                          <circle
                                            id='Ellipse_401'
                                            data-name='Ellipse 401'
                                            cx='8.5'
                                            cy='8.5'
                                            r='8.5'
                                            fill='none'
                                            stroke='#13a090'
                                            strokeLinecap='round'
                                            strokeWidth='2'
                                          />
                                          <path
                                            id='Path_758'
                                            data-name='Path 758'
                                            d='M426.459,544.256a4.242,4.242,0,0,0,1.6.815,7.342,7.342,0,0,0,3.888,0,4.241,4.241,0,0,0,1.6-.815'
                                            transform='translate(-421.5 -532.5)'
                                            fill='none'
                                            stroke='#13a090'
                                            strokeLinecap='round'
                                            strokeWidth='2'
                                          />
                                          <circle
                                            id='Ellipse_402'
                                            data-name='Ellipse 402'
                                            cx='1.083'
                                            cy='1.083'
                                            r='1.083'
                                            transform='translate(4.917 5.75)'
                                            fill='#13a090'
                                            stroke='#13a090'
                                            strokeLinecap='round'
                                            strokeWidth='0.5'
                                          />
                                          <circle
                                            id='Ellipse_403'
                                            data-name='Ellipse 403'
                                            cx='1.083'
                                            cy='1.083'
                                            r='1.083'
                                            transform='translate(9.917 5.75)'
                                            fill='#13a090'
                                            stroke='#13a090'
                                            strokeLinecap='round'
                                            strokeWidth='0.5'
                                          />
                                        </g>
                                      </svg>
                                    </span>
                                    Likes ({items.likes})
                                  </a> */}
                                  {/* <a href="javascript:void(0)" className="px-2 py-1 me-4">
                              <span className="svg-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20.338" height="17.773" viewBox="0 0 20.338 17.773">
                                <path id="Path_1041" data-name="Path 1041" d="M515.788,543.02a.755.755,0,0,0,.132.031l.183.431c.177.417.415.982.661,1.572.5,1.2,1.009,2.44,1.121,2.795a2.967,2.967,0,0,0,.445.939,1.15,1.15,0,0,0,.29.267.854.854,0,0,0,.178.085h.008a1.183,1.183,0,0,0,.795.009,1.335,1.335,0,0,0,.232-.1q.043-.025.072-.045h0l2.826-1.762,3.265,2.5a.767.767,0,0,0,.156.093,2.1,2.1,0,0,0,1.129.182,1.728,1.728,0,0,0,.851-.368,2,2,0,0,0,.433-.487,1.9,1.9,0,0,0,.1-.18c.012-.024.021-.044.028-.061l.01-.022v-.008h0a.755.755,0,0,0,.04-.133l2.98-15.025a.8.8,0,0,0,.014-.146,1.272,1.272,0,0,0-.556-1.112,1.5,1.5,0,0,0-.938-.209,2.885,2.885,0,0,0-.644.132c-.082.026-.15.051-.2.07l-.061.024-.011.005-16.714,6.556h0l-.04.015c-.033.013-.076.031-.127.054a2.377,2.377,0,0,0-.379.212,1.373,1.373,0,0,0-.662,1.285,1.571,1.571,0,0,0,.689,1.071,2.249,2.249,0,0,0,.339.2c.042.02.127.055.165.07h.009Zm14.138-9.152h0l-.026.01-16.734,6.565-.026.01h-.009l-.052.022-.04.019c.019.01.037.02.053.027l.033.015,3.143,1.058a.716.716,0,0,1,.16.076L526.8,535.6l.01-.005.029-.017a1.117,1.117,0,0,1,.1-.051,2,2,0,0,1,.317-.131,1.077,1.077,0,0,1,.645-.014.853.853,0,0,1,.482.387.885.885,0,0,1,.106.3.835.835,0,0,1,0,.424,1.394,1.394,0,0,1-.438.653c-.15.14-2.1,2.016-4.014,3.868l-2.613,2.521-.465.449,5.872,4.5a.536.536,0,0,0,.251.04.225.225,0,0,0,.117-.052.48.48,0,0,0,.1-.119h0l2.89-14.573c-.043.01-.086.023-.128.036s-.086.029-.112.039l-.027.011Zm-8.461,12.394-1.172-.9-.284,1.8Zm-2.247-2.681,1.165-1.124L523,539.935l.973-.938-6.52,3.817.035.082c.177.419.417.987.664,1.579.186.443.379.909.555,1.341l.284-1.8A.75.75,0,0,1,519.218,543.581Z" transform="translate(-511.401 -532.258)" fill="#13a090" fillRule="evenodd" />
                              </svg>
                              </span>
                              Share
                            </a> */}
                                  <a href='javascript:void(0)' className='py-1 icons'>
                                    <span className='svg-icon'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='18.5'
                                        height='20.224'
                                        viewBox='0 0 18.5 20.224'
                                      >
                                        <path
                                          id='Path_1040'
                                          data-name='Path 1040'
                                          d='M592.75,534.4a1.15,1.15,0,0,1,1.15-1.15h16.2a1.15,1.15,0,0,1,1.15,1.15v11.472a1.149,1.149,0,0,1-.337.813l-2.722,2.722a1.149,1.149,0,0,1-.813.337h-4.539l-3.452,3.451a.949.949,0,0,1-1.621-.672v-2.779H593.9a1.15,1.15,0,0,1-1.15-1.15Zm1.5.35v13.494h3.866a1.15,1.15,0,0,1,1.15,1.15v1.8l2.614-2.615a1.151,1.151,0,0,1,.814-.337h4.539l2.517-2.517V534.75Zm6.219,3.2a.75.75,0,0,1,.75.75v4.272a.75.75,0,0,1-1.5,0V538.7a.75.75,0,0,1,.75-.75Zm5.015,0a.75.75,0,0,1,.75.75v4.272a.75.75,0,0,1-1.5,0V538.7a.75.75,0,0,1,.75-.75Z'
                                          transform='translate(-592.75 -533.25)'
                                          fill='#13a090'
                                          fillRule='evenodd'
                                        />
                                      </svg>
                                    </span>
                                    Comments ({items.comments})
                                  </a>
                                  {/* <a href='javascript:void(0)' className='py-1 icons'>
                                    <span className='svg-icon'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='18.5'
                                        height='20.224'
                                        viewBox='0 0 16 16'
                                        fill='#13A090'
                                        className='bi bi-star-fill'
                                      >
                                        <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                                      </svg>
                                    </span>
                                    ({items.rating})
                                  </a> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className='text-center mx-5' style={{color: 'grey'}}>
                No Records
              </p>
            )}
          </div>
          <br />
          <div>
            <Pagination
              Items={uniqueChars}
              offset={offset}
              pageCount={pageCount}
              PER_PAGE={PER_PAGE}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CardList
