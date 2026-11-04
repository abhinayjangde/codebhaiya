import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps, Hosting and Deployment Course",
  description:
    "Learn the basics of DevOps, hosting, and deploying applications through CodeBhaiya's practical video lessons.",
  alternates: { canonical: "/courses/devops" },
};

export default function DevOpsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
