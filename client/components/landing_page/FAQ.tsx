"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>("free-trial");

  const tabs = [
    { id: "general", label: "General" },
    { id: "attendees", label: "For Attendees" },
    { id: "organizers", label: "For Organizers" },
    { id: "payments", label: "Payments" },
  ];

  const faqs: Record<
    string,
    Array<{ id: string; question: string; answer: string }>
  > = {
    general: [
      {
        id: "free-trial",
        question: "Is the platform free to use?",
        answer:
          "Yes! Our platform is completely free for both attendees and event organizers. Create unlimited events, sell tickets, and access all features at no cost. We only charge a small transaction fee on ticket sales to cover payment processing.",
      },
      {
        id: "account-types",
        question: "What types of accounts do you offer?",
        answer:
          "We offer two account types: Attendee accounts for discovering and booking events, and Organizer accounts for creating and managing events. You can easily switch between both roles with a single account.",
      },
      {
        id: "support",
        question: "How does customer support work?",
        answer:
          "We provide email support for all users. Our support team typically responds within 24 hours. Check our Help Center and FAQ section for instant answers to common questions.",
      },
      {
        id: "tutorials",
        question: "Do you provide tutorials?",
        answer:
          "Yes! We have comprehensive video tutorials, step-by-step guides, and a knowledge base covering everything from creating your first event to advanced analytics. Visit our Learning Center to get started.",
      },
    ],
    attendees: [
      {
        id: "booking-process",
        question: "How do I book tickets?",
        answer:
          "Browse events by category or location, select your event, choose your ticket type, and complete payment via Stripe or Paystack. You'll receive your QR code ticket instantly via email.",
      },
      {
        id: "ticket-delivery",
        question: "When will I receive my tickets?",
        answer:
          "Your digital tickets with QR codes are sent immediately after payment confirmation. Check your email inbox and spam folder. You can also access your tickets anytime from your account dashboard.",
      },
      {
        id: "refund-policy",
        question: "What is your refund policy?",
        answer:
          "Refund policies are set by individual event organizers. Most events offer full refunds up to 7 days before the event date. Check the specific event page for detailed refund terms before booking.",
      },
      {
        id: "ticket-transfer",
        question: "Can I transfer my ticket to someone else?",
        answer:
          "Yes, tickets can be transferred to another person directly from your account. Go to \"My Tickets\", select the ticket you want to transfer, and enter the recipient's email address. They'll receive a new QR code.",
      },
      {
        id: "event-changes",
        question: "What if an event is cancelled or rescheduled?",
        answer:
          "You'll be notified immediately via email and SMS. For cancellations, you'll receive an automatic full refund within 5-7 business days. For rescheduled events, your ticket remains valid for the new date.",
      },
    ],
    organizers: [
      {
        id: "create-event",
        question: "How quickly can I create an event?",
        answer:
          "You can create a fully functional event in under 10 minutes. Add event details, set up ticket types with pricing tiers, configure schedules, and publish. Your event goes live immediately after review.",
      },
      {
        id: "ticket-types",
        question: "Can I create multiple ticket types?",
        answer:
          "Yes! Create unlimited ticket types including Early Bird, VIP, General Admission, Group packages, and more. Set different prices, availability windows, and quantity limits for each tier.",
      },
      {
        id: "analytics",
        question: "What analytics do you provide?",
        answer:
          "Track real-time ticket sales, revenue metrics, attendee demographics, traffic sources, and conversion rates. Export detailed reports and visualize trends with our comprehensive dashboard.",
      },
      {
        id: "check-in",
        question: "How does event check-in work?",
        answer:
          "Download our mobile scanner app or use the web-based scanner. Scan attendee QR codes at the entrance for instant validation. The system prevents duplicate entries and works offline.",
      },
      {
        id: "payout",
        question: "When do I receive payouts?",
        answer:
          "Payouts are processed within 2-3 business days after your event ends. You can track pending and completed payouts in your dashboard. We support direct bank transfers and PayPal.",
      },
    ],
    payments: [
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit/debit cards, mobile money, and bank transfers through Stripe and Paystack. Payments are secure, encrypted, and PCI-compliant.",
      },
      {
        id: "fees",
        question: "What are your fees?",
        answer:
          "We charge a small service fee per ticket sold (typically 2.5% + ₦100 per transaction). Payment processing fees from Stripe/Paystack apply separately. You can pass fees to attendees or absorb them yourself.",
      },
      {
        id: "pricing-change",
        question: "Can I change my pricing later?",
        answer:
          "Yes, organizers can update ticket prices anytime before the event. However, already purchased tickets maintain their original price. We recommend setting Early Bird pricing for best results.",
      },
      {
        id: "invoicing",
        question: "Can I add additional information to invoices?",
        answer:
          "Yes, you can customize invoices with your company logo, tax information, terms & conditions, and additional notes. Attendees receive detailed invoices automatically after each purchase.",
      },
      {
        id: "currency",
        question: "What currencies do you support?",
        answer:
          "We support multiple currencies including NGN, USD, GBP, EUR, and more. Currency is automatically set based on your location, but organizers can specify their preferred currency for each event.",
      },
    ],
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl  font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h1>
          <p className="text-gray-600 text-lg">
            These are the most commonly asked questions about our platform.
            <br />
            Can't find what you're looking for?{" "}
            <a
              href="#contact"
              className="text-[#FF5722] hover:underline font-medium"
            >
              Chat to our friendly team!
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenQuestion(null);
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {faqs[activeTab].map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-md"
            >
              <button
                onClick={() => toggleQuestion(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-600 text-sm">?</span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform shrink-0 mt-1 ${
                    openQuestion === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openQuestion === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pl-[72px]">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="border border-[#FF5722]/50 rounded-2xl p-8 ">
            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
            <p className="mb-6 ">
              Can't find the answer you're looking for? Our support team is here
              to help.
            </p>
            <button className="bg-[#FF5722] text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
