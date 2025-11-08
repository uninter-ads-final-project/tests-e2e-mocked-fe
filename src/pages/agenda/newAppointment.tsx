import {Breadcrumb, Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap"
import {useState} from "react";

export const AddAppointment =() => {

    const [agendamento, setAgendamento] = useState({
        especialidade: '',
        hospital: '',
        tipoConsulta: '',
        medico: '',
        data: '',
        horario: '',
        termosAceitos: false
    });

    const [horariosDisponiveis, setHorariosDisponiveis] = useState([
        '08:00', '08:30', '09:00', '10:00', '10:30',
        '14:00', '14:30', '15:00', '16:00'
    ]);

    return (<Container className="mt-4">
        <Row>
            <Col>
                <h1>Marcar Consulta</h1>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Agenda</Breadcrumb.Item>
                    <Breadcrumb.Item active>Marcar Consulta</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col md={4}>
                <Card>
                    <Card.Header>
                        <h5>Selecionar Especialidade</h5>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Especialidade Médica</Form.Label>
                            <Form.Select data-cy-input="especialidade-consulta">
                                <option value="">Selecione uma especialidade</option>
                                <option value="cardiologia">Cardiologia</option>
                                <option value="pediatria">Pediatria</option>
                                <option value="ortopedia">Ortopedia</option>
                                <option value="dermatologia">Dermatologia</option>
                                <option value="ginecologia">Ginecologia</option>
                                <option value="clinico-geral">Clínico Geral</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hospital/Clínica</Form.Label>
                            <Form.Select data-cy-input="hospital-consulta">
                                <option value="">Selecione um local</option>
                                <option value="sao-lucas">Hospital São Lucas</option>
                                <option value="santa-casa">Santa Casa de Misericórdia</option>
                                <option value="albert-einstein">Hospital Albert Einstein</option>
                                <option value="sirio-libanes">Hospital Sírio-Libanês</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Consulta</Form.Label>
                            <Form.Select data-cy-input="tipo-consulta">
                                <option value="">Selecione o tipo</option>
                                <option value="primeira-vez">Primeira Vez</option>
                                <option value="retorno">Retorno</option>
                                <option value="consulta-rotina">Consulta de Rotina</option>
                                <option value="emergencia">Emergência</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Preferência por Médico</Form.Label>
                            <Form.Select data-cy-input="medico-preferencia">
                                <option value="">Qualquer médico disponível</option>
                                <option value="carlos-silva">Dr. Carlos Silva</option>
                                <option value="ana-santos">Dra. Ana Santos</option>
                                <option value="paulo-oliveira">Dr. Paulo Oliveira</option>
                            </Form.Select>
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={8}>
                <Card>
                    <Card.Header>
                        <h5>Selecionar Data e Horário</h5>
                    </Card.Header>
                    <Card.Body>
                        <Row className="mb-4">
                            <Col>
                                <h6>Dezembro 2025</h6>
                            </Col>
                            <Col xs="auto">
                                <ButtonGroup size="sm">
                                    <Button variant="outline-secondary" data-cy-button="semana-anterior">
                                        &lt; Semana Anterior
                                    </Button>
                                    <Button variant="outline-secondary" data-cy-button="proxima-semana">
                                        Próxima Semana &gt;
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>

                        <Row className="text-center fw-bold mb-3">
                            <Col>
                                <div>Seg<br />30</div>
                            </Col>
                            <Col>
                                <div>Ter<br />31</div>
                            </Col>
                            <Col>
                                <div className="text-primary">Qua<br />01</div>
                            </Col>
                            <Col>
                                <div>Qui<br />02</div>
                            </Col>
                            <Col>
                                <div>Sex<br />03</div>
                            </Col>
                            <Col>
                                <div className="text-muted">Sáb<br />04</div>
                            </Col>
                            <Col>
                                <div className="text-muted">Dom<br />05</div>
                            </Col>
                        </Row>

                        <Row className="horarios-disponiveis">
                            <Col>
                                <h6 className="mb-3">Horários Disponíveis - Quarta, 01 Jan</h6>
                                <Row>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-08:00">
                                            08:00
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-08:30">
                                            08:30
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-09:00">
                                            09:00
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-10:00">
                                            10:00
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-10:30">
                                            10:30
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-14:00">
                                            14:00
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-14:30">
                                            14:30
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-15:00">
                                            15:00
                                        </Button>
                                    </Col>
                                    <Col md={4} className="mb-2">
                                        <Button variant="outline-success" className="w-100" data-cy-button="horario-16:00">
                                            16:00
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <hr />

                        <Row className="mt-4">
                            <Col>
                                <Card className="bg-light">
                                    <Card.Body>
                                        <h6>Resumo da Consulta</h6>
                                        <Row>
                                            <Col md={6}>
                                                <p className="mb-1"><strong>Especialidade:</strong> <span data-cy-info="especialidade-selecionada">Cardiologia</span></p>
                                                <p className="mb-1"><strong>Médico:</strong> <span data-cy-info="medico-selecionado">Dr. Carlos Silva</span></p>
                                                <p className="mb-1"><strong>Local:</strong> <span data-cy-info="local-selecionado">Hospital São Lucas</span></p>
                                            </Col>
                                            <Col md={6}>
                                                <p className="mb-1"><strong>Data:</strong> <span data-cy-info="data-selecionada">01/01/2025</span></p>
                                                <p className="mb-1"><strong>Horário:</strong> <span data-cy-info="horario-selecionado">08:00</span></p>
                                                <p className="mb-1"><strong>Tipo:</strong> <span data-cy-info="tipo-selecionado">Primeira Vez</span></p>
                                            </Col>
                                        </Row>

                                        <div className="mt-3">
                                            <Form.Check
                                                type="checkbox"
                                                label="Confirmo que li e aceito os termos de uso e política de privacidade"
                                                data-cy-input="termos-aceitos"
                                            />
                                        </div>

                                        <div className="mt-3">
                                            <Button variant="success" size="lg" className="w-100" data-cy-button="confirmar-agendamento">
                                                Confirmar Agendamento
                                            </Button>
                                            <Button variant="outline-secondary" className="w-100 mt-2" data-cy-button="cancelar-agendamento">
                                                Cancelar
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>)
}