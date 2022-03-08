import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [active, setActive] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then(data => {
                    setTickets(data)
                })
        },
        []
    )

    useEffect(
        () => {
            const activeTicketCount = tickets.filter(t => t.dateCompleted === "").length
            setActive(`There are ${activeTicketCount} open tickets`)
        },
        [tickets]
    )

    const deleteTicket = (id) => {
        const fetchOptions = {
            method: "DELETE",
        }
        return fetch(`http://localhost:8088/serviceTickets/${id}`, fetchOptions)
    }
    
    return (
        <>
        <div>
            <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
        </div>
        { active }
        {
            tickets.map(
                (ticket) => {
                    return <div key={`ticket--${ticket.id}`}>
                        <p className={ticket.emergency ? 'emergency' : ''}> 
                            {ticket.emergency ? "🚑" : ""} <Link to={`/tickets/${ticket.id}`}>{ticket.description}</Link> submitted by {ticket.customer.name} and worked on by {ticket.employee.name}
                        <button onClick={() => {
                            deleteTicket(ticket.id)
                        }}>Delete</button>
                        </p>
                    </div>
                }
            )
        }
        </>
    )
}