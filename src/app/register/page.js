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
import { registerUser } from "@/services/auth"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await registerUser(form)
      router.push("/login")
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || "Register gagal")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative flex flex-col min-h-dvh lg:min-h-screen md:px-32">
      <Image
        src={BgLogin}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="flex max-w-sm lg:max-w-5xl w-full my-auto mx-auto gap-20 lg:ml-auto md:shadow-xl p-6 md:p-12 rounded-2xl bg-white z-10">
        <div className="flex flex-col w-full my-auto">
          <h1 className="text-3xl font-bold mb-4 text-blue-950">Register</h1>

          <Link href={"/"} className="w-fit mb-12">
            <div className="flex w-fit items-center gap-2">
              <Image className="w-8" src={logoSumbar} alt="logo sumbar" priority />
              <span className="font-bold">To-do Doscom University</span>
            </div>
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-2">

              <TextInput
                label={"Name"}
                required
                name="name"
                placeholder={"Chqrety"}
                onChange={handleChange}
              />

              <TextInput
                label={"Email"}
                required
                name="email"
                placeholder={"example@gmail.com"}
                onChange={handleChange}
              />

              <TextInput
                type="password"
                label={"Password"}
                required
                name="password"
                placeholder={"********"}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-0.5 mb-12 text-xs">
              <span>sudah memiliki akun?</span>
              <Link
                href={"/login"}
                className="italic font-bold text-blue-900 hover:underline"
              >
                login
              </Link>
            </div>

            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-950 w-full text-center font-bold justify-center"
            >
              {isLoading ? <SpinnerLoading /> : "Register"}
            </Button>
          </form>
        </div>

        <div className="h-full w-full relative hidden lg:block">
          <Image src={BgText} alt="bg text" />
          <Image
            src={IconHand}
            alt="hand icon"
            className="absolute bottom-0 -left-24 transform scale-x-[-1]"
          />
          <div className="absolute top-0 right-0 text-white p-8 text-right">
            <span className="font-bold text-6xl">Welcome!</span>
            <div className="flex flex-col text-sm">
              <span>Ada yang kepo nih?</span>
              <span>Ayo bergabung bersama kami</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
