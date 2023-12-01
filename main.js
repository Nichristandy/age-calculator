// all query selector
const year_input = document.querySelector("#year_input");
const month_input = document.querySelector("#month_input");
const day_input = document.querySelector("#day_input");
const button = document.querySelector(".btn");
const yearContainer = document.querySelector(".year-container");
const monthContainer = document.querySelector(".month-container");
const dayContainer = document.querySelector(".day-container");

// get current date
const now = new Date();
const currYear = now.getFullYear();
const currMonth = now.getMonth();
const currDate = now.getDate();
console.log(currYear, currMonth, currDate);

// validation
const errMessage = (msg, container) => {
  const str = `<p class="error-message">${msg}</p>`;
  const tempCont = container;
  // using dom parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  const element = doc.body.firstChild;
  tempCont.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, 500);
};

button.addEventListener("click", function () {
  const year = Number(year_input.value);
  const month = Number(month_input.value);
  const day = Number(day_input.value);

  // validation
  if (!year) {
    yearContainer.classList.add("error");
    year_input.classList.add("input-error");
    errMessage("the field must be filled", yearContainer);
  }
  if (!month) {
    monthContainer.classList.add("error");
    month_input.classList.add("input-error");
    errMessage("the field must be filled", monthContainer);
  }
  if (!day) {
    dayContainer.classList.add("error");
    day_input.classList.add("input-error");
    errMessage("the field must be filled", dayContainer);
  }

  if (year > currYear) {
    yearContainer.classList.add("error");
    year_input.classList.add("input-error");
    errMessage("must be in the past", yearContainer);
  }
  if (month > 12) {
    monthContainer.classList.add("error");
    month_input.classList.add("input-error");
    errMessage("must be a valid month", monthContainer);
  }
  if (month % 2 === 0 && day > 30) {
    if (month === 2 && day > 28) {
      dayContainer.classList.add("error");
      day_input.classList.add("input-error");
      errMessage("must be a valid day", dayContainer);
    }
    dayContainer.classList.add("error");
    day_input.classList.add("input-error");
    errMessage("must be a valid day", dayContainer);
  }
  if (month % 2 === 1 && day > 31) {
    dayContainer.classList.add("error");
    day_input.classList.add("input-error");
    errMessage("must be a valid day", dayContainer);
  } else {
    //   console.log(year, month, day);

    let yearRes = currYear - year;
    let monthRes = currMonth - (month - 1);
    let dayRes = currDate - day;
    console.log(monthRes);

    if (monthRes <= 0) {
      yearRes -= 1;
      if (dayRes > 0) {
        monthRes = 12 + monthRes;
      } else {
        monthRes = 11 - monthRes;
      }
    }
    if (dayRes <= 0) {
      if ((month <= 7 && month % 2 === 1) || (month > 7 && month % 2 === 0)) {
        dayRes = 31 + dayRes;
      } else {
        dayRes = 30 + dayRes;
      }

      monthRes -= 1;
    }

    // update the ui of the result
    const yearUI = document.querySelector(".year-result");
    const monthUI = document.querySelector(".month-result");
    const dayUI = document.querySelector(".day-result");
    yearUI.textContent = yearRes;
    monthUI.textContent = monthRes;
    dayUI.textContent = dayRes;
  }

  // console.log(yearRes, monthRes, dayRes);
});
