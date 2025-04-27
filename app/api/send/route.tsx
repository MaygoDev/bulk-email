// app/api/send/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    const { subject, html, emails, smtpEmail, smtpPassword } = await req.json()

    // Vérifie que l'adresse est bien @anjoumusicfestival.fr
    if (!smtpEmail || !smtpEmail.endsWith('@anjoumusicfestival.fr')) {
        return new NextResponse("Unauthorized email domain. Only @anjoumusicfestival.fr allowed.", { status: 403 })
    }

    const emailList = emails
        .split('\n')
        .map((e: string) => e.trim())
        .filter((e: string) => e.includes('@'))

    if (!emailList.length) {
        return new NextResponse("No valid emails", { status: 400 })
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: smtpEmail,
            pass: smtpPassword,
        },
    })

    let count = 1
    const total = emailList.length

    for (const to of emailList) {
        try {
            console.log(`Sending ${count}/${total} to ${to}`)
            await transporter.sendMail({
                from: smtpEmail,
                to,
                subject,
                html,
            })
        } catch (err) {
            console.error(`Error sending to ${to}:`, err)
        } finally {
            count++
        }
    }

    return NextResponse.json({ success: true })
}
