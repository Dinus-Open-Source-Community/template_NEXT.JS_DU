"use client"

import Image from "next/image"
import BgLogin from "@/../public/assets/bg_login.svg"
import BgText from "@/../public/assets/bg_text.svg"
import logoSumbar from "@/../public/assets/logos/logo_DU.png"
import IconHand from "@/../public/assets/hand_icon.svg"
import TextInput from "@/components/TextInput"
import Button from "@/components/Button"
import Link from "next/link"
import SpinnerLoading from "@/components/SpinnerLoading"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [token, setToken] = useState(null)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setErrorMsg("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('token', data.data.token); // simpan token
      }

      // simpan token di state
      setToken(data.token)

      router.push("/")
    } catch (err) {
      console.error(err)
      setErrorMsg("Terjadi kesalahan server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex flex-col min-h-dvh lg:min-h-screen md:px-32">
      <Image
        src={BgLogin}
        alt="Background Image"
        fill
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="flex max-w-sm lg:max-w-5xl w-full my-auto mx-auto gap-20 lg:ml-auto md:shadow-xl p-6 md:p-12 rounded-2xl bg-white z-10">

        {/* SIDE IMAGE */}
        <div className="h-full w-full relative hidden lg:block">
          <Image src={BgText} alt="bg text" />
          <Image src={IconHand} alt="hand icon" className="absolute bottom-0 -right-24" />
          <div className="absolute top-0 left-0 text-white p-8">
            <span className="font-bold text-6xl">Welcome back!</span>
            <div className="flex flex-col text-sm">
              <span>Kamu kemana aja?</span>
              <span>Ayo bergabung lagi bersama kami</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col w-full my-auto">
          <h1 className="text-3xl font-bold mb-4 text-blue-950">Login</h1>

          <Link href="/" className="w-fit mb-12">
            <div className="flex w-fit items-center gap-2">
              <Image className="w-8" src={logoSumbar} alt="logo sumbar" priority />
              <span className="font-bold">To-Do Doscom University</span>
            </div>
          </Link>

          <div className="flex flex-col gap-4 mb-2">
            <TextInput
              label="Email"
              required
              name="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              type="password"
              label="Password"
              required
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <div className="text-red-600 text-sm mb-3">{errorMsg}</div>
          )}

          <div className="flex gap-0.5 mb-12 text-xs">
            <span>belum memiliki akun?</span>
            <Link href="/register" className="italic font-bold text-blue-900 hover:underline">
              register
            </Link>
          </div>

          <Button
            onClick={handleLogin}
            className={`bg-blue-900 hover:bg-blue-950 ${loading ? "bg-blue-950" : ""} w-full text-center font-bold justify-center`}
          >
            {loading ? <SpinnerLoading /> : "Login"}
          </Button>
        </div>
      </div>
    </main>
  )
}
