"use client"

import { useState } from "react"
import { updateCompany } from "../server/services/company.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useFormStatus } from "react-dom"
import { Pencil } from "lucide-react"
import { toast } from "sonner"

type Company = {
  id: number
  name: string
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update Company"}
    </Button>
  )
}

export function CompanyUpdate({ company }: { company: Company }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleUpdateCompany(formData: FormData) {
    setError(null)
    const result = await updateCompany(formData)

    if (result.error) {
      setError(result.error)
    } else {
      toast.success("Company updated successfully")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Company</DialogTitle>
        </DialogHeader>
        <form action={handleUpdateCompany}>
          <div className="space-y-4 py-4">
            <input type="hidden" name="id" value={company.id} />
            <div className="space-y-2">
              <Label htmlFor={`name-${company.id}`}>Company Name</Label>
              <Input
                id={`name-${company.id}`}
                name="name"
                defaultValue={company.name}
                placeholder="Enter company name"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
