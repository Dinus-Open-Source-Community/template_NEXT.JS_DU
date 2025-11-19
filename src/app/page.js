import ButtonSidebar from '@/components/ButtonSidebar'
import ButtonLogout from '@/components/ButtonLogout'
import HeaderDate from '@/components/HeaderDate'

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#F6F7FB]">
      <div className="w-[13%] border-r bg-white max-h-screen p-5 flex flex-col justify-between border-gray-400/30 drop-shadow-2xl">
        <div className="justify-center w-full flex h-fit">
          <p className="font-bold">To Do List</p>
        </div>
        <div className="justify-center w-full flex flex-col h-fit gap-1">
          <ButtonSidebar children={'Activity'} />
          <ButtonSidebar children={'List'} />
          <ButtonSidebar children={'Statistik'} />
          <ButtonSidebar children={'Setting'} />
        </div>
        <div className="justify-center w-full flex h-fit">
          <ButtonLogout children={'Logout'} />
        </div>
      </div>
      <div className="w-[87%] p-10">
        <HeaderDate />

        <div className="mt-20">
          <p className="font-bold text-2xl ml-3 mb-5">Exercise</p>
          <div className="grid grid-rows-1 gap-10">
            <div className="border border-gray-300 drop-shadow-xl h-52 w-xl rounded-3xl bg-white flex flex-col gap-3 p-10 justify-center">
              <p className="font-bold text-xl">Kelas Offline Doscom University</p>
              <p className="text-gray-500">Harus ikut kelas DU, dan ga boleh telat</p>
              <p className="text-blue-500 font-semibold">08:00 - 11:00</p>
            </div>
            <div className="border border-gray-300 drop-shadow-xl h-52 w-xl rounded-3xl bg-white"></div>
            <div className="border border-gray-300 drop-shadow-xl h-52 w-xl rounded-3xl bg-white"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
