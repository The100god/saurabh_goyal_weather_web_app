import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
const WeatherIcon = (props) => {
  return (
    <div title={props.iconname} {...props} className={cn("relative h-20 w-20")}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconname?props.iconname:"04d"}@4x.png`}
      />
    </div>
  )
}

export default WeatherIcon
