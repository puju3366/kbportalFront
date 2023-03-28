import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GetKbProjectCount } from '../employeeDashboardRedux/employeeDashboardCRUD';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const KbPerProject = () => {
    const [project, setProject] = useState([{ project_id: "", totalCount: "", project_name: "" }])
    const projectid: any = []
    const count: any = []
    let Month = new Date().toLocaleDateString('en-us', { month: "long", year: "numeric" });
    project && project.map((item, index) => {
        count.push(item.totalCount)
        projectid.push(`${item.project_name}`)
    })

    let token;

    if (Cookies.get('logintoken')) {
        token = Cookies.get('logintoken')
    } else {
        token = ""
    }
    var practice: any = jwt_decode(token);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        scales: {
            y:
            {
                min: 0,
                max: 20,
                stepSize: 1,
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    /**
     * @Author 
     * @Method KbProjectCount
     * @Purpose list of project by count
     * @param {} 
     * @Since Oct 2022
    */
    const KbProjectCount = () => {
        GetKbProjectCount(practice.device_token.practice)
            .then((res: any) => {
                setProject(res.data.items.result)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        KbProjectCount()
    }, [])

    const labels = projectid;

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Count',
                data: count,
                backgroundColor: '#249CFF',
            },

        ],
    };
    return (
        <>
            <div className='card card-xl-stretch mb-xl-8'>
                <div className='card-header border-0 py-5'>
                    <h3 className="card-title fw-bolder">
                        {`KBs Per Project - ${Month}`}
                    </h3>
                </div>
                <div className='card-body'>
                    <Bar options={options} data={data} />
                </div>
            </div>

        </>
    )
}

export default KbPerProject
