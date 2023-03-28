import {FC} from 'react'

const Spinner: FC = () => {
  return (
    <>
        <div className="spinner-container" id="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    </>
  )
}

export {Spinner}
