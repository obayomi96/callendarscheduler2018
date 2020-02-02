const date = new Date();
const events = {};
function initializeCalendar(date) {
  // get month & year
  const month = date.getMonth();
  const year = date.getFullYear();
  // get starting date of the month
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  let i = 1;
  let calendar = '';
  while (i < endOfMonth.getDate()) {
    weekDay = 0;
    if (i === 1) {
      weekDay = startOfMonth.getDay();
    }
    let weekEnd = Math.min(i + 6 - weekDay, endOfMonth.getDate());
    calendar += showWeek(weekDay, i, weekEnd);
    i = weekEnd + 1;
  }
  const tableCalendar = document.querySelector('.calendar tbody');
  tableCalendar.innerHTML = calendar;

  addClickEvent();
}

function showWeek(weekDay, start, end) {
  let row = '<tr>';
  for (let i = 0; i < weekDay; i++) {
    row += '<td></td>';
  }
  for (let j = start; j <= end; j++) {
    row += `<td class="date-${j}">${j}</td>`;
  }
  row += '</tr>';
  return row;
}


function addClickEvent() {
  const days = document.querySelectorAll('.calendar tbody td');
  days.forEach(each => {
    each.addEventListener('click', ({ target }) => {
      scheduleEvent(target.textContent);
    });
  });
}

function scheduleEvent(eventDate) {
  if (parseInt(eventDate) < date.getDate()) {
    alert('You can\'t schedule for a past date');
  } else if (!events[eventDate]) {
    let eventName = prompt('Enter event name').trim();
    while (!eventName) {
      eventName = prompt('Enter event name')
    }
    events[eventDate] = eventName;
    styleDate(eventDate);
  } else {
    const modify = confirm(`You have already scheduled "${events[eventDate]}" for this day. \nDo you want to edit or remove it`);
    if (modify) {
      let newEventName = prompt(`Enter the new event name. To delete the existing event: "${events[eventDate]}" leave it blank`).trim();
      if (!newEventName.trim()) {
        delete events[eventDate];
        styleDate(eventDate, false);
      } else {
        events[eventDate] = newEventName;
      }
    }
  }
}

function styleDate(eventDate, type = true) {
  document.querySelector(`.date-${eventDate}`).style.background = type ? "#ccc" : "#fff";
}


initializeCalendar(date);