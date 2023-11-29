import * as Yup from 'yup';

const deliveryValidator = Yup.object().shape({
    nome_empresa: Yup.string()
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    telefone: Yup.string()
        .required('Campo obrigatório'),
    cep: Yup.string()
        .required('Campo obrigatório'),
    tempo_entrega: Yup.string()
        .required('Campo obrigatório'),
    nome_produto: Yup.string()
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório')
})

export default deliveryValidator;