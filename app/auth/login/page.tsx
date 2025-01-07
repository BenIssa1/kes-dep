import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#462C71]/60">
      <div className="shadow flex items-center rounded-lg p-2 bg-[#241538]/80">
        <div className="relative hidden bg-[#241538] sm:flex h-[500px] w-[400px] rounded-lg">
            {/* <Image
                src='/jpg/assure.jpg' 
                alt="login-bg"
                fill
                className="object-cover"
            /> */}
        </div>
        <div className="">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;