"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"
import useSWR from "swr"

interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function PriceTracker() {
  const [search, setSearch] = useState("")
  const { data: cryptos, error } = useSWR<CryptoData[]>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
    fetcher,
    { refreshInterval: 30000 },
  )

  const filteredCryptos = cryptos?.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase()),
  )

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Price Table */}
      <Card className="overflow-hidden border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50 bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">24h %</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Market Cap</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    Failed to load data. Please try again later.
                  </td>
                </tr>
              )}
              {!cryptos && !error && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              )}
              {filteredCryptos?.map((crypto, index) => (
                <tr
                  key={crypto.id}
                  className="border-b border-border/30 transition-colors hover:bg-muted/20 last:border-0"
                >
                  <td className="px-6 py-4 text-sm text-muted-foreground">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground uppercase">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm">{formatPrice(crypto.current_price)}</td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium ${
                        crypto.price_change_percentage_24h >= 0
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm">{formatMarketCap(crypto.market_cap)}</td>
                  <td className="px-6 py-4 text-right font-mono text-sm">{formatMarketCap(crypto.total_volume)}</td>
                </tr>
              ))}
              {filteredCryptos?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No cryptocurrencies found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Data updates every 30 seconds • Powered by CoinGecko API
      </p>
    </div>
  )
}
