'use client';
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useState } from 'react';
import clsx from 'clsx';

export default function Home() {
  const str = "Thanks for using Carousel Pro! I hope this tool is fun and easy to use.\n\nFor any questions or concerns, please reach out to @zakjpeg on twitter."
  const [name, setName] = useState<string>("Athletes & Assets");
  const [handle, setHandle] = useState<string>("athletesandassets");
  const [league, setLeague] = useState<string>("News");
  const [content, setContent] = useState<string>(str);
  const [showLeague, setShowLeage] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string>('defaultpfp.png');

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  }


  return (
    <div className="m-15 flex flex-col md:flex-row items-center md:items-start justify-center gap-10">
      {/* Left Menu */}
      <div className="flex flex-col p-8 h-120 md:w-2/6 bg-medium rounded-2xl shadow-s">
        <div className="font-bold mb-20 text-xl">Carousel Pro
          <p className="font-normal text-sm text-text-muted">Export carousel elements that look like tweets.</p>
        </div>
        <input type="file" accept="image/*"
        className=""
        onChange={(e) => {handleImgInput(e)}}
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

      {/* Right Menu */}
      <div className="flex flex-col justify-between gap-10">
        {/* Tweet Dark*/}
        <div className="flex flex-col p-8 h-min w-[400px] bg-medium rounded-2xl shadow-s">

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
            <div className="bg-brand-orange font-semibold h-min w-min px-1.5 py-0.5 rounded-lg text-sm">
              {league}
            </div>
            }
          </div>

          {/* Bottom Row */}
          <p className="whitespace-pre-wrap">{content}</p>

        </div>

        {/* Tweet Light*/}
        <div className="flex flex-col p-8 h-min w-[400px] bg-white rounded-2xl shadow-s">

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
            <div className="bg-brand-orange font-semibold h-min w-min px-1.5 py-0.5 rounded-lg text-sm">
              {league}
            </div>
            }
          </div>

          {/* Bottom Row */}
          <p className="whitespace-pre-wrap text-gray-900">{content}</p>

        </div>

      </div>
    </div>
  );
}
