"use client"
import { CompanyDelete } from "./company-delete"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "./ui/input"
import { useState, useMemo } from "react"

export function CompanyList({ companies }: { companies:{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}[] }
  ) {
  const [searchQuery, setSearchQuery] = useState("");

  const displayedCompanies = useMemo(() => {
    if (!searchQuery) {
      return companies;
    }
    return companies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companies, searchQuery]);

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.currentTarget.value);
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
        <Input 
          id="search" 
          name="search" 
          placeholder="Search query" 
          required 
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Companies</CardTitle>
        <Button asChild>
          <Link href="/companies/create">Add Company</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {displayedCompanies.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No companies found or matching search</p>
        ) : (
          <div className="space-y-4">
            {displayedCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border rounded-md">
                <span className="font-medium">{company.name}</span>
                <div className="flex space-x-2">
                  <Button asChild variant="outline">
                    <Link href={`/companies/update/${company.id}`}>Update</Link>
                  </Button>
                  <CompanyDelete company={company} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
