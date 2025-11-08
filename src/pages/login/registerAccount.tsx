import {Button, Card, CardBody, CardHeader, Container, Form} from "react-bootstrap"
import {useState} from "react";

export const RegisterAccount = () => {

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        rg: '',
        endereco1: '',
        endereco2: '',
        contato_principal: '',
        contato_secundario: ''
    });
    const [submitted, setSubmitted] = useState(false);


    const handleChange = (event:any) => {
        const {name, value} = event.target;

        if (name === 'cpf') {
            const numericValue = value.replace(/\D/g, '').slice(0, 11);
            let maskedValue = numericValue;

            if (numericValue.length <= 3) {
                maskedValue = numericValue;
            } else if (numericValue.length <= 6) {
                maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
            } else if (numericValue.length <= 9) {
                maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
            } else {
                maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
            }

            setFormData(prevState => ({
                ...prevState,
                [name]: maskedValue
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmitted(true);

        const requiredFields = ['nome', 'cpf', 'rg', 'endereco1', 'contato_principal'];

        // @ts-ignore
        const isValid = requiredFields.every(field => formData[field].trim() !== '');

        if (isValid) {
            console.log(formData);
        } else {
            console.log('Por favor, preencha todos os campos obrigatórios');
        }
    };

    return (

        <Container>
            <h1>Vita plus</h1>

            <Card className="mt-5">
                <CardHeader>
                    <h2>Registrar nova conta</h2>
                </CardHeader>
                <CardBody>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="nome">Nome Completo *</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                isInvalid={!formData.nome.trim() && submitted}
                                data-cy-input="nome"
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo é obrigatório
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="cpf">CPF *</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                isInvalid={!formData.cpf.trim() && submitted}
                                data-cy-input="cpf"
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo é obrigatório
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="rg">RG *</Form.Label>
                            <Form.Control
                                type="text"
                                name="rg"
                                value={formData.rg}
                                onChange={handleChange}
                                isInvalid={!formData.rg.trim() && submitted}
                                data-cy-input="rg"
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo é obrigatório
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="endereco1">Endereço (Linha 1) *</Form.Label>
                            <Form.Control
                                type="text"
                                name="endereco1"
                                value={formData.endereco1}
                                onChange={handleChange}
                                isInvalid={!formData.endereco1.trim() && submitted}
                                data-cy-input="endereco1"
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo é obrigatório
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="endereco2">Endereço (Linha 2)</Form.Label>
                            <Form.Control
                                type="text"
                                name="endereco2"
                                value={formData.endereco2}
                                onChange={handleChange}
                                data-cy-input="endereco2"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="contato_principal">Telefone Principal *</Form.Label>
                            <Form.Control
                                type="tel"
                                name="contato_principal"
                                value={formData.contato_principal}
                                onChange={handleChange}
                                isInvalid={!formData.contato_principal.trim() && submitted}
                                data-cy-input="contato_principal"
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo é obrigatório
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label data-cy-label="contato_secundario">Telefone Secundário</Form.Label>
                            <Form.Control
                                type="tel"
                                name="contato_secundario"
                                value={formData.contato_secundario}
                                onChange={handleChange}
                                data-cy-input="contato_secundario"
                            />
                        </Form.Group>

                        <Button variant="outline-danger" type="reset" data-cy-button="reset">
                            Cancelar
                        </Button>

                        <Button variant="primary" type="submit" data-cy-button="submit" className='mx-3'>
                            Criar Cadastro
                        </Button>
                    </Form>

                </CardBody>
            </Card>

        </Container>

    )

}