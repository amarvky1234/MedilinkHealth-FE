function convertTo12Hour(time24) {

    let [hours, minutes] = time24.split(":");
    hours = parseInt(hours);

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;

    if (hours === 0) hours = 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
}

export function generateSlots(doctor) {
    if (!doctor) return [];

    const slots = [];

    const start = doctor.workingHours.start;
    const end = doctor.workingHours.end;
    const duration = doctor.slotDuration;

    let [hour, minute] = start.split(":").map(Number);

    const [endHour, endMinute] = end.split(":").map(Number);

    while (
        hour < endHour ||
        (hour === endHour && minute < endMinute)
    ) {

        const current = `${hour
            .toString()
            .padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;

        const isBreak = doctor.breaks.some((b) => {
            return current >= b.start && current < b.end;
        });

        if (!isBreak) {
            slots.push(
                convertTo12Hour(current)
            );
        }

        minute += duration;

        if (minute >= 60) {
            hour += Math.floor(minute / 60);
            minute %= 60;
        }
    }
    return slots;
}