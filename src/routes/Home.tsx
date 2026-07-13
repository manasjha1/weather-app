import { useState } from "react";
import {
    CircleAlert,
    Cloud,
    Droplets,
    LoaderPinwheel,
    Sparkles,
    Thermometer,
    Wind,
} from "lucide-react";
import { Headers } from "@/components/Headers";

const api = {
    key: "8855ed27cd7f0fd3888d92e546c739b2",
};

interface weatherProps {
    description: string;
    icon: string;
}

interface WeatherData {
    main?: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    name: string;
    sys?: {
        country: string;
    };
    wind?: {
        speed: number;
    };
    clouds?: {
        all: number;
    };
    weather: weatherProps[];
}

function Home() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");



    const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement> | string) => {
        if (!city.trim()) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${api.key}`,
            );
            const result = await res.json();

            if (!res.ok || result.cod !== 200) {
                setWeather(null);
                setError(result.message || "City not found. Try another one.");
                return;
            }

            setWeather(result as WeatherData);
        } catch {
            setWeather(null);
            setError("Unable to load weather right now. Please try again.");
        } finally {
            setIsLoading(false);
            setCity("");
        }

        if (typeof event !== "string") {
            event.preventDefault();
        }
    };

    return (
        <div className="min-h-screen bg-transparent px-4 pb-10 pt-28 sm:px-6 lg:px-8">
            <Headers handleSearch={handleSearch} city={city} setCity={setCity} isLoading={isLoading} />

            <main className="mx-auto flex max-w-7xl flex-col gap-6">
                <section className="glass-panel relative overflow-hidden p-4 sm:p-6 lg:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.2),transparent_35%)]" />
                    <div className="relative z-10">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                                    <Sparkles className="h-4 w-4" />
                                    Live forecast experience
                                </div>
                                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                    Weather that feels immersive.
                                </h1>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                                    Search any city and enjoy a polished, responsive forecast view with a bold 3D-inspired finish.
                                </p>
                            </div>

                            <div className="neo-card w-full max-w-xs p-4 text-sm text-slate-300 lg:ml-auto">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Today</p>
                                <p className="mt-2 text-2xl font-semibold text-white">Cloudy skies</p>
                                <p className="mt-1 text-slate-400">Smooth, cinematic updates in every screen size.</p>
                            </div>
                        </div>

                        <div className="mt-6 flex min-h-80 items-center justify-center">
                            <div className={`flex w-full items-center justify-center ${isLoading ? "block" : "hidden"}`}>
                                <LoaderPinwheel className="h-12 w-12 animate-spin text-cyan-300" />
                            </div>

                            {!isLoading && weather ? (
                                <div className="w-full">
                                    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                                        <div className="neo-card p-5 sm:p-6">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Current weather</p>
                                                    <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                                                        {weather.name}, {weather.sys?.country}
                                                    </h2>
                                                    <div className="mt-4 flex items-end gap-3">
                                                        <span className="text-5xl font-semibold text-white sm:text-6xl">
                                                            {Math.round(weather.main?.temp ?? 0)}°
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-medium capitalize text-slate-200">
                                                                {weather.weather[0]?.description}
                                                            </p>
                                                            <p className="text-sm text-slate-400">
                                                                Feels like {Math.round(weather.main?.feels_like ?? 0)}°
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-center rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-4 shadow-[0_20px_40px_rgba(34,211,238,0.15)]">
                                                    {weather.weather[0]?.icon && (
                                                        <img
                                                            className="h-24 w-24 sm:h-28 sm:w-28"
                                                            src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
                                                            alt="weather icon"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                                                    <div className="flex items-center gap-2 text-sky-400">
                                                        <Wind className="h-4 w-4" />
                                                        <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Wind</span>
                                                    </div>
                                                    <p className="mt-2 text-lg font-semibold text-white">{weather.wind?.speed} km/h</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                                                    <div className="flex items-center gap-2 text-cyan-400">
                                                        <Droplets className="h-4 w-4" />
                                                        <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Humidity</span>
                                                    </div>
                                                    <p className="mt-2 text-lg font-semibold text-white">{weather.main?.humidity}%</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                                                    <div className="flex items-center gap-2 text-orange-400">
                                                        <Thermometer className="h-4 w-4" />
                                                        <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Pressure</span>
                                                    </div>
                                                    <p className="mt-2 text-lg font-semibold text-white">{weather.main?.pressure} hpa</p>
                                                </div>
                                                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                                                    <div className="flex items-center gap-2 text-violet-400">
                                                        <Cloud className="h-4 w-4" />
                                                        <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Clouds</span>
                                                    </div>
                                                    <p className="mt-2 text-lg font-semibold text-white">{weather.clouds?.all}%</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="neo-card flex flex-col justify-between p-5 sm:p-6">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Atmosphere</p>
                                                <h3 className="mt-3 text-2xl font-semibold text-white">A spotless, polished look</h3>
                                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                                    The layout shifts naturally from mobile to desktop while keeping the visual depth and clarity intact.
                                                </p>
                                            </div>
                                            <div className="mt-6 rounded-2xl border border-white/10 bg-linear-to-br from-sky-500/20 to-violet-500/20 p-4">
                                                <p className="text-sm text-slate-200">Tip</p>
                                                <p className="mt-1 text-sm text-slate-300">Try searching for a city like London, Tokyo, or New York.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="neo-card flex w-full max-w-2xl flex-col items-center justify-center gap-3 px-6 py-12 text-center sm:px-10">
                                    <CircleAlert className="h-10 w-10 text-cyan-300" />
                                    <h2 className="text-2xl font-semibold text-white">Search a city to begin</h2>
                                    <p className="max-w-md text-sm leading-6 text-slate-400">
                                        {error || "Enter any city above and the forecast will appear here with a rich, glass-like 3D presentation."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;