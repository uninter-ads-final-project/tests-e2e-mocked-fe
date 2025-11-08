import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {StaffDashboard} from "./staffDashboard.tsx";
import {PatientDashboard} from "./patientDashboard.tsx";

export const Dashboard = () => {

    const [isStaff, setIsStaff] = useState(true);

    return (
        <>
            {isStaff && <StaffDashboard/>}
            {!isStaff &&<PatientDashboard/>}
        </>
    )
}