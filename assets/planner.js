// Set container element tag with jquery
const containerEl = $(".container");

// Retrieve date and time when the user opens the site
const today = moment();

// Find current hour
const timeNow = moment().hour(); 


// Current day formatting for the date at the top of the planner - eg. Wednesday, 18th January 2023
$("#currentDay").text(today.format("dddd, Do MMMM YYYY"));

// Working hours array - this could be done programmatically
const workDay = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];


// Create prototype time object with text and hour
const time = {
  text : "1:00 pm",
  hour : 13
}


// Use working hours array to create an array of times with the text to be displayed and the hour as a time datatype so it can be compared against the time now()
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

  var timeCheck = timeNow - timeSlot.hour.hour();

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
  //if timeNow === timeSlot.hour ? "bg-red-600" : timeSlot.hour < timeNow ? "bg-gray-300" : "bg-green-200";
}

workHours.forEach((hour) => {
  const grid = $(
    `<form data-name="${hour.text}" class="row grid-cols-12  border-gray-500 "></form>.`
  );

  const time = $(
    `<div class="flex items-center justify-center my-auto col-md-2 h-16">${hour.text}</div>`
  );

  const textArea = $(
    `<textarea name="${hour.text}" maxLength="50" style="resize: none; overflow: hidden;" class="col-md-8 h-16 p-6 ${hourColour(hour)}">${localStorage.getItem(hour.text) || ""}</textarea>`
  );

  textArea.keydown((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      return false;
    }
  });

  const saveButton = $(
    `<button type="submit" class="col-md-2 h-16 bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition duration-500 ease-in-out"><i class="fas fa-save text-xl"></i></button>`
  );

  grid.submit((e) => {
    e.preventDefault();

    const value = $(`textarea[name="${hour.text}"]`).val();

    localStorage.setItem(hour.text, value);
  });

  grid.append(time);
  grid.append(textArea);
  grid.append(saveButton);

  containerEl.append(grid);
});
