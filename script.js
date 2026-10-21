
const form = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");
const result = document.getElementById("result");
const message = document.getElementById("message");

const yearsOutput = document.getElementById("years");
const monthsOutput = document.getElementById("months");
const daysOutput = document.getElementById("days");

// Get today's date using local calendar values.
function getToday() {
    const now = new Date();

    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
}

// Format a date for the HTML date input.
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Prevent future dates from being selected.
dobInput.max = formatDate(getToday());

function calculateAge(birthDate, today) {
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Borrow the number of days in the previous month.
    if (days < 0) {
        months--;

        const previousMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

        days += previousMonthDays;
    }

    // Borrow 12 months when necessary.
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    message.textContent = "";
    result.hidden = true;

    if (!dobInput.value) {
        message.textContent = "Please select your date of birth.";
        return;
    }

    // Parse the date without UTC/time-zone conversion.
    const parts = dobInput.value.split("-").map(Number);
    const [year, month, day] = parts;

    const birthDate = new Date(year, month - 1, day);
    const today = getToday();

    // Validate calendar dates and reject future dates.
    const isValidDate =
        birthDate.getFullYear() === year &&
        birthDate.getMonth() === month - 1 &&
        birthDate.getDate() === day;

    if (!isValidDate || birthDate > today) {
        message.textContent = "Please enter a valid date of birth.";
        return;
    }

    const age = calculateAge(birthDate, today);

    yearsOutput.textContent = age.years;
    monthsOutput.textContent = age.months;
    daysOutput.textContent = age.days;

    result.hidden = false;
});
