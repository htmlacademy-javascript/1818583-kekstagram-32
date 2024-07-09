const parseClock = (clock) => {
  const arr = clock.split(':');
  return arr.map((str) => parseInt(str, 10));
};

const checkMeetingTime = (workStart, workEnd, meetingStart, meetingDuration) => {
  const parsedWorkStart = parseClock(workStart);
  const parsedWorkEnd = parseClock(workEnd);
  const parsedMeetingStart = parseClock(meetingStart);

  if (parsedWorkStart[0] > parsedMeetingStart[0]) {
    return false;
  } else if (parsedWorkStart[0] === parsedMeetingStart[0] && parsedWorkStart[1] > parsedMeetingStart[1]) {
    return false;
  }

  const meetingHours = Math.floor(meetingDuration / 60);
  const meetingMinutes = meetingDuration - meetingHours * 60;
  const parsedMeetingEnd = [
    parsedMeetingStart[0] + meetingHours,
    parsedMeetingStart[1] + meetingMinutes,
  ];

  if (parsedMeetingEnd[0] > parsedWorkEnd[0]) {
    return false;
  } else if (parsedMeetingEnd[0] === parsedWorkEnd[0] && parsedMeetingEnd[1] > parsedWorkEnd[1]) {
    return false;
  }

  return true;
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
