import React, { useState } from "react";
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";

const FaqPage = () => {
  // Define FAQ items
  const faqItems = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button and fill out the required information.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "To apply for a job, navigate to the job listing page, select a job, and follow the application instructions provided by the employer.",
    },
    {
      question: "Can I edit my job posting?",
      answer:
        "Yes, you can edit your job posting by logging into your account, navigating to your posted jobs, and selecting the edit option for the desired job.",
    },
    {
      question: "Is there a fee for using the job portal?",
      answer:
        "No, our job portal is completely free for both job seekers and employers.",
    },
    {
      question: "How can I contact support?",
      answer:
        "For any support-related queries or issues, you can contact our support team via email at support@example.com.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
    },
    {
      question: "Can I post multiple job listings?",
      answer:
        "Yes, you can post multiple job listings by logging into your account and selecting the option to post a new job.",
    },
    {
      question: "How do I search for jobs?",
      answer:
        "You can search for jobs by entering keywords, location, or category in the search bar on the job listing page.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, contact our support team with your request, and they will assist you in the account deletion process.",
    },
    {
      question: "Are there job listings for remote positions?",
      answer:
        "Yes, we have job listings for remote positions. You can filter job listings by selecting the 'Remote' option in the location filter.",
    },
    {
      question: "Can I upload my resume?",
      answer:
        "Yes, you can upload your resume to your profile, making it easier for employers to view your qualifications and experience when you apply for jobs.",
    },
    {
      question: "How long does it take for my job listing to be approved?",
      answer:
        "Job listings are typically approved within 24-48 hours after submission. You will receive an email notification once your job listing is approved.",
    },
    {
      question: "How can I update my profile information?",
      answer:
        "You can update your profile information by logging into your account and navigating to the profile settings page.",
    },
    {
      question: "What should I do if I encounter a technical issue?",
      answer:
        "If you encounter a technical issue while using our platform, please contact our support team with details about the issue, and they will assist you in resolving it.",
    },
    {
      question: "How do I unsubscribe from email notifications?",
      answer:
        "To unsubscribe from email notifications, you can adjust your email preferences in the notification settings section of your account.",
    },
  ];

  return (
    <div className="px-6 md:py-24 py-36 ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {/* Render FAQ items */}
          {faqItems.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  // State to manage toggle for showing/hiding answer
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 ">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Render question and toggle icon */}
        <h2 className="text-lg font-semibold">{question}</h2>
        {isOpen ? (
          <IoChevronUpSharp className="h-6 w-6 text-gray-600" />
        ) : (
          <IoChevronDownSharp className="h-6 w-6 text-gray-600" />
        )}
      </div>
      {/* Render answer if FAQ item is open */}
      {isOpen && <p className="mt-4">{answer}</p>}
    </div>
  );
};

export default FaqPage;
