import React from "react";
const useSortableData = (items) => {
    const [sortConfig, setSortConfig] = React.useState({ key: "", direction: "" });

    const sortedItems = React.useMemo(() => {

        let sortableItems = items;

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ASC" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ASC" ? 1 : -1;
                }
                return 0;
            });
        }

        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key, orderName) => {
        let direction = "";
        if (orderName && orderName == 'DESC') {
            direction = 'ASC'
            setSortConfig({ key, direction });
        }
        else {
            direction = 'DESC'
            setSortConfig({ key, direction });
        }
        return setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export { useSortableData };
