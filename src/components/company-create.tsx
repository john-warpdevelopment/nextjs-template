"use client"

import { useState } from "react"
import { createCompany } from "../server/services/company.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Company"}
    </Button>
  )
}

export function CompanyCreate() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleCreateCompany(formData: FormData) {
    setError(null)
    const result = await createCompany(formData)

    if (result.error) {
      setError(result.error)
    } else {
      toast.success("Company created successfully")
      // Reset the form
      const form = document.getElementById("create-form") as HTMLFormElement
      form.reset()
      router.push("/companies")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto" id="create">
      <CardHeader>
        <CardTitle>Create Company</CardTitle>
      </CardHeader>
      <form id="create-form" action={handleCreateCompany}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" name="name" placeholder="Enter company name" required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
