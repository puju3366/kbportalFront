import React, { useState } from "react";
// import data from "../utils";
// import FilterData from "./FilterData";
// import styles from "./TabFiler.module.scss";

// const TabSelector = () => {
//     const [items, setItems] = useState(data);
//     const [filter, setFilter] = useState("T1");

//     const productChoices = [
//         {
//             title: "T1/TP1",
//             value: "T1"
//         },
//         {
//             title: "T2",
//             value: "T2"
//         },
//         {
//             title: "T3/T3-646",
//             value: "T3"
//         },
//         {
//             title: "FX (forms)",
//             value: "FX"
//         }
//     ];
//     console.log(items);
//     const filterItem = (selectedCategory) => {
//         const updatedPortfolio = data.filter((child) => {
//             return child.module.includes(selectedCategory);
//         });
//         setItems(updatedPortfolio);
//         setFilter(selectedCategory);
//     };
//     return (
//         <>
//             <div className={styles.filterButtonsContent}>
//                 {productChoices.map((opt, index) => {
//                     return (
//                         <button
//                             key={index}
//                             className={`${styles.filterButtons} ${filter === opt.value && styles.currentFiltered
//                                 }`}
//                             onClick={() => {
//                                 filterItem(opt.value);
//                             }}
//                         >
//                             {opt.title}
//                         </button>
//                     );
//                 })}
//             </div>

//             <FilterData data={items} />
//         </>
//     );
// };

// export default TabSelector;
