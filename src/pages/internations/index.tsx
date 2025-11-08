import {
    Badge,
    Breadcrumb,
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    Form,
    ListGroup, Modal,
    Row,
    Table
} from "react-bootstrap"
import {useState} from "react";

export const Internations = () => {

    const [showModalNegar, setShowModalNegar] = useState(null);
    const [showModalAlta, setShowModalAlta] = useState(null);

    const [internacoesPendentes, setInternacoesPendentes] = useState([
        {
            id: 1,
            paciente: "João Silva",
            cpf: "123.456.789-00",
            especialidade: "Cardiologia",
            hospital: "São Lucas",
            medicoSolicitante: "Dr. Carlos Mendonça",
            dataSolicitacao: "28/12/2024 14:30"
        },
        {
            id: 2,
            paciente: "Maria Santos",
            cpf: "987.654.321-00",
            especialidade: "Ortopedia",
            hospital: "Santa Casa",
            medicoSolicitante: "Dra. Ana Costa",
            dataSolicitacao: "28/12/2024 16:15"
        }
    ]);

    const [internacoesAtivas, setInternacoesAtivas] = useState([
        {
            id: 3,
            paciente: "Pedro Oliveira",
            idade: 67,
            convenio: "Unimed",
            quarto: "201A",
            dataEntrada: "26/12/2024",
            previsaoAlta: "30/12/2024",
            medicoResponsavel: "Dr. Roberto Almeida",
            status: "estavel"
        },
        {
            id: 4,
            paciente: "Ana Costa",
            idade: 45,
            convenio: "Amil",
            quarto: "105B",
            dataEntrada: "27/12/2024",
            previsaoAlta: "02/01/2025",
            medicoResponsavel: "Dra. Fernanda Lima",
            status: "acompanhamento"
        }
    ]);

    const [indisponibilidades, setIndisponibilidades] = useState([
        {
            quarto: "108A",
            motivo: "Limpeza e Desinfecção",
            dataFim: "29/12/2024"
        },
        {
            quarto: "205B",
            motivo: "Manutenção Elétrica",
            dataFim: "30/12/2024"
        }
    ]);

    const [estatisticas, setEstatisticas] = useState({
        leitosOcupados: 45,
        leitosDisponiveis: 12,
        mediaPermanencia: 4.2,
        altasHoje: 3,
        entradasHoje: 5
    });

    const handleAprovarInternacao = (id) => {
        // Lógica para aprovar internação
        console.log(`Internação ${id} aprovada`);
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Gerenciar Internações</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Internações</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={3}>
                    <Card>
                        <Card.Header>
                            <h5>Filtros</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select data-cy-input="filtro-status">
                                    <option value="">Todos os Status</option>
                                    <option value="solicitada">Solicitada</option>
                                    <option value="aprovada">Aprovada</option>
                                    <option value="negada">Negada</option>
                                    <option value="ativa">Ativa</option>
                                    <option value="alta">Alta Médica</option>
                                    <option value="transferida">Transferida</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Hospital</Form.Label>
                                <Form.Select data-cy-input="filtro-hospital">
                                    <option value="">Todos os Hospitais</option>
                                    <option value="sao-lucas">Hospital São Lucas</option>
                                    <option value="santa-casa">Santa Casa</option>
                                    <option value="albert-einstein">Albert Einstein</option>
                                    <option value="sirio-libanes">Sírio-Libanês</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Especialidade</Form.Label>
                                <Form.Select data-cy-input="filtro-especialidade">
                                    <option value="">Todas as Especialidades</option>
                                    <option value="cardiologia">Cardiologia</option>
                                    <option value="ortopedia">Ortopedia</option>
                                    <option value="clinica-medica">Clínica Médica</option>
                                    <option value="cirurgia">Cirurgia</option>
                                    <option value="pediatria">Pediatria</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Data de Entrada</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control type="date" data-cy-input="data-entrada-inicio" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="date" data-cy-input="data-entrada-fim" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Button variant="primary" className="w-100" data-cy-button="aplicar-filtros">
                                Aplicar Filtros
                            </Button>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Header>
                            <h6>Ações Rápidas</h6>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="success" className="w-100 mb-2" data-cy-button="nova-internacao">
                                Nova Internação
                            </Button>
                            <Button variant="outline-warning" className="w-100 mb-2" data-cy-button="registrar-indisponibilidade">
                                Registrar Indisponibilidade
                            </Button>
                            <Button variant="outline-info" className="w-100" data-cy-button="relatorio-internacoes">
                                Relatório de Internações
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    <Card>
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5 className="mb-0">Solicitações de Internação Pendentes</h5>
                                </Col>
                                <Col xs="auto">
                                    <Badge bg="warning">{internacoesPendentes.length} Pendentes</Badge>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {internacoesPendentes.map((internacao, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <strong>{internacao.paciente}</strong>
                                                <br />
                                                <small>CPF: {internacao.cpf}</small>
                                            </Col>
                                            <Col md={2}>
                                                <Badge bg="secondary">{internacao.especialidade}</Badge>
                                            </Col>
                                            <Col md={2}>
                                                <small>{internacao.hospital}</small>
                                            </Col>
                                            <Col md={2}>
                                                <small>Solicitado por:<br /><strong>{internacao.medicoSolicitante}</strong></small>
                                            </Col>
                                            <Col md={3}>
                                                <ButtonGroup size="sm">
                                                    <Button
                                                        variant="success"
                                                        data-cy-button={`aprovar-${index}`}
                                                        onClick={() => handleAprovarInternacao(internacao.id)}
                                                    >
                                                        Aprovar
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        data-cy-button={`negar-${index}`}
                                                        onClick={() => setShowModalNegar(internacao.id)}
                                                    >
                                                        Negar
                                                    </Button>
                                                    <Button
                                                        variant="outline-primary"
                                                        data-cy-button={`detalhes-${index}`}
                                                    >
                                                        Detalhes
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5 className="mb-0">Internações Ativas</h5>
                                </Col>
                                <Col xs="auto">
                                    <Badge bg="success">{internacoesAtivas.length} Ativas</Badge>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Paciente</th>
                                    <th>Quarto</th>
                                    <th>Entrada</th>
                                    <th>Previsão Alta</th>
                                    <th>Médico Responsável</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {internacoesAtivas.map((internacao, index) => (
                                    <tr key={index}>
                                        <td>
                                            <strong>{internacao.paciente}</strong>
                                            <br />
                                            <small>{internacao.idade} anos • {internacao.convenio}</small>
                                        </td>
                                        <td>
                                            <Badge bg="info">{internacao.quarto}</Badge>
                                        </td>
                                        <td>{internacao.dataEntrada}</td>
                                        <td>{internacao.previsaoAlta}</td>
                                        <td>{internacao.medicoResponsavel}</td>
                                        <td>
                                            <Badge bg={internacao.status === 'estavel' ? 'success' : 'warning'}>
                                                {internacao.status === 'estavel' ? 'Estável' : 'Acompanhamento'}
                                            </Badge>
                                        </td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="outline-success"
                                                    data-cy-button={`alta-${index}`}
                                                    onClick={() => setShowModalAlta(internacao.id)}
                                                >
                                                    Dar Alta
                                                </Button>
                                                <Button
                                                    variant="outline-primary"
                                                    data-cy-button={`transferir-${index}`}
                                                >
                                                    Transferir
                                                </Button>
                                                <Button
                                                    variant="outline-info"
                                                    data-cy-button={`prontuario-${index}`}
                                                >
                                                    Prontuário
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Row className="mt-4">
                        <Col md={6}>
                            <Card>
                                <Card.Header>
                                    <h6>Indisponibilidades de Leitos</h6>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        {indisponibilidades.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col>
                                                        <strong>Quarto {item.quarto}</strong>
                                                        <br />
                                                        <small>Motivo: {item.motivo}</small>
                                                        <br />
                                                        <small>Até: {item.dataFim}</small>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <Button
                                                            size="sm"
                                                            variant="outline-success"
                                                            data-cy-button={`liberar-leito-${index}`}
                                                        >
                                                            Liberar
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card>
                                <Card.Header>
                                    <h6>Estatísticas</h6>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="text-center">
                                        <Col md={6}>
                                            <h4>{estatisticas.leitosOcupados}</h4>
                                            <small>Leitos Ocupados</small>
                                        </Col>
                                        <Col md={6}>
                                            <h4>{estatisticas.leitosDisponiveis}</h4>
                                            <small>Leitos Disponíveis</small>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="text-center">
                                        <Col md={4}>
                                            <h6>{estatisticas.mediaPermanencia}</h6>
                                            <small>Dias Média</small>
                                        </Col>
                                        <Col md={4}>
                                            <h6>{estatisticas.altasHoje}</h6>
                                            <small>Altas Hoje</small>
                                        </Col>
                                        <Col md={4}>
                                            <h6>{estatisticas.entradasHoje}</h6>
                                            <small>Entradas Hoje</small>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Modal para Negar Internação */}
            <Modal show={showModalNegar} onHide={() => setShowModalNegar(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Negar Solicitação de Internação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Motivo da Negação</Form.Label>
                        <Form.Select data-cy-input="motivo-negacao">
                            <option value="">Selecione o motivo</option>
                            <option value="sem-vaga">Sem vaga disponível</option>
                            <option value="nao-urgente">Caso não urgente</option>
                            <option value="documentacao">Documentação incompleta</option>
                            <option value="outro">Outro motivo</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Observações</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Descreva o motivo detalhadamente..."
                            data-cy-input="observacoes-negacao"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-cy-button="cancelar-negacao">
                        Cancelar
                    </Button>
                    <Button variant="danger" data-cy-button="confirmar-negacao">
                        Confirmar Negação
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Dar Alta */}
            <Modal show={showModalAlta} onHide={() => setShowModalAlta(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Alta Médica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Alta</Form.Label>
                        <Form.Select data-cy-input="tipo-alta">
                            <option value="">Selecione o tipo</option>
                            <option value="alta-medica">Alta Médica</option>
                            <option value="transferencia">Transferência</option>
                            <option value="obito">Óbito</option>
                            <option value="voluntaria">Alta Voluntária</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Data e Hora da Alta</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control type="date" data-cy-input="data-alta" />
                            </Col>
                            <Col>
                                <Form.Control type="time" data-cy-input="hora-alta" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Relatório de Alta</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Descreva o estado do paciente e recomendações..."
                            data-cy-input="relatorio-alta"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" data-cy-button="cancelar-alta">
                        Cancelar
                    </Button>
                    <Button variant="success" data-cy-button="confirmar-alta">
                        Registrar Alta
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )

}