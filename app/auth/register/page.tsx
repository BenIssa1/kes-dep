import { RegisterForm } from "@/components/auth/register-form"


const RegisterPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#462C71]/60">
            <div className="shadow flex items-center rounded-lg p-2 bg-[#241538]/80">
                <div className="relative hidden bg-[#241538] sm:flex h-[550px] w-[400px] rounded-lg">

                </div>
                <div>
                    <RegisterForm />
                </div>
            </div>
        </div>

    )
}

export default RegisterPage