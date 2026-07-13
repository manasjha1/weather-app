import { MapPin, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";

export interface WheatherData {
    handleSearch: (event: React.KeyboardEvent<HTMLInputElement> | string) => void;
    city: string;
    setCity: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
}

export const Headers = ({ handleSearch, city, setCity, isLoading }: WheatherData) => {
    return (
        <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
                <div className="flex items-center justify-between gap-3 sm:justify-start">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-cyan-400 shadow-[0_10px_30px_rgba(56,189,248,0.35)]">
                            <RefreshCw className={`h-6 w-6 text-white ${isLoading ? "animate-spin" : ""}`} />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold tracking-wide text-white">SkyCast</h1>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                                Real-time Weather
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-inner shadow-slate-950/50 sm:min-w-70 lg:min-w-[320px]">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for a city"
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch(city)}
                            value={city}
                        />
                    </label>

                    <Button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-200 transition hover:bg-slate-800"
                        onClick={() => alert("Geo location is not available. Search a city instead!")}
                    >
                        <MapPin className="h-4 w-4 text-sky-400" />
                        <span className="text-sm">Locate</span>
                    </Button>
                </div>
            </nav>
        </header>
    );
};
