"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

// Code samples for each tab
const codeSamples = {
  javascript: `// Welcome to CodeBhaiya! 🚀
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to coding!\`;
}

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript"
];

skills.forEach(skill => {
  console.log(\`Learning \${skill}...\`);
});

greet("Developer");`,

  python: `# Welcome to CodeBhaiya! 🚀
def greet(name):
    print(f"Hello, {name}!")
    return "Welcome to coding!"

skills = [
    "Python",
    "Django",
    "FastAPI",
    "Machine Learning"
]

for skill in skills:
    print(f"Learning {skill}...")

greet("Developer")`,

  typescript: `// Welcome to CodeBhaiya! 🚀
interface Developer {
  name: string;
  skills: string[];
  level: "beginner" | "intermediate" | "pro";
}

const developer: Developer = {
  name: "You",
  skills: ["TypeScript", "React", "Next.js"],
  level: "pro"
};

function welcome(dev: Developer): string {
  return \`Welcome \${dev.name}!\`;
}

console.log(welcome(developer));`,
};

type TabKey = keyof typeof codeSamples;

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("javascript");
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setDisplayedCode("");
    setIsTyping(true);
    let index = 0;
    const code = codeSamples[activeTab];

    const typeInterval = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [activeTab]);

  const tabs = [
    {
      id: "javascript" as TabKey,
      label: "script.js",
      color: "text-yellow-400",
    },
    { id: "python" as TabKey, label: "main.py", color: "text-blue-400" },
    { id: "typescript" as TabKey, label: "app.tsx", color: "text-cyan-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-xl"
    >
      <div
        className={`rounded-xl overflow-hidden border shadow-2xl ${isDark ? "bg-[#1e1e1e] border-neutral-700" : "bg-white border-neutral-200"}`}
      >
        {/* Window controls & tabs */}
        <div
          className={`px-4 py-2 flex items-center gap-2 border-b ${isDark ? "bg-[#2d2d2d] border-neutral-700" : "bg-neutral-100 border-neutral-200"}`}
        >
          {/* Window dots */}
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-sm rounded-t-md transition-all ${
                  activeTab === tab.id
                    ? isDark
                      ? "bg-[#1e1e1e] text-white"
                      : "bg-white text-gray-900"
                    : isDark
                      ? "bg-[#2d2d2d] text-neutral-400 hover:text-neutral-200"
                      : "bg-neutral-100 text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <span className={activeTab === tab.id ? tab.color : ""}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Code area */}
        <div className="p-4 font-mono text-sm h-[350px] overflow-hidden">
          <pre
            className={`leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
          >
            <code>
              {displayedCode}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className={`inline-block w-2 h-4 ml-0.5 align-middle ${isDark ? "bg-white" : "bg-gray-900"}`}
                />
              )}
            </code>
          </pre>
        </div>

        {/* Status bar */}
        <div className="bg-black px-4 py-1 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-4">
            <span>codebhaiya</span>
            <span className="opacity-70">UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-70">
              {activeTab === "javascript" && "JavaScript"}
              {activeTab === "python" && "Python"}
              {activeTab === "typescript" && "TypeScript React"}
            </span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-900 flex items-center justify-center relative w-full overflow-hidden">
      {/* Background effects - only show in dark mode */}
      {isDark && (
        <>
          <ShootingStars />
          <StarsBackground />
        </>
      )}

      {/* Main content */}
      <div className="relative z-0 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                modern way of learning
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className=""
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                CODEBHAIYA
              </h1>
              <span className="opacity-70 text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white leading-tight">
                The right way to learn coding
              </span>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-lg"
            >
              Master programming with hands-on projects, expert tutorials, and a
              supportive community. From beginner to pro, we&apos;ve got you
              covered.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-8 py-4"
            >
              {[
                { value: "10+", label: "Students" },
                { value: "2+", label: "Courses" },
                { value: "10+", label: "Projects" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/courses">
                <Button size="lg" className="gap-2 text-base">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <Play className="w-4 h-4" />
                  Watch Tutorials
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Code Editor */}
          <div className="hidden lg:block">
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
