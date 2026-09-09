import { setRequestLocale } from "next-intl/server";

export default async function MinistereMinistreEquipePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return null;
}