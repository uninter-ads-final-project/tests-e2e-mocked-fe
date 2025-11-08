import {Badge, Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {useState} from "react";


export const StaffDashboard = () => {
    const [userLevel, setUserLevel] = useState('admin');
    const [formData, setFormData] = useState({
        nome: 'Dr. Carlos Mendonça',
        cpf: '987.654.321-00',
        rg: '98.765.432-1',
        endereco1: 'Av. Hospitalar, 1000',
        endereco2: 'Sala 205 - Ala Médica',
        contato_principal: '(11) 77777-7777',
        contato_secundario: '(11) 66666-6666',
        especialidade: 'Cardiologia',
        crm: 'CRM-SP 123456'
    });


    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Dashboard Médico/Hospital</h1>
                    <p className="text-muted">Bem-vindo, Dr. {formData.nome}</p>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="pacientes-hoje">Pacientes do Dia</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>João Pereira</strong>
                                            <br/>
                                            <small>Consulta: 09:00 - Cardiologia</small>
                                        </Col>
                                        <Col xs="auto">
                                            <Badge bg="success">Confirmado</Badge>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Ana Costa</strong>
                                            <br/>
                                            <small>Consulta: 10:30 - Pediatria</small>
                                        </Col>
                                        <Col xs="auto">
                                            <Badge bg="warning">Aguardando</Badge>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="consultas-urgentes">Consultas Urgentes</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Nenhuma consulta urgente no momento</p>
                            <Button variant="outline-danger" size="sm" data-cy-button="ver-urgencias">
                                Ver Central de Urgências
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {userLevel === 'admin' && (
                <>
                    <Row>
                        <Col>
                            <Card className="mb-4">
                                <Card.Header className="bg-admin">
                                    <h5 data-cy-label="administracao">Administração (Apenas Admin)</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={3}>
                                            <h6>Relatórios</h6>
                                            <Button variant="outline-primary" size="sm" className="me-2 mb-2"
                                                    data-cy-button="criar-relatorio">
                                                Criar
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="me-2 mb-2"
                                                    data-cy-button="revisar-relatorio">
                                                Revisar
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="mb-2"
                                                    data-cy-button="enviar-relatorio">
                                                Enviar
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <h6>Internações</h6>
                                            <Button variant="outline-info" size="sm" className="me-2 mb-2"
                                                    data-cy-button="gerenciar-internacoes">
                                                Gerenciar
                                            </Button>
                                            <Button variant="outline-success" size="sm" className="me-2 mb-2"
                                                    data-cy-button="aceitar-internacao">
                                                Aceitar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" className="mb-2"
                                                    data-cy-button="rejeitar-internacao">
                                                Rejeitar
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <h6>Equipe</h6>
                                            <Button variant="outline-secondary" size="sm" className="mb-2"
                                                    data-cy-button="gerenciar-equipe">
                                                Gerenciar Equipe
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <h6>Hospitais</h6>
                                            <Button variant="outline-dark" size="sm" className="mb-2"
                                                    data-cy-button="gerenciar-hospitais">
                                                Gerenciar Hospitais
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}

            {(userLevel === 'doctor' || userLevel === 'admin') && (
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <Card.Header className="bg-doctor">
                                <h5 data-cy-label="acoes-medicas">Ações Médicas</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <h6>Emitir Receitas</h6>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Paciente</Form.Label>
                                            <Form.Select data-cy-input="paciente-receita">
                                                <option>Selecione um paciente</option>
                                                <option>João Pereira</option>
                                                <option>Ana Costa</option>
                                                <option>Carlos Oliveira</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Medicamento</Form.Label>
                                            <Form.Control type="text" data-cy-input="medicamento"
                                                          placeholder="Nome do medicamento"/>
                                        </Form.Group>
                                        <Button variant="success" data-cy-button="emitir-receita">
                                            Emitir Receita
                                        </Button>
                                    </Col>
                                    <Col md={6}>
                                        <h6>Avaliar Exames</h6>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <strong>Hemograma Completo</strong>
                                                        <br/>
                                                        <small>Paciente: João Pereira</small>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Button variant="outline-info" size="sm"
                                                                data-cy-button="avaliar-exame">
                                                            Avaliar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <strong>Raio-X Torax</strong>
                                                        <br/>
                                                        <small>Paciente: Ana Costa</small>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Button variant="outline-info" size="sm"
                                                                data-cy-button="avaliar-raio-x">
                                                            Avaliar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <Card className="mb-4">
                        <Card.Header>
                            <h5 data-cy-label="sessoes-remotas">Sessões Remotas</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <h6>Próximas Sessões</h6>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <strong>Consulta com João Pereira</strong>
                                            <br/>
                                            <small>10:00 AM - Cardiologia</small>
                                            <br/>
                                            <Button variant="primary" size="sm" className="mt-2"
                                                    data-cy-button="iniciar-sessao">
                                                Iniciar Sessão
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={6}>
                                    <h6>Iniciar Nova Sessão</h6>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Paciente</Form.Label>
                                        <Form.Select data-cy-input="paciente-sessao">
                                            <option>Selecione um paciente</option>
                                            <option>João Pereira</option>
                                            <option>Ana Costa</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant="success" data-cy-button="nova-sessao-remota">
                                        Iniciar Sessão Remota
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)

}