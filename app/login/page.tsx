// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {LoginForm} from "@/components/login-form";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Both email and password are required!")
            return
        }

        // Save email and password in localStorage/sessionStorage for later use
        // (Alternatively, you can use Context API or a more secure solution)
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)

        // Redirect to the email sending page
        router.push('/send')
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
