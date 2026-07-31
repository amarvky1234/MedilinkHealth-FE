export function isWorkingDay(date, workingDays) {

    const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
    });

    return workingDays.includes(dayName);
}