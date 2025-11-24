export interface ForecastItem {
    date: string;
    country: string;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    iconUrl: string;
}

export interface FavoriteType {
    name: string;
    country: string;
    forecast: ForecastItem[];
}
