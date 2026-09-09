import { setRequestLocale } from "next-intl/server";

export default async function AccordsTraitesInternationauxMultilaterauxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return null;
}