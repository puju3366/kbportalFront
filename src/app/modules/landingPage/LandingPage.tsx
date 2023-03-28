import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import CardList from './components/cardList'
import { useState, useEffect } from 'react'
import { GetAllKB } from './landingPageRedux/landingPageCRUD'
import { isEmptyArray } from 'formik'
import useLoader from '../../hooks/useLoader'
import { Spinner } from '../../helpers/Spinner'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import TitleBar from './components/TitleBar'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'KB_list',
    path: '/kblist',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const LandingPage = () => {
  
  const [kbData, setKbData] = useState([])
  let lenght = Object.keys(kbData)
  let token

  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ''
  }
  var practice: any = jwt_decode(token)

  const pageLength = Math.ceil(kbData.length / 6)

  /**
   * @Author
   * @Method onLoadPage
   * @Purpose Get all kb of practice cloud
   * @param {}
   * @Since Oct 2022
   */
  const onLoadPage = () => {
    return GetAllKB(practice.device_token.practice)
      .then((response: any) => {
        setKbData(response.data.items.result)
      })
      .catch((err: any) => {
        console.log(`Error has occured ${err}`)
      })
  }
  let emaillist = ''
  kbData.forEach((element: any) => {
    emaillist += ',' + element.created_by
  })
  const userEmailArray = emaillist.split(',')
  userEmailArray.shift()
  useEffect(() => {
    document.title = 'DEV IT - KB List'
    onLoadPage()
  }, [lenght.length])

  const isShown = useLoader()

  return (
    <>
      <PageTitle>KB_List1</PageTitle>
      <TitleBar
        title='Add Post'
        label={'KBs'}
        url='addkb'
        page='kbList'
        data={kbData}
        userEmailArray={isEmptyArray(userEmailArray)}
        userlist={userEmailArray}
        isShown={isShown}
      />
    </>
  )
}
export default LandingPage
