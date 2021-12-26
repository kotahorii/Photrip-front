export const Help = () => {
  return (
    <div className="w-full min-h-screen font-notoSans flex flex-col text-gray-500 items-center bg-gray-100">
      <div className=" max-w-lg w-full min-h-screen p-1">
        <h1 className="flex flex-row items-center justify-center text-3xl w-full p-8 font-semibold">
          <div className="h-14 w-14">
            <img
              className="h-full w-full"
              src={`${process.env.PUBLIC_URL}/application_icon.png`}
              alt="application-icon"
            />
          </div>
          <span className="font-merriweather">Photrip</span>
        </h1>
        <p className="text-xl">
          <span className="font-merriweather">Photrip</span>
          は旅行の体験を共有したいユーザーと、旅行に行きたいと思うユーザーを繋ぐためのサービスです。
        </p>
      </div>
    </div>
  )
}
