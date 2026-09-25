# 🤖 AI Customer Support Agent

An AI-powered customer support application built with **Next.js, TypeScript, Tailwind CSS, LangGraph, LangChain, and Groq**.

The application simulates an e-commerce customer support system where an AI agent can understand customer requests, retrieve customer and order information, check refund history, follow a predefined refund policy, determine refund eligibility, and process eligible refund requests.

---

## 📌 Overview

Customer support often requires agents to perform several repetitive tasks before resolving a request.

For example, when a customer asks for a refund, a support agent may need to:

1. Identify the customer
2. Verify the order
3. Check the order details
4. Check previous refund history
5. Review the refund policy
6. Understand the customer's refund reason
7. Determine whether the request is eligible
8. Process the refund
9. Explain the result to the customer

This project automates this workflow using an **AI agent powered by LangGraph and Groq**.

The AI is not allowed to simply approve a refund based on its own response. Instead, it uses dedicated tools and deterministic business rules to verify the request before processing it.

---

# ✨ Features

### 💬 Natural Language Customer Support

Customers can interact with the support agent using normal conversational language.

Example:

```text
I want a refund
