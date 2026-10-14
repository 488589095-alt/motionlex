type ApiStyle = 'responses' | 'chat-completions';

export type AiEndpoint = {
  key: string;
  url: string;
  model: string;
};

export type SearchProvider = AiEndpoint & { style: ApiStyle };

export function getSearchProvider(): SearchProvider | null {
  const key = process.env.AI_SEARCH_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) return null;

  const useDeepSeek = Boolean(process.env.DEEPSEEK_API_KEY && !process.env.AI_SEARCH_API_KEY);
  const useOpenAI = Boolean(process.env.OPENAI_API_KEY && !process.env.AI_SEARCH_API_KEY && !useDeepSeek);
  const style = process.env.AI_SEARCH_API_STYLE || (useDeepSeek ? 'chat-completions' : 'responses');
  if (style !== 'responses' && style !== 'chat-completions') return null;

  const url = process.env.AI_SEARCH_URL ||
    (useDeepSeek ? 'https://api.deepseek.com/chat/completions' :
      useOpenAI ? 'https://api.openai.com/v1/responses' : '');
  const model = process.env.AI_SEARCH_MODEL ||
    (useDeepSeek ? 'deepseek-flash' : useOpenAI ? process.env.OPENAI_SEARCH_MODEL || 'gpt-4.1-mini' : '');
  if (!url || !model) return null;
  try {
    if (new URL(url).protocol !== 'https:') return null;
  } catch { return null; }
  return { key, url, model, style };
}

export function getTranscriptionProvider(): AiEndpoint | null {
  const key = process.env.AI_TRANSCRIBE_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) return null;
  const url = process.env.AI_TRANSCRIBE_URL ||
    (process.env.OPENAI_API_KEY && !process.env.AI_TRANSCRIBE_API_KEY
      ? 'https://api.openai.com/v1/audio/transcriptions'
      : '');
  const model = process.env.AI_TRANSCRIBE_MODEL ||
    (process.env.OPENAI_API_KEY && !process.env.AI_TRANSCRIBE_API_KEY ? 'gpt-transcribe' : '');
  if (!url || !model) return null;
  try {
    if (new URL(url).protocol !== 'https:') return null;
  } catch { return null; }
  return { key, url, model };
}
