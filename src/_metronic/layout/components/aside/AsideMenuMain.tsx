/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { CategoryItems, MenuItems } from '../../../../app/helpers/configData/optionData'
import { getMenuToken } from '../../../../../src/app/modules/landingPage/landingPageRedux/landingPageCRUD'
import { Spinner } from '../../../../app/helpers/Spinner'


export function AsideMenuMain() {
  var menutoken;
  const intl = useIntl()
  let token
  let menuToken


  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ''
  }
  if (Cookies.get('menutoken')) {
    menutoken = Cookies.get('menutoken')
    getMenuToken({ 'menutoken': menutoken })
      .then((res: any) => {
        localStorage.setItem("menuToken", res.data.item)
      })
      .catch(error => {
        console.log(error);
      })
  }

  var Decodetoken: any = jwt_decode(token)
  var permissions = JSON.parse(Decodetoken.device_token.permissions)
  menuToken = localStorage.getItem('menuToken')
  if (!menuToken) {
    <Spinner />
    window.location.reload()
  }
  var Decodemenutoken: any = jwt_decode(menuToken)
  const menuArray: any = []
  const menu: any = []

  for (let i = 0; i < permissions[0]["kb-portal"].length; i++) {
    const testing = permissions[0]["kb-portal"][i].split("/")
    menuArray.push(testing[1])
  }

  Decodemenutoken.device_token.menu.map((item) => {
    Decodemenutoken.device_token.menu.filter((i) => {
      if (item.parent == i.id) {
        menu.push(i)
      }
    })
  })

  let menuData = [...new Set(menu)]
  Decodemenutoken.device_token.menu.sort((a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
});
  return (
    <>

      {
        permissions[0]["dashboard-1"] && permissions[0]["dashboard-1"].length !== 0 ?
          <AsideMenuItem
            to={`${Decodemenutoken.device_token.menu[8].url}`}
            icon='/media/dashboard.svg'
            title='Dashboard'
            fontIcon='bi-layers'
          /> : ""
      }
      {
        menuArray.includes("validate-kb") && permissions[0]["kb-portal"].length !== 0 ?
          <AsideMenuItem
            to={`${Decodemenutoken.device_token.menu[23].url}`}
            icon='/media/kb-approval.svg'
            title='KB Approval'
            fontIcon='bi-layers'
          /> : ""
      }
      {
        menuArray.includes("comment") && permissions[0]["kb-portal"].length !== 0 ?
          <AsideMenuItem
            to={`${Decodemenutoken.device_token.menu[24].url}`}
            icon='/media/comment.svg'
            title='KB Comment Approval'
            fontIcon='bi-layers'
          /> : ""
      }
      <AsideMenuItem
            to='/myKBs'
            icon='/media/mykbs.svg'
            title='My KBs'
            fontIcon='bi-layers'
          />
      <AsideMenuItem
            to='/categories'
            icon='/media/categories.svg'
            title='My Categories'
            fontIcon='bi-layers'
          />
      {
        Decodemenutoken.device_token.menu &&
        menuData.map((e: any) => {
          return (
            <AsideMenuItemWithSub to={`${e.url}`} title={e.title} icon='/media/category.svg' fontIcon='bi-layers' key={e.id} >
              {Decodemenutoken.device_token.menu.map((i) => {
                return (e.id == i.parent &&
                  <AsideMenuItem
                    to={`${i.url}`}
                    title={i.title}
                    hasBullet={true}
                    key={i.id}
                  />)
              })
              }
            </AsideMenuItemWithSub>
          )

        })
      }
    </>
  )
}
