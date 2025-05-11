import { CompanyUpdate } from "@/components/company-update";
import { getCompanyById } from "@/server/services/company.service";
import { notFound } from 'next/navigation';

export default async function UpdateCompanyPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const companyId = parseInt(id, 10);

  if (isNaN(companyId)) {
    notFound();
  }

  const company = await getCompanyById(companyId);

  if (!company) {
    notFound(); 
  }

  return (
    <CompanyUpdate company={company} />
  );
}
