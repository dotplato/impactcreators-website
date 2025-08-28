import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { name, email, message } = body || {}

		if (!name || !email || !message) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		const host = process.env.SMTP_HOST
		const port = Number(process.env.SMTP_PORT || 587)
		const user = process.env.SMTP_USER
		const pass = process.env.SMTP_PASS
		const to = process.env.MAIL_TO
		const from = process.env.MAIL_FROM || user

		if (!host || !user || !pass || !to) {
			return NextResponse.json({ error: "Email environment variables are not configured" }, { status: 500 })
		}

		const transporter = nodemailer.createTransport({
			host,
			port,
			secure: port === 465,
			auth: { user, pass },
		})

		const subject = `New Contact Message from ${name}`
		const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

		await transporter.sendMail({ from, to, subject, text })
		return NextResponse.json({ ok: true })
	} catch (err: any) {
		return NextResponse.json({ error: err?.message || "Failed to send" }, { status: 500 })
	}
}
