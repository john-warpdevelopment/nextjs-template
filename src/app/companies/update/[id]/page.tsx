import { CompanyUpdate } from "@/components/company-update";
import { getCompanyById } from "@/server/services/company.service";
import { notFound } from 'next/navigation';

export default async function UpdateCompanyPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const companyId = parseInt(id, 10);

  if (isNaN(companyId)) {
    notFound(); // If id is not a number, render 404
  }

  const company = await getCompanyById(companyId);

  if (!company) {
    notFound(); // If company is not found, render 404
  }

  return (
    <CompanyUpdate company={company} />
  );
}
