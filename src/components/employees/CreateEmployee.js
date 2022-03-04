import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Employee = () => {
    const [employee, assignEmployees] = useState({})  // State variable for current ticket object
    const { employeeId } = useParams()  // Variable storing the route parameter

    useEffect(
        () => {
            return fetch(`http://localhost:8088/employees/${employeeId}`)
                .then(response => response.json())
                .then((data) => {
                    assignEmployees(data)
                })
        },
        [ employeeId ]
    )

    return (
        <>
            <section className="employee">
                <h3 className="employee__name">{employee.name}</h3>
                <div className="employee__specialty">Submitted by {employee?.specialty}</div>
            </section>
        </>
    )
}