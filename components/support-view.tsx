"use client"

import { useState } from "react"
import { Send, MessageCircle, Mail, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery. Orders over $99 qualify for free standard shipping.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you are not satisfied with your purchase, you can return it for a full refund. Items must be in their original condition with tags attached.",
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order by visiting the Track Order page and entering your Order ID. You will receive your Order ID via email after placing your order.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Please check the shipping calculator at checkout for details.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us through the contact form below, our live chat, email at support@novashop.com, or call us at 1-800-NOVA-SHOP during business hours (Mon-Fri, 9am-6pm EST).",
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. All transactions are encrypted with 256-bit SSL and processed through PCI-compliant payment gateways. We never store your complete credit card information.",
  },
]

interface ChatMessage {
  id: number
  text: string
  sender: "user" | "bot"
}

export function SupportView() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [chatOpen, setChatOpen] = useState(false)

  function handleContact(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Message sent! We'll get back to you within 24 hours.")
    setContactForm({ name: "", email: "", message: "" })
  }

  function handleChat(e: React.FormEvent) {
    e.preventDefault()
    if (!chatInput.trim()) return
    const userMsg: ChatMessage = { id: Date.now(), text: chatInput, sender: "user" }
    setChatMessages((prev) => [...prev, userMsg])
    setChatInput("")

    // Simple bot response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! Let me look into that for you.",
        "I understand your concern. Our team will follow up shortly.",
        "Great question! You can find more details on our FAQ section above.",
        "I'd be happy to help with that. Can you provide your order ID?",
        "Our shipping typically takes 5-7 business days for standard delivery.",
      ]
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
      }
      setChatMessages((prev) => [...prev, botMsg])
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Help & Support</h1>
      <p className="mt-1 text-muted-foreground">Find answers to your questions or get in touch</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* FAQ Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
              <Mail className="h-4 w-4 text-accent" />
              <span className="text-sm text-card-foreground">support@novashop.com</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
              <Phone className="h-4 w-4 text-accent" />
              <span className="text-sm text-card-foreground">1-800-NOVA-SHOP</span>
            </div>
          </div>

          <form onSubmit={handleContact} className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
            <div>
              <Label htmlFor="support-name">Name</Label>
              <Input
                id="support-name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Your name"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="support-email">Email</Label>
              <Input
                id="support-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="your@email.com"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="support-message">Message</Label>
              <Textarea
                id="support-message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="How can we help?"
                className="mt-1"
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="self-start bg-accent text-accent-foreground hover:bg-accent/90">
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between bg-accent px-4 py-3">
              <span className="text-sm font-semibold text-accent-foreground">Live Chat</span>
              <button
                onClick={() => setChatOpen(false)}
                className="text-accent-foreground/70 hover:text-accent-foreground"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === "bot"
                      ? "self-start bg-muted text-foreground"
                      : "self-end bg-accent text-accent-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleChat} className="flex gap-2 border-t border-border p-3">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 text-sm"
              />
              <Button type="submit" size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
