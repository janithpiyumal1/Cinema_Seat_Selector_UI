document.addEventListener('DOMContentLoaded', function() {
    const seatLayout = {
        left: { rows: 5, cols: 4 },
        center: { rows: 5, cols: 10 },
        right: { rows: 5, cols: 4 }
    };

    // List of occupied seats (section, row, col)
    const occupiedSeats = [
        { section: 'left', row: 0, col: 0 }, // Occupied seat in left section, row 1, col 1
        { section: 'center', row: 2, col: 5 }, // Occupied seat in center section, row 3, col 6
        { section: 'right', row: 4, col: 3 }   // Occupied seat in right section, row 5, col 4
    ];

    // Generate the seats in the layout
    Object.keys(seatLayout).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        for (let i = 0; i < seatLayout[sectionId].rows; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < seatLayout[sectionId].cols; j++) {
                const seat = document.createElement('div');
                seat.className = 'seat';

                // Check if this seat is in the occupied list
                if (occupiedSeats.some(occupied => occupied.section === sectionId && occupied.row === i && occupied.col === j)) {
                    seat.classList.add('occupied'); // Add the occupied class
                }

                row.appendChild(seat);
            }
            section.appendChild(row);
        }
    });

    // Add seat click functionality
    const container = document.querySelector('.container');
    const count = document.getElementById('count');
    const total = document.getElementById('total');
    const movieSelect = document.getElementById('movie');
    const legendSeats = document.querySelectorAll('.legend-seat');

    let ticketPrice = +movieSelect.value;

    // Update total and count
    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const selectedSeatsCount = selectedSeats.length;
        count.innerText = selectedSeatsCount;
        total.innerText = selectedSeatsCount * ticketPrice;
    }

    // Movie select event
    movieSelect.addEventListener('change', e => {
        ticketPrice = +e.target.value;
        updateSelectedCount();
    });

    // Seat click event (only for seats inside the seating layout)
    container.addEventListener('click', e => {
        // Ensure the clicked element is a seat and it's not occupied
        if (e.target.classList.contains('seat') && 
            !e.target.classList.contains('occupied') && 
            !e.target.closest('.legend')) {
            e.target.classList.toggle('selected');

            // Update the corresponding legend seat
            const sectionId = e.target.closest('.section').id;
            const rowIndex = Array.from(e.target.closest('.row').children).indexOf(e.target);
            const sectionIndex = Array.from(container.querySelector(`#${sectionId}`).children).indexOf(e.target.closest('.row'));

            // Update the corresponding legend seat
            const legendSeat = legendSeats[sectionIndex * seatLayout[sectionId].cols + rowIndex];
            legendSeat.classList.toggle('selected', e.target.classList.contains('selected'));

            updateSelectedCount();
        }
    });
});
