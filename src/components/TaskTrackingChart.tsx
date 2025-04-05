"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useTheme } from "next-themes"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Sample task data - in a real app, this would come from your backend
const initialTaskData = [
  { date: "2024-04-01", completed: 12, pending: 8 },
  { date: "2024-04-02", completed: 15, pending: 5 },
  { date: "2024-04-03", completed: 10, pending: 10 },
  { date: "2024-04-04", completed: 18, pending: 7 },
  { date: "2024-04-05", completed: 14, pending: 9 },
  { date: "2024-04-06", completed: 16, pending: 6 },
  { date: "2024-04-07", completed: 13, pending: 8 },
  { date: "2024-04-08", completed: 17, pending: 5 },
  { date: "2024-04-09", completed: 11, pending: 9 },
  { date: "2024-04-10", completed: 15, pending: 7 },
  { date: "2024-04-11", completed: 19, pending: 4 },
  { date: "2024-04-12", completed: 14, pending: 8 },
  { date: "2024-04-13", completed: 16, pending: 6 },
  { date: "2024-04-14", completed: 12, pending: 9 },
  { date: "2024-04-15", completed: 15, pending: 7 },
  { date: "2024-04-16", completed: 17, pending: 5 },
  { date: "2024-04-17", completed: 13, pending: 8 },
  { date: "2024-04-18", completed: 16, pending: 6 },
  { date: "2024-04-19", completed: 14, pending: 7 },
  { date: "2024-04-20", completed: 18, pending: 5 },
  { date: "2024-04-21", completed: 15, pending: 8 },
  { date: "2024-04-22", completed: 12, pending: 9 },
  { date: "2024-04-23", completed: 16, pending: 6 },
  { date: "2024-04-24", completed: 14, pending: 7 },
  { date: "2024-04-25", completed: 17, pending: 5 },
  { date: "2024-04-26", completed: 13, pending: 8 },
  { date: "2024-04-27", completed: 15, pending: 7 },
  { date: "2024-04-28", completed: 18, pending: 5 },
  { date: "2024-04-29", completed: 14, pending: 8 },
  { date: "2024-04-30", completed: 16, pending: 6 },
]

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--success))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--warning))",
  },
} satisfies ChartConfig

export function TaskTrackingChart() {
  const { theme } = useTheme()
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("completed")
  const [taskData, setTaskData] = React.useState(initialTaskData)

  // Simulate real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTaskData(prevData => {
        return prevData.map(item => ({
          ...item,
          completed: Math.max(0, item.completed + (Math.random() > 0.7 ? 1 : 0)),
          pending: Math.max(0, item.pending + (Math.random() > 0.8 ? 1 : -1)),
        }))
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const total = React.useMemo(
    () => ({
      completed: taskData.reduce((acc, curr) => acc + curr.completed, 0),
      pending: taskData.reduce((acc, curr) => acc + curr.pending, 0),
    }),
    [taskData]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Task Tracking</CardTitle>
          <CardDescription>
            Real-time task completion status
          </CardDescription>
        </div>
        <div className="flex">
          {["completed", "pending"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={taskData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="tasks"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar 
              dataKey={activeChart} 
              fill={theme === 'dark' 
                ? `var(--color-${activeChart}-dark)` 
                : `var(--color-${activeChart})`} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 