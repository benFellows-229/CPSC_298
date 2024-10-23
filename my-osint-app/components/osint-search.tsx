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

interface Topic {
  Text: string;
  FirstURL: string;
}

export default function OsintSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults([]);

    console.log("Searching for:", searchTerm); // Log the search term

    try {
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(searchTerm)}&format=json`);
      const data = await response.json();

      console.log("API Response:", data); // Log the API response

      if (data.RelatedTopics && Array.isArray(data.RelatedTopics) && data.RelatedTopics.length > 0) {
        const searchResults: SearchResult[] = data.RelatedTopics.map((topic: Topic, index: number) => ({
          id: index,
          source: topic.Text,
          information: topic.FirstURL,
          link: topic.FirstURL,
        }));

        setResults(searchResults);
      } else {
        // Set a positive message when no results are found
        setError("No public data found for your query.");
      }
    } catch (err) {
      console.error("Error fetching data:", err); // Log any errors
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
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
            <Alert variant="success" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Search Results:</h3>
              {results.map((result) => (
                <Card key={result.id} className="border border-gray-300 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-md font-bold">{result.source}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{result.information}</p>
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