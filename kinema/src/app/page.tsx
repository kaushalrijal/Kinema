import Image from 'next/image'
import logo from './img/logo.png'

export default function Home() {
  return (
    <main className="">
      <div className='flex w-screen h-16 bg-slate-100 flex-row justify-between px-3 items-center py-auto'>
      <Image
      src={logo}
      alt="kinema logo"
      className={"h-[40px] w-[120px]"}
    />
      <div className="flex justify-between text-black gap-4">
        <span>Home</span>
        <span>Movies</span>
        <span>Shows</span>
        <span>Misc</span>
      </div>
      </div>
      <div>
        <div>Some subtext goes here</div>
        <div>Searchbar goes here</div>
      </div>
    </main>
  )
}
