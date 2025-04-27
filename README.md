# 📬 Bulk Email Sender App (Next.js)

This application allows you to send bulk emails using a custom SMTP server (SSL on port 465).  
It is ideal for internal communications or small campaigns via a simple Next.js interface.

---

## 🚀 Features

- ✅ Send multiple emails with subject and HTML content
- ✅ Simple UI for pasting email addresses (one per line)
- ✅ Uses a custom SMTP server (SSL, port 465)
- ✅ Easily configurable via `.env.local`

---

## 🛠️ Installation

1. **Clone the repo:**

```
git clone https://github.com/MaygoDev/bulk-email.git
cd bulk-email
```

2. **Install dependencies:**

```
npm install
```

3. **Configure the `.env.local` file:**

```
SMTP_HOST=mail.yourdomain.com
```

4. **Run the development server:**

```
npm run dev
```

---

## ✉️ How to Use

1. Enter the **email subject**.
2. Write the **HTML or plain text content**.
3. Paste the list of email addresses (one per line).
4. Click on **Send Emails**!

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)