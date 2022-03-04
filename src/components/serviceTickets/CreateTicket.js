import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const Ticket = () => {
    const [ticket, assignTicket] = useState({})  // State variable for current ticket object
    const [employees, setEmployees] = useState([])
    const { ticketId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                .then(response => response.json())
                .then((data) => {
                    assignTicket(data)
                })
        },
        [ ticketId ]
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/employees")
                .then(response => response.json())
                .then((data) => {
                    setEmployees(data)
                })
        },
        [] // Only run when initial JSX rendering is complete
    )

    const assignEmployee = (changeEvent) => {
        const newServiceTicketObject = {
            "customerId": parseInt(localStorage.getItem("honey_customer")),
            "employeeId": parseInt(changeEvent.target.value),
            "description": ticket.description,
            "emergency": ticket.emergency,
            "dateCompleted": ticket.dateCompleted
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newServiceTicketObject)
        })
        .then(() => {
            history.push("/tickets")
        })
    }

    return (
        <>
            <h2>Ticket Details</h2>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">{ticket.customer?.name}</div>
                <div className="ticket__employee">
                    <select id="employee" onChange={ assignEmployee }>
                        {
                            employees.map(
                                (employee) => {
                                    return <option value={employee.id} key={`employee--${employee.id}`}>
                                        { employee.name }
                                    </option>
                                }
                            )
                        }
                    </select>
                </div>
            </section>
        </>
    )
}