import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY!);

export async function streamHFReply(prompt: string): Promise<string> {
    let output = "";

    const stream = client.chatCompletionStream({
        provider: "featherless-ai",
        model: "mistralai/Magistral-Small-2506",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

    for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content;
        if (content) output += content;
    }

    return output;
}
