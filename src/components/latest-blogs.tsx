import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function LatestBlogs() {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Latest from the Blog</h2>
                    <Link href="/blogs">
                        <Button variant="ghost" className="gap-2">
                            View all <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link href={`/blogs/${post.slug}`} key={post.id} className="hover:no-underline group">
                            <Card className="h-full hover:shadow-lg transition-all duration-200 flex flex-col border-none shadow-sm">
                                {post.featuredImg && (
                                    <div className="w-full h-48 overflow-hidden rounded-t-xl">
                                        <img
                                            src={post.featuredImg}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                        <span>{post.author.name}</span>
                                        <span>•</span>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground line-clamp-3 text-sm">
                                        {post.excerpt || post.content.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex flex-wrap gap-2">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
