"use client"
import { useAuth } from "@/app/context/auth-content";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
 
  async function handleSubmit(formData: FormData) {
    try {
      await login(
        formData.get("email") as string,
        formData.get("password") as string,
      );
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);
    }
  }
  return (
    <div className="bg-[#060309] text-[#f5b461]  flex justify-center gap-4 p-4 rounded-lg shadow-sm w-125 h-100 px-20 pb-15 mt-20">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold tracking-tight leading-tight">
          Login
        </h1>
        <form
          action={handleSubmit}
          className="flex flex-col items-start space-y-4 mx-auto"
        >
          <label className="text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            type="email"
            placeholder="Email..."
          />
          <label className="text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring"
            type="password"
            placeholder="Password..."
          />
          <input
            className="w-full mt-8 px-4 py-2 rounded-md font-medium bg-[#424e5a] text-white cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}
