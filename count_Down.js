const dob = prompt("Enter Date of valid format in DD-MM or DD-MM-YYYY", '').trim();
const myInterval = setInterval(clock, 1000);

// set time in Html
function setTime(arr) {
    let dd = document.querySelectorAll(".dd>input");
    dd.forEach((Input, idx) => {
        Input.value = arr[idx]
    });
}

// check time validation
function checkValidation(day, month, year) {

    if (day <= 0 || month <= 0 || month > 12 || year <= 1000) {
        return false;
    }

    // Check for February and leap year
    if (month == 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            if (day > 29) return false;
        } else {
            if (day > 28) return false;
        }
    }

    else if (month % 2 == 0 && day > 30) {
        return false;
    }
    else if (month % 2 != 0 && day > 31) {
        return false;
    }

    return true;
}


function clock() {
    let today = new Date();
    let Length = dob.length;
    let day, month, year;
    if (Length == 5) {
        const fullDate = dob.split("-");

        day = parseInt(fullDate[0]);
        month = parseInt(fullDate[1]);
        year = today.getFullYear();

        // Check if the date has already passed this year
        if (new Date(year, month - 1, day) < today) {
            year += 1;
        }
    }
    else if (Length == 8 || Length == 10) {
        const fullDate = dob.split("-");
        if (fullDate.length === 3) {
            day = fullDate[0];
            month = fullDate[1];
            if (fullDate[2].length === 2) {
                year = parseInt(today.getFullYear().toString().slice(0, 2) + fullDate[2]);
            } else {
                year = parseInt(fullDate[2]);
            }
        }

        else {
            alert('Enter correct Input');
            clearInterval(myInterval);
            return;
        }
    }
    else {
        alert('Enter correct Input');
        clearInterval(myInterval);
        return;
    }

    if (!checkValidation) { alert('Enter correct Input'); return }

    let birthdayTime = new Date(year, month - 1, day);
    let timeDifference = birthdayTime.getTime() - today.getTime()

    if (timeDifference < 0) {
        // Calculate time passed since the input date
        timeDifference = Math.abs(timeDifference);
    }
    // 1day = 24hr
    // 1hr = 60min
    // 1min = 60sec
    // 1sec = 1000millisecond

    let leftTime = Math.floor(timeDifference / 1000);
    let leftMinutes = Math.floor(leftTime / 60);
    let leftHours = Math.floor(leftMinutes / 60);
    let leftDays = Math.floor(leftHours / 24);

    leftHours = leftHours % 24;
    leftMinutes = leftMinutes % 60;
    leftTime = leftTime % 60;

    console.log(`days: ${leftDays} Hours: ${leftHours} Minutes: ${leftMinutes} Seconds: ${leftTime}`);
    console.log(`Time difference: ${timeDifference}`);


    setTime([leftDays, leftHours, leftMinutes, leftTime])

    if (leftDays === 0 && leftHours === 0 && leftMinutes === 0 && leftTime === 0) {
        clearInterval(myInterval);
    }

}

function passClock() {

}

// clock(dob);