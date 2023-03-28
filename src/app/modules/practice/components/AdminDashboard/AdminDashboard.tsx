import React from 'react'
import { Spinner } from '../../../../helpers/Spinner';
import useLoader from '../../../../hooks/useLoader';
import KbPerProject from '../../../EmployeeDashboard/Pages/KbPerProject';
import GetCount from './GetCount';
import PracticePerCount from './PracticePerCount';
import QoQPerKb from './QoQPerKb';
// import KbPerProject from "./Pages/KbPerProject";


const AdminDashboard = () => {

  const isShown = useLoader();
  document.title = "DEV IT - Dashboard";

  return (
    <>
      {isShown ? <>
        <div className="toolbar" id="kt_toolbar">
          <div id="kt_toolbar_container" className="d-flex flex-stack">
            <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
              <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">Dashboard</h1>
            </div>
          </div>
        </div>
        <div className='row gy-5 g-xl-12'>
          <div className='col-xxl-6'>
            <GetCount />
          </div>
          <div className='col-xxl-6'>
            <PracticePerCount />
          </div>
          <div className='col-xxl-6'>
            <QoQPerKb/>
          </div>
          <div className='col-xxl-6'>
            <KbPerProject />
          </div>
        </div>
      </> : <Spinner />}



    </>
  );
}

export default AdminDashboard;
