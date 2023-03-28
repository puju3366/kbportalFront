import {FC} from 'react'

const Modal: FC = () => {
  return (
    <div className='modal__align'>
      <div className='modal__content'>
        <div className='modal__video-align'>
          <div className='d-flex'>
            <select name='Search By' id='searchBy'>
              <option value='0'>Search By</option>
              <option value='volvo'>Category</option>
              <option value='saab'>Project</option>
              <option value='mercedes'>Practice</option>
              {/* <option value='audi'>Audi</option> */}
            </select>
            <select name='searchValue' id='searchValue'>
              <option value='0'>Value</option>
              <option value='volvo'>SOP</option>
              <option value='saab'>CCOE</option>
              <option value='mercedes'>R&D</option>
              <option value='audi'>Issue Resolution</option>
            </select>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export {Modal}
