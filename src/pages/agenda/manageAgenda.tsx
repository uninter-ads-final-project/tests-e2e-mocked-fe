import {
    Badge,
    Breadcrumb,
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    Form,
    ListGroup,
    Row,
    Table
} from "react-bootstrap"
import {useState} from "react";

export const ManageAgenda = () => {

    const [agendaConfig, setAgendaConfig] = useState({
        medico: 'carlos-silva',
        horarioInicio: '08:00',
        horarioFim: '18:00',
        duracaoConsulta: '30',
        diasTrabalho: ['segunda', 'terca', 'quarta', 'quinta', 'sexta']
    });

    const [bloqueio, setBloqueio] = useState({
        data: '',
        inicio: '',
        fim: '',
        motivo: ''
    });

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Gerenciar Agenda</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Gerenciar Agenda</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={3}>
                    <Card>
                        <Card.Header>
                            <h5>Configurações da Agenda</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Médico</Form.Label>
                                <Form.Select data-cy-input="medico-agenda">
                                    <option value="carlos-silva">Dr. Carlos Silva - Cardiologia</option>
                                    <option value="ana-santos">Dra. Ana Santos - Pediatria</option>
                                    <option value="paulo-oliveira">Dr. Paulo Oliveira - Ortopedia</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Período de Trabalho</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control type="time" defaultValue="08:00" data-cy-input="horario-inicio" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="time" defaultValue="18:00" data-cy-input="horario-fim" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Duração da Consulta</Form.Label>
                                <Form.Select data-cy-input="duracao-consulta">
                                    <option value="15">15 minutos</option>
                                    <option value="30" selected>30 minutos</option>
                                    <option value="45">45 minutos</option>
                                    <option value="60">60 minutos</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Dias de Trabalho</Form.Label>
                                <div>
                                    <Form.Check inline type="checkbox" label="Seg" defaultChecked data-cy-input="dia-segunda" />
                                    <Form.Check inline type="checkbox" label="Ter" defaultChecked data-cy-input="dia-terca" />
                                    <Form.Check inline type="checkbox" label="Qua" defaultChecked data-cy-input="dia-quarta" />
                                    <Form.Check inline type="checkbox" label="Qui" defaultChecked data-cy-input="dia-quinta" />
                                    <Form.Check inline type="checkbox" label="Sex" defaultChecked data-cy-input="dia-sexta" />
                                    <Form.Check inline type="checkbox" label="Sáb" data-cy-input="dia-sabado" />
                                </div>
                            </Form.Group>

                            <Button variant="primary" className="w-100" data-cy-button="salvar-configuracoes">
                                Salvar Configurações
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Header>
                            <h6>Bloquear Horários</h6>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" data-cy-input="data-bloqueio" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Horário</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control type="time" data-cy-input="bloqueio-inicio" placeholder="Início" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="time" data-cy-input="bloqueio-fim" placeholder="Fim" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Motivo</Form.Label>
                                <Form.Control as="textarea" rows={2} data-cy-input="motivo-bloqueio" />
                            </Form.Group>

                            <Button variant="outline-warning" className="w-100" data-cy-button="bloquear-horario">
                                Bloquear Horário
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5 className="mb-0">Agenda Semanal - Dr. Carlos Silva</h5>
                                    <small className="text-muted">01 a 07 de Janeiro 2025</small>
                                </Col>
                                <Col xs="auto">
                                    <ButtonGroup>
                                        <Button variant="outline-primary" size="sm" data-cy-button="nova-consulta">
                                            Nova Consulta
                                        </Button>
                                        <Button variant="outline-success" size="sm" data-cy-button="exportar-agenda">
                                            Exportar Agenda
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table responsive className="mb-0">
                                <thead className="bg-light">
                                <tr>
                                    <th width="12%">Horário</th>
                                    <th width="12%">Seg 01</th>
                                    <th width="12%">Ter 02</th>
                                    <th width="12%">Qua 03</th>
                                    <th width="12%">Qui 04</th>
                                    <th width="12%">Sex 05</th>
                                    <th width="12%">Sáb 06</th>
                                    <th width="12%">Dom 07</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="bg-light fw-bold">08:00</td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <div className="agenda-consulta confirmada">
                                            <small><strong>João Silva</strong></small>
                                            <br />
                                            <small>Retorno</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-primary" data-cy-button="editar-consulta-1">Editar</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <div className="agenda-consulta pendente">
                                            <small><strong>Maria Santos</strong></small>
                                            <br />
                                            <small>Primeira Vez</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-warning" data-cy-button="confirmar-consulta-1">Confirmar</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-light fw-bold">09:00</td>
                                    <td>
                                        <Badge bg="warning" className="w-100">Bloqueado</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <div className="agenda-consulta confirmada">
                                            <small><strong>Pedro Costa</strong></small>
                                            <br />
                                            <small>Rotina</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-primary" data-cy-button="editar-consulta-2">Editar</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <div className="agenda-consulta realizada">
                                            <small><strong>Ana Oliveira</strong></small>
                                            <br />
                                            <small>Emergência</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-secondary" data-cy-button="ver-consulta-1">Ver</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-light fw-bold">10:00</td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <div className="agenda-consulta cancelada">
                                            <small><strong>Carlos Lima</strong></small>
                                            <br />
                                            <small>Cancelada</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-danger" data-cy-button="reagendar-consulta-1">Reagendar</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="bg-light fw-bold">14:00</td>
                                    <td>
                                        <div className="agenda-consulta confirmada">
                                            <small><strong>Fernanda Rocha</strong></small>
                                            <br />
                                            <small>Exames</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-primary" data-cy-button="editar-consulta-3">Editar</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="warning" className="w-100">Bloqueado</Badge>
                                    </td>
                                    <td>
                                        <Badge bg="success" className="w-100">Livre</Badge>
                                    </td>
                                    <td>
                                        <div className="agenda-consulta confirmada">
                                            <small><strong>Roberto Alves</strong></small>
                                            <br />
                                            <small>Retorno</small>
                                            <div className="mt-1">
                                                <Button size="sm" variant="outline-primary" data-cy-button="editar-consulta-4">Editar</Button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                    <td className="bg-light text-muted">
                                        <small>Folga</small>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header>
                            <h5>Consultas do Dia - Segunda, 01 Jan</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Badge bg="primary">08:00</Badge>
                                        </Col>
                                        <Col md={3}>
                                            <strong>Livre</strong>
                                        </Col>
                                        <Col md={3}>
                                            <small>Disponível para agendamento</small>
                                        </Col>
                                        <Col md={4} className="text-end">
                                            <Button size="sm" variant="outline-success" data-cy-button="agendar-horario-1">
                                                Agendar
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Badge bg="warning">09:00</Badge>
                                        </Col>
                                        <Col md={3}>
                                            <strong>Bloqueado</strong>
                                        </Col>
                                        <Col md={3}>
                                            <small>Reunião administrativa</small>
                                        </Col>
                                        <Col md={4} className="text-end">
                                            <Button size="sm" variant="outline-warning" data-cy-button="desbloquear-horario-1">
                                                Desbloquear
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Badge bg="success">10:00</Badge>
                                        </Col>
                                        <Col md={3}>
                                            <strong>Livre</strong>
                                        </Col>
                                        <Col md={3}>
                                            <small>Disponível para agendamento</small>
                                        </Col>
                                        <Col md={4} className="text-end">
                                            <Button size="sm" variant="outline-success" data-cy-button="agendar-horario-2">
                                                Agendar
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Badge bg="info">14:00</Badge>
                                        </Col>
                                        <Col md={3}>
                                            <strong>Fernanda Rocha</strong>
                                        </Col>
                                        <Col md={3}>
                                            <small>Consulta de exames - Confirmada</small>
                                        </Col>
                                        <Col md={4} className="text-end">
                                            <ButtonGroup size="sm">
                                                <Button variant="outline-primary" data-cy-button="iniciar-consulta-1">Iniciar</Button>
                                                <Button variant="outline-secondary" data-cy-button="reagendar-consulta-2">Reagendar</Button>
                                                <Button variant="outline-danger" data-cy-button="cancelar-consulta-1">Cancelar</Button>
                                            </ButtonGroup>
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