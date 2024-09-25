"use client"

import { useState } from "react"
import { Search, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SearchResult {
  id: number
  source: string
  information: string
  link: string
}

export default function OsintSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      // Simulating an API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock results
      const mockResults: SearchResult[] = [
        { id: 1, source: "Social Media", information: "Public profile found", link: "https://example.com/profile" },
        { id: 2, source: "Data Breach", information: "Email found in breach database", link: "https://example.com/breach" },
        { id: 3, source: "Public Records", information: "Address information found", link: "https://example.com/records" },
      ]

      setResults(mockResults)
    } catch (err) {
      setError("An error occurred while searching. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>OSINT Security Search</CardTitle>
          <CardDescription>Search the web for instances of your information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter name, email, or phone number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Search
              </Button>
            </div>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Search Results:</h3>
              {results.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <CardTitle className="text-md">{result.source}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{result.information}</p>
                  </CardContent>
                  <CardFooter>
                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Details
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}