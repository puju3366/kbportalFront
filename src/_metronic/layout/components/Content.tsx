import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { DrawerComponent } from '../../assets/ts/components'

const Content: React.FC = ({ children }) => {
  
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className="container-fluid">
      {children}
    </div>
  )
}

export { Content }
