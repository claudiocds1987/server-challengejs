const yup = require('yup');
function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
function userLoginValidation(data) {
    const schema = yup.object().shape({
        email: yup.string().email("formato email no valido").required("el campo email es obligatorio"),
        password: yup
            .string()
            .required("El campo password es obligatorio")
            .min(5, "la contraseña es corta")
            .max(15, "la contraseña es muy larga"),
    });
    schema.validateSync(data);
}
function userSignUpValidation(data) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('El formato de email no es valido')
            .required('El email esta vacio'),
        password: yup
            .string()
            .min(5, 'la password es corta')
            .max(15, 'la password es muy larga')
            .required('la password esta vacia'),
        registration_date: yup
            .string()
            .required('registration_date esta vacio'),
    });
    schema.validateSync(data);
}
module.exports = {
    validate,
    userLoginValidation,
    userSignUpValidation,
};
