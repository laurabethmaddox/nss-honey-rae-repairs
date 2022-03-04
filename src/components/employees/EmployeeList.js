import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const EmployeeList = () => {
    const [employees, changeEmployees] = useState([])
    const [specialties, setSpecial] = useState("")

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then(employeeArray => {
                    changeEmployees(employeeArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const specialtyItems = employees.map(
                (emp) => emp.specialty
            )
            setSpecial(specialtyItems.join(", "))
        },
        [employees]
    )

    return (
        <>
        <div>
            Specialties: { specialties }
        </div>
        {
            employees.map(
                (employee) => {
                    return <p key={`employee--${employee.id}`}>
                        <Link to={`/employees/${employee.id}`}>{employee.name}</Link>
                    </p>
                }
            )
        }
        </>
    )
}