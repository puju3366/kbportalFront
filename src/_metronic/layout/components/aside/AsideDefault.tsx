/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          // <Link to=''>
            <img
              alt='Logo'
              className='h-25px logo'
              src={toAbsoluteUrl('/media/logos/DEVIT_New_Logo.png')}
            />
          // </Link>
        )}
        {aside.theme === 'light' && (
          // <Link to=''>
            <img
              alt='Logo'
              className='h-25px logo'
              src={toAbsoluteUrl('/media/logos/DEVIT_New_Logo.png')}
            />
          // </Link>
        )}
        {/* end::Logo */}
        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            {/* <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            /> */}
            	<svg xmlns="http://www.w3.org/2000/svg" width="22.85" height="17.003" viewBox="0 0 22.85 17.003">
									<g id="XMLID_104_" transform="translate(-80.01 -39.992)">
									<path id="XMLID_105_" d="M81.887,43.4h19.1a1.708,1.708,0,1,0,0-3.4h-19.1a1.708,1.708,0,1,0,0,3.4Z" fill="#fff"/>
									<path id="XMLID_106_" d="M100.983,100h-19.1a1.708,1.708,0,1,0,0,3.4h19.1a1.708,1.708,0,1,0,0-3.4Z" transform="translate(0 -53.206)" fill="#fff"/>
									<path id="XMLID_107_" d="M100.983,160h-19.1a1.708,1.708,0,1,0,0,3.4h19.1a1.708,1.708,0,1,0,0-3.4Z" transform="translate(0 -106.413)" fill="#fff"/>
									</g>
								</svg>
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid' id='asidemenu'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

     
    </div>
  )
}

export {AsideDefault}
