import React, { useEffect, useState } from "react";
import { ModalCloseButton } from "./ModalCloseButton";
import useFetch from "../../hooks/useFetch";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherShower,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy
} from "react-icons/ti";

interface MapWeatherModalProps {
  isWeatherModalOpen: boolean;
  setIsWeatherModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapWeatherModal = (props: MapWeatherModalProps) => {
  const { isWeatherModalOpen, setIsWeatherModalOpen } = props;
  const fetch = useFetch();
  const [weather24HrForecasts, setWeather24HrForecasts] =
    useState<WeatherForecast24HrDataSchema>();
  const [weather4DayForecasts, setWeather4DayForecasts] =
    useState<WeatherForecast4DayDataSchema>();

  const date = new Date();

  useEffect(() => {
    const handleWeatherQuery = async () => {
      const currentDate = date.toLocaleDateString();
      const dateString = `${currentDate.substring(
        6,
        10
      )}-${currentDate.substring(3, 5)}-${currentDate.substring(0, 2)}`;

      const weather24HrForecastsData = await fetch.get(
        `/weather/24-hour/${dateString}`
      );
      const weather4DayForecastsData = await fetch.get(
        `/weather/4-day/${dateString}`
      );
      setWeather24HrForecasts(weather24HrForecastsData);
      setWeather4DayForecasts(weather4DayForecastsData);
    };

    handleWeatherQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isWeatherModalOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] px-4 py-3 rounded bg-[#E3F6F5]">
          {/* Title */}
          <div className="flex flex-col items-center">
            <div className="font-bold text-[22px]">Weather Forecast</div>
            <div className="text-[14px] italic">
              Singapore | {date.toLocaleDateString()}
            </div>
          </div>

          {/* Weather Forecast */}
          {/* 24 Hour */}
          {weather24HrForecasts && (
            <div className="mt-4">
              <div className="font-bold underline text-[14px] text-center mb-1">
                24 Hours
              </div>
              <div className="flex flex-col gap-1">
                {REGIONS.map(region => (
                  <RegionWeatherForecast24HrRow
                    key={region}
                    weather24HrForecasts={weather24HrForecasts}
                    getWeatherIcon={getWeatherIcon}
                    region={region}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4 Day */}
          {weather4DayForecasts && (
            <div className="mt-4">
              <div className="font-bold underline text-[14px] text-center mb-1">
                4 Days
              </div>
              <div className="flex flex-row justify-around gap-1">
                {weather4DayForecasts.periods.map(period => (
                  <div
                    key={`${period.date}-${period.forecast}`}
                    className="flex flex-col items-center"
                  >
                    {getWeatherIcon(period.forecast)}
                    <span className="text-[10px] font-bold">
                      {new Date(period.date).toDateString().substring(4, 10)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          <ModalCloseButton setIsModalOpen={setIsWeatherModalOpen} />
        </div>
      )}
    </>
  );
};

// Weather
const weatherClassNames = "w-[28px] h-[28px]";
const weatherIconsMap = {
  cloudy: <TiWeatherCloudy className={weatherClassNames} />,
  sunny: <TiWeatherSunny className={weatherClassNames} />,
  thundery: <TiWeatherStormy className={weatherClassNames} />,
  stormy: <TiWeatherStormy className={weatherClassNames} />,
  shower: <TiWeatherShower className={weatherClassNames} />,
  windy: <TiWeatherWindyCloudy className={weatherClassNames} />,
  downpour: <TiWeatherDownpour />,
  night: <TiWeatherNight className={weatherClassNames} />
};
type weatherTypes =
  | "cloudy"
  | "sunny"
  | "thundery"
  | "stormy"
  | "shower"
  | "windy"
  | "downpour"
  | "night";

const getWeatherIcon = (weatherForecastString: string) => {
  for (let weather in weatherIconsMap) {
    if (weatherForecastString.toLowerCase().includes(weather.toLowerCase())) {
      return weatherIconsMap[weather as weatherTypes];
    }
  }
  // default
  return weatherIconsMap["cloudy"];
};

const REGIONS = ["north", "south", "east", "west", "central"] as const;
type RegionType = (typeof REGIONS)[number];

interface RegionWeatherForecast24HrRowProps {
  weather24HrForecasts: WeatherForecast24HrDataSchema;
  getWeatherIcon: (weatherForecastString: string) => JSX.Element;
  region: RegionType;
}

const RegionWeatherForecast24HrRow = (
  props: RegionWeatherForecast24HrRowProps
) => {
  const { getWeatherIcon, weather24HrForecasts, region } = props;

  return (
    <div className="flex gap-3 items-center">
      <div className="font-bold text-[14px] min-w-[50px]">
        {region.substring(0, 1).toUpperCase() + region.substring(1)}:
      </div>
      <div className="flex flex-wrap justify-between w-full gap-x-3 row-y-0">
        {weather24HrForecasts.periods.map(forecast => (
          <div
            key={`${forecast.time}-${forecast.regions[region]}`}
            className="flex flex-col items-center"
          >
            {getWeatherIcon(forecast.regions[region])}
            <span className="text-[10px]">
              {forecast.time.start.substring(0, 5)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface WeatherForecast24HrDataSchema {
  lastUpdated: string;
  generalForecast: string;
  periods: {
    time: {
      start: string;
      end: string;
      startDate: string;
      endDate: string;
    };
    regions: {
      west: string;
      east: string;
      central: string;
      south: string;
      north: string;
    };
  }[];
}

interface WeatherForecast4DayDataSchema {
  lastUpdated: string;
  periods: {
    date: string;
    forecast: string;
  }[];
}
