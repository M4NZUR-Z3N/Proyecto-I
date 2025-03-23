document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("denunciasTabla");
    const allRows = Array.from(tableBody.querySelectorAll("tr"));
    const filterDate = document.getElementById("filterDate");
    const filterStatus = document.getElementById("filterStatus");
    const filterButton = document.getElementById("filterButton");
    const resetButton = document.getElementById("resetButton");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    let currentPage = 1;
    const rowsPerPage = 8;
    let filteredRows = [...allRows];
    
    function updatePagination() {
        tableBody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const rowsToShow = filteredRows.slice(start, end);
        rowsToShow.forEach(row => tableBody.appendChild(row));

        pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(filteredRows.length / rowsPerPage)}`;

        prevPage.disabled = currentPage === 1;
        nextPage.disabled = end >= filteredRows.length;
    }

    function filterTable() {
        const selectedDate = filterDate.value;
        const selectedStatus = filterStatus.value;

        filteredRows = allRows.filter(row => {
            const rowDate = row.children[0].textContent.trim();
            const rowStatus = row.querySelector(".estado").value;

            const dateMatch = !selectedDate || rowDate === selectedDate;
            const statusMatch = !selectedStatus || rowStatus === selectedStatus;

            return dateMatch && statusMatch;
        });

        currentPage = 1;
        updatePagination();
    }

    function resetFilters() {
        filterDate.value = "";
        filterStatus.value = "";
        filteredRows = [...allRows];
        currentPage = 1;
        updatePagination();
    }

    filterButton.addEventListener("click", filterTable);
    resetButton.addEventListener("click", resetFilters);
    prevPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    nextPage.addEventListener("click", () => {
        if (currentPage < Math.ceil(filteredRows.length / rowsPerPage)) {
            currentPage++;
            updatePagination();
        }
    });

    updatePagination();
});