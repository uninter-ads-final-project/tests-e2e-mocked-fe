import {Button, Card, CardBody, CardFooter, CardHeader, Container, FormControl, FormLabel} from "react-bootstrap";

export const LoginPage =() => {
    return (
        <Container>
            <h1>Vita saúde</h1>
            <Card as='form'>
                <CardHeader>
                    Entrar
                </CardHeader>
                <CardBody>
                    <FormLabel htmlFor='username' data-cy-label='username'>Usuário</FormLabel>
                    <FormControl type="text" id='username' data-cy-input='username' />

                    <FormLabel htmlFor='password' data-cy-label='password'>Senha</FormLabel>
                    <FormControl type="password" id='password' data-cy-input='username'/>
                </CardBody>
                <CardFooter className={"gap-3 d-flex align-items-center justify-content-end"}>
                    <a href="#" data-cy-button='forgot_password'>Esqueci minha senha</a>
                    <Button type='submit' data-cy-button='login'>Entrar</Button>
                </CardFooter>
            </Card>
        </Container>
    )
}