'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { Swiper as SwiperObject } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './slideshow.css'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductSlideshow: FC<Props> = ({
  images,
  title,
  className = '',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 5000,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2 mb-4'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={1024}
              height={800}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={300}
              height={300}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}