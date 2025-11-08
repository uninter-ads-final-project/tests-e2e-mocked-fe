import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {StaffDashboard} from "./staffDashboard.tsx";
import {PatientDashboard} from "./patientDashboard.tsx";

export const Dashboard = (props: { isStaff?:boolean }) => {

    const [isStaff, setIsStaff] = useState(props.isStaff);

    return (
        <>
            {isStaff && <StaffDashboard/>}
            {!isStaff &&<PatientDashboard/>}
        </>
    )
}