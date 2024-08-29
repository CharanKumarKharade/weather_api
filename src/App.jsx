import { useState } from "react";

function App() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");
  let [isloading, setIsLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metrics`
    ).then((res) =>
      res.json().then((finalResult) => {
        if (finalResult.cod == "404") {
          setWeather("");
        } else {
           setIsLoading(false);
          setWeather(finalResult);
        }
      })
    );
   
    setCity("");
  };

  console.log(weather);
  return (
    <div className=" bg-back bg-cover py-3 ">
      <h1 className="text-center font-bold text-4xl">Weather API</h1>
      <div
        className=" h-[200px] my-5 text-center   
      w-full"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-2xl text-[20px] ring-blue-500 border-blue-500 
          my-2 text-black font-semibold font-mono 
          text-center w-[80%] p-2 border-2 focus:border-blue-900  "
        />

        <button
          onClick={handleSubmit}
          className="mx-2 rounded-lg border h-12 p-2 w-[10%] ring-4 hover:text-white font-bold  ring-blue-400 border-gray-900  
        hover:ring-blue-900
        "
        >
          Submit
        </button>
      </div>
      <div
        className="flex sm:mx-[20%] md:mx-[35%] flex-col mt-[-60px] items-center 
       bg-blue-400 h-[300px] w-[400px]"
      >
        <img
          src="https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif"
          width={250}
          className={`my-10 absolute ${isloading ? "" : "hidden"}`}
        />
        {weather != "" ? (
          <>
            <h2 className="text-[30px]  font-semibold my-10 ">
              {weather.name} ({weather.sys.country})
            </h2>
            <p className="text-xl font-medium text-white my-5">
              {weather.main.temp} K
            </p>
            <img
              className=" my-2"
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            />
            <p className="text-lg font-medium">{weather.weather[0].main}</p>
          </>
        ) : (
          <p className="text-lg my-[50%] font-medium">No data found</p>
        )}
      </div>
    </div>
  );
}

export default App;
