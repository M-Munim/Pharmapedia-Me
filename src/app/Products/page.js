"use client"

import Form from '@/components/Form';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const scrollToSchools = () => {
    0
    document.getElementById('drop').scrollIntoView({ behavior: 'smooth' });
  };

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // local
        // const response = await axios.get('http://localhost:3000/api/Product');
        const response = await axios.get('https://pharmapedia-me.vercel.app/api/Product');
        setProducts(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [])


  return (
    <main>
      <section className="flex justify-center items-center h-[597px] overflow-hidden relative z-30" style={{
        background: "radial-gradient(circle, #57A8D1 0%, #2980B9 100%)"
      }}>
        <div className="text-white w-11/12 lg:w-3/6 text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-6xl font-light">Our Products</h1>
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

      <section className="relative">
        <Image
          src="/Group1.svg"
          alt=""
          width={2947.91}
          height={1989.84}
          className="absolute bottom-32 z-10"
        />

        {/* Products started */}

        <div className=''>
          {products.map((product, index) => (
            <div
              className={`w-11/12 ms-auto my-10 md:my-36 flex flex-col-reverse md:flex-row items-center justify-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              id='drop'
              key={index}
            >
              <div className="flex items-start justify-end md:justify-center flex-col w-full md:w-1/2 h-auto md:h-[659px]">
                <div className="w-full px-4 md:w-10/12 md:px-0 z-20">
                  <h2 className="uppercase font-light text-2xl sm:text-3xl md:text-4xl text-heading_blue lg:tracking-wider">{product.productName}</h2>
                  <div
                    className="text-justify mt-2"
                    dangerouslySetInnerHTML={{
                      __html: product.productContent.length > 300
                        ? `${product.productContent.slice(0, 300)}...`
                        : product.productContent
                    }}
                  ></div>
                  <Link href={`/Products/Product/${product._id}`}>
                    <button className="button-filled mt-3">
                      Explore More
                    </button>
                  </Link>

                </div>
              </div>

              <div
                className="right w-full md:w-1/2 relative h-[300px] md:h-[659px]"
              // style={{
              // backgroundImage: `url(/uploads/${product.bgImage})`
              // , backgroundRepeat: "no-repeat", backgroundSize: "cover"
              // }}
              >
                {/* src={`/uploads/${blogData.authorImage}`} */}
                <Image
                  src={`/uploads/${product.displayImage}`}
                  alt="product"
                  width={365}
                  height={751}
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20"
                />
                <Image src='Ellipse 40.svg' alt="" width={186} height={186} className='absolute bottom-0 -left-10' />
                <Image src='Ellipse 41.svg' alt="" width={100} height={100} className='absolute -bottom-60 right-0 z-20' />
              </div>
            </div>
          ))}
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

export default Page;