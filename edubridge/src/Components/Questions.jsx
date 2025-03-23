import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Questions() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      learningStyle: [],
      learningGoals: [],
      strengths: [],
      weaknesses: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-light text-purple-600 text-center mb-8">
          Let's Personalize Your Experience
        </h1>

        {isSubmitted ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your preferences have been saved successfully.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Return to Form
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="ml-[20px] px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <QuestionSection
                title="Do you have a learning disability?"
                name="learningStyle"
                register={register}
                options={[
                  { value: "ADHD", label: "ADHD" },
                  { value: "Dyslexia", label: "Dyslexia" },
                  { value: "Dysgraphia", label: "Dysgraphia" },
                  { value: "Non_verbal", label: "Non-verbalism" },
                ]}
              />

              <QuestionSection
                title="How do you prefer to learn?"
                name="learningStyle"
                register={register}
                options={[
                  { value: "visual", label: "Visuals" },
                  { value: "auditory", label: "Auditory" },
                  { value: "reading", label: "Reading" },
                  { value: "handson", label: "Hands-on" },
                ]}
              />

              <QuestionSection
                title="What are your learning goals?"
                name="learningGoals"
                register={register}
                options={[
                  { value: "focus", label: "Improve focus" },
                  { value: "speed", label: "Learn faster" },
                  { value: "stress", label: "Reduce stress" },
                  { value: "knowledge", label: "Improve knowledge" },
                ]}
              />

              <QuestionSection
                title="What are your strengths?"
                name="strengths"
                register={register}
                options={[
                  { value: "numbers", label: "Numbers" },
                  { value: "words", label: "Words" },
                  { value: "criticalThinking", label: "Critical Thinking" },
                  { value: "problemSolving", label: "Problem Solving" },
                ]}
              />

              <QuestionSection
                title="What are your weaknesses?"
                name="weaknesses"
                register={register}
                options={[
                  { value: "attention", label: "Lack of Attention" },
                  { value: "procrastination", label: "Procrastination" },
                  { value: "criticalThinking", label: "Critical Thinking" },
                  { value: "problemSolving", label: "Problem Solving" },
                ]}
              />
            </div>

            <div className="px-8 py-6 bg-gray-50 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Preferences"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function QuestionSection({ title, name, register, options }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-light text-purple-600 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              value={option.value}
              {...register(name)}
              className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Questions;
