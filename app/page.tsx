'use client';
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useState } from 'react';
import clsx from 'clsx';

export default function Home() {
  const str = "Thanks for using A&A Carousel Pro! I hope this tool is fun and easy to use.\n\nFor any questions or concerns, please reach out to Zak via Slack."
  const [name, setName] = useState<string>("Athletes & Assets");
  const [handle, setHandle] = useState<string>("athletesandassets");
  const [league, setLeague] = useState<string>("News");
  const [content, setContent] = useState<string>(str);
  const [showLeague, setShowLeage] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string>('defaultpfp.png');
  const [background, setBackground] = useState<string>('https://www.bigfacebrand.com/cdn/shop/files/HP-HERO-MOB-BIGFACE-GP_722x.jpg?v=1755550700');
  const [theme, setTheme] = useState<number>(2);
  const [gradient, setGradient] = useState<string>("brand-deep-navy"); // TODO

  const handlePfpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleBgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = () => {
      setBackground(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleThemeChange = (code: number) => {
    if (!Number.isNaN(code)) {
      setTheme(code);
    }
  }

  const handleGradientChange = (color: string) => {
    setGradient(color);
  }

  // Function: tweetContents
  // Purpose: Returns Tweet contents from states
  // Input: Number. 0 means dark mode, 1 means light mode
  // Output: HTML 
  //
  const tweetContents = (num: number) => {
    if (num == 0) {
      return (
          <div>

            {/* Top Row */}
            <div className="flex flex-row justify-between mb-3">
              {/* Left Side */}
              <div className="flex flex-row">
                <img src={profilePic} className="w-[50px] h-[50px] rounded-full mr-3 border-2 border-brand-orange object-cover"/>
                {/* Name and Handle */}
                <div className="flex flex-col">
                  <p className="font-semibold text-lg flex flex-row items-center gap-2">{name}{verified && <RiVerifiedBadgeFill color="1DA1F2"/>}
                  </p>
                  <p className="font-regular text-sm text-text-muted">@{handle}</p>
                </div>
              </div>
              {/* Right Side */}
              { showLeague &&
              <div className="bg-brand-orange font-semibold h-min w-min px-1.5 py-0.5 rounded-lg text-sm whitespace-nowrap">
                {league}
              </div>
              }
            </div>

            {/* Bottom Row */}
            <p className="whitespace-pre-wrap">{content}</p>

          </div>
      );
    } else if (num == 1) {
      return (
        <div>
          {/* Top Row */}
          <div className="flex flex-row justify-between mb-3">
            {/* Left Side */}
            <div className="flex flex-row">
              <img src={profilePic} className="w-[50px] h-[50px] rounded-full mr-3 border-2 border-brand-orange object-cover"/>
              {/* Name and Handle */}
              <div className="flex flex-col">
                <p className="font-semibold text-black text-lg flex flex-row items-center gap-2">{name}{verified && <RiVerifiedBadgeFill color="1DA1F2"/>}
                </p>
                <p className="font-regular text-sm text-gray-400">@{handle}</p>
              </div>
            </div>
            {/* Right Side */}
            { showLeague &&
            <div className="bg-brand-orange font-semibold h-min w-min px-1.5 py-0.5 rounded-lg text-sm whitespace-nowrap">
              {league}
            </div>
            }
          </div>

          {/* Bottom Row */}
          <p className="whitespace-pre-wrap text-gray-900">{content}</p>
        </div>
      );
    }
  }
  

  return (
    <div className="m-15 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
      {/* Left Menu */}
      <div className="flex flex-col p-8 h-[570px] lg:w-2/6 bg-medium rounded-2xl shadow-s">
        <div className="font-bold mb-20 text-xl">A&A Carousel Pro
          <p className="font-normal text-sm text-text-muted">Export carousel elements that look like tweets.</p>
        </div>
        <input type="file" accept="image/*"
        className=""
        onChange={(e) => {handlePfpInput(e)}}
        />
        <input type="file" accept="image/*"
        className=""
        onChange={(e) => {handleBgInput(e)}}
        />
        {/* Button Row*/}
        <div className="flex flex-row justify-end items-center gap-3 mb-6 text-sm">
          <button className={clsx(
            "px-2 rounded-lg cursor-pointer transition duration-250 eas-in-out",
            verified ? "bg-white text-dark shadow-m" : "bg-medium text-text-muted shadow-m"
          )} 
          onClick={() => {setVerified(!verified)}}>
            Verified
          </button>
          <button className={clsx(
            "px-2 rounded-lg cursor-pointer transition duration-250 eas-in-out",
            showLeague ? "bg-white text-dark shadow-m" : "bg-medium text-text-muted shadow-m"
          )} 
          onClick={() => {setShowLeage(!showLeague)}}>
            League
          </button>

        </div>
        <input type="text" placeholder="Name" className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-full"
          onChange={(e) => {
            setName(e.target.value);
          }}/>
        <div className="flex flex-row justify-between gap-2 my-3">
          <input type="text" placeholder="Handle" className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-full"
          onChange={(e) => {
            setHandle(e.target.value);
          }}/>
          <input type="text" placeholder="League" className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-full"
          disabled={!showLeague}
          onChange={(e) => {
            setLeague(e.target.value);
          }}/>
        </div>
        <textarea name="" id="" placeholder="Content" className="bg-light rounded-2xl py-1 px-3 shadow-s min-h-20 overflow-y-scroll"
          onChange={(e) => {
            setContent(e.target.value);
          }}/>
      </div>

      {/* Composite */}
      <div className="flex flex-col justify-between gap-7">
        <div className="flex relative rounded-3xl overflow-hidden">
          {/* Tweet Dark*/}
          {theme == 0 &&
          <div className="flex flex-col p-5 h-min w-[400px] scale-85 absolute bottom-4 bg-medium rounded-2xl shadow-s z-10">
            {tweetContents(0)}
          </div>
          }
          {/* Tweet Navy*/}
          {theme == 1 &&
          <div className="flex flex-col p-5 h-min w-[400px] scale-85 absolute bottom-4 bg-brand-deep-navy rounded-2xl shadow-s z-10">
            {tweetContents(0)}
          </div>
          }
          {/* Tweet Light*/}
          {theme == 2 && 
          <div className="flex flex-col p-5 h-min w-[400px] scale-85 absolute bottom-4 bg-white rounded-2xl shadow-s z-10">
            {tweetContents(1)}
          </div>
          }
          {/* Gradient Overlay */}
          <div className={clsx(
            "w-full h-1/2 absolute bottom-0 bg-gradient-to-t",
            gradient == "brand-deep-navy" && "from-brand-deep-navy",
            gradient == "brand-orange" && "from-brand-orange",
            gradient == "brand-white" && "from-brand-white",
            gradient == "brand-black" && "from-brand-black",
            "to-brand-orange/0"
          )}></div>
          {/* Gradient Overlay */}
          <div className="w-full h-1/5 absolute top-0 bg-gradient-to-b from-black/55 to-black/0"></div>

          {/* Background Image */}
          <img src={background} alt="" className="w-[400px] h-[500px] object-cover"/>
        </div> 
        {/* Button Tray */}
        <div className="flex flex-row gap-2 justify-start items-center bg-light rounded-full px-5 py-2 shadow-m">
          <div className="h-7 w-7 rounded-full bg-white bg-gradient-to-b from-transparent to-black/40 shadow-s cursor-pointer"
          onClick={() => {
            handleGradientChange("brand-white")
          }}
          ></div>
          <div className="h-7 w-7 rounded-full bg-brand-orange bg-gradient-to-t from-transparent to-white/30 shadow-s cursor-pointer"
          onClick={() => {
            handleGradientChange("brand-orange")
          }}
          ></div>
          <div className="h-7 w-7 rounded-full bg-brand-deep-navy bg-gradient-to-t from-transparent to-white/10 shadow-s cursor-pointer"
          onClick={() => {
            handleGradientChange("brand-deep-navy")
          }}
          ></div>
          <div className="h-7 w-7 rounded-full bg-black bg-gradient-to-t from-transparent to-white/25 shadow-s cursor-pointer"
          onClick={() => {
            handleGradientChange("brand-black")
          }}
          ></div>
        </div>       
      </div>


      {/* Right Menu */}
      <div className="flex flex-col justify-between gap-10">
        <p className="self-center font-semibold text-lg">Theme</p>
        {/* Tweet Dark*/}
        <div className="flex flex-col p-5 h-min w-[400px] bg-medium rounded-2xl shadow-s interactive-card"
        onClick={() => {
          handleThemeChange(0);
        }}
        >
          {tweetContents(0)}
        </div>
        {/* Tweet Navy*/}
        <div className="flex flex-col p-5 h-min w-[400px] bg-brand-deep-navy rounded-2xl shadow-s interactive-card"
        onClick={() => {
          handleThemeChange(1);
        }}
        >
          {tweetContents(0)}
        </div>
        {/* Tweet Light*/}
        <div className="flex flex-col p-5 h-min w-[400px] bg-white rounded-2xl shadow-white-s interactive-card"
        onClick={() => {
          handleThemeChange(2);
        }}
        >
          {tweetContents(1)}
        </div>
      </div>

    </div>
  );
}
