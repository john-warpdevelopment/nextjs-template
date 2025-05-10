"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/server/db"
import { companiesTable, NewCompany } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function getCompanies() {
  return await db.select().from(companiesTable);
}

export async function getCompanyById(id:number) {
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, id));
  return company;
}


export async function getCompany(id: string) {
  // Ensure id is treated as a number if your schema id is serial
  const companyId = parseInt(id, 10);
  if (isNaN(companyId)) {
    return undefined; // Or handle error appropriately
  }
  return await db.query.companiesTable.findFirst({
    where: eq(companiesTable.id, companyId),
  })
}

export async function createCompany(formData: FormData) {
  const name = formData.get("name") as string

  if (!name || name.trim() === "") {
    return { error: "Company name is required" }
  }

  const newCompany: NewCompany = {
    name: name.trim(),
    // createdAt and updatedAt will be handled by defaultNow() in the schema
  }

  try {
    await db.insert(companiesTable).values(newCompany)
    revalidatePath("/companies")
    return { success: true }
  } catch (error) {
    console.error("Failed to create company:", error)
    return { error: "Failed to create company. Please check server logs." }
  }
}

export async function updateCompany(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string

  if (!name || name.trim() === "") {
    return { error: "Company name is required" }
  }

  const companyId = parseInt(id, 10);
  if (isNaN(companyId)) {
    return { error: "Invalid company ID" };
  }

  try {
    await db
      .update(companiesTable)
      .set({ name: name.trim(), updatedAt: new Date() }) // Explicitly set updatedAt
      .where(eq(companiesTable.id, companyId))
    revalidatePath("/companies")
    return { success: true }
  } catch (error) {
    console.error("Failed to update company:", error)
    return { error: "Failed to update company. Please check server logs." }
  }
}

export async function deleteCompany(formData: FormData) {
  const id = formData.get("id") as string
  const companyId = parseInt(id, 10);
  if (isNaN(companyId)) {
    return { error: "Invalid company ID" };
  }

  try {
    await db.delete(companiesTable).where(eq(companiesTable.id, companyId))
    revalidatePath("/companies")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete company:", error)
    return { error: "Failed to delete company. Please check server logs." }
  }
}
