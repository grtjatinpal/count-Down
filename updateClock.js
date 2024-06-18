const userInput = prompt("Enter Date in valid format: DD-MM or DD-MM-YYYY").trim();
document.querySelector(".contain>h2").innerHTML += userInput
const updateInterval = setInterval(updateClock, 1000);




// -----------------------------Set time in HTML inputs-----------------------------
function setTimeInHtml(timeArray) {
    let inputs = document.querySelectorAll(".dd>input");
    inputs.forEach((input, index) => {
        input.value = timeArray[index];
    });
}
// -----------------------------Set time in HTML inputs-----------------------------




// --------------------------- Calculate time Validation ---------------------------
function isValidDate(day, month, year) {
    // if (day <= 0 || month <= 0 || month > 12 || year <= 1000) {
    //     return false;
    // }

    // Check for February and leap year
    if (month == 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            if (day > 29) return false;
        } else {
            if (day > 28) return false;
        }
    }
    // else if (month % 2 == 0 && day > 30) {
    else if ([4, 6, 9, 11].includes(month)) {
        if (day > 30) return false;
    } else {
        if (day > 31) return false;
    }

    return true;
}
// --------------------------- Calculate time Validation ---------------------------




// ---------------------------- Calculate time Remaining ----------------------------
function calculateTimeRemaining(timeDifference) {
    let remainingSeconds = Math.floor(timeDifference / 1000);
    let remainingMinutes = Math.floor(remainingSeconds / 60);
    let remainingHours = Math.floor(remainingMinutes / 60);
    let remainingDays = Math.floor(remainingHours / 24);

    remainingHours = remainingHours % 24;
    remainingMinutes = remainingMinutes % 60;
    remainingSeconds = remainingSeconds % 60;

    return [remainingDays, remainingHours, remainingMinutes, remainingSeconds];
}
// ---------------------------- Calculate time Remaining ----------------------------




// ------------------------------Calculate time Passed------------------------------
function calculateTimePassed(timeDifference) {
    timeDifference = Math.abs(timeDifference);
    let passedTime = calculateTimeRemaining(timeDifference)
    return passedTime;
}
// ------------------------------Calculate time Passed------------------------------




// --------------------------- Calculate time Difference ---------------------------
function calculateTimeDifference(dateString) {
    let today = new Date();
    let length = dateString.length;
    let day, month, year;

    if (length === 5) {
        const fullDate = dateString.split("-");
        day = parseInt(fullDate[0]);
        month = parseInt(fullDate[1]);
        year = today.getFullYear();

        // Check if the date has already passed this year
        if (new Date(year, month - 1, day) < today) {
            year += 1;
        }
    }
    else if (length === 8 || length === 10) {
        const fullDate = dateString.split("-");

        // Because (-) double dashed lga die toh 
        if (fullDate.length === 3) {
            day = parseInt(fullDate[0]);
            month = parseInt(fullDate[1]);
            if (fullDate[2].length === 2) {
                year = parseInt(today.getFullYear().toString().slice(0, 2) + fullDate[2]);
            }
            else {
                year = parseInt(fullDate[2]);
            }
        }
        else {
            return null; // Incorrect Input
        }
    }
    else {
        return null; // Incorrect Input
    }

    if (!isValidDate(day, month, year)) {
        return null; // Incorrect Input
    }

    let targetDate = new Date(year, month - 1, day);
    return targetDate.getTime() - today.getTime();
}
// --------------------------- Calculate time Difference ---------------------------




// ---------------------------------------------------------------------------------
// --------------------------------- Update clock ----------------------------------
function updateClock() {
    let timeDifference = calculateTimeDifference(userInput);
    let remainingTime = null


    if (timeDifference === null) {
        alert('Enter correct Input');
        clearInterval(updateInterval);
        return;
    }

    if (timeDifference < 0) {
        // alert('Enter correct Input');
        // clearInterval(updateInterval);
        remainingTime = calculateTimePassed(timeDifference);
        console.log(`Time passed since the input date: ${remainingTime[0]} days, ${remainingTime[1]} hours, ${remainingTime[2]} minutes, ${remainingTime[3]} seconds`);
    }
    else {
        remainingTime = calculateTimeRemaining(timeDifference);
        console.log(`Time remaining until the input date: ${remainingTime[0]} days, ${remainingTime[1]} hours, ${remainingTime[2]} minutes, ${remainingTime[3]} seconds`);
    }

    setTimeInHtml(remainingTime);
    if (remainingTime[0] === 0 && remainingTime[1] === 0 && remainingTime[2] === 0 && remainingTime[3] === 0 || remainingTime == null) {
        clearInterval(updateInterval);
    }

}
// --------------------------------- Update clock ----------------------------------
// ---------------------------------------------------------------------------------