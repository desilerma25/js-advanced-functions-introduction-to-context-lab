// Your code here
function createEmployeeRecord(employeeInfo) {
    const employee = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = function(arrayOfArrays) {
    return arrayOfArrays.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employeeObj, datestamp) {
    const [date, hour] = datestamp.split(" ")
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    })
    return employeeObj
}

function createTimeOutEvent(employeeObj, datestamp) {
    const [date, hour] = datestamp.split(" ")
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    })
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, dateOnly) {
    let dayIn = employeeObj.timeInEvents.find(element => {
        return element.date === dateOnly
    })
    let dayOut = employeeObj.timeOutEvents.find(element => {
        return element.date === dateOnly
    })
    return (dayOut.hour - dayIn.hour) / 100
}

function wagesEarnedOnDate(employeeObj, dateOnly) {
    return employeeObj.payPerHour * hoursWorkedOnDate(employeeObj, dateOnly)
}

function allWagesFor(employeeObj) {
    let allDates = employeeObj.timeInEvents.map(element => element.date)
    return allDates.reduce(function(total, d) {
        return total + wagesEarnedOnDate(employeeObj, d)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employeeRecArray) {
   return employeeRecArray.reduce(function(memo, employee) {
       return memo + allWagesFor(employee)
   }, 0) 
}