'use client'

import Image from 'next/image'
import { FC } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './slideshow.css'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductMobileSlideshow: FC<Props> = ({
  images,
  title,
  className = '',
}) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px',
        }}
        autoplay={{
          delay: 5000,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2 mb-4'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
