import React from 'react';
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitleLogin, SubtitleLogin, CriarText, Row, Wrapper } from './styles';

const SignUp = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        console.log('Submitting form data:', formData); // Verificação de submissão
        try {
            const { data } = await api.post('/users', formData); // Enviar dados para o backend
            console.log('Server response:', data);

            if (data.id) {
                alert('Usuário cadastrado com sucesso!');
                navigate('/login'); // Redirecionar para login
                return;
            }

            alert('Erro ao cadastrar usuário');
        } catch (e) {
            console.error('Cadastro erro:', e);
            alert('Houve um erro ao tentar cadastrar. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Faça seu cadastro</TitleLogin>
                        <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="name" control={control} />
                            {errors.name && <span>Nome é obrigatório</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input placeholder="Telefone" leftIcon={<MdPhone />} name="phone" control={control} />
                            {errors.phone && <span>Telefone é obrigatório</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="password" control={control} />
                            {errors.password && <span>Senha é obrigatória</span>}
                            <Button title="Cadastrar" variant="secondary" type="submit" />
                        </form>
                        <Row>
                            <CriarText onClick={() => navigate('/login')}>Já tem uma conta? Faça login</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { SignUp };
