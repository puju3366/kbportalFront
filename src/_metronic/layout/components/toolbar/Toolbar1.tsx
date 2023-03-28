/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC } from 'react'
import { KTSVG } from '../../../helpers'
import { useLayout } from '../../core'
import { DefaultTitle } from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {

  return (
    <div className="toolbar" id="kt_toolbar">
      <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
        <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
          <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">Add Posts</h1>
        </div>
      </div>
    </div>
  )
}

export { Toolbar1 }
