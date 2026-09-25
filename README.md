🤖 AI Customer Support Agent

An AI-powered e-commerce customer support agent that verifies customer data, orders, refund history, and business policies before taking refund-related actions.

project URL:https://ai-customer-support-agent-4i0orpeei.vercel.app

✨ Features
🤖 AI-powered customer support
💬 Multi-turn conversational chat
🔎 Customer & order verification
📋 Refund policy validation
🛡️ Safe refund eligibility checks
💰 Refund processing workflow
📊 Admin dashboard
📱 Responsive modern UI
☁️ Deployed on Vercel
🧠 How It Works
Customer Request
       ↓
   AI Agent
       ↓
Customer Verification
       ↓
Order Verification
       ↓
Refund History
       ↓
Refund Policy
       ↓
Eligibility Check
       ↓
 ┌───────────────┐
 │ Eligible?     │
 └───────┬───────┘
      Yes ↓ No
   Process     Explain
    Refund      Reason

The agent does not approve refunds based only on AI-generated responses. Business rules are checked before a refund can be processed.

🛠️ Tech Stack
Technology	Usage
Next.js	Full-stack application
TypeScript	Type-safe development
Tailwind CSS	UI design
LangGraph	AI agent workflow
LangChain	AI/tool integration
Groq	LLM
Zod	Validation
Vercel	Deployment
📂 Project Structure
ai-customer-support-agent/
│
├── app/
│   ├── api/chat/
│   ├── admin/
│   ├── chat/
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
├── docs/
│   └── screenshots/
│
├── package.json
└── README.md
📸 Screenshots
Landing Page

Customer Support

💬 Example

Customer:

I want a refund for ORD1001.
The product I received is damaged.

AI Agent:

Refund Approved

Your refund for ORD1001 has been approved for ₹29,999.

The agent checks the order, refund history, delivery date, product type, reason, and refund policy before approval.

📋 Refund Rules

Refund eligibility includes checks such as:

Within 30 days of delivery
Damaged or defective product
Wrong product received
Digital product downloaded → not eligible
Already refunded → not eligible
Customer-caused damage → not eligible
Changed mind → not eligible
🚀 Run Locally
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-customer-support-agent
npm install

Create .env.local:

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b

Run:

npm run dev

Open:

http://localhost:3000
🌐 Live Application

Vercel:
https://ai-customer-support-agent-4i0orpeei.vercel.app/

Page	URL
🏠 Home	/
💬 Chat	/chat
📊 Admin	/admin
🎓 Project Highlights
<img width="1746" height="922" alt="Screenshot 2026-09-25 110323" src="https://github.com/user-attachments/assets/4e16bbba-9ad7-4de5-8fdd-ea5cf0baa391" />

<img width="1083" height="888" alt="Screenshot 2026-09-25 170814" src="https://github.com/user-attachments/assets/67fa2fba-7c37-4d4c-b59a-daddbb6d54a1" />


This project demonstrates practical implementation of:

AI Agents
LangGraph workflows
Tool calling
Business-rule validation
Customer support automation
Next.js full-stack development
Vercel deployment
👨‍💻 Author

Shrikant Sul

AI Customer Support Agent
Built with Next.js + LangGraph + Groq.
