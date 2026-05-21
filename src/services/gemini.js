const OpenAI = require('openai');

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY
});

async function preguntarGemini(mensaje) {

    try {

        const completion = await client.chat.completions.create({

            model: 'deepseek/deepseek-chat',
            max_tokens: 120,
            timeout: 10000,
            messages: [
                {
                    role: 'system',
                    content: `
                    Eres el asistente virtual de YoReporto.

                    Responde:
                  Responde:
                - máximo 3 líneas,
                - claro,
                - corto,
                - profesional,
                - amable,
                - en español.
                    `
                },
                {
                    role: 'user',
                    content: mensaje
                }
            ]

        });

        return completion.choices[0].message.content;

    } catch (error) {

        console.error(error);

        return 'El asistente virtual no está disponible temporalmente.';
    }
}

module.exports = preguntarGemini;