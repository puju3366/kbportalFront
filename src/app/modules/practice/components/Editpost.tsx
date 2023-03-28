import React, { useEffect, useState } from 'react'
import Editor from './Editor';
import { editKb, getKBById, getCategories, getProject, getPractice, getTeam } from '../redux/Crud';
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import useLoader from '../../../hooks/useLoader';
import { Spinner } from '../../../helpers/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import { TagsInput } from 'react-tag-input-component';
import SVG from './SVG';
import { useFormik } from 'formik';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Editpost = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ category_id: "", title: "", project_id: "" })
    const [tagErrors, setTagErrors] = useState({ tag: "" });
    const [bodyErrors, setBodyErrors] = useState({ body: "" });
    const [practiceError, setPracticeErrors] = useState({ practiceTag: "" });
    const [teamError, setTeamError] = useState({ teamTag: "" });
    let today = new Date();
    let priorDate = new Date(new Date().setDate(today.getDate() + 15));
    // const [endDate, setEndDate] = useState(priorDate);
    // const [dateErrors, setDateErrors] = useState({ endDate: "" });


    const intialState = {
        category: [],
        project: [],
        practice: [],
        team: [],
        teamTag: [],
        practiceTag: [],
        tag: [],
        modalIsOpen: false,
        iskbDraft: 0,
        body: "",
        endDate: priorDate,
    }
    const [state, setState] = useState(intialState);


    let token;
    if (Cookies.get('logintoken')) {
        token = Cookies.get('logintoken')
    } else {
        token = ""
    }
    var test: any = jwt_decode(token);

    const { id } = useParams()

    /**
    * @Author 
    * @Method getCategoriesData
    * @Purpose To retrieve categories list to use in category dropdown
    * @param {} 
    * @Since Oct 2022
   */
    const getCategoriesData = () => {
        getCategories()
            .then((res: any) => {
                setState(prev => ({ ...prev, category: res.data.items.result }))
            })
            .catch(error => {
                console.log(error);
            })
    }

    /**
    * @Author 
    * @Method getProjectData
    * @Purpose To retrieve categories list to use in category dropdown
    * @param {} 
    * @Since Oct 2022
   */

    const getProjectData = () => {
        getProject()
            .then((res: any) => {
                setState(prev => ({ ...prev, project: res.data.items.result }))
            })
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * @Author 
     * @Method getProjectData
     * @Purpose To retrieve categories list to use in category dropdown
     * @param {} 
     * @Since Oct 2022
    */

    const getKBByIdData = () => {
        getKBById(id)
            .then((res: any) => {
                setData(res.data.items.result[0])
                const editedValue = {
                    category_id: res.data.items.result[0].category_id,
                    title: res.data.items.result[0].title,
                    tag: state.tag.toString(),
                    project_id: res.data.items.result[0].project_id,
                    body: res.data.items.result[0].body,
                }
                setState(prev => ({ ...prev, tag: res.data.items.result[0].tag.split(',') }))
                setState(prev => ({ ...prev, practiceTag: res.data.items.result[0].practice.split(',') }))
                setState(prev => ({ ...prev, teamTag: res.data.items.result[0].team.split(',') }))
                formik.setValues(editedValue)
            })
            .catch(error => {
                console.log(error);
            })
    }
    /**
  * @Author 
  * @Method getPracticeData
  * @Purpose To retrieve categories list to use in category dropdown
  * @param {} 
  * @Since Oct 2022
 */
    const getPracticeData = () => {
        getPractice()
            .then((res: any) => {
                setState(prev => ({ ...prev, practice: res.data.items.result }))
            })
            .catch(error => {
                console.log(error);
            })
    }

    /**
* @Author 
* @Method getTeamData
* @Purpose To retrieve practice list to use in Multiple practice dropdown
* @param {} 
* @Since Oct 2022
*/
    const getTeamData = () => {
        getTeam()
            .then((res: any) => {
                setState(prev => ({ ...prev, team: res.data.items.result }))
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        document.title = "DEV IT - Edit Post";
        getKBByIdData();
        getCategoriesData();
        getProjectData();
        getPracticeData();
        getTeamData();


    }, [])

    const onBlurMethod = (e: any, fieldName: any) => {
        setState(prev => ({ ...prev, [fieldName]: e }))
        bodyValidate({ [fieldName]: e })

    }

    const handleChangeSelect = (value) => {
        if (value !== null) {
            const myoptions = value.map((id) => (
                id.label
            ))
            setState(prev => ({ ...prev, practiceTag: myoptions }))
            practiceValidate({ practiceTag: myoptions })
        } else {
            setState(prev => ({ ...prev, practiceTag: [] }))
        }
    }

    const handleChangeTeamSelect = (value) => {
        if (value !== null) {
            const myoptions = value.map((id) => (
                id.label
            ))
            setState(prev => ({ ...prev, teamTag: myoptions }))
            teamValidate({ teamTag: myoptions })
        } else {
            setState(prev => ({ ...prev, teamTag: [] }))
        }
    }

    const onBlur = (e: any) => {
        let newTag: any = []
        for (let i = 0; i < e.length; i++) {
            if (e[i].trim().length !== 0) {
                newTag.push(e[i].trim())
                tagValidate({ tag: newTag })
            }
        }
        setState(prev => ({ ...prev, tag: newTag }))
    }
    const dueDate = (e: any) => {
        setState(prev => ({ ...prev, endDate: e }))
        // dateValidate({ endDate: e })
    }

    const handleDraft = () => {
        if (formik.values.title.length <= 0) {
            toast.error(`Please Enter Title of Post`);
        } else if (!formik.values.category_id || formik.values.category_id == "Select Category") {
            toast.error(`Please Select Category`);
        } else if (state.tag.length <= 0) {
            toast.error(`Please Enter Tags`);
        }
        else if (!state.body) {
            toast.error(`Please Enter Post Content`);
        }
        else {
            setState(prev => ({ ...prev, iskbDraft: 1 }))
            toast.success('Draft Saved Successfully')
        }
    }

    let element = document.getElementById('preview')
    if (state.body.length > 0) {
        element?.classList.remove('previewbtn')
    } else {
        element?.classList.add('previewbtn')

    }

    const handleShowModal = () => {
        if (state.body.length > 0) {
            setState(prev => ({ ...prev, modalIsOpen: !state.modalIsOpen }))
        }
    }

    const tagValidate = (values: any) => {
        const tagErrors: any = {};
        if (values.tag.length <= 0) {
            tagErrors.tag = "Please Enter Tags"
        } else {
            setTagErrors({ ...tagErrors, tag: "" })
        }
        return tagErrors;
    }

    const bodyValidate = (values: any) => {
        const bodyErrors: any = {};
        if (!values.body) {
            bodyErrors.body = "Please Enter Post Content"
        } else {
            setBodyErrors({ ...bodyErrors, body: "" })
        }
        return bodyErrors;
    }
    // const dateValidate = (values: any) => {
    //     const dateErrors: any = {};
    //     if (!values.endDate) {
    //         dateErrors.endDate = "Please Enter Date"
    //     }
    //     else {
    //         setDateErrors({ ...dateErrors, endDate: "" })
    //     }
    //     return dateErrors;
    // }
    const practiceValidate = (values: any) => {
        const practiceErrors: any = {};
        if (values.practiceTag.length <= 0) {
            practiceErrors.practiceTag = "Please Select Practice"
        } else {
            setPracticeErrors({ ...practiceErrors, practiceTag: "" })
        }
        return practiceErrors;
    }
    const teamValidate = (values: any) => {
        const teamErrors: any = {};
        if (values.teamTag.length <= 0) {
            teamErrors.teamTag = "Please Select Team"
        } else {
            setTeamError({ ...teamErrors, teamTag: "" })
        }
        return teamErrors;
    }
    const validate = values => {
        const errors: any = {};
        if (!values.title.trimStart()) {
            errors.title = 'Please Enter Title of Post';
        } else if (values.title.trimStart().length <= 3 || values.title.trimStart().length > 90) {
            errors.title = 'Please Enter Title of Post Between 3 to 90 Characters';
        }

        if (!values.category_id || values.category_id == "Select Category") {
            errors.category_id = 'Please Select Category';
        }
        // if (!values.project_id || values.project_id == "Select Project Name") {
        //     errors.project_id = 'Please Select Project Name';
        // }
        setTagErrors(tagValidate(state));
        setBodyErrors(bodyValidate(state));
        setPracticeErrors(practiceValidate(state));
        setTeamError(teamValidate(state));
        // setDateErrors(dateValidate(state));
        return errors;
    };

    /**
     * @Author 
     * @Method handleSubmit
     * @Purpose To submit kb edit post data
     * @param {e} 
     * @Since Oct 2022
    */

    const formik = useFormik(
        {
            initialValues: {
                category_id: '',
                title: '',
                project_id: '',
            },

            validate,
            onSubmit: values => {
                let data = {
                    category_id: values.category_id,
                    practice_id: state.practiceTag.toString(),
                    team: state.teamTag.toString(),
                    title: values.title.trim(),
                    tag: state.tag.toString(),
                    project_id: values.project_id ? values.project_id : null,
                    body: state.body,
                    is_kb_draft: state.iskbDraft,
                    created_by: test.device_token.email,
                    kb_assigner: test.device_token.email,
                    kb_approved_by: test.device_token.reporting_manager_name,
                    kb_expiry_date: state.endDate,
                };
                if(data !== null){
                editKb(data, id)
                    .then((res: any) => {
                        toast.success(res.data.items.msg)
                        setTimeout(() => {
                            navigate(`/details-page/${id}`)
                        }, 2000);
                    })
                } else{
                    toast.error('Please Fill All Required Fields !');
                }
            },
        });

    const categoryLable: any = state.category && state.category.filter((item: any, i) => {
        return (formik.values.category_id == item.id)
    })

    const options: any = state.practice && state.practice.map((item: any) => ({
        value: item.id, label: item.practice_name
    }));

    const TeamOptions: any = state.team && state.team.map((item: any) => ({
        value: item.id, label: item.team_name
    }));

    let practiceData = options.filter((element: any, index: any) => {
        const indexL = state.practiceTag.findIndex(x => x === element.label)
        if (indexL > -1) {
            return element;
        }
    });

    let teamData = TeamOptions.filter((element: any, index: any) => {
        const indexL = state.teamTag.findIndex(x => x === element.label)
        if (indexL > -1) {
            return element;
        }
    });
    const isShown = useLoader();

    return (
        <>
            <ToastContainer />
            <div className="toolbar" id="kt_toolbar">
                <div id="kt_toolbar_container" className="d-flex flex-stack">
                    <div data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0">
                        <h1 className="d-flex text-dark fw-bolder fs-2 align-items-center my-1">Edit Posts</h1>
                    </div>
                </div>
            </div>
            {/* <!--begin::Post--> */}
            {
                isShown ?

                    <div className="row gy-5 g-xl-8">
                        <div className="col-xxl-12 col-xl-8">
                            <div className="card new-card mb-5 mb-xxl-2">
                                <div className="card-body pb-0">
                                    <form action="m-0" className="form mb-5 fv-plugins-bootstrap5 fv-plugins-framework" method="post" id="kt_addpost_form" onSubmit={formik.handleSubmit}>
                                    <div className="d-flex ">
                                        <div className="d-flex flex-column col-xxl-3 mx-1 mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Category</label>
                                            <select className="form-select" id="category_id" name="category_id" data-control="select2" data-hide-search="true" data-placeholder="Select a layout" value={formik.values.category_id} onChange={formik.handleChange}> onBlur={formik.handleBlur}
                                                <option>Select Category</option>
                                                {state.category && state.category.map((item: any, i) => {
                                                    return (
                                                        <option key={i} value={item.id}>{item.category_name}</option>
                                                    )
                                                })}
                                            </select>
                                            {formik.touched.category_id && formik.errors.category_id ? (
                                                <span className="text-danger">{formik.errors.category_id}</span>
                                            ) : null}
                                        </div>

                                        <div className="d-flex flex-column col-xxl-3 mx-1 mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Practice</label>
                                            <Select
                                                defaultValue={practiceData.length ? practiceData : []}
                                                closeMenuOnSelect={true}
                                                isMulti
                                                isClearable
                                                name="practice"
                                                options={options}
                                                className="selection"
                                                placeholder="Select Practice Name"
                                                onChange={handleChangeSelect}
                                            />
                                            <span className="text-danger">{practiceError.practiceTag}</span>
                                        </div>
                                        <div className="d-flex flex-column col-xxl-3 mx-1 mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Applies to which team?</label>
                                            {/* <input type="text" className="form-control" name="team" placeholder="" disabled value={test.device_token.team} /> */}
                                            <Select
                                                defaultValue={teamData.length ? teamData : []}
                                                closeMenuOnSelect={true}
                                                isMulti
                                                isClearable
                                                name="team"
                                                options={TeamOptions}
                                                className="selection"
                                                placeholder="Select Team Name"
                                                onChange={handleChangeTeamSelect}
                                            />
                                            <span className="text-danger">{teamError.teamTag}</span>

                                        </div>
                                        <div className="d-flex flex-column col-xxl-3 mx-1 mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label"  >If applicable to specific project, choose project name</label>
                                            <select className="form-select" name="project_id" data-control="select2" data-hide-search="true" data-placeholder="Select a layout" value={formik.values.project_id} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                                <option value={""}>Select Project Name</option>
                                                {state.project && state.project.map((item: any, i) => {
                                                    return (
                                                        <option key={i} value={item.id}>{item.project_name}</option>
                                                    )
                                                })}
                                            </select>
                                            {/* {formik.touched.project_id && formik.errors.project_id ? (
                                                <span className="text-danger">{formik.errors.project_id}</span>
                                            ) : null} */}
                                        </div>
                                        </div>
                                        <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required" >Title of Post (Max 90 characters)</label>
                                            <input type="text" className="form-control" id="title" name="title" placeholder="" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.touched.title && formik.errors.title ? (
                                                <span className="text-danger">{formik.errors.title}</span>
                                            ) : null}
                                        </div>
                                        <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Post Content (Image should be 1024 * 768)</label>
                                            <Editor
                                                onChangeText={(text: any) => {
                                                    onBlurMethod(text, 'body');
                                                }}
                                            />
                                            <span className="text-danger">{bodyErrors.body}</span>
                                        </div>
                                        <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Tags</label>
                                            <TagsInput
                                                value={state.tag}
                                                onChange={onBlur}
                                                name="tag" />
                                            <span className="text-danger">{tagErrors.tag}</span>
                                        </div>
                                        {/* <div className="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Due Date of KB</label>
                                            <DatePicker selected={state.endDate} dateFormat="dd/MM/yyyy" minDate={today} maxDate={priorDate} onChange={dueDate} />
                                            <span className="text-danger">{dateErrors.endDate}</span>
                                        </div> */}
                                        <div className="row py-5">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-wrap button-groups-reverse w-xs-50">
                                                    <button type="submit" data-kt-ecommerce-settings-type="submit" className="btn btn-primary">
                                                        <span className="indicator-label" title="Submit">Submit</span>
                                                    </button>
                                                    <a className="btn btn-outline btn-outline-solid btn-outline-primary" title="Save as Draft" onClick={handleDraft}>Save as Draft</a>
                                                    <a className="btn btn-outline btn-outline-solid btn-outline-primary" id="preview" title="Preview" onClick={handleShowModal}>Preview</a>
                                                    <Modal isOpen={state.modalIsOpen} className="modal-css" >
                                                        <div style={{ backgroundColor: "#eee" }} className="inner-modal">
                                                            <div className="card-body " style={{ backgroundColor: "#eee" }}>
                                                                <div className="categoryLable bg-light-green">
                                                                    {
                                                                        categoryLable[0] && categoryLable[0].category_code
                                                                    }
                                                                </div>
                                                                <SVG />
                                                                <div className="symbol symbol-50px me-5 mb-5 mt-5">
                                                                    <strong> {formik.values.title} </strong>
                                                                </div>
                                                                {/* <div className="separator my-2"></div> */}
                                                                <hr />
                                                                <div className="mb-5 postInfo modal-text-adjustment"
                                                                    dangerouslySetInnerHTML={{ __html: state.body }}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div style={{ backgroundColor: "#eee" }}>
                                                            <button onClick={handleShowModal} className='btn btn-primary '>Close</button>
                                                        </div>
                                                    </Modal>
                                                    <Link to="#" onClick={() => navigate(-1)} className="btn btn-outline btn-outline-solid btn-outline-default" title="Cancel">Cancel</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> : <Spinner />}
        </>
    )
}

export default Editpost
