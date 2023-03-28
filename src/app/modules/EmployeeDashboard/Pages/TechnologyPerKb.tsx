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
import { KbPerTechnology } from '../employeeDashboardRedux/employeeDashboardCRUD';

const TechnologyPerKb = () => {
    const [Technology, setTechnology] = useState([{ technology_id: "", technology_name: "", totalCount: "" }])
    const Technologyid: any = []
    const count: any = []
    let Month = new Date().toLocaleDateString('en-us', { month: "long", year:"numeric" });
    Technology && Technology.map((item, index) => {
        count.push(item.totalCount)
        Technologyid.push(`${item.technology_name}`)
    })

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
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    /**
     * @Author 
     * @Method KbTechnologyByCount
     * @Purpose list of technology by count
     * @param {} 
     * @Since Oct 2022
    */
    const KbTechnologyByCount = () => {
        KbPerTechnology()
            .then((res: any) => {
                setTechnology(res.data.items.result)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        KbTechnologyByCount()
    }, [])

    const labels = Technologyid;

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Count',
                data: count,
                backgroundColor: '#0A579E',
            },

        ],
    };
    return (
        <>
            <div className='card card-xl-stretch mb-xl-8'>
                <div className='card-header border-0 py-5'>
                    <h3 className="card-title fw-bolder">
                        {`KBs Per Technology - ${Month}`}
                    </h3>
                </div>
                <div className='card-body'>
                    <Bar options={options} data={data} />
                </div>
            </div>

        </>
    )
}

export default TechnologyPerKb
