import React from 'react'
interface ButtonProps {
    title: string,
    textColor: string,
    bgColor?: string,
    hoverBg?: string,
    hoverTextColor?: string
}

const Button = (props:ButtonProps) => {
  return (
    <button className={`bg-${props.bgColor || 'orange-500'} p-2 rounded-lg cursor-pointer hover:bg-${props.hoverBg || 'orange-200'} hover:text-${props.hoverTextColor || 'orange-500'}`}>{props.title}</button>
  )
}

export default Button