import * as React from "react";
import { CompanyList } from "../../components/company-list";
import { getCompanies } from "@/server/services/company.service";


export default async function Home() {
  
  const companies = await getCompanies()

  return (
    <CompanyList companies={companies}  />
  );
}
