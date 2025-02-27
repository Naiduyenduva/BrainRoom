"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"

interface QuestionCardProps {
  questionNumber: number
  totalQuestions: number
  question: string
  options: string[]
  onAnswer: (answer: string) => void
  onNext: () => void
  onPrevious: () => void
  timeRemaining: number
}

export default function QuestionCard({
  questionNumber = 1,
  totalQuestions = 50,
  question = "What is the capital of France?",
  options = ["London", "Berlin", "Paris", "Madrid"],
  onAnswer = () => {},
  onNext = () => {},
  onPrevious = () => {},
  timeRemaining = 3600, // 1 hour in seconds
}: Partial<QuestionCardProps>) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isMarkedForReview, setIsMarkedForReview] = useState(false)
  const [remainingTime, setRemainingTime] = useState(timeRemaining)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value)
    onAnswer(value)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle>
            Question {questionNumber} of {totalQuestions}
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatTime(remainingTime)}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-lg font-medium mb-6">{question}</p>
        <RadioGroup onValueChange={handleAnswerChange} className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-900">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
          <Button className="pt-2 mt-1 border text-white" onClick={onPrevious} disabled={questionNumber === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button className="bg-purple-600" onClick={onNext} disabled={questionNumber === totalQuestions}>
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
      </CardFooter>
    </Card>
  )
}