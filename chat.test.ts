import { describe, it, expect, vi, beforeEach } from "vitest";
import { chatRouter } from "./chat";
import type { TrpcContext } from "../_core/context";

// Mock the LLM function
vi.mock("../_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "../_core/llm";

const mockInvokeLLM = invokeLLM as ReturnType<typeof vi.fn>;

function createChatContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("chat router", () => {
  beforeEach(() => {
    mockInvokeLLM.mockClear();
  });

  it("should send a message and get a response for fraudAlert", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content:
              "这听起来像是一个典型的诈骗。请不要点击任何链接或提供个人信息。",
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "我收到了一条可疑短信，要求我点击链接验证身份",
      chatType: "fraudAlert",
      conversationHistory: [],
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe(
      "这听起来像是一个典型的诈骗。请不要点击任何链接或提供个人信息。"
    );
    expect(mockInvokeLLM).toHaveBeenCalledOnce();
  });

  it("should handle scamEncyclopedia chat type", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "虚假中奖诈骗是指诈骗分子声称受害者中奖...",
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "什么是虚假中奖诈骗？",
      chatType: "scamEncyclopedia",
      conversationHistory: [],
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("虚假中奖诈骗");
  });

  it("should handle streetScams chat type", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "街头换汇诈骗是一种常见的街头骗局...",
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "什么是街头换汇诈骗？",
      chatType: "streetScams",
      conversationHistory: [],
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("街头换汇诈骗");
  });

  it("should handle telecomFraud chat type", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "冒充公检法诈骗是指诈骗分子冒充警察、检察官或法官...",
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "什么是冒充公检法诈骗？",
      chatType: "telecomFraud",
      conversationHistory: [],
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("冒充公检法诈骗");
  });

  it("should handle scamReplay chat type", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "根据你的描述，这是一个典型的杀猪盘诈骗...",
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "我在交友软件上认识了一个人，他要求我投资加密货币",
      chatType: "scamReplay",
      conversationHistory: [],
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("杀猪盘诈骗");
  });

  it("should include conversation history in the request", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "是的，这是一个红旗信号。",
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const conversationHistory = [
      { role: "user" as const, content: "这是诈骗吗？" },
      { role: "assistant" as const, content: "请告诉我更多细节。" },
    ];

    await caller.sendMessage({
      message: "他要求我先付款",
      chatType: "fraudAlert",
      conversationHistory,
    });

    expect(mockInvokeLLM).toHaveBeenCalledOnce();
    const callArgs = mockInvokeLLM.mock.calls[0]?.[0];
    expect(callArgs?.messages).toHaveLength(4); // system + 2 history + 1 new message
  });

  it("should handle empty message", async () => {
    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    await expect(
      caller.sendMessage({
        message: "",
        chatType: "fraudAlert",
        conversationHistory: [],
      })
    ).rejects.toThrow();
  });

  it("should handle LLM errors gracefully", async () => {
    mockInvokeLLM.mockRejectedValueOnce(new Error("LLM service error"));

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "这是诈骗吗？",
      chatType: "fraudAlert",
      conversationHistory: [],
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain("错误");
  });

  it("should handle missing content in LLM response", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: undefined,
          },
        },
      ],
    };

    mockInvokeLLM.mockResolvedValueOnce(mockResponse);

    const ctx = createChatContext();
    const caller = chatRouter.createCaller(ctx);

    const result = await caller.sendMessage({
      message: "这是诈骗吗？",
      chatType: "fraudAlert",
      conversationHistory: [],
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("无法生成回复，请稍后重试。");
  });
});
