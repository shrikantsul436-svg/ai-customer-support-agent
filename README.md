AI Customer Support Agent

An AI-powered customer support agent built with Next.js, TypeScript, Tailwind CSS, LangGraph, and Groq.

The application is designed for e-commerce customer support, especially order and refund requests. Instead of simply generating an answer, the agent checks customer information, order details, refund history, and the official refund policy before taking a refund-related action.

🚀 Live Demo

Vercel Deployment:
https://ai-customer-support-agent-4i0orpeei.vercel.app/

You can open the deployed application here:

Open AI Customer Support Agent

Main routes

/ — Landing page

/chat — Customer support chat

/admin — Admin dashboard

📸 Screenshots

Landing Page



Customer Support Chat — Refund Approved



📌 Project Overview

The AI Customer Support Agent connects customer requests with mock CRM data, order information, refund history, and strict refund policy rules.

The goal is to demonstrate how an AI agent can use business tools and deterministic validation instead of making unsupported decisions.

Example

A customer can say:

I want a refund for ORD1001 because my product arrived damaged.

The agent can:

Identify the customer.

Verify the order.

Check refund history.

Retrieve the refund policy.

Validate refund eligibility.

Process the refund only when the policy allows it.

Explain the result to the customer.

✨ Features

AI-powered customer support chat

Customer lookup

Order lookup

Refund history lookup

Refund policy retrieval

Deterministic refund eligibility checking

Refund processing workflow

Conversation context / multi-turn interaction

Mock CRM data using JSON files

Strict refund policy enforcement

Admin dashboard

Responsive modern UI

Vercel deployment

LangGraph agent workflow

Groq-powered language model

🧠 AI Agent Architecture

The support agent follows a tool-based workflow:

Customer Request
       │
       ▼
   AI Agent
       │
       ├──► Customer Lookup
       │
       ├──► Order Lookup
       │
       ├──► Refund History
       │
       ├──► Refund Policy
       │
       └──► Refund Eligibility
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       Eligible            Not Eligible
          │                   │
          ▼                   ▼
   Process Refund        Explain Reason
          │
          ▼
     Final Response

The agent is built using LangGraph, allowing the model to call tools and continue the workflow based on the tool results.

🔐 Refund Safety Design

Refund requests are not approved using the language model's response alone.

The application uses deterministic business rules to verify:

Customer information

Order information

Delivery date

Refund history

Product type

Refund reason

Refund policy requirements

Previous refund status

A refund is processed only when the eligibility check returns an eligible result.

Important policy examples

Refund requests must be made within 30 days of delivery.

Damaged products can be eligible.

Defective products can be eligible.

Wrong products can be eligible.

Products significantly different from their description can be eligible.

Changed-mind requests are not eligible.

Customer-caused damage is not eligible.

Downloaded digital products are non-refundable.

An order that has already received a completed refund cannot be refunded again.

A refund cannot exceed the amount paid.

Shipping is refundable when the seller is responsible.

🛠️ Technology Stack

Technology

Purpose

Next.js

Full-stack React framework

TypeScript

Type-safe development

Tailwind CSS

UI styling

LangGraph

AI agent workflow

LangChain Core

Messages and tool integration

Groq

LLM inference

Zod

Input and tool validation

JSON

Mock CRM/order/refund data

Vercel

Deployment

📂 Project Structure

ai-customer-support-agent/
│
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── admin/
│   │   └── page.tsx
│   ├── chat/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── src/
│   └── agent/
│       ├── graph.ts
│       └── tools.ts
│
├── data/
│   ├── customers.json
│   ├── orders.json
│   ├── refunds.json
│   └── refund-policy.md
│
├── public/
│
├── .env.local
├── package.json
├── next.config.ts
└── README.md

The root app/ directory is the active Next.js App Router location in the current project. The agent implementation is kept under src/agent/.

🧰 Agent Tools

The LangGraph agent uses the following tools:

get_customer

Retrieves customer information from the mock CRM data.

get_order

Retrieves order information including:

Product

Amount

Delivery date

Product type

Customer ID

Refund status

get_refund_history

Checks whether the customer/order already has a refund.

get_refund_policy

Retrieves the official refund policy document.

check_refund_eligibility

Performs deterministic checks against the refund rules.

process_refund

Processes a refund only when the eligibility checks pass.

🗃️ Mock CRM Data

The project uses JSON files to simulate CRM and e-commerce backend data.

Customers

CUS001 - Rahul Sharma
CUS002 - Priya Patil
CUS003 - Amit Joshi
CUS004 - Sneha Kulkarni
CUS005 - Aditya Deshmukh
...

Example Order

Customer: Rahul Sharma
Customer ID: CUS001

Order ID: ORD1001
Product: Sony WH-1000XM5 Headphones
Amount: ₹29,999
Delivery Date: 2026-09-10
Product Type: Physical
Refund Status: NONE

💬 Example Conversation

Customer:
I want a refund.

Agent:
Sure, I can help with that. Could you please provide the order ID?

Customer:
ORD1001

Agent:
Thank you for providing the details. Could you let me know the reason
you would like to request a refund?

Customer:
The product I received is damaged.

Agent:
Refund Approved

Your refund for order ORD1001 (Sony WH-1000XM5 Headphones) has been
approved for ₹29,999.

The agent can use information from earlier messages in the same conversation, so customers do not need to repeatedly provide information that has already been supplied.

🧪 Example Test Cases

Test Case 1 — Eligible Refund

Customer ID: CUS001
Order ID: ORD1001
Reason: Damaged product

Expected result:

Refund Eligible / Approved

Test Case 2 — Already Refunded

Customer ID: CUS009
Order ID: ORD1009
Reason: Defective product

Expected result:

Refund Denied
Reason: The order already has a completed refund.

Test Case 3 — Downloaded Digital Product

Customer ID: CUS008
Order ID: ORD1008

Expected result:

Refund Denied
Reason: Downloaded digital products are non-refundable.

Test Case 4 — Outside Refund Window

Customer ID: CUS003
Order ID: ORD1003

Expected result:

Refund Denied
Reason: The order is outside the 30-day refund window.

🎨 User Interface

The application includes:

Landing Page

Modern dark interface

AI-focused branding

Responsive layout

Feature highlights

Support agent preview

Navigation to customer support and admin dashboard

Customer Support Chat

Conversational interface

Customer selection

User and agent messages

Loading state

Refund result messages

Responsive design

Admin Dashboard

Provides a view of the application's support and refund operations.

⚙️ Installation

Clone the repository:

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-customer-support-agent

Install dependencies:

npm install

🔑 Environment Variables

Create a .env.local file:

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b

Do not commit .env.local or expose your API key in frontend code.

▶️ Run Locally

Start the development server:

npm run dev

Open:

http://localhost:3000

Customer support:

http://localhost:3000/chat

Admin dashboard:

http://localhost:3000/admin

☁️ Deployment

The project is deployed on Vercel.

Production URL

https://ai-customer-support-agent-4i0orpeei.vercel.app/

For the Vercel deployment, configure the following environment variables in the project settings:

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b

After deployment, verify:

/
 /chat
 /admin

and test a refund workflow using the mock customer/order data.

🔒 Security Notes

API keys must remain server-side.

.env.local should not be committed to GitHub.

Refund approval should always pass through deterministic eligibility validation.

The language model should not be treated as the final source of truth for refund policy.

Mock data is used for demonstration and development purposes.

🚧 Current Limitations

This is a college/portfolio demonstration project and uses mock data.

It does not currently connect to:

A production CRM

A production payment gateway

A real e-commerce order database

A real customer identity system

Refund processing in this project demonstrates the workflow using mock data rather than executing a real financial transaction.

🔮 Future Enhancements

Possible future improvements include:

Real CRM integration

Real order management integration

Authentication and role-based access

Production database

Advanced analytics

Human-agent escalation

Email notifications

Customer authentication

Voice support using the OpenAI Realtime API

More advanced support workflows

🎓 Learning Outcomes

This project demonstrates practical experience with:

Next.js full-stack development

TypeScript

React UI development

Tailwind CSS

AI agents

LangGraph

Tool calling

Structured business workflows

Deterministic validation

API routes

Environment variables

Mock CRM design

Vercel deployment

GitHub-based development

⭐ Project Highlights

The core idea is simple: the AI should check before it acts.

Instead of allowing an AI model to directly approve refunds, the application combines:

AI reasoning
+
Business tools
+
CRM data
+
Refund policy
+
Deterministic validation
=
Safer customer support workflow

📸 Demo Evidence

The repository includes screenshots showing:

The deployed application's landing page.

The customer support conversation.

A successful refund approval workflow for ORD1001.

👨‍💻 Author

Shrikant Sul

AI Customer Support Agent — Next.js + LangGraph + Groq
