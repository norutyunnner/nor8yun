import { useEffect, useState, useRef } from "react";

const AD_VIDEO = "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";

export default function VideoWithAds({ video }) {
  const [currentStep, setCurrentStep] = useState("pre");
  const [midPlayed, setMidPlayed] = useState(false);
  const videoRef = useRef(null);

  const VIDEO_TYPE = video?.type;
  const VIDEO_URL = video?.url;
  const YT_ID = video?.youtubeId;

  const PRE_ROLL_AD = AD_VIDEO;
  const MID_ROLL_AD = AD_VIDEO;
  const POST_ROLL_AD = AD_VIDEO;

  const isYoutube = VIDEO_TYPE === "youtube";
  const isMp4 = VIDEO_TYPE === "mp4";

  useEffect(() => {
    setMidPlayed(false);
    setCurrentStep("pre");
  }, [video?.url, video?.youtubeId]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleEnded = () => {
      if (currentStep === "pre") setCurrentStep("main");
      else if (currentStep === "mid") setCurrentStep("main");
      else if (currentStep === "main") setCurrentStep("post");
      else if (currentStep === "post") setCurrentStep("finish");
    };

    v.addEventListener("ended", handleEnded);
    return () => v.removeEventListener("ended", handleEnded);
  }, [currentStep]);

  const handleMainVideoProgress = (e) => {
    const v = e.target;
    const half = v.duration / 2;

    if (!midPlayed && v.currentTime >= half) {
      setMidPlayed(true);
      setCurrentStep("mid");
    }
  };

  const renderVideo = () => {
    if (isYoutube && YT_ID) {
      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${YT_ID}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (!VIDEO_URL) return <p>No video</p>;

    if (currentStep === "pre") {
      return <video ref={videoRef} src={PRE_ROLL_AD} autoPlay controls />;
    }

    if (currentStep === "main") {
      return (
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          controls
          onTimeUpdate={handleMainVideoProgress}
        />
      );
    }

    if (currentStep === "mid") {
      return <video ref={videoRef} src={MID_ROLL_AD} autoPlay controls />;
    }

    if (currentStep === "post") {
      return <video ref={videoRef} src={POST_ROLL_AD} autoPlay controls />;
    }

    return <p>🎬 done</p>;
  };

  return <div className="max-w-3xl mx-auto">{renderVideo()}</div>;
}

