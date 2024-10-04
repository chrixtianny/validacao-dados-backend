const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Lista com os DDDs válidos que encontrams no Brasil
const dddsValidos = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99];

router.get('/', (req, res) => {
    res.render('form', { errors: [] });
});

// Validações usando o express-validator
router.post('/enviar', [
    check('nomeAluno').notEmpty().withMessage('O nome do aluno é obrigatório.'),
    check('nascimento')
        .notEmpty().withMessage('A data de nascimento é obrigatória.')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('Data de nascimento inválida. Use o formato dd/mm/aaaa.'),
    check('nomeMae').notEmpty().withMessage('O nome da mãe é obrigatório.'),
    check('nomePai').notEmpty().withMessage('O nome do pai é obrigatório.'),
    check('ddd')
    .notEmpty().withMessage('O DDD é obrigatório.')
    .custom(value => dddsValidos.includes(Number.parseInt(value))).withMessage('DDD inválido.'),
    check('telefone').notEmpty().withMessage('O número de telefone é obrigatório.'),
    check('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('E-mail inválido.'),
    check('serie').notEmpty().withMessage('A série é obrigatória.'),
    check('turno').notEmpty().withMessage('O turno é obrigatório.'),
    check('atividades')
        .custom((value) => {
            if (Array.isArray(value) && value.length > 3) {
                throw new Error('Você pode selecionar no máximo 3 atividades extracurriculares.');
            }
            return true;
        })
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('erro', { errors: errors.array() });
    }

    return res.render('resultado', { mensagem: "Formulário enviado com sucesso!" });
});

module.exports = router;
