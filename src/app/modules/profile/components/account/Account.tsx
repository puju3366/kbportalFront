/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {defaultAccount, IAccount} from './AccountModel'

export function Account() {
  const [data, setData] = useState<IAccount>(defaultAccount)
  //const [hasError, setHasError] = useState(false);

  const updateData = (fieldsToUpdate: Partial<IAccount>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  return (
    <div className='card'>
      {/* begin::Form */}
      <form className='form d-flex flex-center'>
        <div className='card-body mw-800px py-20'>
          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Username</label>
            <div className='col-lg-9'>
              <div className='spinner spinner-sm spinner-primary spinner-right'>
                <input
                  className='form-control form-control-lg form-control-solid'
                  type='text'
                  value={data.username}
                  onChange={(e) => updateData({username: e.target.value})}
                />
              </div>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Email Address</label>
            <div className='col-lg-9'>
              <div className='input-group input-group-lg input-group-solid'>
                <span className='input-group-text pe-0'>
                  <i className='la la-at fs-4'></i>
                </span>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  value={data.email}
                  onChange={(e) => updateData({email: e.target.value})}
                />
              </div>
              <div className='form-text'>
                Email will not be publicly displayed.
                <a href='#' className='fw-bold'>
                  Learn more
                </a>
                .
              </div>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Language</label>
            <div className='col-lg-9'>
              <select
                className='form-select form-select-lg form-select-solid'
                data-control='select2'
                data-placeholder='Select Language...'
                value={data.language}
                onChange={(e) => updateData({language: e.target.value})}
                defaultValue={data.language}
              >
              </select>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row align-items-center mb-3'>
            <label className='col-lg-3 col-form-label'>Communication</label>
            <div className='col-lg-9'>
              <div className='d-flex align-items-center'>
                <div className='form-check form-check-custom form-check-solid me-5'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox1'
                    checked={data.communications.email}
                    onChange={() =>
                      updateData({
                        communications: {
                          ...data.communications,
                          email: !data.communications.email,
                        },
                      })
                    }
                  />
                  <label className='form-check-label fw-bold' htmlFor='inlineCheckbox1'>
                    Email
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid me-5'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox2'
                    checked={data.communications.sms}
                    onChange={() =>
                      updateData({
                        communications: {
                          ...data.communications,
                          sms: !data.communications.sms,
                        },
                      })
                    }
                  />
                  <label className='form-check-label fw-bold' htmlFor='inlineCheckbox2'>
                    SMS
                  </label>
                </div>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox3'
                    checked={data.communications.phone}
                    onChange={() =>
                      updateData({
                        communications: {
                          ...data.communications,
                          phone: !data.communications.phone,
                        },
                      })
                    }
                  />
                  <label className='form-check-label fw-bold' htmlFor='inlineCheckbox3'>
                    Phone
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* begin::Form row */}

          <div className='separator separator-dashed my-10'></div>

          {/* begin::Form row */}
          <div className='row mb-8'>
            <label className='col-lg-3 col-form-label'>Login verification</label>
            <div className='col-lg-9'>
              <button type='button' className='btn btn-light-primary fw-bold btn-sm'>
                Setup login verification
              </button>
              <div className='form-text'>
                After you log in, you will be asked for additional information to confirm your
                identity and protect your account from being compromised.
                <a href='#' className='fw-bold'>
                  Learn more
                </a>
                .
              </div>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row mb-13'>
            <label className='col-lg-3 col-form-label'>Password reset verification</label>
            <div className='col-lg-9'>
              <div className='form-check form-check-custom form-check-solid me-5'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='customCheck5'
                  checked={data.requireInfo}
                  onChange={() => updateData({requireInfo: !data.requireInfo})}
                />
                <label className='form-check-label fw-bold' htmlFor='customCheck5'>
                  Require personal information to reset your password.
                </label>
              </div>

              <div className='form-text py-2'>
                For extra security, this requires you to confirm your email or phone number when you
                reset your password.
                <a href='#' className='fw-boldk'>
                  Learn more
                </a>
                .
              </div>

              <button type='button' className='btn btn-light-danger fw-bold btn-sm'>
                Deactivate your account ?
              </button>
            </div>
          </div>
          {/* end::Form row */}

          {/* begin::Form row */}
          <div className='row'>
            <label className='col-lg-3 col-form-label'></label>
            <div className='col-lg-9'>
              <button type='reset' className='btn btn-primary fw-bolder px-6 py-3 me-3'>
                Save Changes
              </button>
              <button
                type='reset'
                className='btn btn-color-gray-600 btn-active-light-primary fw-bolder px-6 py-3'
              >
                Cancel
              </button>
            </div>
          </div>
          {/* end::Form row */}
        </div>
      </form>
      {/* end::Form */}
    </div>
  )
}
