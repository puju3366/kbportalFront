import React, { useState } from "react";
// import ProductTable from "./DevTable";
import styles from "./DataTable.module.scss";

const FilterData = ({ data }) => {
    const [filteredData, setFilteredData] = useState("");

    function filteration(data, value) {
        const newarr = data.filter((item) => {
            if (!value) return true;
            if (
                item.formname.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
        return newarr;
    }

    return (
        <>
            <div className={styles.search}>
                <span className={styles.searchLabel}>Search: </span>
                <input
                    className={styles.inputlabel}
                    type="text"
                    value={filteredData}
                    onChange={(e) => setFilteredData(e.target.value)}
                />
            </div>
            {/* <ProductTable data={filteration(data, filteredData)} /> */}
        </>
    );
};

export default FilterData;
