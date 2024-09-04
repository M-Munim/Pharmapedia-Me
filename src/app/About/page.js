"use client"

import Form from '@/components/Form'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  const scrollToSchools = () => {
    document.getElementById('drop').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <main>
      <section className="flex justify-center items-center h-[597px] overflow-hidden relative z-30" style={{
        background: "radial-gradient(circle, #57A8D1, #2980B9)"
      }}>
        <div className="text-white w-11/12 lg:w-3/6 text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-6xl font-light">About us</h1>
          <p className="leading-6 md:leading-7 md:text-xl text-lg">Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.</p>
        </div>
        <Image src="/DownBtn.svg" alt="Scroll down button" width={40} height={40} className='absolute bottom-10 cursor-pointer z-50' onClick={scrollToSchools} />

        <div className="md:w-60 md:h-60 w-40 h-40 border-1 rounded-full border-white opacity-25 absolute md:-bottom-20 md:-left-44 -bottom-10 -left-20 z-10" aria-hidden="true"></div>
        <div className="md:w-[350px] md:h-[350px] w-[320px] h-[320px] border-1 rounded-full border-white opacity-25 absolute md:-bottom-24 md:-left-48 -bottom-24 -left-44 z-10"></div>
        <div className="md:w-[493px] md:h-[493px] w-[463px] h-[463px] border-1 rounded-full border-white opacity-25 absolute -bottom-28 -left-56 z-10"></div>
        <div className="md:w-[606px] md:h-[606px] w-[573px] h-[573px] border-1 rounded-full border-white opacity-25 absolute -bottom-32 -left-60 z-10"></div>

        <div className="md:w-80 md:h-80 border-1 rounded-full border-white opacity-25 absolute -top-40 right-10 z-10 hidden md:block"></div>
        <div className="md:w-[452px] md:h-[452px] border-1 rounded-full border-white opacity-25 absolute -top-48 -right-12 z-10 hidden md:block"></div>
        <div className="md:w-[637px] md:h-[637px] border-1 rounded-full border-white opacity-25 absolute -top-60 -right-36 z-10 hidden lg:block"></div>
        <div className="md:w-[783px] md:h-[783px] border-1 rounded-full border-white opacity-25 absolute -top-64 -right-56 z-10 hidden lg:block"></div>
      </section>

      <section className="w-10/12 m-auto my-14">
        <div className="flex items-center justify-center flex-col md:flex-row">
          <div className="left w-11/12 md:w-1/2 flex flex-col gap-4">
            <h2 className="uppercase font-light text-4xl md:text-5xl text-heading_blue tracking-wider">Our Mission</h2>
            <p className="text-sm md:text-xl text-t_grey">Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.</p>
            <button className="button-filled">
              Explore More
            </button>
          </div>
          <div className="right w-11/12 md:w-1/2">
            <Image src="/AboutImg1.svg" alt="Img" width={530} height={620} loading='lazy' />
          </div>
        </div>
      </section>

      <section className="w-10/12 m-auto bg-cover bg-center md:h-[429px] h-[1350px] rounded-xl relative mb-10" id='drop'
        style={{ backgroundImage: "url('./productsBg.svg')" }} >
        <h2 className="text-xl md:text-4xl text-white font-light tracking-wider uppercase text-center pt-14">Learn More About us</h2>

        <div className="pt-3">
          <div className="flex flex-col md:flex-row items-center justify-between absolute w-full">
            <Image src="/aboutProduct3.svg" alt="Our-Mission" className='xl:w-[415px] lg:w-[405px] md:w-[315px] w-[415px]' width={100} height={526} loading='lazy' />
            <Image src="/aboutProduct2.svg" alt="Our-Mission" className='xl:w-[415px] lg:w-[405px] md:w-[315px] w-[415px]' width={100} height={526} loading='lazy' />
            <Image src="/aboutProduct1.svg" alt="Our-Mission" className='xl:w-[415px] lg:w-[405px] xl:block md:hidden  md:w-[315px] w-[415px]' width={100} height={526} loading='lazy' />
          </div>
        </div>
      </section>

      <section className='mt-64' style={{
        background: "linear-gradient(to bottom, #926B80, #936B80, #9C758A, #A88196, #B891A6, #DAB3C8, #E8C1D6 ,#F0C9DE ,#F2CBE0, #EEC7DC, #EAC5D8)"
      }}>
        <div className="flex flex-col md:flex-row items-center justify-between w-11/12 md:w-10/12 m-auto h-[548px]">
          <div className="left w-full md:w-1/2 mt-10 md:mt-0 flex flex-col pl-2">
            <h2 className="uppercase font-light text-4xl md:text-5xl text-white tracking-wider">Vision</h2>
            <p className="text-sm md:text-xl text-white">Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.</p>
            <button className="button-filled">
              Explore More
            </button>
          </div>
          <div className="right w-full md:w-1/2">
            <Image src="/aboutVision.png" alt="Our Mission" width={850} height={620} className='ms-auto' loading='lazy' />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="m-auto overflow-hidden relative" id='contact' >
        <div className="w-10/12 m-auto flex flex-col-reverse md:flex-row items-center justify-center gap-20 relative py-20">
          <div className="left w-full md:w-1/2 relative z-30">
            <Form />
          </div>

          <div className="right w-full md:w-1/2 relative z-30">
            <div className="flex flex-col gap-4">
              <h2 className="uppercase font-light text-4xl lg:text-5xl text-heading_blue tracking-wider">Get in Touch</h2>

              <p className="text-sm md:text-base lg:text-xl text-t_grey">Lorem ipsum dolor sit amet consectetur. Eu egestas libero viverra vulputate amet nunc lectus non ac. Arcu diam nullam ultrices consectetur. Gravida enim in sagittis mauris aliquam duis.</p>

              <button className="button-filled">
                Contact us
              </button>
            </div>
          </div>
        </div>

        <div className="w-96 h-96 border-2 rounded-full border-grey absolute -bottom-60 -right-36  z-10"></div>
        <div className="border-2 rounded-full border-grey  absolute -bottom-60 -right-36 z-10" style={{ width: '456px', height: '456px' }}></div>
        <div className="border-2 rounded-full border-grey opacity-65 absolute -bottom-60 -right-36 z-10" style={{ width: '526px', height: '526px' }}></div>
        <div className="border-2 rounded-full border-grey opacity-65 absolute -bottom-60 -right-36 z-10" style={{ width: '599px', height: '599px' }}></div>

        <Image src='/Ellipse 45.svg' width={116} height={116} alt="Ellipse Image" className='absolute top-1/3 right-0' />
      </section>
    </main >
  )
}

export default Page