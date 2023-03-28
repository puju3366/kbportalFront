import React, { useEffect, useState } from 'react'
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
import { getQuarterOneCount, getQuarterPreviousCount } from '../../redux/Crud';

const QoQPerKb = () => {

    let startingYear = 2015
    const date = new Date();
    var month = date.getMonth();
    let currentYear = date.getFullYear();
    let array: any = []

    let currentQuarter: any;
    if (month < 4) {
        currentQuarter = "Q4";
        currentYear = currentYear - 1
    }
    else if (month < 7) {
        currentQuarter = "Q1";
    }
    else if (month < 10) {
        currentQuarter = "Q2";
    }
    else if (month < 13) {
        currentQuarter = "Q3";
    }

    for (let i = startingYear; i <= currentYear; i++) {
        array.push(i)
    }

    const Quarter = ["Q1", "Q2", "Q3", "Q4"]

    const [year, setYear] = useState(currentYear);
    const [quarter, setQuarter] = useState(currentQuarter);
    const [practice, setPractice] = useState([{ practice_id: "", totalCount: "", practice_name: "" }])
    const [previousYear, setPreviousYear] = useState([{ practice_id: "", totalCount: "", practice_name: "" }])
    const practiceNameForCurrentYear: any = []
    const practiceNameForPreviousYear: any = []
    const countForCurrentYear: any = []
    const countForPreviousYear: any = []

    practice && practice.map((item, index) => {
        countForCurrentYear.push(item.totalCount)
        practiceNameForCurrentYear.push(`${item.practice_name}`)
    })
    previousYear && previousYear.map((item, index) => {
        countForPreviousYear.push(item.totalCount)
        practiceNameForPreviousYear.push(`${item.practice_name}`)
    })



    const yearhandleSelect = (e) => {
        if (e.target.value != 0) {
            setYear(e.target.value);
        }
    }
    const quarterhandleSelect = (e) => {
        if (e.target.value != 0) {
            setQuarter(e.target.value);
        }
    }

    const Obj = {
        year,
        quarter,
    }

    if(quarter == "Q1"){
        var Obj2 = {
            year: Number(year) - 1,
            quarter: "Q4",
        }
    } else if (quarter == "Q2") {
        var Obj2 = {
            year,
            quarter: "Q1",
        }
    } else if (quarter == "Q3") {
        var Obj2 = {
            year,
            quarter: "Q2",
        }
    } else if (quarter == "Q4") {
        var Obj2 = {
            year,
            quarter: "Q3",
        }
    }

    useEffect(() => {
        getQuarterOneCount(Obj).then((res: any) => {
            setPractice(res.data.items.result)
        })
            .catch(error => {
                console.log(error);
            })

        getQuarterPreviousCount(Obj2).then((res: any) => {
            setPreviousYear(res.data.items.result)
        })
            .catch(error => {
                console.log(error);
            })
        // }
    }, [year, quarter])

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
    const finaleData = practiceNameForCurrentYear.concat(practiceNameForPreviousYear);

    const filteredEmployeeData: any = [];
    finaleData.filter((element: any, index: any) => {
        const isDuplicate = filteredEmployeeData.includes(element);
        if (!isDuplicate) {
            filteredEmployeeData.push(element);
            return true;
        }
        return false;
    });

    const labels = filteredEmployeeData;

    const data = {
        labels,
        datasets: [
            {
                label: 'Previous Quarter ',
                data: countForPreviousYear,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Current Quarter ',
                data: countForCurrentYear,
                backgroundColor: '#249CFF',
            },
        ],
    };

    return (
        <>
            <div className='card card-xl-stretch mb-xl-8'>
                <div className='card-header border-0 py-5'>
                    <h3 className="card-title fw-bolder">
                        Quarter on Quarter KBs Count by Practice
                    </h3>
                </div>
                <div className='border-0 py-5 d-flex justify-content-end'>
                     <div className="dropdown-select">
                        <select name="searchBy" id="Search_By" className=" QoQStyle" defaultValue={currentQuarter} onChange={quarterhandleSelect}>
                            <option value="0" className="py-5 px-5" >Search By Quarter</option>
                            {
                                Quarter && Quarter.map((item: any, i) => {
                                    return (
                                        <option key={item} value={item} >{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="dropdown-select">
                        <select name="searchBy" id="Search_By" className="QoQYear " defaultValue={currentYear} onChange={yearhandleSelect}>
                            <option value="0" className="py-5 px-5" >Search By Year</option>
                            {
                                array && array.map((item: any, i) => {
                                    return (
                                        <option key={item} value={item} >{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                   
                </div>
                <div className='card-body'>
                    <Bar options={options} data={data} />
                </div>
            </div>

        </>
    )
}

export default QoQPerKb



