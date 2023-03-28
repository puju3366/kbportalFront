import { FC } from 'react'
import { Spinner } from '../../../helpers/Spinner';
import useLoader from '../../../hooks/useLoader'

const Error404: FC = () => {

  const isShown = useLoader();
  return (
    <>
      {isShown ? <><h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Page Not Found</h1>

        <div className='fw-bold fs-3 text-gray-400 mb-15'>
          The page you looked not found!
        </div> </> : <Spinner />}

    </>
  )
}

export { Error404 }
