'use client'
import React, { useEffect, useState } from 'react'
import { CiClock2 } from "react-icons/ci";
import { PiRanking } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import { AiFillInstagram } from "react-icons/ai";
import { blogs } from '@/app/data';
import axios from 'axios';
import Link from 'next/link';

const Page = ({ params }) => {
  const blogSpecificId = params.id;

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/Blog/${blogSpecificId}`);
        setBlogs(response.data.result);
        console.log('specific id of Blogs:', response.data.result);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    // id added
    fetchBlogs();
  }, [blogSpecificId]);

  // All Blogs
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Blog');
        setAllBlogs(response.data.result);
        // console.log(response.data.result);


      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main>
      {/* <h1>{params.id}</h1> */}
      <section className='h-[577px] flex justify-center items-center' style={{
        backgroundImage: "url('/SubBlogMain.svg')", backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        <div className="w-11/12 md:w-10/12 m-auto">
          <div className="text-white mb-3">
            <h2 className="text-2xl md:text-6xl font-medium tracking-wider mb-3 mt-20 w-11/12">{blogs.title}</h2>
            {/* <p className="text-lg md:text-4xl">Relationship tips couples therapists are giving all the time</p> */}
          </div>
          <div className="flex items-center justify-between w-full md:w-1/2 text-white">
            <p className="text-xs sm:text-base md:text-xl">by {blogs.author}</p>
            <div className="w-2 sm:w-4 md:w-6 border-1 border-white"></div>
            <CiClock2 className='cursor-pointer hidden md:inline-block' />
            <p className="text-xs sm:text-sm">2 minute read</p>
            <div className="w-2 sm:w-4 md:w-6 border-1 border-white"></div>
            <PiRanking className='cursor-pointer hidden md:inline-block' />
            <p className="text-xs sm:text-sm">1.6K views</p>
            <div className="w-2 sm:w-4 md:w-6 border-1 border-white"></div>
            <a href="https://www.facebook.com/Pharmapedia01"
              target="_blank">
              <FaFacebook className='cursor-pointer hidden md:inline-block' />
            </a>
            <a
              href="https://www.instagram.com/pharmapedia01/?hl=en"
              target="_blank"
              aria-label="Instagram"
            >
              <AiFillInstagram className="cursor-pointer" />
            </a>

            <a
              href="https://www.linkedin.com/company/pharmapedia1/"
              className="text-xs md:text-base"
              aria-label="Linkedin"
            >
              <FaLinkedin className="cursor-pointer" />
            </a>
            <p className="text-xs sm:text-sm">1.2K shares</p>
          </div>
        </div>
      </section>

      <section className='relative overflow-hidden'>
        <div className="w-96 h-96 border-3 rounded-full opacity-30 absolute top-36 -right-60" aria-hidden="true"></div>
        <div className="w-[452px] h-[452px] border-3 rounded-full opacity-30 absolute top-28 -right-56" aria-hidden="true"></div>
        <div className="w-[597px] h-[597px] border-3 rounded-full opacity-30 absolute top-10 -right-60" aria-hidden="true"></div>
        <div className="w-[697px] h-[697px] border-3 rounded-full opacity-30 absolute -top-5 -right-60" aria-hidden="true"></div>

        <div className="w-96 h-96 border-3 rounded-full opacity-30 absolute bottom-36 -left-60" aria-hidden="true"></div>
        <div className="w-[452px] h-[452px] border-3 rounded-full opacity-30 absolute bottom-28 -left-56" aria-hidden="true"></div>
        <div className="w-[597px] h-[597px] border-3 rounded-full opacity-30 absolute bottom-10 -left-60" aria-hidden="true"></div>
        <div className="w-[697px] h-[697px] border-3 rounded-full opacity-30 absolute -bottom-5 -left-60" aria-hidden="true"></div>

        <div className="flex justify-start lg:justify-between items-start mt-20">
          <div className="w-[12%] lg:w-1/12 relative z-40">
            <div className="flex flex-col justify-center items-center gap-12 text-xs" style={{
              color: '#121416'
            }}>
              <div className="flex flex-col justify-center items-center gap-1">
                <PiRanking />
                <p className="">views <br />
                  1.6K </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-1">
                <CiShare2 />
                <p className="text-center">shares <br /> 6K</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <a href="https://www.facebook.com/Pharmapedia01"
                  target="_blank">
                  <FaFacebook className='cursor-pointer text-lg' />
                </a>
                <p className="">125</p>
                <a
                  href="https://www.instagram.com/pharmapedia01/?hl=en"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <AiFillInstagram className="cursor-pointer  text-lg" />
                </a>
                <p className="">425</p>

                <a
                  href="https://www.linkedin.com/company/pharmapedia1/"
                  className="text-xs md:text-base"
                  aria-label="Linkedin"
                >
                  <FaLinkedin className="cursor-pointer  text-lg" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-10/12 lg:w-8/12 relative z-40">
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: blogs.blogContent }}
            ></div>
          </div>

          <div className="lg:block hidden w-3/12 px-6 relative z-40">
            <h2 className="font-semibold text-2xl mb-6">Follow Us</h2>

            <div className="flex items-center justify-start gap-12  mb-6">
              <div className="text-center">
                <a href="https://www.facebook.com/Pharmapedia01"
                  target="_blank">
                  <FaFacebook className='cursor-pointer text-2xl' />
                </a>
                <p className="">1k</p>
              </div>
              <div className="text-center">
                <a
                  href="https://www.instagram.com/pharmapedia01/?hl=en"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaSquareInstagram className='text-2xl cursor-pointer' />
                </a>
                <p className="">4k</p>
              </div>

              <div className="">
                <a
                  href="https://www.linkedin.com/company/pharmapedia1/"
                  className="text-xs md:text-base"
                  aria-label="Linkedin"
                >
                  <FaLinkedin className="cursor-pointer  text-2xl" />
                </a>
                <p className="">6k</p>
              </div>
            </div>

            <h2 className="font-semibold text-2xl mt-10 mb-4">The Latest</h2>
            {
              allBlogs.map((blogData) => (
                <div className="mb-12 mt-14 w-11/12 m-auto text-white" key={blogData._id}>
                  <p className="font-semibold leading-tight">{blogData.title}</p>

                  <div
                    className="text-justify mt-2"
                    dangerouslySetInnerHTML={{
                      __html: blogData.blogContent.length > 200
                        ? `${blogData.blogContent.slice(0, 200)}...`
                        : blogData.blogContent
                    }}
                  ></div>
                  <div className="flex justify-center items-center gap-5 my-3">
                    <p className="text-base font-semibold">{blogData.datetime}</p>
                    <div className="w-6 border-1 border-t_grey"></div>
                    <CiClock2 />
                    <p className="text-sm font-semibold">2 minute read</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section >

      <section className="">
        <div className="">
          <div className="w-11/12 m-auto flex justify-center items-center flex-wrap gap-7">
            {allBlogs.map((blogData) => (
              <div className="relative my-5" style={{ width: "400px" }} key={blogData._id}>
                <Image
                  src={`/uploads/${blogData.displayImage}`}
                  alt={blogData.alt}
                  width={468}
                  height={358}
                />
                <div className="buttons flex absolute gap-1 top-4 left-4 text-white">
                  <p className="button-blog">{blogData.domain}</p>
                  <p className="button-blog">{blogData.subDomain}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Image
                    src='/blogVideoPlay.svg'
                    width={35}
                    height={35}
                    className="cursor-pointer"
                    alt="Blog Data"
                  />
                </div>
                <div className="mt-8">
                  <h2 className="text-xl md:text-3xl font-semibold mb-3">{blogData.title}</h2>

                  <div className="w-11/12">
                    <div className="flex items-center justify-between">
                      <Image
                        src={`/uploads/${blogData.authorImage}`}
                        alt="author Img"
                        width={100}
                        height={100}
                        className='w-8 md:w-8'
                      />
                      <p className="text-xs md:text-base font-bold">{blogData.author}</p>
                      <div className="w-3 md:w-6 border-1 border-gray-300"></div>
                      <p className="text-xs md:text-sm lg:text-base text-pClr">{blogData.datetime}</p>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <Image
                        src='/shareIcon.svg'
                        alt="shareIcon-Img"
                        width={100}
                        height={100}
                        className='w-2 md:w-3'
                      />
                      <p className="text-xs md:text-sm lg:text-base text-pClr hidden lg:block">{blogData.shares}</p>
                    </div>

                    <div
                      className="text-justify mt-2"
                      dangerouslySetInnerHTML={{
                        __html: blogData.blogContent.length > 200
                          ? `${blogData.blogContent.slice(0, 200)}...`
                          : blogData.blogContent
                      }}
                    ></div>

                    <Link href={`Blog/Blogs/${blogData._id}`}
                      className="text-base md:text-lg font-semibold hover:border-b-2 border-black"
                    >
                      View Post
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="m-auto overflow-hidden relative" id='contact' >
        <div className="w-10/12 m-auto flex flex-col-reverse md:flex-row items-center justify-center gap-20 relative py-20">
          <div className="left w-full md:w-1/2 relative z-30">
            <form action="">
              <div className="flex justify-between items-center gap-2 lg:gap-7 xl:gap-10 mb-4">
                <div className="flex flex-col items-start justify-center gap-1 w-6/12">
                  <label htmlFor="firstName" >First Name</label>
                  <input type="text" name="firstName" id="firstName" placeholder='First Name' className='h-12 w-full rounded-lg p-3 outline-none border-slate-400 border' required />
                </div>
                <div className="flex flex-col items-start justify-center gap-1 w-6/12">
                  <label htmlFor="lastName" className='text-sm font-medium leading-6'>Last Name</label>
                  <input type="text" name="lastName" id="lastName" placeholder='Last Name' className='h-12 w-full rounded-lg p-3 outline-none border-slate-400 border' required />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="email" className='text-sm font-medium leading-6'>Email</label>
                <input type="email" name="email" id="email" placeholder='Example@company.com' required className='h-12 w-full rounded-lg p-3 outline-none border-slate-400 border' />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className='text-sm font-medium leading-6'>Phone number</label>
                <div className='h-12 w-full rounded-lg outline-none border-slate-400 border phone-input '>
                  <select id="country-code" name="country-code" className='h-11 rounded-l-lg outline-none w-3/12 sm:w-2/12 md:w-3/12 lg:w-3/12 xl:w-2/12'>
                    <option value="PK">+92</option>
                    <option value="IND">+91</option>
                  </select>
                  <input type="tel" id="phone" name="phone" placeholder="Phone number" className='h-11 w-9/12 sm:w-10/12 md:w-9/12 lg:w-9/12 xl:w-10/12 px-3 outline-none rounded-2xl' />
                </div>
              </div>

              <div className="flex flex-col mb-5">
                <label htmlFor="message" className='text-sm font-medium leading-6'>Message</label>
                <textarea name="message" id="message" className='h-32 w-full rounded-lg p-3 outline-none border-slate-400 border resize-none'></textarea>
              </div>

              <div className="flex mb-8 gap-3 items-center justify-start">
                <input type="checkbox" id="myCheckbox" className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded outline-none " />
                <p className="font-medium text-base">You agree to our friendly <a href="" className='underline'>privacy policy.</a></p>
              </div>

              <button className="button-filledext">
                Send Message
              </button>
            </form>
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