"use client"

import { useState } from "react"
import Image from "next/image"
import { Footer } from "@/widgets/Footer"
import Link from "next/link"

export default function ContactPage() {
	const [activeTab, setActiveTab] = useState<"contact" | "quote">("contact")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>, type: "contact" | "quote") {
		e.preventDefault()
		setIsSubmitting(true)
		setMessage(null)

		const formEl = e.currentTarget
		const formData = new FormData(formEl)
		const payload: Record<string, string | string[]> = {}
		formData.forEach((value, key) => {
			const existing = payload[key]
			if (existing === undefined) {
				payload[key] = String(value)
			} else if (Array.isArray(existing)) {
				existing.push(String(value))
				payload[key] = existing
			} else {
				payload[key] = [existing, String(value)]
			}
		})

		try {
			const res = await fetch(`/api/${type === "contact" ? "contact" : "quote"}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			})

			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data?.error || "Failed to send. Please try again.")
			}

			setMessage("Sent! We'll get back to you shortly.")
			formEl.reset()
		} catch (err: any) {
			setMessage(err?.message || "Something went wrong. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen  flex flex-col">
			{/* Top Logo */}
			<div className="w-full flex justify-center pt-10 pb-6">
                <Link href="/" >
                <Image src="/logos/7-01.svg" alt="Logo" width={240} height={80} className="w-[200px] md:w-[240px] h-auto" />
                </Link>
			
			</div>

<div className="relative">

<div className=" gradient-04  "/>

			<div className="container  mx-auto px-6  md:px-10 max-w-3xl flex-1 w-full ">

				{/* Tabs */}
				<div className="mx-auto flex items-center   justify-center mb-8 w-full max-w-xl">
					<div className="inline-flex rounded-full border border-white/60   p-1 backdrop-blur">
						<button
							onClick={() => setActiveTab("contact")}
							className={`px-10 py-4 text-sm md:text-base rounded-full transition-colors ${activeTab === "contact" ? "bg-white/90 text-slate-800" : "text-slate-300 hover:text-white"}`}
							aria-pressed={activeTab === "contact"}
						>
							Contact
						</button>
						<button
							onClick={() => setActiveTab("quote")}
							className={`px-5 py-2 text-sm md:text-base rounded-full transition-colors ${activeTab === "quote" ? "bg-white/90 text-slate-800" : "text-slate-300 hover:text-white"}`}
							aria-pressed={activeTab === "quote"}
						>
							Get a Quote
						</button>
					</div>
				</div>

				{/* Forms */}

				<div className="grid gap-8">
					{/* Contact Form */}

					{activeTab === "contact" ? (
						<form onSubmit={(e) => handleSubmit(e, "contact")} className="grid gap-4 bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6">
							<div className="grid gap-2">
								<label htmlFor="name" className="text-sm">Name</label>
								<input id="name" name="name" required placeholder="Jane Doe" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
							</div>
							<div className="grid gap-2">
								<label htmlFor="email" className="text-sm">Email</label>
								<input id="email" name="email" type="email" required placeholder="jane@example.com" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
							</div>
							<div className="grid gap-2">
								<label htmlFor="message" className="text-sm">Message</label>
								<textarea id="message" name="message" required rows={5} placeholder="How can we help?" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
							</div>
							<button type="submit" disabled={isSubmitting}                     className="flex h-20  mt-8 border border-1 rounded-full w-full items-center justify-center px-6 text-xl z-[1] font-medium text-primary-foreground  transition-colors hover:bg-sky-500/10  disabled:pointer-events-none disabled:opacity-50"
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</button>
							{message && <p className="text-sm text-red-300">{message}</p>}
						</form>
					) :
					// Get a Quote Form
					(
						<form onSubmit={(e) => handleSubmit(e, "quote")} className="grid gap-6 bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6">
							{/* 1. Personal Information (required) */}
							<div className="grid gap-4">
								<h2 className="text-lg font-bold">Personal Information</h2>
								<div className="grid gap-2">
									<label htmlFor="fullName" className="text-sm">Full Name *</label>
									<input id="fullName" name="fullName" required placeholder="John Smith" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="grid gap-2">
										<label htmlFor="email2" className="text-sm">Email Address *</label>
										<input id="email2" name="email" type="email" required placeholder="john@example.com" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
									</div>
									<div className="grid gap-2">
										<label htmlFor="phone" className="text-sm">Phone Number / WhatsApp *</label>
										<input id="phone" name="phone" required placeholder="+1 555 123 4567" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
									</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor="preferredContactMethod" className="text-sm">Preferred Contact Method *</label>
									<select id="preferredContactMethod" name="preferredContactMethod" required className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600">
										<option  value="Phone">Phone</option>
										<option value="WhatsApp">WhatsApp</option>
										<option value="Email">Email</option>
									</select>
								</div>
							</div>

							{/* 2. Business Information */}
							<div className="grid gap-4">
								<h2 className="text-lg font-bold">Business Information</h2>
								<div className="grid gap-2">
									<label htmlFor="company" className="text-sm">Business Name</label>
									<input id="company" name="company" placeholder="Acme Inc." className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="grid gap-2">
										<label htmlFor="industry" className="text-sm">Industry / Niche</label>
										<input id="industry" name="industry" placeholder="Restaurant, Real Estate, E-commerce, Coaching, Other" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
									</div>
									<div className="grid gap-2">
										<label htmlFor="website" className="text-sm">Business Website</label>
										<input id="website" name="website" placeholder="https://example.com" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
									</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor="market" className="text-sm">Business Location / Target Market</label>
									<input id="market" name="market" placeholder="Local, Nationwide, International" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
							</div>

							{/* 3. Social Media Presence */}
							<div className="grid gap-4">
								<h2 className="text-lg font-bold">Social Media Presence</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="grid gap-2">
										<label htmlFor="instagram" className="text-sm">Instagram Handle</label>
										<input id="instagram" name="instagram" placeholder="@yourhandle" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
									</div>
									<div className="grid gap-2">
										<label htmlFor="facebook" className="text-sm">Facebook Page Link</label>
										<input id="facebook" name="facebook" placeholder="https://facebook.com/yourpage" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
									</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor="tiktokYoutube" className="text-sm">TikTok / YouTube</label>
									<input id="tiktokYoutube" name="tiktokYoutube" placeholder="Links (optional)" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
								<div className="grid gap-2">
									<label htmlFor="adSpend" className="text-sm">Average Monthly Ad Spend</label>
									<select id="adSpend" name="adSpend" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600">
										<option value="None">None</option>
										<option value="< $500">&lt;$500</option>
										<option value="$500–$2000">$500–$2000</option>
										<option value="> $2000">$2000+</option>
									</select>
								</div>
							</div>

							{/* 4. Goals & Needs */}
							<div className="grid gap-4">
								<h2 className="text-lg font-bold">Goals & Needs</h2>
								<div className="grid gap-2">
									<p className="text-sm">What are your primary goals? (Select all that apply)</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
										<label className="inline-flex items-center gap-2"><input type="checkbox" name="goals" value="More leads" /> More leads</label>
										<label className="inline-flex items-center gap-2"><input type="checkbox" name="goals" value="More sales" /> More sales</label>
										<label className="inline-flex items-center gap-2"><input type="checkbox" name="goals" value="Brand awareness" /> Brand awareness</label>
										<label className="inline-flex items-center gap-2"><input type="checkbox" name="goals" value="Followers growth" /> Followers growth</label>
										<label className="inline-flex items-center gap-2"><input type="checkbox" name="goals" value="Other" /> Other</label>
									</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor="challenge" className="text-sm">Biggest challenge right now?</label>
									<input id="challenge" name="challenge" placeholder="No sales, Weak ads, No consistency, etc." className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
								<div className="grid gap-2">
									<label htmlFor="timeline" className="text-sm">How soon are you planning to invest in marketing?</label>
									<select id="timeline" name="timeline" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600">
										<option value="Immediately">Immediately</option>
										<option value="In 1–3 months">In 1–3 months</option>
										<option value="Just exploring">Just exploring</option>
									</select>
								</div>
							</div>

							{/* 5. Budget / Decision Making */}
							<div className="grid gap-4">
								<h2 className="text-lg  font-bold">Budget / Decision Making</h2>
								<div className="grid gap-2">
									<label htmlFor="estBudget" className="text-sm">Estimated Monthly Budget for Marketing</label>
									<select id="estBudget" name="estBudget" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600">
										<option value="< $500">&lt;$500</option>
										<option value="$500–$1500">$500–$1500</option>
										<option value="$1500–$5000">$1500–$5000</option>
										<option value="> $5000">$5000+</option>
									</select>
								</div>
								<div className="grid gap-2">
									<label htmlFor="decisionMaker" className="text-sm">Who makes marketing decisions in your business?</label>
									<input id="decisionMaker" name="decisionMaker" placeholder="You, Partner, Team, Other" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
							</div>

							{/* 6. Additional Details */}
							<div className="grid gap-4">
								<h2 className="text-lg font-bold">Additional Details</h2>
								<div className="grid gap-2">
									<label htmlFor="hearAbout" className="text-sm">How did you hear about us?</label>
									<select id="hearAbout" name="hearAbout" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600">
										<option value="Referral">Referral</option>
										<option value="Social Media">Social Media</option>
										<option value="Website">Website</option>
										<option value="Agent">Agent</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className="grid gap-2">
									<label htmlFor="moreInfo" className="text-sm">Anything else you’d like us to know?</label>
									<textarea id="moreInfo" name="moreInfo" rows={4} placeholder="Share any relevant context" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600" />
								</div>
								<div className="grid gap-2">
									<label htmlFor="freeAudit" className="text-sm">Are you open to a free audit call with our marketing team?</label>
									<select id="freeAudit" name="freeAudit" className="w-full rounded-md bg-slate-900/30 border border-slate-700/40 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-600">
										<option value="Yes">Yes</option>
										<option value="No">No</option>
									</select>
								</div>
							</div>

							<button type="submit" disabled={isSubmitting} className="flex h-20  mt-2 border border-1 rounded-full w-full items-center justify-center px-6 text-xl z-[1] font-medium text-primary-foreground  transition-colors hover:bg-sky-500/10  disabled:pointer-events-none disabled:opacity-50">
								{isSubmitting ? "Sending..." : "Request Quote"}
							</button>
							{message && <p className="text-sm text-red-300">{message}</p>}
						</form>
					)}
				</div>
			</div>

            </div>


			{/* Footer */}
			<div className="mt-16">
				<Footer />
			</div>
		</div>
	)
}
