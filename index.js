// Your code here
function calculateHoursWorked(checkIn, checkOut) {
    const checkInTime = parseInt(checkIn.slice(-4), 10);
    const checkOutTime = parseInt(checkOut.slice(-4), 10);
    return (checkOutTime - checkInTime) / 100; // divide by 100 to get hours
  }
  
  // Function to process time cards and calculate wages
  function processTimeCards(timeCards) {
    return timeCards.map((timeCard) => {
      const { employeeId, checkIn, checkOut } = timeCard;
  
      // Calculate hours worked
      const hoursWorked = calculateHoursWorked(checkIn, checkOut);
  
      // Assume a fixed hourly rate for simplicity
      const hourlyRate = 10;
  
      // Calculate wages
      const wages = hoursWorked * hourlyRate;
  
      // Return the processed record
      return {
        employeeId,
        checkIn,
        checkOut,
        hoursWorked,
        wages,
      };
    });
  }
  
  // Create Employee Record
  function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create Employee Records
  function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
  }
  
  // Create TimeIn Event
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  // Create TimeOut Event
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  // Calculate Hours Worked on a Specific Date
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employee.timeOutEvents.find(
      (event) => event.date === date
    );
  
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100; // divide by 100 to get hours
    }
  
    return 0;
  }
  
  // Calculate Wages Earned on a Specific Date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Calculate Wages for All Dates
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map((event) => event.date);
    return dates.reduce(
      (totalWages, date) => totalWages + wagesEarnedOnDate(employee, date),
      0
    );
  }
  
  // Calculate Payroll for All Employees
  function calculatePayroll(employees) {
    return employees.reduce(
      (totalPayroll, employee) => totalPayroll + allWagesFor(employee),
      0
    );
  }
  
  // Example time cards
  const timeCards = [
    { employeeId: 1, checkIn: "2024-01-11 0800", checkOut: "2024-01-11 1000" },
    { employeeId: 2, checkIn: "2024-01-11 0900", checkOut: "2024-01-11 1100" },
    // Add more time cards as needed
  ];
  
  // Process time cards and print the results
  const employees = createEmployeeRecords([
    ["Loki", "Laufeyson", "Trickster", 16],
    ["Natalia", "Romanov", "Spy", 20],
    // Add more employees as needed
  ]);
  
  timeCards.forEach((timeCard, index) => {
    const employee = employees[index];
    createTimeInEvent(employee, timeCard.checkIn);
    createTimeOutEvent(employee, timeCard.checkOut);
  });
  
  console.log(hoursWorkedOnDate(employees[0], "2024-01-11")); // Should be 2 hours
  console.log(wagesEarnedOnDate(employees[0], "2024-01-11")); // Should be 32 dollars
  
  console.log(calculatePayroll(employees)); // Should be 52 dollars