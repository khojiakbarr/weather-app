"use client";

import Image from "next/image";
import hero from "./heroStyle.module.scss";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import useDetermineWeatherType from "../../../hooks/useDetermineWeatherType";
import Loader from "../Loader/Loader";

export default function Hero() {
  const { weatherData, forecastData, status, error } = useSelector(
    (state) => state.weather
  );

  // Memoize weather state and icons
  const weatherDetails = useMemo(() => {
    // console.log(forecastData);
// 
    const statusWeather = useDetermineWeatherType(weatherData);
    const details = [
      {
        icon: "/gradus.svg",
        label: "Температура",
        value: weatherData?.main?.temp ? `${weatherData.main.temp}°` : "N/A",
      },
      {
        icon: "/press.svg",
        label: "Давление",
        value: `${weatherData?.main?.pressure} ртутного столба - нормальное`,
      },
      {
        icon: "/bug.svg",
        label: "Осадки",
        value: "Без осадков",
      },
      {
        icon: "/shamol.svg",
        label: "Ветер",
        value: `${weatherData?.wind?.speed} m/s юго-запад - легкий ветер `,
      },
    ];
    return { statusWeather, details };
  }, [weatherData]);

  const { statusWeather, details } = weatherDetails;

  return (
    <section>
      <div className="container">
        <div className={hero.wrapper}>
          {(status !== "succeeded" || undefined) && <Loader />}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && weatherData && (
            <>
              <div className={hero.card}>
                <div className={hero.mainInfo}>
                  <div className={hero.mainInfoWrapper}>
                    <h2>
                      {weatherData?.main?.temp
                        ? `${weatherData.main.temp}°`
                        : "N/A"}
                    </h2>
                    <div className={hero.myImage}>
                      <Image
                        src={statusWeather}
                        fill
                        alt="icon"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <h3>Сегодня</h3>
                  <p>
                    Время:{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>Город: {weatherData?.name || "N/A"}</p>
                </div>
              </div>

              <div className={hero.card}>
                <div className={hero.otherInfo}>
                  <div className={hero.items}>
                    {details.map((item, index) => (
                      <div key={index} className={hero.verb}>
                        <div className={hero.icon}>
                          <div className={hero.itemIcon}>
                            <Image src={item.icon} fill alt="icon" />
                          </div>
                        </div>
                        <p>{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className={hero.items}>
                    {details.map((item, index) => (
                      <p key={index} className={hero.itemValue}>
                        {item.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
