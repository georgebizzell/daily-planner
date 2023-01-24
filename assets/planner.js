// Set container element tag with jquery
const containerEl = $(".container");

// Retrieve date and time when the user opens the site
const today = moment();

// Find current hour
const timeNow = moment().hour(); 


// Current day formatting for the date at the top of the planner - eg. Wednesday, 18th January 2023
$("#currentDay").text(today.format("dddd, Do MMMM YYYY"));

// Working hours array - this could be done programmatically
const workDay = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];


// Create prototype time object with text and hour
const time = {
  text : "1:00 pm",
  hour : 13
}


// Use working hours array to create an array of times with the text to be displayed and the hour as a time datatype so it can be compared against the time now()

// I think the 'Array.' is working as a Constractor function here.

const workHours = Array.from(workDay, i => {
  
  const text = moment().hour(i).format("h:00 A");
  const hour = moment().hour(i);
  
  const plannerRow = Object.create(time); 
  
  plannerRow.text = text; // 
  plannerRow.hour = hour; // 
  
  return plannerRow;
});

console.log(workHours);

function hourColour(timeSlot) {

  // Check hour vs. current time
  var timeCheck = timeNow - timeSlot.hour.hour();

  // Switch clause to change the colour of each hour depending on the current time
  switch(true) {
    case timeCheck === 0:
      i = "present";
      break;
    case timeCheck > 0:
      i = "past";
      break;
    case timeCheck < 0:
      i = "future";
      break;
    default:
       i = "bg-gray-300";
  }
  
  console.log(i);
  
  return i;
  
}

workHours.forEach((hour) => {
  const grid = $(
    `<form data-name="${hour.text}" class="row justify-content-md-center "></form>.`
  );

  const time = $(
    `<div class="time-block row col-2 align-items-center">${hour.text}</div>`
  );

  const textArea = $(
    `<textarea id="${hour.text}" class="textarea col-8 row ${hourColour(hour)}"> ${localStorage.getItem(hour.text) || ""}</textarea>`
  );

  const saveButton = $(
    `<button type="submit" class="saveBtn col-1"><i class="fas fa-save"></i></button>`
  );

  
  grid.submit((e) => {
    e.preventDefault();

    const value = $(`textarea[id="${hour.text}"]`).val();

    localStorage.setItem(hour.text, value);
  });

  grid.append(time);
  grid.append(textArea);
  grid.append(saveButton);

  containerEl.append(grid);
});
