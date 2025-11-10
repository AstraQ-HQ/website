import config from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getPayload } from "payload";
import type { WebPage, WithContext } from "schema-dts";
import { env } from "@/env";

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "legal-pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const legalPage = result.docs[0];

  if (!legalPage) {
    notFound();
  }

  return {
    title: legalPage.title,
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "legal-pages",
    limit: 0,
  });
  return result.docs.map((legalPage) => ({ slug: legalPage.slug }));
}

export default async function Page({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "legal-pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const legalPage = result.docs[0];

  if (!legalPage) {
    notFound();
  }

  const webPageSchema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: legalPage.title,
    url: `${env.NEXT_PUBLIC_SITE_URL}/legal/${legalPage.slug}`,
    datePublished: legalPage.createdAt ?? undefined,
    dateModified: legalPage.updatedAt ?? undefined,
  };

  return (
    <>
      <div>{legalPage.title}</div>
      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a valid use case
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
    </>
  );
}
