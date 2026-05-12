const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({
                message: 'Token requerido'
            });

        }

        const cleanToken = token.replace('Bearer ', '');

        const decoded = jwt.verify(
            cleanToken,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Token inválido'
        });

    }

};

module.exports = authMiddleware;