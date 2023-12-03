import Image from 'next/image'
import React from 'react'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const Card = (props) => {
  return (
    <div className='bg-slate-100 h-md w-56 rounded-md m-2 p-1.5 flex shadow-md flex-col gap-1 shadow-black group text-black'>
      <Image src={props.Img} alt='labalaba' width={196} height={196} className='w-fit h-auto rounded-md'></Image>
      <strong className=''>{props.Title}</strong>
      <div className='flex justify-between m-0'>
      <span>{props.Date}</span>
      <span className='border p-0.5 rounded-md'>{props.Type}</span>
      <span>{props.RunTime}</span>
      </div>
      <div className='hidden absolute h-[312px] w-[212px] mx-0 bg-gray-900/70 items-center justify-center group-hover:flex rounded-md'>
          <PlayCircleFilledIcon sx={{ color: [`#ffffff`]}} className='w-[48px] h-[48px]'></PlayCircleFilledIcon>
      </div>
    </div>
  )
}

export default Card