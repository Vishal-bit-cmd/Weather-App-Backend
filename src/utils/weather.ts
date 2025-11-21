import axios from "axios";

export const fetch5DayForecast = async (city: string) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    if (!API_KEY) throw new Error("OpenWeather API key missing");

    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const { data } = await axios.get(url);

        const grouped: Record<string, any[]> = {};
        data.list.forEach((item: any) => {
            const date = item.dt_txt.split(" ")[0];
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(item);
        });

        const forecast = Object.keys(grouped).map(date => {
            const dayData = grouped[date];
            const temps = dayData.map(d => d.main.temp);
            const maxTemps = dayData.map(d => d.main.temp_max);
            const minTemps = dayData.map(d => d.main.temp_min);
            const conditions = dayData.map(d => d.weather[0].main);

            const condition = conditions
                .sort((a, b) =>
                    conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
                )
                .pop();

            const icon = dayData[0].weather[0].icon;

            return {
                date,
                country: data.city.country,
                avgTemp: Number((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)),
                maxTemp: Math.max(...maxTemps),
                minTemp: Math.min(...minTemps),
                condition,
                icon,
                iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
            };
        });

        return forecast;
    } catch (err: any) {
        if (err.response?.data?.message) throw new Error(err.response.data.message);
        throw new Error("Failed fetching weather from API");
    }
};
