import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
// import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import LandingPage from '../modules/landingPage/LandingPage'
import EmployeeListPage from '../modules/employeeKBListPage/employeeKBListPage'
import EmployeeDashboardPage from '../modules/EmployeeDashboard/employeeDashBoardPage'
import Addpost from '../modules/practice/components/Addpost'
import Editpost from '../modules/practice/components/Editpost'
import AdminDashboard from '../modules/practice/components/AdminDashboard/AdminDashboard'
import CommentApprover from '../modules/practice/components/CommentApprover'
import GetCount from '../modules/practice/components/AdminDashboard/GetCount'
import KbApprover from '../modules/practice/components/KbApprover/KbApprover'
import MyKBs from '../modules/practice/components/KbApprover/MyKBs'
import Cookies from 'js-cookie';
import useLoader from '../hooks/useLoader'
import { SampleCardList } from '../modules/landingPage/components/SampleCardlist'
import Categories from '../modules/categories/categories';


const PrivateRoutes = () => {
  const KbDetailsPage = lazy(() => import('../modules/kbDetailsPage/kbDetailsPage'))
  let token;

  if (Cookies.get('logintoken')) {
    token = Cookies.get('logintoken')
  } else {
    token = ""
  }
  



  return (
    <>
    {/* {useLoader()} */}
      {token && token !== "" &&
        <Routes>
          <Route element={<MasterLayout />}>
            {/* Redirect to Dashboard after success login/registartion */}
            <Route path='auth/*' element={<Navigate to='/dashboard' />} />
            {/* Pages */}
            {/* <Route path='dashboard' element={<EmployeeDashboardPage />} /> */}
            <Route path='menu-test' element={<MenuTestPage />} />
            {/* <Route path='kblist' element={<LandingPage />} /> */}
            {/* <Route path='employeekblist' element={<EmployeeListPage />} /> */}
            <Route path='details-page/:id' element={<KbDetailsPage />} />
            <Route path='addkb' element={<Addpost />} />
            {/* routes to redirect from employee to edit */}
            <Route path='editkb/:id' element={<Editpost />} />
            <Route path='admindashboard' element={<AdminDashboard />} />
            <Route path='commentapprover' element={<CommentApprover />} />
            <Route path='getcount' element={<GetCount />} />
            <Route path='getkbapprove' element={<KbApprover/>}/>
            <Route path='myKBs' element={<MyKBs/>}/>
            <Route path='lists/:type/:id' element={<SampleCardList />} />
            <Route path='/categories' element={<Categories />} />
            {/* Page Not Found */}
            <Route path='*' element={<Navigate to='/error/404' />} />
          </Route>
        </Routes>
      }
      {token === "" && window.location.replace(`https://adfs.corpnet.co.in/adfs/ls?wa=wsignin1.0&wct=2022-08-23T18:23:6Z&wtrealm=${process.env.REACT_APP_API_URL}`)
      }
    </>
  )
}

const SuspensedView: FC = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
