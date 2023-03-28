import React from "react";
import ReactPaginate from "react-paginate";
import styles from "../../modules/practice/components/ApproveComment/DataTable.module.scss";

export const Pagination = (props) => {
    return (
        <div className="d-flex">
            <div style={{ margin: "14px 0px 26px 10px", fontSize: "16px", color: "#6DAE48", width: "250px" }}>
                Showing {props.offset + 1} to {props.offset + props.PER_PAGE} of {props.Items.length}
                &nbsp;Records
            </div>
            <div style={{ position: "absolute", right: "7%" }}>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={props.pageCount}
                    onPageChange={props.handlePageClick}
                    containerClassName={styles.pagination}
                    previousLinkClassName={styles.paginationLink}
                    nextLinkClassName={styles.paginationLink}
                    disabledClassName={styles.paginationDisabled}
                    activeClassName={styles.paginationActive}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                />
            </div>
        </div>
    )
}