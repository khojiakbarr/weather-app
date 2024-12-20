"use client";

import { useSelector } from "react-redux";
import WeatherCard from "./WeatherCard";
import weather from "./weatherStyle.module.scss";
import { formatDate } from "@/utils/formatDate";
import { uniqueWeatherData } from "@/utils/uniqueWeatherData";
import { useMemo } from "react";
import useDetermineWeatherType from "../../../hooks/useDetermineWeatherType";

export const determineWeatherType = (weatherData) => {
  const main = weatherData.weather[0].main.toLowerCase();
  const temp = weatherData.main.temp;

  if (main.includes("rain")) {
    if (temp > 20) return "Небольшой дождь и солнце";
    return "Дождь";
  } else if (main.includes("clear")) {
    return "Ясно";
  } else if (main.includes("clouds")) {
    if (temp > 20) return "Небольшой дождь";
    return "Пасмурно";
  } else {
    return "Неопределенная погода";
  }
};
export default function Weathers() {
  const { weatherData, forecastData, status, error } = useSelector(
    (state) => state.weather
  );

  const week = useMemo(() => {
    return uniqueWeatherData(forecastData);
  }, [forecastData]);

  return (
    <section className={weather.weathers}>
      <div className="container">
        <ul>
          <div className={weather.weatherWrapper}>
            {status === "succeeded" &&
              week?.map((day, index) => (
                <WeatherCard
                  key={index}
                  data={formatDate(day.dt_txt)}
                  clock={day.clock}
                  gradus={day.main.temp + "°C"}
                  icon={useDetermineWeatherType(day)}
                  info={determineWeatherType(day)}
                />
              ))}
          </div>
        </ul>
      </div>
    </section>
  );
}
