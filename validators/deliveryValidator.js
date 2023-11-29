import * as Yup from 'yup';

const deliveryValidator = Yup.object().shape({
    nome_empresa: Yup.string()
})

export default deliveryValidator;