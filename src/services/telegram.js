const axios = require('axios');
const Municipality = require('../models/Municipality'); // ← AGREGAR ESTA LÍNEA

const TOKEN = '8844369879:AAHWnu7rCPgC4VQInXbulMAveMWMnKd5kqI';
const CHAT_ID = '-1003991281670';

async function enviarTelegram(reporte) {

    let nombreMunicipio = 'No especificado';

    if (reporte.id_municipio) {
        try {
            const municipio = await Municipality.findByPk(reporte.id_municipio);
            if (municipio && municipio.nombre) {
                nombreMunicipio = municipio.nombre;
            }
        } catch (error) {
            console.error('Error obteniendo municipio:', error.message);
        }
    }

    const mensaje = `
Desde la localidad de ${nombreMunicipio} se ha reportado un nuevo incidente.

Título: ${reporte.titulo}

Descripción:
${reporte.descripcion}
${reporte.latitud && reporte.longitud ? `Ubicación: https://www.google.com/maps?q=${reporte.latitud},${reporte.longitud}` : 'Ubicación no disponible'}

Dirección:
${reporte.nombreMunicipio ? reporte.nombreMunicipio : 'No especificada'}

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