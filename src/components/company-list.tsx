import { getCompanies } from "../server/services/company.service"
import { CompanyDelete } from "./company-delete"
import { CompanyUpdate } from "./company-update"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function CompanyList() {
  const companies = await getCompanies()

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Companies</CardTitle>
        <Button asChild>
          <Link href="/companies/create">Add Company</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {companies.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No companies found</p>
        ) : (
          <div className="space-y-4">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border rounded-md">
                <span className="font-medium">{company.name}</span>
                <div className="flex space-x-2">
                  <CompanyUpdate company={company} />
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
