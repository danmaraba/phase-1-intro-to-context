// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeDetails) {
    return employeeDetails.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, aDateStamp){
    let [date, hour] = aDateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, aDateStamp){
    let [date, hour] = aDateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, seekDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === seekDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === seekDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let payOwed = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(payOwed.toString())
}

let allWagesFor = function(employee){
    let workingDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let wagespayable = workingDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return wagespayable
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}