import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import "dotenv/config";

const outputParser = new StringOutputParser();

export const callMe = async (review = "") => {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `Rate this review as sentiment analysis in range from 1 to 5 (only number, not words) {review}?`
  );
  const nameGenerationChain = prompt.pipe(model).pipe(outputParser);
  const response = await nameGenerationChain.invoke({
    review,
  });

  console.log("++++++++++++++++++++++++", response);
  return response;
};
