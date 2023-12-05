'use client';
import React from 'react'
import Card from './card';
import walter from '../../../public/brbad.jpg'

const Test = (props) => {
    let elements = props.data
  return (
    <>
    <div>
            {elements.map((item)=>{
            console.log(item.img)
               return (<Card
                Title={item.title}
                Img={item.img}
                Type={item.type}
                Date={item.year}
                RunTime={item.runtime}
                ></Card>);
            })}
    </div>
    </>
  )
}

export default Test