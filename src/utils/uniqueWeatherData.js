export function uniqueWeatherData(weatherData) {
  return weatherData?.list?.reduce((acc, current) => {
    const currentDate = current.dt_txt.split(" ")[0];
    const currentClock = current.dt_txt.split(" ")[1].slice(0, 5);

    // Faqatgina soat 12:00 bo'lgan sanalarni tanlash
    if (currentClock === "12:00" || currentClock === "09:00") {
      const newObject = { ...current, clock: currentClock };

      const existingDate = acc.find(
        (item) => item.dt_txt.split(" ")[0] === currentDate
      );
      if (!existingDate) {
        acc.push(newObject);
      }
    }

    return acc;
  }, []);
}
