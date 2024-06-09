import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

interface AICreditReportProps {
  score: number;
}

const AICreditReport: React.FC<AICreditReportProps> = (props) => {
  const {score} = props;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  // Instantiate Google Generative AI with private apiKey
  const genAI = new GoogleGenerativeAI(apiKey);

  async function fetchData() {
    if(score > 0 ){

      // BlackWell AI model: gemini-1.5-flash
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // Prompt to generate report based on score
      const prompt = `Generate the overall wallet status for a crypto wallet based on crypto credit score of : ${score}/900, keep in mind that this credit score is calculated using the following metrics of the wallet's user: Wallet balance, wallet age, volume of transactions, duration of stake on staking platform, interaction with diverse dApps`;
      
      const result = await model.generateContent(prompt);
      const response = result.response;

      // Convert the result to text
      const text = response.text();

      // Instatiate a pdf object
      const pdf = new jsPDF();

      // Handle pdf page height and width for generated text
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const maxLineWidth = pageWidth - margin * 2;
      const lineHeight = 10;
      const startX = margin;
      let startY = margin;

      // Split text to fit within the page width
      const lines = pdf.splitTextToSize(text, maxLineWidth);

      lines.forEach((line:any) => {
        if (startY + lineHeight > pageHeight - margin) {

          // Add a new page if the text doesn't fit
          pdf.addPage();

          // Reset Y position for the new page
          startY = margin; 
        }
        pdf.text(line, startX, startY);
        
        // Move the Y position for the next line
        startY += lineHeight;

      });

      // Save the report as 'Crypto_Credit_Report.pdf'
      pdf.save("Crypto_Credit_Report.pdf")
    }else{
      toast.error("No Score. Get a score then try again!")
    }
  }

  return(
    <button
          onClick={fetchData}
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:text-pink-100 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-48 text-center w-1/2 md:w-full lg:w-full"
        >
          GENERATE REPORT
        </button>
  )
};

export default AICreditReport;
