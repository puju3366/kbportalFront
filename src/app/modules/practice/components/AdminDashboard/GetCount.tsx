import React, { useEffect, useState } from 'react'
import { getKBByMonth } from '../../redux/Crud';
import { Line } from "react-chartjs-2";


const GetCount = () => {
    const [value, setValue] = useState([{ month_name: "", count: "" }])
    const count: any = []
    const month: any = []
    value && value.map((item) => {
        count.push(item.count)
        month.push(item.month_name)
    })
    const data = {
        labels: month,
        datasets: [
            {
                label: "KBs Per Month",
                data: count,
                fill: true,
                backgroundColor: "rgba(36,156,255,0.2)",
                borderColor: "#249CFF",
            },
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y:
            {
                min: 0,
                max: 30,
                stepSize: 1,
            },
            
        },
    };

    /**
   * @Author 
   * @Method getKBCommentData
   * @Purpose list of practice by count
   * @param {} 
   * @Since Oct 2022
  */

    const KBByMonth = () => {
        getKBByMonth()
            .then((res: any) => {
                setValue(res.data.items.result)
            })
            .catch(error => {
                console.log(error);
            })

    }
    useEffect(() => {
        KBByMonth()
    }, [])

    return (
        <>
            <div className='card card-xl-stretch mb-xl-8'>
                <div className='card-header border-0 py-5'>
                    <h3 className="card-title fw-bolder">
                        KBs Per Month
                    </h3>
                </div>
                <div className='card-body'>
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    )
}

export default GetCount
