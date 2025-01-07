'use client'

import * as z from 'zod'

import React, { useTransition, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
} from '@/components/ui/form'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { LoginSchema } from '@/schemas'
import CustomFormField from '@/components/custom-form-field'
import { FormFieldType } from '@/types'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { login } from '@/actions/login'
import { FormError } from '@/components/form-error'
import { LoginDefaultValues } from '@/constants/account-default-values'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: LoginDefaultValues
    })

    const router = useRouter();


    async function onSubmit(values: z.infer<typeof LoginSchema>) {

        setPending(true)

        const { email, password } = values;

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!response?.error) {
                router.push("/");
                router.refresh();
            } else {
                setPending(false)
                setError("Invalid credentials !");
            }

            if (!response.ok) {
                setPending(false)
            }
        } catch (error: any) {
            setPending(false)
            setError('Something went wrong!')
            console.error("Login Failed:", error);
        }
    }

 
    return (
        <CardWrapper
            headerLabel="Content de vous revoir"
            backButtonLabel="Vous n'avez pas encore de compte?"
            backButtonHref="/auth/register"
            showSocial
            className='w-full bg-transparent border-none text-white shadow-none'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6 min-w-[300px]'
                >
                    <div className="space-y-4">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name='email'
                            label='Email'
                            placeholder='johndoe@example.com'
                            className='bg-[#241538]/60 border-none text-white'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name='password'
                            inputType='password'
                            label='Mot de passe'
                            placeholder='******'
                            iconAlt='user icon'
                            className='bg-[#241538]/60 border-none text-white'
                        />
                        <Button
                            size={'sm'}
                            variant={'link'}
                            asChild
                            className='px-0 mt-0 font-normal text-purple-300'
                        >
                            <Link href='/auth/reset'>
                                Mot de passe oublié ?
                            </Link>
                        </Button>

                    </div>

                    <FormError message={error} />

                    <SubmitButton
                        isPending={isPending}
                        loaderLabel='Connexion...'
                    >
                        Se connecter
                    </SubmitButton>
                </form>
            </Form>
        </CardWrapper>
    )
}