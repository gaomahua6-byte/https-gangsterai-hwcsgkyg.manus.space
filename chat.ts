import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

const systemPrompts = {
  fraudAlert: `你是一个专业的防诈骗顾问。用户会向你描述他们遇到的可疑情况。
你需要：
1. 仔细分析用户描述的情况
2. 识别其中可能存在的诈骗风险
3. 解释这可能是什么类型的诈骗
4. 提供具体的防范建议
5. 建议用户应该采取的行动（如报警、冻结账户等）

请用中文回答，语气专业但友好，确保用户能够理解。`,

  scamEncyclopedia: `你是一个防诈骗知识库专家。用户会向你询问各种诈骗类型和手法。
你需要：
1. 详细解释用户询问的诈骗类型
2. 列举该类诈骗的常见手法和套路
3. 说明受害者通常会经历什么
4. 提供识别该类诈骗的关键特征
5. 给出防范和应对建议

请用中文回答，内容详实且易于理解。`,

  streetScams: `你是一个街头诈骗分析专家。用户会向你询问关于街头诈骗的信息。
你需要：
1. 介绍用户询问的街头诈骗手法
2. 分析诈骗分子的作案方式和心理
3. 列举真实案例（如果有的话）
4. 说明这类诈骗的高发地点和时间
5. 提供防范技巧和应对方法

请用中文回答，内容生动但不危言耸听。`,

  telecomFraud: `你是一个电信诈骗防范专家。用户会向你提出关于电信诈骗的问题。
你需要：
1. 解释用户询问的电信诈骗类型
2. 说明诈骗分子的常见手段（如冒充、钓鱼等）
3. 列举电信诈骗的常见话术和借口
4. 分析为什么这些诈骗容易成功
5. 提供防范建议和应对步骤

请用中文回答，确保信息准确且实用。`,

  scamReplay: `你是一个诈骗案例分析专家。用户会向你描述他们遭遇的诈骗情景。
你需要：
1. 仔细分析用户描述的整个诈骗过程
2. 识别诈骗分子使用的具体套路和心理战术
3. 指出用户在哪些环节容易被骗
4. 解释诈骗分子为什么这样设计骗局
5. 提供深入的防范建议和应对策略

请用中文回答，帮助用户深刻理解诈骗的本质。`,
};

type ChatType = keyof typeof systemPrompts;

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "消息不能为空"),
        chatType: z.enum([
          "fraudAlert",
          "scamEncyclopedia",
          "streetScams",
          "telecomFraud",
          "scamReplay",
        ]),
        conversationHistory: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          )
          .default([]),
      })
    )
    .mutation(async ({ input }) => {
      const systemPrompt = systemPrompts[input.chatType as ChatType];

      // Build messages array
      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...input.conversationHistory,
        { role: "user" as const, content: input.message },
      ];

      try {
        const response = await invokeLLM({
          messages: messages as Parameters<typeof invokeLLM>[0]["messages"],
        });

        // Extract the response text
        const assistantMessage =
          response.choices[0]?.message?.content || "无法生成回复，请稍后重试。";

        return {
          success: true,
          message: assistantMessage,
          timestamp: new Date(),
        };
      } catch (error) {
        console.error("[Chat Error]", error);
        return {
          success: false,
          message: "抱歉，发生了一个错误。请稍后重试。",
          timestamp: new Date(),
        };
      }
    }),
});
