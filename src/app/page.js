"use client"
import Image from 'next/image';
import { products } from './data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { FaStar } from "react-icons/fa";
import Link from 'next/link';
import { useState } from 'react';
import Form from '@/components/Form';

export default function Home() {
  return (
    <main className=''>
      <section className="relative py-20 md:pb-36">
        <div className="w-10/12 mx-auto relative flex justify-center items-center flex-col overflow-hidden">
          <div className="text-center flex justify-center items-center flex-col gap-4 max-w-3xl relative z-30">
            <h1 className="font-light text-5xl md:text-6xl text-heading_blue tracking-wide">Pharmapedia</h1>
            <p className="text-t_grey text-sm md:text-xl px-1 md:px-4">
              Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.
            </p>
            <div>
              <Link href="/About" >
                <button className="button-filled">
                  About us
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full mt-10 md:mt-0 relative z-10">
            <Image src='/MainImg.svg' width={1728} height={698} layout="responsive" alt="Pharmapedia" />
          </div>

          <div className="w-[1199px] h-[1199px] border-1 rounded-full border-grey opacity-65 absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        </div>
        <Image src='/Ellipse 42.svg' width={116} height={116} alt="Ellipse" className='absolute -bottom-10 left-0 z-50' />
      </section>

      <section className="w-full mx-auto h-96 relative my-28" style={{
        background: "linear-gradient(#57A8D1, #2980B9)"
      }}>
        <div className="left w-1/2 xl:flex justify-center items-center left-16 absolute -top-12 z-50 hidden">
          <div className="circle bg-white rounded-full flex justify-center items-center relative overflow-visible" style={{ width: '500px', height: '500px' }}>
            <Image
              src="/Group1000011108.svg"
              width={100}
              height={624}
              className='xl:w-[304px] w-[260px]'
              alt="Illustration of Pharmapedia"
              priority
            />
          </div>
        </div>

        <div className="overflow-hidden relative h-96 md:mt-20">
          <div className="w-10/12 mx-auto flex justify-center xl:justify-end items-center h-full z-20 relative">
            <div className="right w-full xl:w-1/2 text-white flex flex-col justify-center items-start gap-6">
              <h2 className="font-light text-4xl md:text-5xl uppercase tracking-wide">About us</h2>
              <p className="text-sm md:text-lg">
                Lorem ipsum dolor sit amet consectetur. Eu egestas libero viverra
                vulputate amet nunc lectus non ac. Arcu diam nullam ultrices
                consectetur. Gravida enim in sagittis mauris aliquam duis.
              </p>
              <button className="button-filled" >
                <a href="#PRODUCTS">Learn More</a>
              </button>
            </div>
          </div>
          <div className="w-52 h-52 border rounded-full border-white opacity-15 absolute -bottom-10 -right-10 z-10"></div>
          <div className="w-72 h-72 border rounded-full border-white opacity-15 absolute -bottom-12 -right-12 z-10"></div>
          <div className="border rounded-full border-white opacity-15 absolute top-20 -right-20 z-10" style={{ width: '406px', height: '406px' }}></div>
          <div className="border rounded-full border-white opacity-15 absolute top-2 -right-24 z-10" style={{ width: '499px', height: '499px' }}></div>

          <div className="border rounded-full border-white opacity-15 absolute -top-48 left-20 z-10 hidden xl:block" style={{ width: '761px', height: '761px' }}></div>
          <div className="border rounded-full border-white opacity-15 absolute -top-28 left-36 z-10 hidden xl:block" style={{ width: '605px', height: '605px' }}></div>
        </div>
      </section>

      <section className="w-10/12 mx-auto mt-20 mb-28 md:mt-60" id='PRODUCTS'>
        <div className="flex flex-col items-start gap-4" style={{ maxWidth: "677px" }}>
          <h2 className="text-4xl md:text-5xl text-heading_blue font-light tracking-wide">OUR PRODUCTS</h2>
          <p className="text-sm md:text-xl text-t_grey">
            Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.
          </p>
          <Link href="/Products">
            <button className="button-filled" aria-label="Explore More">
              Explore More
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 cursor-pointer">
          {products.map((data, i) => (
            <div key={i} className='w-[327px] sm:w-[260px] md:w-[310px] lg:w-[415px] xl:w-[520px]'>
              <Link href="/Products">
                <Image
                  src={data.image}
                  width={100}
                  height={100}
                  alt="Products Image"
                  className="h-auto hover:scale-95 w-full transition-all"
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="my-20 md:my-32 h-[380px] lg:h-[710px]" style={{ background: "radial-gradient(circle, #57A8D1 , #2980B9)" }}>
        <div className="flex h-full w-10/12 mx-auto">
          <div className="left w-full md:w-1/2 relative">
            <Image src="/[Mockup] iPhone 15.svg" width={100} height={100} alt="Download App" className='absolute top-0 -left-36 hidden md:block' loading="lazy" style={{ width: "682px" }} />

            <div className="txt w-full md:w-10/12 mx-auto text-white flex flex-col gap-3 absolute bottom-[5%]">

              <h2 className="font-medium text-3xl md:text-4xl lg:text-5xl uppercase">Download App Now</h2>
              <p className="lg:leading-9 text-sm lg:text-3xl">The content in this smartphone application is verified by qualified and registered healthcare professionals!</p>

              <div className="download-imgs flex  justify-start items-start md:items-center gap-2 md:gap-3 xl:gap-8">
                <a href="https://play.google.com/store/apps/details?id=com.pharmapedia.pharmapediapro" target='_blank'>
                  <Image src='./download2.svg' width={100} height={60} alt="Download Image 1" className='cursor-pointer w-36 sm:w-48 md:w-36' loading="lazy" />
                </a>

                <a href="https://apps.apple.com/pk/app/pharmapedia-pro/id1666458131" target='_blank'>
                  <Image src='./download1.svg' width={100} height={60} alt="Download Image 2" className='cursor-pointer w-36 sm:w-48 md:w-36' loading="lazy" />
                </a>
              </div>
            </div>
          </div>
          <div className="right w-1/2 md:flex justify-center items-end relative overflow-hidden hidden">
            <Image src="/phone13.svg" width={100} height={100} alt="Download App" className='absolute bottom-0' loading="lazy" style={{ width: "511px" }} />
          </div>
        </div>
      </section>

      <section className="w-10/12 m-auto">
        <div className="relative py-10">
          <div className="w-full md:w-11/12 lg:w-9/12 xl:w-7/12 text-center m-auto pb-12">
            <h3 className="uppercase font-semibold text-base md:text-xl tracking-widest  mb-0 md:mb-2">News& Events</h3>
            <h1 className="uppercase font-light text-4xl md:text-5xl text-heading_blue mb-5">Our Blogs</h1>
            <p className="text-sm md:text-xl text-t_grey mb-5 md:leading-7">Lorem ipsum dolor sit amet consectetur. Morbi in vulputate id tellus. Et scelerisque consequat egestas volutpat semper pretium morbi amet.</p>

            <Link href="/Blog">
              <button className="button-filled">
                Explore More
              </button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center my-10 relative gap-10 md:gap-5 z-20">
            <div className="w-full md:w-2/6 flex flex-col justify-start md:justify-end items-start md:items-end gap-6 md:gap-16">
              <div className="text-start md:text-end  w-full md:w-10/12">
                <p className="text-lightBlue text-lg md:text-2xl font-medium mb-2 md:leading-8 leading-tight">Premium Book <br /> Marketing Services</p>
                <p className="text-base md:text-xl text-t_grey md:leading-7 leading-tight">Targeted advertising across platforms for maximum book visibility.</p>
              </div>

              <div className="text-start md:text-end w-full md:w-10/12">
                <p className="text-lightBlue text-lg md:text-2xl font-medium mb-2 md:leading-8 leading-tight">Certified <br />
                  Marketing Experts</p>
                <p className="text-base md:text-xl text-t_grey md:leading-7 leading-tight">Experienced team employing diverse digital strategies for success.</p>
              </div>
            </div>

            <div className="w-2/6 hidden md:block">
              <Image src='./BlogImgPhone.svg' width={100} height={100} alt="BlogImg" className='block' style={{ width: "506px", height: "659px" }} />
            </div>

            <div className="w-full md:w-2/6 flex flex-col justify-start md:justify-end items-start md:items-end gap-6 md:gap-16">
              <div className="text-start  w-full md:w-10/12">
                <p className="text-lightBlue text-lg md:text-2xl font-medium mb-2 md:leading-8 leading-tight">Innovative Approach</p>
                <p className="text-base md:text-xl text-t_grey md:leading-7 leading-tight">Utilizing technology and creativity to boost book sales.</p>
              </div>

              <div className=" w-full md:w-10/12 text-start">
                <p className="text-lightBlue text-lg md:text-2xl font-medium mb-2 md:leading-8 leading-tight">Next Bestseller Guarantee</p>
                <p className="text-base md:text-xl text-t_grey md:leading-7 leading-tight">Dedicated to making your book stand out in the market.</p>
              </div>
            </div>
          </div>
          <Image src='./Ellipse 45.svg' width={132} height={132} alt="Ellipse Image" className='absolute bottom-0 left-0 z-10' />
        </div>
      </section>

      <section className="w-10/12 m-auto my-20">
        <div className="w-full md:w-7/12 text-center m-auto pb-12">
          <h2 className="uppercase font-semibold text-base md:text-xl tracking-widest mb-0 md:mb-2">Reviews</h2>
          <h1 className="uppercase font-light  text-4xl md:text-5xl text-heading_blue md:mb-5">Testimonials</h1>
        </div>

        <Swiper
          className="swiper-container pt-10 md:pt-40 mx-auto"
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide className='pb-10'>
            <div className="w-full md:w-3/6 m-auto">
              <div className="flex flex-col items-center justify-center gap-10 md:gap-24">
                <p className="text-center text-sm md:text-xl text-t_grey">Lorem ipsum dolor sit amet consectetur. Laoreet pharetra vitae diam porttitor. Sit id vel vitae leo nunc vitae tellus lacus.</p>
                <div className="flex justify-center items-center gap-8">
                  <div className="w-3/12">
                    <Image src='./testimonialImg.svg' width={100} height={92} alt="Testimonial by Aliyan Baig" className='w-16 md:w-92' />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0 md:gap2 w-9/12">
                    <h3 className="font-bold text-lg md:text-3xl leading-10 pl-1">Aliyan Baig</h3>
                    <div className="icons text-lg md:text-4xl flex justify-center items-center gap-2">
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#E3E6F0" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className='pb-10'>
            <div className="w-full md:w-3/6 m-auto">
              <div className="flex flex-col items-center justify-center gap-10 md:gap-24">
                <p className="text-center text-sm md:text-xl text-t_grey">Lorem ipsum dolor sit amet consectetur. Laoreet pharetra vitae diam porttitor. Sit id vel vitae leo nunc vitae tellus lacus.</p>
                <div className="flex justify-center items-center gap-8">
                  <div className="w-3/12">
                    <Image src='./testimonialImg.svg' width={100} height={92} alt="Testimonial by Aliyan Baig" className='w-16 md:w-92' />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0 md:gap2 w-9/12">
                    <h3 className="font-bold text-lg md:text-3xl leading-10 pl-1">Aliyan Baig</h3>
                    <div className="icons text-lg md:text-4xl flex justify-center items-center gap-2">
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#E3E6F0" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className='pb-10'>
            <div className="w-full md:w-3/6 m-auto">
              <div className="flex flex-col items-center justify-center gap-10 md:gap-24">
                <p className="text-center text-sm md:text-xl text-t_grey">Lorem ipsum dolor sit amet consectetur. Laoreet pharetra vitae diam porttitor. Sit id vel vitae leo nunc vitae tellus lacus.</p>
                <div className="flex justify-center items-center gap-8">
                  <div className="w-3/12">
                    <Image src='./testimonialImg.svg' width={100} height={92} alt="Testimonial by Aliyan Baig" className='w-16 md:w-92' />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0 md:gap2 w-9/12">
                    <h3 className="font-bold text-lg md:text-3xl leading-10 pl-1">Aliyan Baig</h3>
                    <div className="icons text-lg md:text-4xl flex justify-center items-center gap-2">
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#E3E6F0" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className='pb-10'>
            <div className="w-full md:w-3/6 m-auto">
              <div className="flex flex-col items-center justify-center gap-10 md:gap-24">
                <p className="text-center text-sm md:text-xl text-t_grey">Lorem ipsum dolor sit amet consectetur. Laoreet pharetra vitae diam porttitor. Sit id vel vitae leo nunc vitae tellus lacus.</p>
                <div className="flex justify-center items-center gap-8">
                  <div className="w-3/12">
                    <Image src='./testimonialImg.svg' width={100} height={92} alt="Testimonial by Aliyan Baig" className='w-16 md:w-92' />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0 md:gap2 w-9/12">
                    <h3 className="font-bold text-lg md:text-3xl leading-10 pl-1">Aliyan Baig</h3>
                    <div className="icons text-lg md:text-4xl flex justify-center items-center gap-2">
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#FFA928" }} />
                      <FaStar style={{ color: "#E3E6F0" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

      </section>

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

        <Image src='./Ellipse 45.svg' width={116} height={116} alt="Ellipse Image" className='absolute top-1/3 right-0' />
      </section>
    </main >
  );
}
