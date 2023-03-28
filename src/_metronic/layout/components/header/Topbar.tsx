import React, { FC, useState, useEffect } from 'react'
import { useLayout } from '../../core'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import clsx from 'clsx'
import { HeaderUserMenu } from '../../../partials'
import { searchKb } from '../../../../app/modules/landingPage/landingPageRedux/landingPageCRUD'
import { Link } from 'react-router-dom';
import $ from "jquery";


const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Dropdown = (props) => {
  const [state, setState] = useState({
    itemsToShow: 5,
    expanded: false
  });


  const showMoreData = () => {
    state.itemsToShow === 5 ? (
      setState({ itemsToShow: props.searchData.length, expanded: true })
    ) : (
      setState({ itemsToShow: 5, expanded: false })
    )
  }

  if (props.searchTitle.length == "") {
    return (
      <>
        <div >
          <div>
            <a >
              <option>
              </option>
            </a>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        {props.searchData ? props.searchData.slice(0, state.itemsToShow).map((element: any) => {
          return (
            <a href={`/details-page/${element.id}`} key={element.id} className="testing">
              <p >{element.title}<br></br>
              </p>
              <div className="separator border-gray-200 mb-6"></div>

            </a>

          )

        }) : <p id="no-record">No Records Found</p>}
        {props.searchData && props.searchData.length > 5 ?
          <p>
            <a className="btn btn-outline btn-outline-solid btn-outline-default Button btn-approve" onClick={showMoreData} title="Show more" id='showMoreTag' >
              {state.expanded ? (
                <span id='showLess'>Show less</span>
              ) : (
                <span className='showMore' id='showMore'>Show more</span>
              )
              }
            </a>
          </p>
          : ""}
      </>
    )
  }

}

const Topbar: FC = () => {
  let token;
  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ""
  }

  $('body').click(function (event) {
    const myDropdownSearch = document.getElementById('myDropdownSearch')
    const myShowMore = document.getElementById('showMore')
    const myShowLess = document.getElementById('showLess')
    const myShowMoreTag = document.getElementById('showMoreTag')
    const searchDropdown = document.getElementById('Search_By')
    const search = document.getElementById('searchInput')
    if ((event.target !== myShowLess) && (event.target !== myShowMoreTag) && (event.target !== myShowMore) && (event.target !== searchDropdown) && (event.target !== search)) {
      $('#searchInput').val('')
      setSearchTitle("")
 }  
});

  var test: any = jwt_decode(token);
  const { config } = useLayout()
  const [searchTitle, setSearchTitle] = useState("");
  const [select, setSelect] = useState("");
  const [isShown, setisShown] = useState(false);
  const [searchData, setSearchData] = useState([])


  const onchange = (e) => {
    if (select != "" && !isShown) {
      e.preventDefault();
      setSearchTitle(e.target.value.trim())
    }
    else {
      setisShown(true);
    }

  }


  const handleSelect = (e) => {
    if (e.target.value != 0) {
      setSelect(e.target.value);
      setisShown(false);
    } else {
      setisShown(true);
    }

  }

  const findKb = () => {

    const data = {
      type: select,
      kbName: searchTitle
    }

    searchKb(data)
      .then(response => {
        setSearchData(response.data.result)
      })
      .catch(err => {
        console.log("err", err);
      })

  }

  useEffect(() => {
    findKb()
  }, [searchTitle])

  useEffect(() => {
    setSearchTitle("")
    setSelect("")
  }, [])

  /* If browser back button was used, page reload */
  window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
      (typeof window.performance != "undefined" &&
        window.performance.navigation.type === 2);
    if (historyTraversal) {
      // Handle page restore.
      window.location.reload();
    }
  });



  return (
    <div className='d-flex align-items-stretch flex-shrink-1'>
      <div className='d-flex align-items-center gap-2 gap-lg-3'>

        <Link to={`/addkb`} className='btn btn-sm btn-primary '>
          <span className='svg-icon me-2' style={{ fontSize: "20px" }}>
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
          <span title='Add Post'>Add Post</span>
        </Link>
      </div>

      <div className="d-flex align-items-center ms-1 ms-lg-7 me-5 search-circle">
        <input type="text" className="search-input form-control form-control-solid" name="search" placeholder="Search" onChange={onchange} id="searchInput" />
        {searchTitle && <div className='search-dropdown w-375px scroll-y mh-200px mh-lg-325px' id='myDropdownSearch'>
          <Dropdown searchData={searchData} searchTitle={searchTitle} state={setSearchTitle}></Dropdown>
        </div>}

        <div id="kt_header_search" className="header-search d-flex align-items-stretch d-lg-none" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-menu-trigger="auto" data-kt-menu-overflow="false" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end">
          <div className="d-flex align-items-center" data-kt-search-element="toggle" id="kt_header_search_toggle">
            <div className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px">
              <span className="svg-icon svg-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                  <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
          <div data-kt-search-element="content" className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px">
            <div data-kt-search-element="wrapper">
              <form data-kt-search-element="form" className="w-100 position-relative" autoComplete="off">
                <input type="text" className="form-control form-control-solid" name="search" placeholder="Search" data-kt-search-element="input" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="dropdown-select">
        <select name="searchBy" id="Search_By" className="top-button Search_By " onChange={handleSelect}>
          <option value="0" className="py-5 px-5" >Search By</option>
          <option value='all' >All</option>
          <option value="title" >Title</option>
          <option value="cat" >Category</option>
          <option value="pract" > Practice</option>
          <option value="project"> Project</option>
          <option value="tag" >Tag</option>
        </select>
        {isShown ? <p className="text-danger" id="select"> * Must Select</p> : ""}
        <p className="text-danger" id="must-select"></p>
      </div>

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center ms-1 ms-xl-10', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <div className="cursor-pointer symbol symbol-30px symbol-md-50px" data-kt-menu-placement="bottom-end">
          <span className="username">{test.device_token.first_name} {test.device_token.last_name}</span>
        </div>
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='profilpic' />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export { Topbar }
