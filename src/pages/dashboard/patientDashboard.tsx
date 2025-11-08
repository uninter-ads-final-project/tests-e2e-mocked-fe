import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {useState} from "react";

export const PatientDashboard =() => {

    const [formData, setFormData] = useState({
        nome: 'Maria Silva Santos',
        cpf: '123.456.789-00',
        rg: '12.345.678-9',
        endereco1: 'Rua das Flores, 123',
        endereco2: 'Apto 101 - Centro',
        contato_principal: '(11) 99999-9999',
        contato_secundario: '(11) 88888-8888'
    });

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Dashboard do Paciente</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="informacoes-basicas">Informações Básicas</h5>
                        </Card.Header>
                        <Card.Body>
                            <p data-cy-info="nome"><strong>Nome:</strong> {formData.nome}</p>
                            <p data-cy-info="contato-principal"><strong>Telefone Principal:</strong> {formData.contato_principal}</p>
                            <p data-cy-info="contato-secundario"><strong>Telefone Secundário:</strong> {formData.contato_secundario}</p>
                            <Button variant="outline-primary" size="sm" data-cy-button="editar-informacoes">
                                Editar Informações
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="proximas-consultas">Próximas Consultas</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Nenhuma consulta agendada</p>
                            <Button variant="outline-primary" size="sm" data-cy-button="agendar-consulta">
                                Agendar Nova Consulta
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="ultimas-sessoes">Últimas Sessões</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Consulta de Rotina</strong>
                                            <br />
                                            <small>15/12/2025 - Dr. Silva</small>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="outline-info" size="sm" data-cy-button="resumo-consulta" className="me-2">
                                                Ver Resumo
                                            </Button>
                                            <Button variant="outline-info" size="sm" data-cy-button="resultados-consulta">
                                                Ver Resultados
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Avaliação Inicial</strong>
                                            <br />
                                            <small>10/12/2025 - Dr. Santos</small>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="outline-info" size="sm" data-cy-button="resumo-avaliacao" className="me-2">
                                                Ver Resumo
                                            </Button>
                                            <Button variant="outline-info" size="sm" data-cy-button="resultados-avaliacao">
                                                Ver Resultados
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="documentos">Documentos e Receitas</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Receita Médica</strong>
                                            <br />
                                            <small>Emitida em: 15/12/2025</small>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="outline-success" size="sm" data-cy-button="visualizar-receita" className="me-2">
                                                Visualizar
                                            </Button>
                                            <Button variant="outline-success" size="sm" data-cy-button="download-receita">
                                                Download
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Exames Laboratoriais</strong>
                                            <br />
                                            <small>Realizado em: 12/12/2025</small>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="outline-success" size="sm" data-cy-button="visualizar-exames" className="me-2">
                                                Visualizar
                                            </Button>
                                            <Button variant="outline-success" size="sm" data-cy-button="download-exames">
                                                Download
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <Card className="bg-light">
                        <Card.Body>
                            <h5 data-cy-label="sessao-remota">Sessão Remota com Médico</h5>
                            <p>Clique no botão abaixo para entrar em uma sessão remota com seu médico</p>
                            <Button variant="success" size="lg" data-cy-button="entrar-sessao-remota">
                                Entrar na Sessão Remota
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}