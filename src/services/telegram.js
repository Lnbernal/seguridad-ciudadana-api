const axios = require('axios');

const TOKEN = '8844369879:AAHWnu7rCPgC4VQInXbulMAveMWMnKd5kqI';
const CHAT_ID = '-1003991281670';

async function enviarTelegram(reporte) {

    const mensaje = `
Desde la localidad de ${reporte.direccion} se ha reportado un nuevo incidente.

Título: ${reporte.titulo}

Descripción:
${reporte.descripcion}
${reporte.latitud && reporte.longitud ? `Ubicación: https://www.google.com/maps?q=${reporte.latitud},${reporte.longitud}` : 'Ubicación no disponible'}
Dirección:
${reporte.direccion}

Prioridad:
${reporte.prioridad}

Fecha:
${new Date().toLocaleString()}
`;

    try {

        await axios.post(
            `https://api.telegram.org/bot${TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: mensaje
            }
        );

        console.log('Notificación enviada a Telegram');

    } catch (error) {

        console.error('Error Telegram:', error.message);

    }
}

module.exports = enviarTelegram;