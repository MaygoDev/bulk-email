'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'
import Image from "next/image";

export default function SendEmail() {
    const { register, handleSubmit, reset } = useForm()
    const [status, setStatus] = useState<string | null>(null)
    const [progress, setProgress] = useState<number>(0)
    const [currentCount, setCurrentCount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [email, setEmail] = useState<string | null>(null)
    const [from, setFrom] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedEmail = localStorage.getItem('email')
        const storedPassword = localStorage.getItem('password')

        if (!storedEmail || !storedPassword) {
            router.push('/login')
        } else {
            setEmail(storedEmail)
            setFrom(storedEmail)
            setPassword(storedPassword)
        }
    }, [router])

    const onSubmit = async (data: any) => {
        setProgress(0)
        setStatus(null)
        setCurrentCount(0)

        const emailList = data.emails
            .split('\n')
            .map((e: string) => e.trim())
            .filter((e: string) => e.includes('@'))

        setTotalCount(emailList.length)

        for (let i = 0; i < emailList.length; i++) {
            const currentEmail = emailList[i]
            setProgress(((i + 1) / emailList.length) * 100)
            setCurrentCount(i + 1)

            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: data.subject,
                    html: data.html,
                    emails: currentEmail,
                    smtpEmail: email,
                    smtpPassword: password,
                })
            })

            if (!res.ok) {
                const msg = await res.text()
                setStatus(`Une erreur s'est produite lors de l'envoi du mail vers ${currentEmail}: ${msg}`)
                return
            }
        }

        setStatus("Tous les e-mails ont été envoyés.")
        setProgress(100)
        reset()
    }

    return (
        <main className="max-w-2xl mx-auto p-6">
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <Image src={"/logo.png"} alt="Logo" width={400} height={100} className="mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-center">Mailing</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Objet</Label>
                            <Input {...register("subject")} placeholder="Objet" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea {...register("html")} placeholder="Message (HTML supporté)" required className="h-32" />
                        </div>
                        <div className="space-y-2">
                            <Label>Emails</Label>
                            <Textarea {...register("emails")} placeholder="Liste des mails (1 par ligne)" required className="h-32" />
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">Envoyer</Button>
                    </form>

                    {progress > 0 && progress < 100 && (
                        <div>
                            <Progress value={progress} className="mt-4" />
                            <p className="text-sm text-yellow-600">Envoi : {currentCount}/{totalCount}</p>
                        </div>
                    )}

                    {status && <p className="text-sm text-green-700">{status}</p>}
                </CardContent>
            </Card>
        </main>
    )
}
