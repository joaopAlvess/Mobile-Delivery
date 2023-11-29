import * as Yup from 'yup';

const clienteValidator = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Valor muito curto')
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    email: Yup.string()
        .email('O Campo é do tipo email')
        .required('Campo obrigatório'),
    contato: Yup.string()
        .required('Campo obrigatório'),
    endereco: Yup.string()
        .required('Campo obrigatório'),
    fidelidade: Yup.string()
        .required('Campo obrigatório')
})

export default clienteValidator;