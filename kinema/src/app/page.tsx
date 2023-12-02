import Image from 'next/image'
import logo from './img/logo.png'
import background from '../../public/collage.jpg'
import walter from '../../public/brbad.jpg'
import Hero from './components/hero'
import Card from './components/card'

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      <div className='flex w-screen h-16 bg-slate-100 flex-row justify-between px-8 items-center py-auto flex-wrap'>
      <Image
      src={logo}
      alt="kinema logo"
      className={"h-[40px] w-[120px]"}
    />
      <div className="flex justify-between text-black gap-4">
        <a>Home</a>
        <a>Movies</a>
        <a>Shows</a>
        <a>Misc</a>
      </div>
      </div>
      <Hero image={background}></Hero>
      <Card Title="Breaking Bad" Img={walter} Type="HD" Date="2023" RunTime="196m"></Card>

    </main>
  )
}
