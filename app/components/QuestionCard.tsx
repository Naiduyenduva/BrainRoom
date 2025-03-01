"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionCardProps {
  questionsArray: Question[];
  onAnswer: (questionId: string,selectedOption:number) => void;
  onSubmit: ()=> void;
  timeRemaining?: number;
}

export default function QuestionCard({
  questionsArray,
  onAnswer,
  onSubmit,
  timeRemaining = 3600, // Default: 1 hour in seconds
}: QuestionCardProps) {
  const [remainingTime, setRemainingTime] = useState(timeRemaining)
  const [page, setPage] = useState<number>(0) // ✅ 0-based indexing
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({}); // Store answers


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

  const handleAnswerChange = (value:number) => {
    const currentQuestion = questionsArray[page];
    if (currentQuestion) {
      const selectedIndex = value; // Convert to 1-based index
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedIndex, // Store answer per question
      }));
      onAnswer(currentQuestion.id, (value));
    }
  }

  const nextPage = () => {
    if (page < questionsArray.length - 1) setPage(page + 1)
  }

  const prevPage = () => {
    if (page > 0) setPage(page - 1)
  }

  const currentQuestion = questionsArray[page] // ✅ Get the current question

  return (
    <>
      {currentQuestion && (
        <Card className="w-full max-w-2xl mx-auto bg-black text-white" key={currentQuestion.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Question {page + 1} of {questionsArray.length}</CardTitle>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(remainingTime)}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>
            <RadioGroup onValueChange={(value)=>handleAnswerChange(Number(value))} value={selectedAnswers[currentQuestion.id]?.toString() ?? undefined} className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-gray-900">
                  <RadioGroupItem value={(index+1).toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button className="pt-2 mt-1 border text-white" onClick={prevPage} disabled={page === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            {page === questionsArray.length - 1 ? (
              <Button className="bg-green-600" onClick={onSubmit}>
                Submit
              </Button>
            ) : (
              <Button className="bg-purple-600" onClick={nextPage}>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {/* <Button className="bg-purple-600" onClick={nextPage} disabled={page === questionsArray.length - 1}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button> */}
          </CardFooter>
        </Card>
      )}
    </>
  )
}