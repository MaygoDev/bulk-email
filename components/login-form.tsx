'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            setError("Veuillez entrer un e-mail et un mot de passe !")
            return
        }

        if (!email.endsWith('@anjoumusicfestival.fr')) {
            setError("Seulement les adresses @anjoumusicfestival.fr sont autorisées.")
            return
        }

        localStorage.setItem('email', email)
        localStorage.setItem('password', password)

        router.push('/')
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <Image src={"/logo.png"} alt="Logo" width={400} height={100} className="mx-auto mb-4"/>
                    <CardTitle className="text-2xl">Connexion</CardTitle>
                    <CardDescription>
                        Entrez les informations du mail à utiliser
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="m@anjoumusicfestival.fr"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Mot de passe</Label>
                                </div>
                                <Input id="password"
                                       type="password"
                                       onChange={(e) => setPassword(e.target.value)}
                                       required />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">
                                Se connecter
                            </Button>
                        </div>
                    </form>
                    {error &&
                        <Alert variant="destructive" className={"mt-3"}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    }
                </CardContent>
            </Card>
        </div>
    )
}
