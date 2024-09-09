"use client"

import Image from 'next/image';
import './style.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '@/components/Form';

const Page = ({ params }) => {
  const scrollToSchools = () => {
    document.getElementById('drop').scrollIntoView({ behavior: 'smooth' });
  };

  const productSpecificId = params.id;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // local
        const response = await axios.get(`http://localhost:3000/api/Product/${productSpecificId}`);
        // const response = await axios.get(`https://pharmapedia-me.vercel.app/api/Product/${productSpecificId}`);
        console.log(response.data.result);
        setProducts(response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [productSpecificId]);

  return (
    <main>
      <section className="flex justify-center items-start md:items-center h-[577px] relative z-30" style={{
        background: "radial-gradient(circle, #57A8D1 0%, #2980B9 100%)"
      }}>

        <div className="w-11/12 sm:w-9/12 text-center flex flex-col md:flex-row justify-center items-center md:h-[500px] z-40 absolute  lg:mt-40 xl:mt-72">

          <div className="w-full md:pt-20 xl:pt-44 mt-20">
            <h1 className="outlined-text m-0 p-0 text-white text-3xl lg:text-6xl xl:text-[120px]">{products.productName}</h1>
            <p className="text-t_grey text-sm sm:text-base md:text-xl w-full  md:w-10/12 text-left md:mt-5">Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.</p>
          </div>

          <div className="w-full md:w-5/12 flex items-center lg:items-start justify-center mt-5 md:mt-16">
            <img
              src={products.displayImage}
              alt="productImg1"
              // width={100}
              // height={751}
              className="z-20 w-[250px] md:w-[565px]"
            // className="z-20 bg-red-300"
            />
            <Image src="/Ellipse 41.svg" alt="" width={100} height={100} className='' />
          </div>
        </div>

        <div className="overflow-hidden relative h-[577px] md:h-[627px] z-30 w-full">
          <div className="md:w-60 md:h-60 w-40 h-40 border-1 rounded-full border-white opacity-25 absolute md:-bottom-20 md:-left-44 -bottom-10 -left-20 z-10" aria-hidden="true"></div>
          <div className="md:w-[350px] md:h-[350px] w-[320px] h-[320px] border-1 rounded-full border-white opacity-25 absolute md:-bottom-24 md:-left-48 -bottom-24 -left-44 z-10"></div>
          <div className="md:w-[493px] md:h-[493px] w-[463px] h-[463px] border-1 rounded-full border-white opacity-25 absolute -bottom-28 -left-56 z-10"></div>
          <div className="md:w-[606px] md:h-[606px] w-[573px] h-[573px] border-1 rounded-full border-white opacity-25 absolute -bottom-32 -left-60 z-10"></div>

          <div className="md:w-80 md:h-80 border-1 rounded-full border-white opacity-25 absolute -top-40 right-10 z-10 hidden md:block"></div>
          <div className="md:w-[452px] md:h-[452px] border-1 rounded-full border-white opacity-25 absolute -top-48 -right-12 z-10 hidden md:block"></div>
          <div className="md:w-[637px] md:h-[637px] border-1 rounded-full border-white opacity-25 absolute -top-60 -right-36 z-10 hidden lg:block"></div>
          <div className="md:w-[783px] md:h-[783px] border-1 rounded-full border-white opacity-25 absolute -top-64 -right-56 z-10 hidden lg:block"></div>
        </div>
      </section>

      <section className="relative mt-20 md:mt-[240px] mb-20" id='drop'>
        <Image
          src="/Group1.svg"
          alt=""
          width={2947.91}
          height={1089.84}
          className="absolute z-10 -top-60"
        />
        <div className="z-30 relative w-11/12 md:w-10/12 m-auto">
          <div className="w-full md:w-10/12 m-auto text-center mt-32 relative">
            <div
              className="text-justify mt-2"
              dangerouslySetInnerHTML={{
                __html: products.productContent
              }}
            ></div>
            <Image src="/Ellipse 41.svg" alt="" width={100} height={100} className='absolute left-0 md:left-32 w-12 md:w-[100px]' />
          </div>

          <div className="w-full md:w-10/12 m-auto text-center relative mt-10">
            <p className="uppercase text-white tracking-widest mb-5 w-fit m-auto px-2" style={{ background: "linear-gradient(to right, #0d47a1, #1976d2, #42a5f5)" }}>Preparation</p>
            <h2 className="uppercase font-light text-3xl sm:text-4xl md:text-5xl text-heading_blue tracking-wider">Pharmapedia</h2>
            <p className="text-sm md:text-xl text-t_grey mt-2 w-full lg:w-7/12 m-auto">Pharmapedia Private Limited is a company specializing in mobile application development. Our focus lies primarily in the education sector, with an emphasis on medical education and STEM (Science, Technology, Engineering, and Mathematics) education.</p>
          </div>

          <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center mt-14">
            <div className="w-5/12">
              <Image
                src="/productImg1.svg"
                alt="productImg1"
                width={365}
                height={751}
              />
            </div>

            <div className="w-full md:w-7/12 flex  items-start justify-center tracking-wider gap-3">
              <div className="left relative z-30">
                <div className="w-44 h-40 sm:w-48 sm:h-48 md:w-96 md:h-56 bg-white shadow-xl border-l-5 border-[#2AA7FF] rounded-md flex flex-col items-center justify-center mt-6 sm:mt-7 md:mt-20">
                  <div className="text-left">
                    <Image src="/accessibility1.svg" alt="" width={100} height={32} className='mb-2 w-6 sm:w-[32px]' />
                    <p className="text-base sm:text-lg md:text-2xl font-bold text-prodclr1 leading-5 md:leading-6">40 top Companies <br /> data updated</p>
                    <p className="text-sm sm:text-lg md:text-xl text-prodclr2 mt-2">Our Data is Updated</p>
                  </div>
                </div>

                <div className="w-44 h-40 sm:w-48 sm:h-48 md:w-96 md:h-56 bg-white shadow-xl border-l-5 border-[#2AA7FF] rounded-md flex flex-col items-center justify-center mt-6 sm:mt-7 md:mt-20">
                  <div className="text-left">
                    <Image src="/accessibility3.svg" alt="" width={100} height={32} className='mb-2 w-6 sm:w-[32px]' />
                    <p className="text-base sm:text-lg md:text-2xl font-bold text-prodclr1 leading-5 md:leading-6">UI enhanced</p>
                    <p className="text-sm sm:text-lg md:text-xl text-prodclr2 mt-2">Our Application User<br /> Interface Design is more  <br />User Friendly</p>
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="w-44 h-40 sm:w-48 sm:h-48 md:w-96 md:h-56 bg-white shadow-xl border-l-5 border-[#2AA7FF] rounded-md flex flex-col items-center justify-center mt-6 sm:mt-7 md:mt-20">
                  <div className="text-left">
                    <Image src="/accessibility4.svg" alt="" width={100} height={32} className='mb-2 w-6 sm:w-[32px]' />
                    <p className="text-base sm:text-lg md:text-2xl font-bold text-prodclr1 leading-5 md:leading-6">Best Ux Design</p>
                    <p className="text-sm sm:text-lg md:text-xl text-prodclr2 mt-2">We have Best <br /> User Experience Design</p>
                  </div>
                </div>
                <div className="w-44 h-40 sm:w-48 sm:h-48 md:w-96 md:h-56 bg-white shadow-xl border-l-5 border-[#2AA7FF] rounded-md flex flex-col items-center justify-center mt-6 sm:mt-7 md:mt-20">
                  <div className="text-left">
                    <Image src="/accessibility2.svg" alt="" width={100} height={32} className='mb-2 w-6 sm:w-[32px]' />
                    <p className="text-base sm:text-lg md:text-2xl font-bold text-prodclr1 leading-5 md:leading-6">Updated API <br />Service</p>
                    <p className="text-sm sm:text-lg md:text-xl text-prodclr2 mt-2">API Service is now enhanced <br /> with more API End Points <br /> covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-10/12 m-auto text-center relative mt-20">
            <p className="uppercase text-white tracking-widest mb-5 w-fit m-auto px-2" style={{ background: "linear-gradient(to right, #0d47a1, #1976d2, #42a5f5)" }}>Let&apos;s Work Together</p>
            <h2 className="uppercase font-light text-3xl sm:text-4xl md:text-5xl text-heading_blue tracking-wider">Contact Us</h2>
            <p className="text-sm md:text-xl text-t_grey mt-2 w-full lg:w-7/12 m-auto">We are ready to make your ideas and plans come to life. Please feel free to contact us and let&apos;s start working together&excl;</p>
          </div>
        </div>
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

        <Image src='/Ellipse 45.svg' width={116} height={116} alt="Ellipse Image" className='absolute top-1/3 right-0' />
      </section>
    </main>
  );
};

export default Page;