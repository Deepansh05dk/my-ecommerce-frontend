const Billboard = () => {
  return (
    <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
      <video
        poster="https://assets.angara.com/promotion/banners/USA_Banners/2024/July/01-07-1-Angara-Desktop-Hero-Banner.jpg?width=1920&amp;quality=95"
        id="usdefaulthomepagebannerdesktop"
        preload="true"
        loop
        autoPlay
        playsInline
        className=" w-full h-full max-w-full"
      >
        <source
          src="https://assets.angara.com/promotion/banners/USA_Banners/2024/July/01-07-1-Angara-Desktop-Hero-Banner.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Billboard;
