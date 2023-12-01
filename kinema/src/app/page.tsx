import Image from 'next/image'
import logo from './img/logo.png'
import background from './img/collage.jpg'
import Example from './components/hero'

export default function Home() {
  return (
    <main className="">
      <div className='flex w-screen h-16 bg-slate-100 flex-row justify-between px-3 items-center py-auto flex-wrap'>
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
      <Example></Example>
    </main>
  )
}
