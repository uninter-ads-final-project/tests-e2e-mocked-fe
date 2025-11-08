import {Badge, Button, ButtonGroup, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap"
import {useState} from "react";

export const Agenda = () => {

    const [userLevel, setUserLevel] = useState('doctor');
    const [calendarView, setCalendarView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filters, setFilters] = useState({
        patient: '',
        date: '',
        specialty: '',
        status: '',
        hospital: ''
    });

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Agenda {userLevel === 'patient' ? 'de Consultas' : 'Médica'}</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={3}>
                    <Card>
                        <Card.Header>
                            <h5>Filtros</h5>
                        </Card.Header>
                        <Card.Body>
                            {userLevel !== 'patient' && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Paciente</Form.Label>
                                    <Form.Select data-cy-input="filtro-paciente">
                                        <option value="">Todos os Pacientes</option>
                                        <option value="joao">João Pereira</option>
                                        <option value="ana">Ana Costa</option>
                                        <option value="carlos">Carlos Oliveira</option>
                                    </Form.Select>
                                </Form.Group>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" data-cy-input="filtro-data" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Especialidade</Form.Label>
                                <Form.Select data-cy-input="filtro-especialidade">
                                    <option value="">Todas as Especialidades</option>
                                    <option value="cardiologia">Cardiologia</option>
                                    <option value="pediatria">Pediatria</option>
                                    <option value="ortopedia">Ortopedia</option>
                                    <option value="dermatologia">Dermatologia</option>
                                </Form.Select>
                            </Form.Group>

                            {userLevel !== 'patient' && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select data-cy-input="filtro-status">
                                        <option value="">Todos os Status</option>
                                        <option value="agendada">Agendada</option>
                                        <option value="confirmada">Confirmada</option>
                                        <option value="realizada">Realizada</option>
                                        <option value="cancelada">Cancelada</option>
                                    </Form.Select>
                                </Form.Group>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label>Hospital</Form.Label>
                                <Form.Select data-cy-input="filtro-hospital">
                                    <option value="">Todos os Hospitais</option>
                                    <option value="sao-lucas">Hospital São Lucas</option>
                                    <option value="santa-casa">Santa Casa</option>
                                    <option value="albert-einstein">Albert Einstein</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="outline-primary" className="w-100" data-cy-button="aplicar-filtros">
                                Aplicar Filtros
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5 className="mb-0">Calendário - Dezembro 2025</h5>
                                </Col>
                                <Col xs="auto">
                                    <ButtonGroup>
                                        <Button variant="outline-secondary" size="sm" data-cy-button="visao-semana">
                                            Semana
                                        </Button>
                                        <Button variant="outline-secondary" size="sm" data-cy-button="visao-mes">
                                            Mês
                                        </Button>
                                        <Button variant="outline-secondary" size="sm" data-cy-button="visao-dia">
                                            Dia
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {/* Cabeçalho dos dias */}
                            <Row className="text-center fw-bold border-bottom mb-2">
                                <Col>Seg</Col>
                                <Col>Ter</Col>
                                <Col>Qua</Col>
                                <Col>Qui</Col>
                                <Col>Sex</Col>
                                <Col>Sáb</Col>
                                <Col>Dom</Col>
                            </Row>

                            {/* Semanas do calendário */}
                            <Row className="calendar-week">
                                <Col className="calendar-day border">
                                    <div className="text-muted">25</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <Badge bg="success" className="w-100 mb-1">09:00 - Disponível</Badge>
                                        ) : (
                                            <Badge bg="info" className="w-100 mb-1">09:00 - João Pereira</Badge>
                                        )}
                                    </div>
                                </Col>
                                <Col className="calendar-day border">
                                    <div className="text-muted">26</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <>
                                                <Badge bg="success" className="w-100 mb-1">10:30 - Disponível</Badge>
                                                <Badge bg="success" className="w-100 mb-1">14:00 - Disponível</Badge>
                                            </>
                                        ) : (
                                            <>
                                                <Badge bg="info" className="w-100 mb-1">10:30 - Ana Costa</Badge>
                                                <Badge bg="warning" className="w-100 mb-1">14:00 - Carlos Oliveira</Badge>
                                            </>
                                        )}
                                    </div>
                                </Col>
                                <Col className="calendar-day border">
                                    <div className="text-muted">27</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <Badge bg="secondary" className="w-100 mb-1">Indisponível</Badge>
                                        ) : (
                                            <Badge bg="danger" className="w-100 mb-1">11:00 - Emergência</Badge>
                                        )}
                                    </div>
                                </Col>
                                <Col className="calendar-day border">
                                    <div>28</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <>
                                                <Badge bg="success" className="w-100 mb-1">08:00 - Disponível</Badge>
                                                <Badge bg="success" className="w-100 mb-1">15:30 - Disponível</Badge>
                                            </>
                                        ) : (
                                            <>
                                                <Badge bg="info" className="w-100 mb-1">08:00 - Maria Santos</Badge>
                                                <Badge bg="info" className="w-100 mb-1">15:30 - Pedro Almeida</Badge>
                                            </>
                                        )}
                                    </div>
                                </Col>
                                <Col className="calendar-day border">
                                    <div>29</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <Badge bg="success" className="w-100 mb-1">13:00 - Disponível</Badge>
                                        ) : (
                                            <Badge bg="info" className="w-100 mb-1">13:00 - João Pereira</Badge>
                                        )}
                                    </div>
                                </Col>
                                <Col className="calendar-day border">
                                    <div>30</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <Badge bg="secondary" className="w-100 mb-1">Feriado</Badge>
                                        ) : (
                                            <Badge bg="secondary" className="w-100 mb-1">Feriado</Badge>
                                        )}
                                    </div>
                                </Col>
                                <Col className="calendar-day border">
                                    <div>31</div>
                                    <div className="calendar-events">
                                        {userLevel === 'patient' ? (
                                            <Badge bg="success" className="w-100 mb-1">16:00 - Disponível</Badge>
                                        ) : (
                                            <Badge bg="warning" className="w-100 mb-1">16:00 - Ana Costa</Badge>
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            {/* Ações para diferentes níveis de usuário */}
                            <Row className="mt-4">
                                <Col className="text-center">
                                    {userLevel === 'patient' ? (
                                        <Button variant="primary" data-cy-button="agendar-consulta">
                                            Agendar Nova Consulta
                                        </Button>
                                    ) : (
                                        <ButtonGroup>
                                            <Button variant="success" data-cy-button="nova-consulta">
                                                Nova Consulta
                                            </Button>
                                            <Button variant="outline-primary" data-cy-button="gerenciar-agenda">
                                                Gerenciar Agenda
                                            </Button>
                                            <Button variant="outline-info" data-cy-button="bloquear-horarios">
                                                Bloquear Horários
                                            </Button>
                                        </ButtonGroup>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* Lista de consultas do dia */}
                    <Card className="mt-4">
                        <Card.Header>
                            <h5>Consultas de Hoje - 28/12/2025</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Badge bg="primary">08:00</Badge>
                                        </Col>
                                        <Col md={3}>
                                            <strong>Maria Santos</strong>
                                        </Col>
                                        <Col md={3}>
                                            <small>Cardiologia</small>
                                        </Col>
                                        <Col md={2}>
                                            <Badge bg="success">Confirmada</Badge>
                                        </Col>
                                        <Col md={2}>
                                            {userLevel !== 'patient' && (
                                                <ButtonGroup size="sm">
                                                    <Button variant="outline-primary" data-cy-button="iniciar-consulta">
                                                        Iniciar
                                                    </Button>
                                                    <Button variant="outline-secondary" data-cy-button="reagendar-consulta">
                                                        Reagendar
                                                    </Button>
                                                </ButtonGroup>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Badge bg="primary">15:30</Badge>
                                        </Col>
                                        <Col md={3}>
                                            <strong>Pedro Almeida</strong>
                                        </Col>
                                        <Col md={3}>
                                            <small>Ortopedia</small>
                                        </Col>
                                        <Col md={2}>
                                            <Badge bg="warning">Pendente</Badge>
                                        </Col>
                                        <Col md={2}>
                                            {userLevel !== 'patient' && (
                                                <ButtonGroup size="sm">
                                                    <Button variant="outline-primary" data-cy-button="confirmar-consulta">
                                                        Confirmar
                                                    </Button>
                                                    <Button variant="outline-danger" data-cy-button="cancelar-consulta">
                                                        Cancelar
                                                    </Button>
                                                </ButtonGroup>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}