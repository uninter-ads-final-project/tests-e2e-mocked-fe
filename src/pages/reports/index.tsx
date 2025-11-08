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

export const Resports = () => {

    const [relatorioConfig, setRelatorioConfig] = useState({
        tipoRelatorio: '',
        dataInicio: '',
        dataFim: '',
        hospitais: [],
        medicos: [],
        especialidades: [],
        staff: [],
        campos: ['dados-pessoais', 'contato', 'consultas'],
        formato: 'pdf'
    });

    const [dadosRelatorio, setDadosRelatorio] = useState({
        consultasRealizadas: 1247,
        novosPacientes: 342,
        faturamentoTotal: 284567,
        taxaOcupacao: 87
    });


    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Relatórios e Analytics</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Relatórios</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <h5>Configurar Relatório</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Relatório</Form.Label>
                                <Form.Select data-cy-input="tipo-relatorio">
                                    <option value="">Selecione o tipo</option>
                                    <option value="consultas">Consultas e Agendamentos</option>
                                    <option value="pacientes">Pacientes Cadastrados</option>
                                    <option value="financeiro">Financeiro</option>
                                    <option value="medicos">Desempenho Médico</option>
                                    <option value="estoque">Estoque e Medicamentos</option>
                                    <option value="ocupacao">Taxa de Ocupação</option>
                                    <option value="customizado">Relatório Customizado</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Período</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Control type="date" data-cy-input="data-inicio" placeholder="Data Início" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="date" data-cy-input="data-fim" placeholder="Data Fim" />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Hospital(s)</Form.Label>
                                <Form.Select multiple data-cy-input="hospitais">
                                    <option value="sao-lucas">Hospital São Lucas</option>
                                    <option value="santa-casa">Santa Casa de Misericórdia</option>
                                    <option value="albert-einstein">Hospital Albert Einstein</option>
                                    <option value="sirio-libanes">Hospital Sírio-Libanês</option>
                                    <option value="todos">Todos os Hospitais</option>
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    Segure Ctrl para selecionar múltiplos
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Equipe Médica</Form.Label>
                                <Form.Select multiple data-cy-input="medicos">
                                    <option value="carlos-silva">Dr. Carlos Silva - Cardiologia</option>
                                    <option value="ana-santos">Dra. Ana Santos - Pediatria</option>
                                    <option value="paulo-oliveira">Dr. Paulo Oliveira - Ortopedia</option>
                                    <option value="maria-costa">Dra. Maria Costa - Dermatologia</option>
                                    <option value="roberto-almeida">Dr. Roberto Almeida - Clínico Geral</option>
                                    <option value="todos">Todos os Médicos</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Especialidades</Form.Label>
                                <Form.Select multiple data-cy-input="especialidades">
                                    <option value="cardiologia">Cardiologia</option>
                                    <option value="pediatria">Pediatria</option>
                                    <option value="ortopedia">Ortopedia</option>
                                    <option value="dermatologia">Dermatologia</option>
                                    <option value="ginecologia">Ginecologia</option>
                                    <option value="clinico-geral">Clínico Geral</option>
                                    <option value="todos">Todas as Especialidades</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Funcionários/Staff</Form.Label>
                                <Form.Select multiple data-cy-input="staff">
                                    <option value="enfermeiros">Enfermeiros</option>
                                    <option value="recepcionistas">Recepcionistas</option>
                                    <option value="tecnicos">Técnicos</option>
                                    <option value="administrativo">Administrativo</option>
                                    <option value="todos">Todo o Staff</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Campos do Relatório</Form.Label>
                                <div>
                                    <Form.Check
                                        type="checkbox"
                                        label="Dados Pessoais"
                                        defaultChecked
                                        data-cy-input="campo-dados-pessoais"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Informações de Contato"
                                        defaultChecked
                                        data-cy-input="campo-contato"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Histórico Médico"
                                        data-cy-input="campo-historico"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Consultas Realizadas"
                                        defaultChecked
                                        data-cy-input="campo-consultas"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Financeiro"
                                        data-cy-input="campo-financeiro"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Medicamentos"
                                        data-cy-input="campo-medicamentos"
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Exames"
                                        data-cy-input="campo-exames"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Formato de Saída</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        name="formato"
                                        label="PDF"
                                        value="pdf"
                                        defaultChecked
                                        data-cy-input="formato-pdf"
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        name="formato"
                                        label="CSV"
                                        value="csv"
                                        data-cy-input="formato-csv"
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        name="formato"
                                        label="Excel"
                                        value="excel"
                                        data-cy-input="formato-excel"
                                    />
                                </div>
                            </Form.Group>

                            <Button variant="primary" className="w-100 mb-2" data-cy-button="gerar-relatorio">
                                Gerar Relatório
                            </Button>
                            <Button variant="outline-secondary" className="w-100" data-cy-button="salvar-configuracao">
                                Salvar Configuração
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5 className="mb-0">Pré-visualização do Relatório</h5>
                                </Col>
                                <Col xs="auto">
                                    <Badge bg="info">Última geração: 28/12/2025 14:30</Badge>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-4">
                                <Col>
                                    <h6>Resumo Estatístico</h6>
                                </Col>
                                <Col xs="auto">
                                    <ButtonGroup size="sm">
                                        <Button variant="outline-success" data-cy-button="exportar-relatorio">
                                            Exportar Relatório
                                        </Button>
                                        <Button variant="outline-primary" data-cy-button="compartilhar-relatorio">
                                            Compartilhar
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                            <Row className="text-center mb-4">
                                <Col md={3}>
                                    <Card className="bg-light">
                                        <Card.Body>
                                            <h4>1,247</h4>
                                            <small>Consultas Realizadas</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="bg-light">
                                        <Card.Body>
                                            <h4>342</h4>
                                            <small>Novos Pacientes</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="bg-light">
                                        <Card.Body>
                                            <h4>R$ 284.567</h4>
                                            <small>Faturamento Total</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="bg-light">
                                        <Card.Body>
                                            <h4>87%</h4>
                                            <small>Taxa de Ocupação</small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Table responsive striped>
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Paciente</th>
                                    <th>Médico</th>
                                    <th>Especialidade</th>
                                    <th>Hospital</th>
                                    <th>Status</th>
                                    <th>Valor</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>28/12/2025</td>
                                    <td>João Silva</td>
                                    <td>Dr. Carlos Silva</td>
                                    <td>Cardiologia</td>
                                    <td>São Lucas</td>
                                    <td><Badge bg="success">Realizada</Badge></td>
                                    <td>R$ 250,00</td>
                                </tr>
                                <tr>
                                    <td>28/12/2025</td>
                                    <td>Maria Santos</td>
                                    <td>Dra. Ana Santos</td>
                                    <td>Pediatria</td>
                                    <td>Santa Casa</td>
                                    <td><Badge bg="success">Realizada</Badge></td>
                                    <td>R$ 180,00</td>
                                </tr>
                                <tr>
                                    <td>27/12/2025</td>
                                    <td>Pedro Costa</td>
                                    <td>Dr. Paulo Oliveira</td>
                                    <td>Ortopedia</td>
                                    <td>Albert Einstein</td>
                                    <td><Badge bg="warning">Pendente</Badge></td>
                                    <td>R$ 300,00</td>
                                </tr>
                                <tr>
                                    <td>27/12/2025</td>
                                    <td>Ana Oliveira</td>
                                    <td>Dra. Maria Costa</td>
                                    <td>Dermatologia</td>
                                    <td>Sírio-Libanês</td>
                                    <td><Badge bg="success">Realizada</Badge></td>
                                    <td>R$ 220,00</td>
                                </tr>
                                <tr>
                                    <td>26/12/2025</td>
                                    <td>Carlos Lima</td>
                                    <td>Dr. Roberto Almeida</td>
                                    <td>Clínico Geral</td>
                                    <td>São Lucas</td>
                                    <td><Badge bg="danger">Cancelada</Badge></td>
                                    <td>R$ 150,00</td>
                                </tr>
                                </tbody>
                            </Table>

                            <Row className="mt-4">
                                <Col md={6}>
                                    <Card>
                                        <Card.Header>
                                            <h6>Consultas por Especialidade</h6>
                                        </Card.Header>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Cardiologia</Col>
                                                        <Col xs="auto"><Badge bg="primary">284</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Pediatria</Col>
                                                        <Col xs="auto"><Badge bg="primary">196</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Ortopedia</Col>
                                                        <Col xs="auto"><Badge bg="primary">173</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Dermatologia</Col>
                                                        <Col xs="auto"><Badge bg="primary">158</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card>
                                        <Card.Header>
                                            <h6>Desempenho por Hospital</h6>
                                        </Card.Header>
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>São Lucas</Col>
                                                        <Col xs="auto"><Badge bg="success">92%</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Santa Casa</Col>
                                                        <Col xs="auto"><Badge bg="success">88%</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Albert Einstein</Col>
                                                        <Col xs="auto"><Badge bg="warning">76%</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Sírio-Libanês</Col>
                                                        <Col xs="auto"><Badge bg="success">85%</Badge></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header>
                            <h5>Relatórios Salvos</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Última Geração</th>
                                    <th>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Relatório Mensal - Dezembro</td>
                                    <td>Consultas</td>
                                    <td>28/12/2025</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button variant="outline-primary" data-cy-button="usar-relatorio-1">Usar</Button>
                                            <Button variant="outline-success" data-cy-button="baixar-relatorio-1">Baixar</Button>
                                            <Button variant="outline-danger" data-cy-button="excluir-relatorio-1">Excluir</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Análise Financeira Trimestral</td>
                                    <td>Financeiro</td>
                                    <td>25/12/2025</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button variant="outline-primary" data-cy-button="usar-relatorio-2">Usar</Button>
                                            <Button variant="outline-success" data-cy-button="baixar-relatorio-2">Baixar</Button>
                                            <Button variant="outline-danger" data-cy-button="excluir-relatorio-2">Excluir</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Performance Médica</td>
                                    <td>Desempenho</td>
                                    <td>20/12/2025</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button variant="outline-primary" data-cy-button="usar-relatorio-3">Usar</Button>
                                            <Button variant="outline-success" data-cy-button="baixar-relatorio-3">Baixar</Button>
                                            <Button variant="outline-danger" data-cy-button="excluir-relatorio-3">Excluir</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}