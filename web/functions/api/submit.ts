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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
        <img src="https://yrecall.app/yrecall-mark.png" alt="YRecall Logo" width="40" height="40" style="margin-bottom: 24px; display: block;" />
        <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 24px; letter-spacing: -0.01em;">${templateTitle}</h2>
        
        <div style="background: #f7f7f7; padding: 24px; border-radius: 8px; margin-bottom: 32px; font-size: 14px; line-height: 1.5;">
          <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${email}</p>
          ${category ? `<p style="margin: 0 0 12px 0;"><strong>Category/Role:</strong> ${category}</p>` : ''}
          ${portfolio ? `<p style="margin: 0 0 12px 0;"><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
          ${linkedin ? `<p style="margin: 0 0 12px 0;"><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ''}
          <p style="margin: 0 0 12px 0;"><strong>Ref ID:</strong> ${referenceId}</p>
          <p style="margin: 0;"><strong>Submitted:</strong> ${timestamp}</p>
        </div>

        <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #666; margin-bottom: 16px;">Message</h3>
        <div style="font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 40px;">${message}</div>

        ${attachments.length > 0 ? '<p style="font-size: 14px; color: #666; margin-bottom: 40px;">📎 Attachment included with this email.</p>' : ''}
        
        <hr style="border: none; border-top: 1px solid #eaeaea; margin-bottom: 24px;" />
        <p style="font-size: 12px; color: #888; margin: 0;">
          YRecall — Your Life. Just Recall.<br>
          Built by LYFSpot
        </p>
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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
        <img src="https://yrecall.app/yrecall-mark.png" alt="YRecall Logo" width="40" height="40" style="margin-bottom: 32px; display: block;" />
        
        <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 24px; letter-spacing: -0.01em;">We received your message.</h2>
        
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Hi ${name},</p>
        <p style="font-size: 15px; line-height: 1.6; margin-bottom: 32px;">${ackMessage}</p>
        
        <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; font-size: 13px; color: #666; margin-bottom: 40px;">
          <p style="margin: 0 0 8px 0;"><strong>Reference ID:</strong> ${referenceId}</p>
          <p style="margin: 0;"><strong>Subject:</strong> ${category || emailSubject}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eaeaea; margin-bottom: 24px;" />
        <div style="font-size: 12px; color: #888; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;">
            <strong>YRecall</strong><br>
            Your Life. Just Recall.<br>
            Built by LYFSpot
          </p>
          <p style="margin: 0;">
            <a href="https://yrecall.app" style="color: #888; text-decoration: none;">Website</a> · 
            <a href="https://yrecall.app/support" style="color: #888; text-decoration: none;">Support</a> · 
            <a href="https://yrecall.app/legal/privacy" style="color: #888; text-decoration: none;">Privacy</a>
          </p>
        </div>
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
