import type { MetadataRoute } from "next";
import { mockProfiles } from "../data/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://borderline.africa";

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/report`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/whatsapp`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/talent`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/recruiter`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic talent profile routes (e.g. /in/talent-chidi)
  const profileRoutes = mockProfiles.map((profile) => ({
    url: `${baseUrl}/in/${profile.id}`,
    lastModified: new Date(profile.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Also add shorthand dynamic profile routes (e.g. /in/chidi) for indexing
  const shorthandProfileRoutes = mockProfiles.map((profile) => {
    const slug = profile.id.replace("talent-", "");
    return {
      url: `${baseUrl}/in/${slug}`,
      lastModified: new Date(profile.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...profileRoutes, ...shorthandProfileRoutes];
}
