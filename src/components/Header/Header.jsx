import Image from "next/image";
import header from "./Header.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchWeather } from "@/store/sliceses/weatherSlice";
import { useDispatch } from "react-redux";

export default function Header({}) {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    if (localStorage.getItem("darkMode") !== "dark-mode") {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.removeItem("darkMode");
    }
  };

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!city.trim()) {
      dispatch(fetchWeather("tashkent"));
    }
  }, []);

  const searchCity = (searchQuery) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(fetchWeather(searchQuery));
      }
    }, 300);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setCity(newQuery);
    searchCity(newQuery);
  };

  return (
    <header className={header.header}>
      <nav className={`container ${header.wrapper}`}>
        <Link href={"/"} className={header.items}>
          <Image src={"/Header logo.svg"} alt="logo" width={65} height={65} />
          <h1 className={header.logo}>Next Weather</h1>
        </Link>
        <div className={header.items}>
          <button onClick={toggleDarkMode} title="Toggle button">
            <Image
              src={"/toggle.svg"}
              alt="toggle button"
              width={23}
              height={23}
            />
          </button>
          <input
            className={header.search_input}
            type="search"
            placeholder="Выбрать город"
            name="search"
            value={city}
            onChange={handleInputChange}
          />
        </div>
      </nav>
    </header>
  );
}
