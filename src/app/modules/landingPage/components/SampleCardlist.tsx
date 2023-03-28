import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'
import { GetAllKB, GetAllKBByCat, getMenuToken } from '../landingPageRedux/landingPageCRUD'
import TitleBar from './TitleBar'
import useLoader from '../../../hooks/useLoader'
import { PageTitle } from '../../../../_metronic/layout/core'
import { isEmptyArray } from 'formik'
import { Spinner } from '../../../helpers/Spinner'


function SampleCardList(props: any) {
 
  const [kbData, setKbData] = useState([])
  let lenght = Object.keys(kbData)
  let token

  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ''
  }
  var practice: any = jwt_decode(token)

  const location = useLocation()
  const kbID = location.pathname.split('/')
  kbID.shift()
  const type = kbID[1]
  const kb_practice_id = kbID[2]

  /**
   * @Author
   * @Method onLoadPage
   * @Purpose Get all kb of practice_id
   * @param {}
   * @Since Oct 2022
   */
  const onLoadPage = () => {
    setKbData([]);
    if (type == 'practice') {
      return GetAllKB(decodeURI(kb_practice_id))
        .then((response: any) => {
          setKbData(response.data.items.result)
        })
        .catch((err: any) => {
          console.log(`Error has occured ${err}`)
        })
    } else {
      return GetAllKBByCat(decodeURI(kb_practice_id))
        .then((response: any) => {
          setKbData(response.data.items.result)
        })
        .catch((err: any) => {
          console.log(`Error has occured ${err}`)
        })
    }
  }
  let emaillist = ''
  kbData.forEach((element: any) => {
    emaillist += ',' + element.created_by
  })
  const userEmailArray = emaillist.split(',')

  userEmailArray.shift()


  useEffect(() => {
    document.title = 'DEV IT - KBs'
    onLoadPage()

    // setTimeout(() =>{
    //   <Spinner />
    // },5000)
  }, [kb_practice_id])

  const isShown = useLoader();
  return (
    <>
      {
        // isShown ?
        <>

          <PageTitle>KB_List1</PageTitle>
          {
            kbData && kbData.length ? (
              <TitleBar
                title='Add Post'
                label={'KBs'}
                url='addkb'
                page='kbList'
                data={kbData}
                userEmailArray={isEmptyArray(userEmailArray)}
                userlist={userEmailArray}
              />
            ) : <p className='text-center mx-5' style={{ color: 'gray', fontSize: '40px', margin: '20% 0 0 0' }} >
              <strong>No Records</strong>
            </p>
          }
        </>
      }

    </>
  )
}

export { SampleCardList }
