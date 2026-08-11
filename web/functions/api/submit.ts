import { Resend } from 'resend';

export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing email API key.' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const category = formData.get('category') as string;
    const portfolio = formData.get('portfolio') as string;
    const linkedin = formData.get('linkedin') as string;
    const attachment = formData.get('attachment') as File | null;

    if (!type || !name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Setup routing based on type
    let targetEmail = '';
    let senderEmail = '';
    let emailSubject = '';
    let templateTitle = '';

    switch (type) {
      case 'careers':
        targetEmail = 'careers@yrecall.app';
        senderEmail = 'YRecall Careers <careers@yrecall.app>';
        emailSubject = `Career Introduction: ${name}`;
        templateTitle = 'New Career Application';
        break;
      case 'bug':
        targetEmail = 'report@yrecall.app';
        senderEmail = 'YRecall Bug Reports <report@yrecall.app>';
        emailSubject = `Bug Report: ${category} - ${name}`;
        templateTitle = 'New Bug Report';
        break;
      case 'contact':
        targetEmail = 'contact@yrecall.app';
        senderEmail = 'YRecall Contact Desk <contact@yrecall.app>';
        emailSubject = `Contact Request: ${category} - ${name}`;
        templateTitle = 'New Contact Request';
        break;
      case 'support':
        targetEmail = 'support@yrecall.app';
        senderEmail = 'YRecall Support <support@yrecall.app>';
        emailSubject = `Support Request: ${category} - ${name}`;
        templateTitle = 'New Support Request';
        break;
      case 'privacy':
        targetEmail = 'privacy@yrecall.app';
        senderEmail = 'YRecall Privacy Desk <privacy@yrecall.app>';
        emailSubject = `Privacy Request: ${name}`;
        templateTitle = 'New Privacy Request';
        break;
      default:
        targetEmail = 'hello@yrecall.app';
        senderEmail = 'YRecall <hello@yrecall.app>';
        emailSubject = `Message from ${name}`;
        templateTitle = 'New Message';
    }

    const timestamp = new Date().toISOString();
    const referenceId = `YR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Handle attachment
    const attachments = [];
    if (attachment && attachment.size > 0) {
      if (attachment.size > 10 * 1024 * 1024) {
        return new Response(JSON.stringify({ error: 'Attachment exceeds 10MB limit' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' } 
        });
      }
      const buffer = await attachment.arrayBuffer();
      attachments.push({
        filename: attachment.name,
        content: Buffer.from(buffer)
      });
    }

    // 1. Send to Company
    const companyHtml = `
      <div style="background-color: #fff8f1; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); overflow: hidden;">
          <tr>
            <td style="padding: 40px; border-bottom: 2px solid #a3f69c;">
              <img src="https://yrecall.app/yrecall-mark.png" alt="YRecall Logo" width="40" height="40" style="display: block; margin-bottom: 24px;" />
              <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #111111; letter-spacing: -0.5px;">${templateTitle}</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr><td style="padding-bottom: 8px;"><strong style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Sender Details</strong></td></tr>
                <tr><td style="padding: 16px; background-color: #f9f9f9; border-radius: 8px;">
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #111111;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #111111;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #111111;">${email}</a></p>
                  ${category ? `<p style="margin: 0 0 8px 0; font-size: 15px; color: #111111;"><strong>Category:</strong> ${category}</p>` : ''}
                  ${portfolio ? `<p style="margin: 0 0 8px 0; font-size: 15px; color: #111111;"><strong>Portfolio:</strong> <a href="${portfolio}" style="color: #111111;">${portfolio}</a></p>` : ''}
                  ${linkedin ? `<p style="margin: 0 0 8px 0; font-size: 15px; color: #111111;"><strong>LinkedIn:</strong> <a href="${linkedin}" style="color: #111111;">${linkedin}</a></p>` : ''}
                </td></tr>
              </table>
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr><td style="padding-bottom: 8px;"><strong style="color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong></td></tr>
                <tr><td style="padding: 24px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #111111; white-space: pre-wrap;">${message}</td></tr>
              </table>

              ${attachments.length > 0 ? `<p style="margin: 0 0 32px 0; font-size: 14px; color: #666666;">📎 Attachment included with this email.</p>` : ''}
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr><td style="padding-top: 24px; border-top: 1px solid #eaeaea;">
                  <p style="margin: 0 0 4px 0; font-size: 13px; color: #888888;"><strong>Ref ID:</strong> ${referenceId}</p>
                  <p style="margin: 0; font-size: 13px; color: #888888;"><strong>Time:</strong> ${timestamp}</p>
                </td></tr>
              </table>
            </td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
          <p style="font-size: 12px; color: #888888; margin: 0; line-height: 1.5;">YRecall Internal System<br>Built by LYFSpot</p>
        </div>
      </div>
    `;

    const companyResponse = await resend.emails.send({
      from: senderEmail,
      to: targetEmail,
      replyTo: email,
      subject: emailSubject,
      html: companyHtml,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    if (companyResponse.error) {
      console.error('Resend Company Error:', companyResponse.error);
      throw new Error(companyResponse.error.message);
    }

    // 2. Send Acknowledgement to User
    let ackMessage = '';
    if (type === 'careers') {
      ackMessage = 'Thank you for your introduction. Your application is in the right place, and our team will take a considered look at your materials. We will reach out if there is a strong alignment with our current needs.';
    } else if (type === 'bug') {
      ackMessage = 'Thank you for helping us make YRecall more dependable. We have received your bug report and our team will review the details to address the issue.';
    } else {
      ackMessage = 'We have received your message and will review it shortly. A member of our team will be in touch if a response is needed. We usually reply within 2 business days.';
    }

    const userHtml = `
      <div style="background-color: #fff8f1; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); overflow: hidden;">
          <tr>
            <td style="padding: 40px; text-align: center; border-bottom: 1px solid #eaeaea;">
              <img src="https://yrecall.app/yrecall-mark.png" alt="YRecall Logo" width="48" height="48" style="display: inline-block; margin-bottom: 24px;" />
              <h2 style="margin: 0; font-size: 22px; font-weight: 500; color: #111111; letter-spacing: -0.5px;">We received your message.</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #111111;">Hi ${name},</p>
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #444444;">${ackMessage}</p>
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; border-left: 4px solid #a3f69c;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #111111;"><strong>Reference ID:</strong> ${referenceId}</p>
                    <p style="margin: 0; font-size: 14px; color: #111111;"><strong>Subject:</strong> ${category || emailSubject}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px; background-color: #fafafa; border-top: 1px solid #eaeaea; text-align: center;">
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #111111; font-weight: 600;">YRecall by LYFSpot</p>
              <p style="margin: 0; font-size: 13px;">
                <a href="https://yrecall.app" style="color: #666666; text-decoration: none; margin: 0 8px;">Website</a> &middot;
                <a href="https://yrecall.app/support" style="color: #666666; text-decoration: none; margin: 0 8px;">Support</a> &middot;
                <a href="https://yrecall.app/legal/privacy" style="color: #666666; text-decoration: none; margin: 0 8px;">Privacy</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;

    const userResponse = await resend.emails.send({
      from: senderEmail,
      to: email,
      subject: `Received: ${emailSubject}`,
      html: userHtml
    });

    if (userResponse.error) {
      console.error('Resend User Error:', userResponse.error);
      // We don't fail the request if the ack fails, but we log it
    }

    return new Response(JSON.stringify({ success: true, referenceId }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error while sending email.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
