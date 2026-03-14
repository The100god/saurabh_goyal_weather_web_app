
"use client";
import axios from "axios";
import format from "date-fns/format";
import { fromUnixTime, parseISO } from "date-fns";
import { useQuery } from "react-query";
import Container from "../components/Container/page";
import convertKelvinToCelsius from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "../components/weatherIcon/page";
import getDayOrNightIcon from "@/utils/getDayOrNightIcon";
import WeatherDetail from "../components/WeatherDetail/page";
import metersToKilometers from "@/utils/meterToKilometers";
import convertWindSpeed from "@/utils/convertWindSpeed";
import ForcastWeatherDetail from "../components/ForcastWeatherDetail/page";
import { historyDataList, loadingCityAtom, placeAtom } from "../atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Navbar from "../components/Header/page";
import convertKelvinToFarenhite from "@/utils/convertKelvinToFarenhite";
import MainHome from "../components/MainPage/page";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
export const dynamic = "force-dynamic";
const weatherData = {
  cod: "200",
  message: 0,
  cnt: 3,
  list: [
    {
      dt: 1712674800,
      main: {
        temp: 306.42,
        feels_like: 303.98,
        temp_min: 306.42,
        temp_max: 306.42,
        pressure: 1007,
        sea_level: 1007,
        grnd_level: 981,
        humidity: 10,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 3.01,
        deg: 228,
        gust: 4.41,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2024-04-09 15:00:00",
    },
    // Additional weather data objects here...
  ],
  city: {
    id: 1268865,
    name: "Jodhpur",
    coord: {
      lat: 26.2867,
      lon: 73.03,
    },
    country: "IN",
    population: 921476,
    timezone: 19800,
    sunrise: 1712623813,
    sunset: 1712669292,
  },
};

// Export the weatherData object
// module.exports = weatherData;
const initialTempData ={
  displayTemp: "",
  displayTempMin: "",
  displayTempMax: "",
  displayTempFeelsLike: ""
}

// api.openweathermap.org/data/2.5/forecast?q=jodhpur&appid=b8661672b20c721d980e3be48aa19729
const Home = () => {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);
  const [celcious, setCelcious] = useState(true)
  const [kelvin, setKelvin] = useState(false)
  const [feranhite, setFeranhite] = useState(false)
  const [displayTempData, setDisplayTempData] = useState(initialTempData)
  const [favourite, setFavourite] = useState(false);
  const [favouriteList, setFavouriteList] =useState([])
  const [historyList, setHistoryList] =useAtom(historyDataList)

  const { isPending, error, data, refetch } = useQuery("repoData", async () => {
    
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    return data;
  });

  useEffect(()=>{
    
    refetch();
    
  },[place, refetch])

  useEffect(()=>{
    setHistoryList([...historyList, place])
    // console.log("historyList", historyList)
    localStorage.setItem("hisList", [...historyList, place])
  },[place, historyList, setHistoryList])
  
  
  const handleChangeInCelciousTempScale = (firstData)=>{
    let tempOr = convertKelvinToCelsius(firstData?.main.temp ?? 296.37).toString() + "°C"
    let tempMin = convertKelvinToCelsius(firstData?.main.temp_min ?? 296.37).toString() + "°C"
    let tempMax = convertKelvinToCelsius(firstData?.main.temp_max ?? 296.37).toString() + "°C"
    let tempFeelsLike = convertKelvinToCelsius(firstData?.main.feels_like ?? 0).toString() + "°C"
      setDisplayTempData({
        displayTemp: tempOr,
        displayTempMin: tempMin,
        displayTempMax: tempMax,
        displayTempFeelsLike: tempFeelsLike
      })
  }
  const handleChangeInKelvinTempScale = (firstData)=>{
    let tempOr = (firstData?.main.temp ?? 296.37).toString() + "K"
    let tempMin = (firstData?.main.temp_min ?? 296.37).toString() + "K"
    let tempMax = (firstData?.main.temp_max ?? 296.37).toString() + "K"
    let tempFeelsLike = (firstData?.main.feels_like ?? 0).toString() + "K"
      setDisplayTempData({
        displayTemp: tempOr,
        displayTempMin: tempMin,
        displayTempMax: tempMax,
        displayTempFeelsLike: tempFeelsLike
      })
  }
  const handleChangeInFeranhiteTempScale = (firstData)=>{
    let tempOr = convertKelvinToFarenhite(firstData?.main.temp ?? 296.37).toString() + "°F"
    let tempMin = convertKelvinToFarenhite(firstData?.main.temp_min ?? 296.37).toString() + "°F"
    let tempMax = convertKelvinToFarenhite(firstData?.main.temp_max ?? 296.37).toString() + "°F"
    let tempFeelsLike = convertKelvinToFarenhite(firstData?.main.feels_like ?? 0).toString() + "°F"
      setDisplayTempData({
        displayTemp: tempOr,
        displayTempMin: tempMin,
        displayTempMax: tempMax,
        displayTempFeelsLike: tempFeelsLike
      })
  }

  // const handleChangeInTempScale = (firstData)=>{
  //   var tempOr= ""
  //   var tempMin= ""
  //   var tempMax= ""
  //   var tempFeelsLike= ""
  //   console.log("kelvin", kelvin)
  //   if (celcious === true){
  //     tempOr = convertKelvinToCelsius(firstData?.main.temp ?? 296.37).toString() + "°C"
  //     tempMin = convertKelvinToCelsius(firstData?.main.temp_min ?? 296.37).toString() + "°C"
  //     tempMax = convertKelvinToCelsius(firstData?.main.temp_max ?? 296.37).toString() + "°C"
  //     tempFeelsLike = convertKelvinToCelsius(firstData?.main.feels_like ?? 0).toString() + "°C"
  //     setDisplayTempData({
  //       displayTemp: tempOr,
  //       displayTempMin: tempMin,
  //       displayTempMax: tempMax,
  //       displayTempFeelsLike: tempFeelsLike
  //     })
  //     setKelvin(false)
  //     setFeranhite(false)
  //   } 
  //   else if( kelvin === true){
      
  //     tempOr = (firstData?.main.temp ?? 296.37).toString() + "K"
  //     tempMin = (firstData?.main.temp_min ?? 296.37).toString() + "K"
  //     tempMax = (firstData?.main.temp_max ?? 296.37).toString() + "K"
  //     tempFeelsLike = (firstData?.main.feels_like ?? 0).toString() + "K"
  //     setDisplayTempData({
  //       displayTemp: tempOr,
  //       displayTempMin: tempMin,
  //       displayTempMax: tempMax,
  //       displayTempFeelsLike: tempFeelsLike
  //     })
  //     setFeranhite(false)
  //     setCelcious(false)
  //   } 
  //   else if(feranhite === true){
  //     tempOr = convertKelvinToFarenhite(firstData?.main.temp ?? 296.37).toString() + "°F"
  //     tempMin = convertKelvinToFarenhite(firstData?.main.temp_min ?? 296.37).toString() + "°F"
  //     tempMax = convertKelvinToFarenhite(firstData?.main.temp_max ?? 296.37).toString() + "°F"
  //     tempFeelsLike = convertKelvinToFarenhite(firstData?.main.feels_like ?? 0).toString() + "°F"
  //     setDisplayTempData({
  //       displayTemp: tempOr,
  //       displayTempMin: tempMin,
  //       displayTempMax: tempMax,
  //       displayTempFeelsLike: tempFeelsLike
  //     })
  //     setKelvin(false)
  //     setCelcious(false)
  //   }else{
  //     tempOr = convertKelvinToCelsius(firstData?.main.temp ?? 296.37).toString() + "°C"
  //     tempMin = convertKelvinToCelsius(firstData?.main.temp_min ?? 296.37).toString() + "°C"
  //     tempMax = convertKelvinToCelsius(firstData?.main.temp_max ?? 296.37).toString() + "°C"
  //     tempFeelsLike = convertKelvinToCelsius(firstData?.main.feels_like ?? 0).toString() + "°C"
  //     setDisplayTempData({
  //       displayTemp: tempOr,
  //       displayTempMin: tempMin,
  //       displayTempMax: tempMax,
  //       displayTempFeelsLike: tempFeelsLike
  //     })
  //     setKelvin(false)
  //     setFeranhite(false)
  //     setCelcious(true)
  //   }
    
  // }
  

// console.log("displayTempData", displayTempData)
  const firstData = data?.list[0];
  const dtTxt = firstData?.dt_txt ?? "";

  const milgya = (arr,place) => {
    // console.log("pl",place)
    // console.log("arrr,", arr)
    let arrr= arr.split(',')
    for (let i=0; i<arrr.length; i++) {
      // console.log("arr",arrr[i].toUpperCase())
      if(arrr[i].toUpperCase() === place.toUpperCase()) {
        return true
      }
    }
    return false
  }

  useEffect(()=>{
    
    
    // console.log("historyList", historyList)
    

    let newHisList = localStorage.getItem('hisList')
    let newHisListArr = newHisList?.split(',')
    let newList = localStorage.getItem("favList")
    let newListArr= newList?.split(',')
    
    if (typeof(newListArr) != "undefined"){
      if (newListArr.length === 1 && newListArr[0]===""){
        setFavouriteList([])
      }else{

        setFavouriteList(newListArr)
      }
    }else{
      
      setFavouriteList([])
    }

    if (typeof(newHisListArr) != "undefined"){
      if (newHisListArr.length === 1 && newHisListArr[0]===""){
        setHistoryList([...historyList, place])
        localStorage.setItem("hisList", [...historyList, place])
      }else{

        setHistoryList([...newHisListArr])
        localStorage.setItem("hisList", [...newHisListArr])
      }
    }else{
      
      setHistoryList([...historyList, place])
      localStorage.setItem("hisList", [...historyList, place])
    }

    
    
  },[historyList, setHistoryList, setFavouriteList, place])

  useEffect(()=>{
    
    // setHistoryList([...historyList, place])
    // // console.log("historyList", historyList)
    // localStorage.setItem("hisList", [...historyList, place])
    setFavourite(false)
    let favList = localStorage.getItem("favList")
    let mila= favList?.length>0 ? milgya(favList,place):false;
    if(mila) {
      setFavourite(true)
    }

    // console.log("firstData", firstData)
    let tempOr = convertKelvinToCelsius(firstData?.main.temp ?? 296.37).toString() + "°C"
    let tempMin = convertKelvinToCelsius(firstData?.main.temp_min ?? 296.37).toString() + "°C"
    let tempMax = convertKelvinToCelsius(firstData?.main.temp_max ?? 296.37).toString() + "°C"
    let tempFeelsLike = convertKelvinToCelsius(firstData?.main.feels_like ?? 0).toString() + "°C"
      setDisplayTempData({
        displayTemp: tempOr,
        displayTempMin: tempMin,
        displayTempMax: tempMax,
        displayTempFeelsLike: tempFeelsLike
      })
  },[place,firstData])
  // console.log("fd",firstData)
  // console.log("data", data);
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  const handleAddFavourite = (addPlace)=>{
    setFavourite(true)
    let l = [...favouriteList, addPlace] 
    setFavouriteList(l)
    localStorage.setItem("favList", l)
  }
  // console.log("favouriteList", favouriteList)
  const handleRemoveFavourite = (removePlace)=>{
    setFavourite(false)
    let listArray = favouriteList.filter((val)=>{
      return val !== removePlace
    })
    // console.log("ListArray", listArray )
    setFavouriteList(listArray)

    localStorage.setItem("favList", listArray)
  }

  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">

    <Navbar location={data?.city.name} favouriteList={favouriteList} handleRemoveFavourite={handleRemoveFavourite}/>
    
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>

        <section className="space-y-4 ">
          <div className="space-y-2 ">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>
                {firstData?.dt_txt ?? ""
                  ? format(parseISO(firstData?.dt_txt ?? ""), "EEEE")
                  : ""}
              </p>
              <p className=" text-sm text-red-400">
                (
                {firstData?.dt_txt ?? ""
                  ? format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")
                  : ""}
                )
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center flex flex-col md:flex-row ">
              <div className="flex flex-row px-4">
              <div className="flex flex-col text-[30px] cursor-pointer w-[fit-content] h-[fit-content]">
              {favourite?<IoIosHeart fill="red" onClick={()=>{
                handleRemoveFavourite(place);
                
              }}/>:<IoIosHeartEmpty fill={"red"} onClick={()=>{
                handleAddFavourite(place);
                
              }}/>}
              
              
              </div>
              <div className="flex flex-col px-4 justify-center items-center gap-1">
                <span className=" text-4xl">
                  {displayTempData.displayTemp}
                </span>
                <p className=" text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {displayTempData.displayTempFeelsLike}
                  </span>
                </p>
                <p className="flex flex-row gap-1 justify-center items-center">
                  <span className="p-1">
                    {displayTempData.displayTempMin}↓{" "}
                  </span>
                  <span className="p-1">
                    {displayTempData.displayTempMax}↑{" "}
                  </span>
                </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300/30 justify-center items-center text-center" onClick={()=>{
                    setCelcious(true)
                    setKelvin(false)
                    setFeranhite(false)
                    handleChangeInCelciousTempScale(firstData)
                  }}>°C</span>
                  <span className="px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300/30 justify-center items-center text-center" onClick={()=>{
                    setCelcious(false)
                    setKelvin(true)
                    setFeranhite(false)
                    handleChangeInKelvinTempScale(firstData)
                  }}>K</span>
                  <span className="px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300/30 justify-center items-center text-center" onClick={()=>{
                   setCelcious(false)
                    setKelvin(false)
                    setFeranhite(true)
                   handleChangeInFeranhiteTempScale(firstData)
                  }}>°F</span>
                </div>
              </div>
              <div className=" scroll-container flex gap-10 sm:gap-16 justify-between overflow-x-auto w-full pr-3 scroll-smooth ">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className=" whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>

                    <WeatherIcon
                      iconname={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    {/* <WeatherIcon iconName={d?.weather[0].icon}/> */}
                    <p>{kelvin? (d?.main.temp ?? 0) +"K" : celcious? convertKelvinToCelsius(d?.main.temp ?? 0) + "°C": convertKelvinToFarenhite(d?.main.temp ?? 0) + "°F"}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/* left */}
            <Container className="w-fit  justify-center flex-col px-4 items-center">
              <p className=" capitalize text-center font-[500]">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconname={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
              />
            </Container>
            {/* right */}
            <Container className=" bg-gradient-to-b from-cyan-200 px-6 gap-4 overflow-x-auto justify-between">
              <WeatherDetail
                visability={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")}
                // sunrise={}
                sunset={format(data?.city.sunset ?? 1702517657, "H:mm")}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </Container>
          </div>
        </section>
        {/* 5 day forcasting data */}
        <section className=" flex w-full flex-col gap-4">
          <p className=" text-2xl">Forcast (5 days)</p>
          {firstDataForEachDate.slice(1,).map((d, i) => (
            <ForcastWeatherDetail
              key={i}
              description={d?.weather[0].description ?? ""}
              weatehrIcon={d?.weather[0].icon ?? "01d"}
              date={d?.dt_txt?? ""?format(parseISO(d?.dt_txt?? ""), "dd.MM"):""}
              day={d?.dt_txt?? ""?format(parseISO(d?.dt_txt ?? ""), "EEEE"):""}
              feels_like={kelvin? (d?.main.feels_like ?? 0)+"K"  : celcious? convertKelvinToCelsius(d?.main.feels_like ?? 0) + "°C": convertKelvinToFarenhite(d?.main.feels_like ?? 0)+"°F"}
              // temp={d?.main.temp ?? 0}
              temp={kelvin? (d?.main.temp ?? 0)+"K"  : celcious? convertKelvinToCelsius(d?.main.temp ?? 0) + "°C": convertKelvinToFarenhite(d?.main.temp ?? 0)+"°F"}
              temp_max={kelvin? (d?.main.temp_max ?? 0)+"K"  : celcious? convertKelvinToCelsius(d?.main.temp_max ?? 0) + "°C": convertKelvinToFarenhite(d?.main.temp_max ?? 0)+"°F"}
              temp_min={kelvin? (d?.main.temp_min ?? 0)+"K"  : celcious? convertKelvinToCelsius(d?.main.temp_min ?? 0) + "°C": convertKelvinToFarenhite(d?.main.temp_min ?? 0)+"°F"}
              airPressure={`${d?.main.pressure} hPa `}
              humidity={`${d?.main.humidity}% `}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1702517657),
                "H:mm"
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1702517657),
                "H:mm"
              )}
              visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
              windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
            />
          ))}
        </section>
          </>)}
      </main>

      <MainHome />
    </div>
  );
};

export default Home;



const WeatherSkeleton =()=> {
  return (
    <section className="space-y-8 ">
      {/* Today's data skeleton */}
      <div className="space-y-2 animate-pulse">
        {/* Date skeleton */}
        <div className="flex gap-1 text-2xl items-end ">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* Time wise temperature skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 days forecast skeleton */}
      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
