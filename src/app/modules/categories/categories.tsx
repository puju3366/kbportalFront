import React, { useState } from 'react'
import { SketchPicker, HuePicker , PhotoshopPicker} from 'react-color'
import addCategoryColor from './CRUD/categoryCRUD'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const nav = useNavigate()

  const [category, setCategory] = useState('')
  const [isShown, setisShown] = useState(false)
  const [blockPickerColor, setBlockPickerColor] = useState('#DDD7EF')

  const handleChangeComplete = (color) => {
    setBlockPickerColor(color.hex)
  }
  const handlechange = (e) => {
    setCategory(e.target.value)
    category != '' ? setisShown(false) : setisShown(false)
  }

  const handleaddColor = () => {
    //todo
    let object = {
      category_name: category,
      bg_color: blockPickerColor,
    }


    if (category == '' || category == null) {
      setisShown(true)
    } else {
      setisShown(false)
      addCategoryColor(object)
        .then((res: any) => {
          toast.success(res.data.items.msg)
          setTimeout(() => {
            nav(`/admindashboard`)
          }, 1900)
        })
        .catch((error) => {
          toast.error('Something Went Wrong !')
        })
    }
  }

  return (
    <>
      <ToastContainer limit={1} />
      <div className="toolbar" id="kt_toolbar">
        <div id="kt_toolbar_container" className="d-flex flex-stack">
          <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
            <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">Add Categories</h1>
          </div>
        </div>
      </div>
      <div className='card col-xxl-6'>
        <div className="card-body">
          <div className='d-flex flex-wrap mx-5 mb-2 '>
            <form className=' mx-5'>
              <label htmlFor="exampleFormControlInput1" className="form-label required">Category</label>
              <input type='text' className="form-control" style={{width: "63%"}} name='category' placeholder='Please enter category' onChange={handlechange} />
              {isShown ? (
                <p className='text-danger' id='comment-validate'>
                  Please enter a category
                </p>
              ) : (
                ''
              )}
              <SketchPicker color={blockPickerColor} className="my-5" onChangeComplete={handleChangeComplete} />
              {/* <PhotoshopPicker color={blockPickerColor} className="my-5" onChangeComplete={handleChangeComplete} /> */}
              {/* <Circle/> */}
            </form>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-sm btn-primary d-flex flex-wrap save-button" onClick={handleaddColor} title="Save">Save</button>
        </div>

      </div>
    </>
  )
}
export default Categories
