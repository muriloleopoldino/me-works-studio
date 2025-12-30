import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { record } = await req.json();

    if (!record) {
      throw new Error('No record data provided');
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; background: #f5f5f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00A6FB 0%, #0582CA 100%); padding: 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
            .content { padding: 30px; }
            .badge { display: inline-block; background: #00A6FB; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
            .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #00A6FB; border-radius: 4px; }
            .field-label { font-weight: 600; color: #0582CA; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
            .field-value { color: #1a1a1a; font-size: 15px; word-wrap: break-word; }
            .message-box { background: #fff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 10px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
            .cta-button { display: inline-block; background: #00A6FB; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Novo Lead Recebido!</h1>
            </div>
            <div class="content">
              <span class="badge">NOVO CONTATO</span>
              
              <div class="field">
                <div class="field-label">👤 Nome</div>
                <div class="field-value">${record.name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 E-mail</div>
                <div class="field-value"><a href="mailto:${record.email}" style="color: #00A6FB; text-decoration: none;">${record.email}</a></div>
              </div>
              
              <div class="field">
                <div class="field-label">📱 Telefone</div>
                <div class="field-value">${record.phone || 'Não informado'}</div>
              </div>
              
              <div class="field">
                <div class="field-label">🎨 Tipo de Projeto</div>
                <div class="field-value">${record.project_type}</div>
              </div>
              
              <div class="field">
                <div class="field-label">💬 Mensagem</div>
                <div class="message-box">${record.message}</div>
              </div>
              
              <div style="text-align: center;">
                <p style="color: #6b7280; margin: 20px 0 10px;">Acesse o painel administrativo para gerenciar este lead:</p>
                <a href="${Deno.env.get('SITE_URL') || 'https://emttech.com.br'}/admin" class="cta-button">Acessar Painel Admin</a>
              </div>
            </div>
            <div class="footer">
              <p>Recebido em ${new Date(record.created_at).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}</p>
              <p>EMT Tech - Tecnologia, Marketing e Vendas</p>
            </div>
          </div>
        </body>
      </html>
    `;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EMT Tech <noreply@emttech.com.br>',
        to: ['agenciaemt@gmail.com'],
        subject: `🚀 Novo Lead: ${record.name} - ${record.project_type}`,
        html: emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      throw new Error(data.message || 'Failed to send email');
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});