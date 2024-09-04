"use client"

import Form from '@/components/Form';
import { faqs } from '../data';
import Image from 'next/image';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState
} from 'react-accessible-accordion';
import "react-accessible-accordion/dist/fancy-example.css";
import { FaPlus, FaMinus } from "react-icons/fa6";

const Page = () => {
  const scrollToSchools = () => {
    document.getElementById('drop').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <section className="flex justify-center items-center h-[597px] overflow-hidden relative z-30" style={{
        background: "radial-gradient(circle, #57A8D1 0%, #2980B9 100%)"
      }}>
        <div className="text-white w-11/12 lg:w-3/6 text-center flex flex-col justify-center items-center gap-5">
          <h1 className="text-6xl font-light">Ask Us Anything</h1>
          <p className="leading-7 text-xl uppercase tracking-wide">Have any questions? We&apos;re here to assist you..</p>
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

      {/* FAQS */}
      <section className='w-11/12 md:w-10/12 m-auto mt-20 flex lg:flex-row flex-col items-center justify-center' id='drop'>
        <div className="left w-full lg:w-1/2">
          <Image src="/faqImg.svg" alt="Scroll down button" width={40} height={40} className='w-[730px]' />
        </div>

        <div className="right w-full lg:w-1/2">
          <div className="">
            <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase pt-14">Frequently <br /> <span className='text-heading_blue'>Asked Questions</span></h1>

            <Accordion className='mt-10' allowMultipleExpanded={false} preExpanded={[0]}>
              {
                faqs.map((item, i) => (
                  <AccordionItem className='border-2 rounded-lg border-[#D8D8D8] mb-4 accordionItem' key={i} uuid={i}>
                    <AccordionItemHeading>
                      <AccordionItemButton className='flex'>
                        <AccordionItemState>
                          {({ expanded }) => (
                            <div className="flex items-center justify-center w-full">
                              <div className="w-1/12 flex items-center justify-center font-semibold text-xl">{item.num}</div>
                              <div className="w-11/12 md:w-10/12 p-2">
                                <p className='question ms-0 ml-3 font-semibold text-base md:text-xl leading-5'>{item.question}</p>
                              </div>
                              <div className={`w-1/12 rounded-tr-md flex text-2xl p-[14px] justify-center items-center ${expanded ? 'bg-[#85D0FF]' : "bg-[#D8D8D8]"}`}>
                                {expanded ? <FaMinus /> : <FaPlus />}
                              </div>
                            </div>
                          )}
                        </AccordionItemState>
                      </AccordionItemButton>
                    </AccordionItemHeading>

                    <AccordionItemPanel>
                      <p className="secondaryText w-11/12 m-auto text-pClr text-sm md:text-lg">{item.ans}</p>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))
              }
            </Accordion>
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
    </main>
  )
}

export default Page;

