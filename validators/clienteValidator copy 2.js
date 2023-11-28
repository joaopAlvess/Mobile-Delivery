import * as Yup from 'yup';

const clienteValidator = Yup.object().shape({
    nome: Yup.string()
})

export default clienteValidator;