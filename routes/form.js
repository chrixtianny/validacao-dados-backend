const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('form', { errors: [] });
});

// Validações usando express-validator
router.post('/enviar', [
    check('nomeAluno').notEmpty().withMessage('O nome do aluno é obrigatório.'),
    check('nascimento')
        .notEmpty().withMessage('A data de nascimento é obrigatória.')
        .isDate({ format: 'DD/MM/YYYY' }).withMessage('Data de nascimento inválida. Use o formato dd/mm/aaaa.'),
    check('nomeMae').notEmpty().withMessage('O nome da mãe é obrigatório.'),
    check('nomePai').notEmpty().withMessage('O nome do pai é obrigatório.'),
    check('ddd')
        .notEmpty().withMessage('O DDD é obrigatório.')
        .isInt({ min: 11, max: 99 }).withMessage('DDD inválido.'),
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
