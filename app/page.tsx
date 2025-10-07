'use client';
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useState, useRef } from 'react';
import clsx from 'clsx';
/* ES6 */
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { IoMdDownload } from "react-icons/io";
import download from 'downloadjs';
import { FaDownload } from "react-icons/fa";
import { RxAspectRatio, RxAvatar, RxClipboard, RxComponentInstance, RxContainer, RxFile, RxImage, RxInstagramLogo, RxTwitterLogo } from "react-icons/rx";
import { AiOutlineFileImage } from "react-icons/ai";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi";
import { TbBoxAlignBottom } from "react-icons/tb";
import { AiOutlineEyeInvisible } from "react-icons/ai";





export default function Home() {
  const str = "Thanks for using A&A Carousel Pro! I hope this tool is fun and easy to use.\n\nFor any questions or concerns, please reach out to Zak via Slack."
  const [name, setName] = useState<string>("Athletes & Assets");
  const [handle, setHandle] = useState<string>("athletesandassets");
  const [league, setLeague] = useState<string>("News");
  const [content, setContent] = useState<string>(str);
  const [showLeague, setShowLeage] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string>('defaultpfp.png');
  const [promptProfilePic, setPromptProfilePic] = useState<boolean>(true);
  const [background, setBackground] = useState<string>('https://www.nbc.com/sites/nbcblog/files/styles/scale_862/public/2024/05/2024-nfl-cowboys.jpg');
  const [promptBackgroundPic, setPromptBackgroundPic] = useState<boolean>(true);
  const [theme, setTheme] = useState<number>(2);
  const [gradient, setGradient] = useState<string>("brand-orange");
  const [showAttachedPhoto, setShowAttachedPhoto] = useState<boolean>(false);
  const [attachedPhoto, setAttachedPhoto] = useState<string>();
  const [autoFit, setAutoFit] = useState<boolean>(true);
  const [alignMode, setAlignMode] = useState<number>(0); // 0 1 or 2: Bottom, Top, Center
  const [attention, setAttention] = useState<string>('')
  const [attentionColor, setAttentionColor] = useState<string>('text-twitter-blue');
  

  const imageRef = useRef<HTMLDivElement>(null);
  const tweetLightRef = useRef<HTMLDivElement>(null);
  const tweetNavyRef = useRef<HTMLDivElement>(null);
  const tweetDarkRef = useRef<HTMLDivElement>(null);

  const handlePfpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
    setPromptProfilePic(false);
  }

  const handleBgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = () => {
      setBackground(reader.result as string);
    };
    reader.readAsDataURL(file);
    setPromptBackgroundPic(false);
  }

  const handleAttachedPhotoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = () => {
      setAttachedPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
    setShowAttachedPhoto(true);
  }

  const handleThemeChange = (code: number) => {
    if (!Number.isNaN(code)) {
      setTheme(code);
    }
  }

  const handleGradientChange = (color: string) => {
    setGradient(color);
  }

  const handleDownloadCarousel = async () => {
    if (!imageRef.current) return;

    const el = imageRef.current;

    // choose a scale factor (2x or 3x usually looks crisp)
    const scale = 3;

    const style = {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: el.offsetWidth + "px",
      height: el.offsetHeight + "px",
    };

    const options = {
      width: el.offsetWidth * scale,
      height: el.offsetHeight * scale,
      style,
    };

    try {
      const dataUrl = await htmlToImage.toPng(el, options);
      download(dataUrl, "tweet.png");
    } catch (err) {
      console.error("Error exporting image:", err);
    }
  };

  const handleAutoFit = () => {
    setAutoFit(!autoFit);
  }

  const handleAlignMode = () => {
    if (alignMode == 2) {
      setAlignMode(0);
    } else {
      setAlignMode(alignMode + 1);
    }
  }

  const handleAttentionColor = (color: string) => {
    setAttentionColor(color)
  }

  const removeAttachedPhoto = () => {
    setShowAttachedPhoto(false);
    setAttachedPhoto('');
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
            <p className="whitespace-pre-wrap"><p className={`font-semibold inline ${attentionColor}`}>
              {attention}{attention !== "" && ": "}</p>{content}</p>
            {
              showAttachedPhoto && <img src={attachedPhoto} className={clsx(
                "rounded-md mt-4 w-full object-cover",
                autoFit && "max-h-60"
              )} alt="" />
            }

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
          <p className="whitespace-pre-wrap text-gray-900"><p className={`font-semibold inline ${attentionColor}`}>
              {attention}{attention !== "" && ": "}</p>{content}</p>
          {
            showAttachedPhoto && <img src={attachedPhoto} className={clsx(
              "rounded-md mt-4 w-full object-cover",
              autoFit && "max-h-60"
            )} alt="" />
          }
        </div>
      );
    }
  }
  

  return (
    <div className="m-15 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
      {/* Left Menu */}
      <div className="flex flex-col p-8 min-h-[570px] lg:w-2/6 bg-medium rounded-2xl shadow-s">
        <div className="font-bold mb-10 text-xl">
          A&A Carousel Pro
          <p className="font-normal text-sm text-text-muted">
            Export carousel elements that look like tweets.
          </p>
        </div>
        <div className="flex flex-row gap-2 mb-6 items-end justify-between">
          <div className="flex flex-row  gap-2">
            <label
              htmlFor="avatarUpload"
              className={clsx(
                "file-input-label",
                promptProfilePic && "border-1 border-purple-800"
              )}
            >
              <RxAvatar size="32px" />
              <p className="text-sm">Avatar</p>
            </label>
            <input
              type="file"
              accept="image/*"
              id="avatarUpload"
              className="hidden"
              onChange={(e) => {
                handlePfpInput(e);
              }}
            />
            <label
              htmlFor="backgroundUpload"
              className={clsx(
                "aspect-square w-25 bg-light flex flex-col rounded-xl shadow-s justify-center items-center gap-1 text-text-muted",
                promptBackgroundPic && "border-1 border-purple-800"
              )}
            >
              <RxImage size="32px" />
              <p className="text-sm">Background</p>
            </label>
            <input
              type="file"
              accept="image/*"
              id="backgroundUpload"
              className="hidden"
              onChange={(e) => {
                handleBgInput(e);
              }}
            />
          </div>
          {/* Button Row*/}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 h-min text-sm">
            <div
              className="image-control-button bg-light"
              onClick={handleAlignMode}
            >
              <TbBoxAlignBottom
                size="18px"
                color={clsx(!verified && "black")}
                />
            </div>
            <div
              className={clsx(
                "image-control-button",
                verified && "bg-light",
                !verified && "bg-white"
              )}
              onClick={() => {
                setVerified(!verified);
              }}
            >
              <MdOutlineVerified
                size="18px"
                color={clsx(!verified && "black")}
              />
            </div>
            <div
              className={clsx(
                "image-control-button",
                league && "bg-light",
                !showLeague && "bg-white"
              )}
              onClick={() => {
                setShowLeage(!showLeague);
              }}
            >
              <HiOutlineTag size="18px" color={clsx(!showLeague && "black")} />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Name"
          className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-full"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="flex flex-row justify-between gap-2 my-3">
          <input
            type="text"
            placeholder="Handle"
            className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-full"
            onChange={(e) => {
              setHandle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="League"
            className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-full"
            disabled={!showLeague}
            onChange={(e) => {
              setLeague(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row gap-3 items-center justify-start mb-3">
          <input
            type="text"
            placeholder="Attention"
            className="bg-light rounded-4xl px-3 py-1 shadow-s text-muted w-1/3"
            onChange={(e) => {
              setAttention(e.target.value);
            }}
          />
          <div
            className="color-picker bg-twitter-blue bg-gradient-to-b from-transparent to-black/40"
            onClick={() => {
              handleAttentionColor("text-twitter-blue");
            }}
          ></div>
          <div
            className="color-picker bg-brand-orange bg-gradient-to-b from-transparent to-black/40"
            onClick={() => {
              handleAttentionColor("text-brand-orange");
            }}
          ></div>
        </div>
        <textarea
          name=""
          id=""
          placeholder="Content"
          className="bg-light rounded-2xl py-1 px-3 mb-5 shadow-s min-h-20 overflow-y-scroll"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <label
          htmlFor="attachedPhotoUpload"
          className={clsx("file-input-label-big mb-2 cursor-pointer")}
        >
          <AiOutlineFileImage size="32px" />
          <p className="text-sm">Attachment</p>
        </label>
        <input
          type="file"
          accept="image/*"
          id="attachedPhotoUpload"
          className="hidden"
          onChange={(e) => {
            handleAttachedPhotoInput(e);
          }}
        />
        {/* Attached Image Controls */}
        {showAttachedPhoto && (
          <div className="flex flex-row gap-2">
            <div
              className={clsx(
                "image-control-button",
                autoFit && "bg-light",
                !autoFit && "bg-white"
              )}
              onClick={handleAutoFit}
            >
              <TbArrowAutofitHeight color={clsx(!autoFit && "black")} />
            </div>
            <div
              className={clsx(
                "image-control-button bg-light transition duration-125 ease-in-out hover:bg-red-900"
              )}
              onClick={removeAttachedPhoto}
            >
              <MdOutlineDelete color="text-muted" />
            </div>
          </div>
        )}
      </div>

      {/* Composite */}
      <div className="flex flex-col justify-between gap-7">
        <div
          className="flex relative overflow-hidden"
          id="carouselImage"
          ref={imageRef}
        >
          {/* Wordmark */}
          <div className="max-w-14 absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <img src="wordmark.png" alt="" className={clsx(alignMode == 1 && "hidden")} />
          </div>

          {/* Tweet Dark*/}
          {theme == 0 && (
            <div className={clsx(
              "flex flex-col p-5 h-min w-[400px] scale-85 absolute bg-medium rounded-2xl shadow-s z-10",
              alignMode == 0 && "bottom-4",
              alignMode == 1 && "top-4",
              alignMode == 2 && "top-1/2 -translate-y-1/2"
            )}>
              {tweetContents(0)}
            </div>
          )}
          {/* Tweet Navy*/}
          {theme == 1 && (
            <div className={clsx(
              "flex flex-col p-5 h-min w-[400px] scale-85 absolute bg-brand-deep-navy rounded-2xl shadow-s z-10",
              alignMode == 0 && "bottom-4",
              alignMode == 1 && "top-4",
              alignMode == 2 && "top-1/2 -translate-y-1/2"
            )}>
              {tweetContents(0)}
            </div>
          )}
          {/* Tweet Light*/}
          {theme == 2 && (
            <div className={clsx(
              "flex flex-col p-5 h-min w-[400px] scale-85 absolute bg-white rounded-2xl shadow-s z-10",
              alignMode == 0 && "bottom-4",
              alignMode == 1 && "top-4",
              alignMode == 2 && "top-1/2 -translate-y-1/2"
            )}>
              {tweetContents(1)}
            </div>
          )}
          {/* Gradient Overlay */}
          <div
            className={clsx(
              "w-full h-1/2 absolute ",
              gradient == "brand-deep-navy" && "from-brand-deep-navy",
              gradient == "brand-orange" && "from-brand-orange",
              gradient == "brand-white" && "from-brand-white",
              gradient == "brand-black" && "from-brand-black",
              "to-brand-orange/0",
              alignMode == 1 ? "bg-gradient-to-b top-0":"bg-gradient-to-t bottom-0"

            )}
          ></div>
          {/* Gradient Overlay */}
          <div className={clsx(
            "w-full h-1/5 absolute from-black/55 to-black/0",
            alignMode == 1 ? "bottom-0 bg-gradient-to-t" : "top-0 bg-gradient-to-b"
            )}></div>

          {/* Background Image */}
          <img
            src={background}
            alt=""
            className="w-[400px] h-[500px] object-cover"
          />
        </div>
        {/* Button Tray */}
        <div className="flex flex-row gap-2 justify-between items-center bg-light rounded-full px-5 py-2 shadow-m">
          <div className="flex flex-row gap-2 justify-start items-center">
            <div
              className="color-picker  bg-white bg-gradient-to-b from-transparent to-black/40"
              onClick={() => {
                handleGradientChange("brand-white");
              }}
            ></div>
            <div
              className="color-picker h-7 w-7 rounded-full shadow-s cursor-pointer bg-brand-orange bg-gradient-to-t from-transparent to-white/30 "
              onClick={() => {
                handleGradientChange("brand-orange");
              }}
            ></div>
            <div
              className="color-picker h-7 w-7 rounded-full shadow-s cursor-pointer bg-brand-deep-navy bg-gradient-to-t from-transparent to-white/10 "
              onClick={() => {
                handleGradientChange("brand-deep-navy");
              }}
            ></div>
            <div
              className="color-picker bg-black bg-gradient-to-t from-transparent to-white/25 "
              onClick={() => {
                handleGradientChange("brand-black");
              }}
            ></div>
            <div
              className="color-picker bg-light bg-gradient-to-t from-transparent to-white/25 flex justify-center items-center"
              onClick={() => {
                handleGradientChange("transparent");
              }}
            >
            <AiOutlineEyeInvisible />

            </div>
          </div>
          <div>
            <IoMdDownload
              size={25}
              className="transition duration-100 ease-in-out cursor-pointer hover:brightness-75"
              onClick={handleDownloadCarousel}
            />
          </div>
        </div>
      </div>

      {/* Right Menu */}
      <div className="flex flex-col justify-between gap-10">
        <div className="flex flex-col">
          {/* Tweet Dark*/}
          <div
            className="flex flex-col p-5 h-min w-[400px] bg-medium rounded-2xl shadow-s interactive-card"
            onClick={() => {
              handleThemeChange(0);
            }}
            ref={tweetDarkRef}
          >
            {tweetContents(0)}
          </div>
          {/* WIP: Carousel Download Button*/}
          {/* <div className="flex flex-col self-end justify-center items-center w-8 h-8 rounded-full bg-white">
            <IoMdDownload
              size={25}
              className="w-min h-min transition duration-100 ease-in-out cursor-pointer hover:brightness-75"
              onClick={handleDownloadCarousel}
              color="black"
            />
          </div> */}
        </div>
        {/* Tweet Navy*/}
        <div
          className="flex flex-col p-5 h-min w-[400px] bg-brand-deep-navy rounded-2xl shadow-s interactive-card"
          onClick={() => {
            handleThemeChange(1);
          }}
          ref={tweetNavyRef}
        >
          {tweetContents(0)}
        </div>
        {/* Tweet Light*/}
        <div
          className="flex flex-col p-5 h-min w-[400px] bg-white rounded-2xl shadow-white-s interactive-card"
          onClick={() => {
            handleThemeChange(2);
          }}
          ref={tweetLightRef}
        >
          {tweetContents(1)}
        </div>
      </div>
    </div>
  );
}
