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
import { getKbPracticeCount } from '../../redux/Crud';


const PracticePerCount = () => {
    const [practice, setPractice] = useState([{ practice_id: "", totalCount: "", practice_name: "" }])
    const practiceid: any = []
    const count: any = []
    let Month = new Date().toLocaleDateString('en-us', { month: "long", year: "numeric" });
    practice && practice.map((item, index) => {
        count.push(item.totalCount)
        practiceid.push(`${item.practice_name}`)
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
        scales: {
            y:
            {
                min: 0,
                max: 50,
                stepSize: 1,
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            // title: {
            //     display: true,
            //     text: `KBs Per Practice - ${Month}`,
            // },
        },
    };

    /**
     * @Author 
     * @Method getKBCommentData
     * @Purpose list of practice by count
     * @param {} 
     * @Since Oct 2022
    */
    const KbPracticeCount = () => {
        getKbPracticeCount()
            .then((res: any) => {
                setPractice(res.data.items.result)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        KbPracticeCount()
    }, [])

    const labels = practiceid;

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
                        {`KBs Per Practice - ${Month}`}
                    </h3>
                </div>
                <div className='card-body'>
                    <Bar options={options} data={data} />
                </div>
            </div>

        </>
    )
}

export default PracticePerCount
