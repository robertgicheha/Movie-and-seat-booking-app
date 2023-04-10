const container  = document.querySelector('.container');
const seats = document.querySelectorAll ('.row .seats:not(.occupied');
const count = document.getElementById ('count');
const total = document.getElementById ('total');
const movieSelect = document.getElementById ('movie');


PopulateUI();

let moviePrice = +movieSelect.value;
//Save selected Movie index and price
function setMovieData (movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex' , movieIndex);
    localStorage.setItem ('selectedMoviePrice', moviePrice);

}

//Update count and total
function updateSelectedCount() {
const selectedSeats = document.querySelectorAll('.row .seat.selected');
// console.log(selectedSeats);

 //Copy selected seats into an array
 const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
//  console.log(seatsIndex);
// console.log(seatsIndex);
//local storage
localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndex));

const selectedSeatsCount = selectedSeats.length;
// console.log(selectedSeatsCount);
count.innerText = selectedSeatsCount;
total.innerText = selectedSeatsCount * moviePrice;

}

//Map through an array
//Return a new array indexes
// console.log(moviePrice);

//Get Data from localstorage and populate UI
function PopulateUI (){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);
    if(selectedSeats !==null && selectedSeats.length > 0 ){
        seats.forEach((seats , index) => {
        if(selectedSeats.indexOf(index) > -1 ){
            seat.classList.add('selected');
        }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !==null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}




//Movie change event
movieSelect.addEventListener('change', (e)=>{
    moviePrice = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});
//Seat click event
container.addEventListener('click' , (e) =>{
    // console.log(e.target);
if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    // console.log(e.target);
    e.target.classList.toggle('selected');
    
    updateSelectedCount();
}
});

//Initial count and total
updateSelectedCount();
