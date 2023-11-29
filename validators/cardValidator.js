import * as Yup from 'yup';

const cardValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Valor muito curto')
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    email: Yup.string()
        .email('O Campo é do tipo email')
        .required('Campo obrigatório'),
    contato: Yup.string()
        .required('Campo obrigatório'),
    nomeEmpresa: Yup.string()
        .min(2, 'Valor muito curto')
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    cnpj: Yup.string()
        .required('Campo obrigatório'),
    qtdCartoes: Yup.string()
        .required('Campo obrigatório')
})

export default cardValidator