document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingTableBody = document.getElementById('bookingTableBody');
    const cancelEditButton = document.getElementById('cancelEdit');
    let selectedRow = null;

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const quantity = document.getElementById('quantity').value;

        if (selectedRow) {
            selectedRow.cells[0].textContent = name;
            selectedRow.cells[1].textContent = date;
            selectedRow.cells[2].textContent = quantity;
            selectedRow.classList.remove('edit-mode');
            selectedRow = null;
            cancelEditButton.style.display = 'none';
        } else {
            const newRow = bookingTableBody.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);

            cell1.textContent = name;
            cell2.textContent = date;
            cell3.textContent = quantity;
        }

        bookingForm.reset();
    });

    bookingTableBody.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'TD') {
            const row = target.parentElement;
            if (selectedRow) {
                selectedRow.classList.remove('edit-mode');
                cancelEditButton.style.display = 'none';
            }
            selectRow(row);
            cancelEditButton.style.display = 'inline';
        }
    });

    cancelEditButton.addEventListener('click', function() {
        selectedRow.classList.remove('edit-mode');
        cancelEditButton.style.display = 'none';
        selectedRow = null;
        bookingForm.reset();
    });

    function selectRow(row) {
        row.classList.add('selected-row', 'edit-mode');

        const name = row.cells[0].textContent;
        const date = row.cells[1].textContent;
        const quantity = row.cells[2].textContent;

        document.getElementById('name').value = name;
        document.getElementById('date').value = date;
        document.getElementById('quantity').value = quantity;

        selectedRow = row;
    }
});
