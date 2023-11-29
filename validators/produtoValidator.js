import * as Yup from 'yup';

const produtoValidator = Yup.object().shape({
    delivery: Yup.string()
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    cliente: Yup.string()
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    pagamento: Yup.string()
        .max(200, 'Valor muito grande')
        .required('Campo obrigatório'),
    informacoes: Yup.string()
        .required('Campo obrigatório'),
    avaliacao: Yup.string()
        .required('Campo obrigatório')
})

export default produtoValidator