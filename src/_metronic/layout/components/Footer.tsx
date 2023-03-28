/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <>
      <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
        <div className="container-fluid d-flex flex-column copyrightBlock flex-md-row align-items-center justify-content-between">
          <div className="text-dark order-2 order-md-1">
            <span className="me-1 copy-txt">2022 © Knowledge base by</span>
            <a href="javascript:void()" className="text-green fw-bolder text-hover-primary">DEV IT</a>
          </div>
        </div>
      </div>
    </>
  )
}

export { Footer }
