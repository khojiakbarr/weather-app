function useDetermineWeatherType(weatherData) {
  const main = weatherData?.weather?.[0]?.main?.toLowerCase() || "";
  const temp = weatherData?.main?.temp;

  if (main.includes("rain")) {
    return temp > 20 ? "/rain_sun.svg" : "/rain.svg";
  } else if (main.includes("clear")) {
    return "/sun.svg";
  } else if (main.includes("clouds")) {
    return temp > 20 ? "/rain_min.svg" : "/cloud.svg";
  } else {
    return "/cloud.svg";
  }
}

export default useDetermineWeatherType;
