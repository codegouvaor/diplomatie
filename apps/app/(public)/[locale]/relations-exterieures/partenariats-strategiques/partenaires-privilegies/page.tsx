import { setRequestLocale } from "next-intl/server";

export default async function RelationsExterieuresPartenariatsStrategiquesPartenairesPrivilegiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return null;
}