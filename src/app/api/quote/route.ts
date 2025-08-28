import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type QuoteBody = {
	fullName?: string
	email?: string
	phone?: string
	preferredContactMethod?: string
	company?: string
	industry?: string
	website?: string
	market?: string
	instagram?: string
	facebook?: string
	tiktokYoutube?: string
	adSpend?: string
	goals?: string | string[]
	challenge?: string
	timeline?: string
	estBudget?: string
	decisionMaker?: string
	hearAbout?: string
	moreInfo?: string
	freeAudit?: string
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as QuoteBody
		const {
			fullName,
			email,
			phone,
			preferredContactMethod,
			company,
			industry,
			website,
			market,
			instagram,
			facebook,
			tiktokYoutube,
			adSpend,
			goals,
			challenge,
			timeline,
			estBudget,
			decisionMaker,
			hearAbout,
			moreInfo,
			freeAudit,
		} = body || {}

		if (!fullName || !email || !phone || !preferredContactMethod) {
			return NextResponse.json({ error: "Missing required personal information fields" }, { status: 400 })
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

		const subject = `New Quote Request from ${fullName}`
		const goalsList = Array.isArray(goals) ? goals.join(", ") : goals || "-"
		const text = [
			"Personal Information",
			`Full Name: ${fullName}`,
			`Email: ${email}`,
			`Phone/WhatsApp: ${phone}`,
			`Preferred Contact Method: ${preferredContactMethod}`,
			"",
			"Business Information",
			`Business Name: ${company || "-"}`,
			`Industry/Niche: ${industry || "-"}`,
			`Website: ${website || "-"}`,
			`Location/Market: ${market || "-"}`,
			"",
			"Social Media Presence",
			`Instagram: ${instagram || "-"}`,
			`Facebook: ${facebook || "-"}`,
			`TikTok/YouTube: ${tiktokYoutube || "-"}`,
			`Avg Monthly Ad Spend: ${adSpend || "-"}`,
			"",
			"Goals & Needs",
			`Primary Goals: ${goalsList}`,
			`Biggest Challenge: ${challenge || "-"}`,
			`Timeline: ${timeline || "-"}`,
			"",
			"Budget / Decision Making",
			`Estimated Budget: ${estBudget || "-"}`,
			`Decision Maker: ${decisionMaker || "-"}`,
			"",
			"Additional Details",
			`How did you hear about us?: ${hearAbout || "-"}`,
			`More Info: ${moreInfo || "-"}`,
			`Open to Free Audit Call?: ${freeAudit || "-"}`,
		].join("\n")

		await transporter.sendMail({ from, to, subject, text })
		return NextResponse.json({ ok: true })
	} catch (err: any) {
		return NextResponse.json({ error: err?.message || "Failed to send" }, { status: 500 })
	}
}
