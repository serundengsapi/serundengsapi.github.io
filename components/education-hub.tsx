"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, ChevronRight, GraduationCap, Shield, Coins, Network } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Course {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  lessons: number
  category: string
  icon: React.ElementType
}

const courses: Course[] = [
  {
    id: "blockchain-basics",
    title: "Blockchain Fundamentals",
    description:
      "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles.",
    level: "Beginner",
    duration: "2 hours",
    lessons: 8,
    category: "Blockchain",
    icon: Network,
  },
  {
    id: "crypto-trading",
    title: "Cryptocurrency Trading Guide",
    description:
      "Master the art of crypto trading with technical analysis, risk management strategies, and market psychology insights.",
    level: "Intermediate",
    duration: "3 hours",
    lessons: 12,
    category: "Trading",
    icon: Coins,
  },
  {
    id: "wallet-security",
    title: "Crypto Security & Wallet Management",
    description:
      "Protect your digital assets with best practices for wallet security, private key management, and avoiding common scams.",
    level: "Beginner",
    duration: "1.5 hours",
    lessons: 6,
    category: "Security",
    icon: Shield,
  },
  {
    id: "defi-explained",
    title: "Decentralized Finance (DeFi)",
    description:
      "Explore the world of DeFi including lending protocols, liquidity pools, yield farming, and decentralized exchanges.",
    level: "Advanced",
    duration: "4 hours",
    lessons: 15,
    category: "DeFi",
    icon: GraduationCap,
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts & dApps",
    description:
      "Understand how smart contracts work, their applications, and how decentralized applications are built on blockchain.",
    level: "Intermediate",
    duration: "3.5 hours",
    lessons: 14,
    category: "Development",
    icon: BookOpen,
  },
  {
    id: "nft-guide",
    title: "NFTs & Digital Ownership",
    description:
      "Discover the world of non-fungible tokens, digital art, collectibles, and the future of digital ownership.",
    level: "Beginner",
    duration: "2 hours",
    lessons: 7,
    category: "NFT",
    icon: Network,
  },
]

export function EducationHub() {
  const [selectedLevel, setSelectedLevel] = useState<string>("All")

  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = selectedLevel === "All" ? courses : courses.filter((course) => course.level === selectedLevel)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Intermediate":
        return "bg-accent/10 text-accent border-accent/20"
      case "Advanced":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Level Filter */}
      <div className="flex flex-wrap gap-3">
        {levels.map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => setSelectedLevel(level)}
            className={
              selectedLevel === level
                ? "bg-primary text-primary-foreground"
                : "border-border/50 hover:border-primary/50"
            }
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const Icon = course.icon
          return (
            <Card
              key={course.id}
              className="group flex flex-col overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>

                <h3 className="font-heading text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} lessons
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                  variant="outline"
                >
                  <Link href={`/learn/${course.id}`}>
                    Start Learning
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No courses found for the selected level.</p>
        </Card>
      )}

      {/* Learning Path */}
      <Card className="overflow-hidden border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 mt-12">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-accent" />
            <h2 className="font-heading text-2xl font-bold">Recommended Learning Path</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Follow this structured path to build your crypto knowledge from the ground up.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold">Start with Basics</h4>
                <p className="text-sm text-muted-foreground">Blockchain Fundamentals & Security</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold">Build Skills</h4>
                <p className="text-sm text-muted-foreground">Trading & Smart Contracts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold">Master Advanced</h4>
                <p className="text-sm text-muted-foreground">DeFi & Complex Strategies</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
