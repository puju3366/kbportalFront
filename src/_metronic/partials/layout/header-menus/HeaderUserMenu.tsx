/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const HeaderUserMenu: FC = () => {
  let token;
  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ""
  }

  var test: any = jwt_decode(token);

  const logout = () => {
    Cookies.remove('logintoken');
    Cookies.remove('loginuser');
    window.location.replace('https://adfs.corpnet.co.in/adfs/ls?wa=wsignout1.0&wct=2021-06-18T10:53:6Z&wtrealm= /&wreply= https://adfsintegration.com/api/v1 ');
  }
  return (
    
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {test.device_token.first_name} {test.device_token.last_name}
            </div>
          </div>
        </div>
      </div>
      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='btn btn-outline btn-outline-solid btn-outline-default1 top-button  ' title='Sign Out'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
