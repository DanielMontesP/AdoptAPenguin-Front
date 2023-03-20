import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-iYqhA2GWPlUV904PAIUmjvv9",
  apiKey: process.env.OPENAI_API_KEY,
});

export const openaiEdit = async (file: File) => {
  try {
    const openai = new OpenAIApi(configuration);

    const responseEdit = await openai.createImageEdit(
      file,
      file,
      "A cute baby sea otter wearing a beret",
      2,
      "1024x1024"
    );

    return responseEdit;
  } catch (error) {}
};
