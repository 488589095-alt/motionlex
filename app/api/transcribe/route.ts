import { getTranscriptionProvider } from '../../../lib/ai-provider';

export function GET() {
  return Response.json({ available: Boolean(getTranscriptionProvider()) });
}

export async function POST(request: Request) {
  const provider = getTranscriptionProvider();
  if (!provider) return Response.json({ error: '当前没有连接录音转写服务，请改用文字输入。' }, { status: 503 });

  let audio: FormDataEntryValue | null;
  try { audio = (await request.formData()).get('audio'); }
  catch { return Response.json({ error: '录音文件无法读取。' }, { status: 400 }); }
  if (!(audio instanceof File) || audio.size === 0 || audio.size > 25 * 1024 * 1024 || !audio.type.startsWith('audio/')) {
    return Response.json({ error: '录音无效或超过 25 MB。' }, { status: 400 });
  }

  const form = new FormData();
  form.set('model', provider.model);
  form.set('file', audio, audio.name || 'idea.webm');
  try {
    const response = await fetch(provider.url, {
      method: 'POST', headers: { Authorization: `Bearer ${provider.key}` }, body: form,
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error('语音转写暂时不可用，请改用文字输入。');
    const data = await response.json() as { text?: string };
    const transcript = data.text?.trim();
    if (!transcript) throw new Error('没有识别到清晰语音，请再试一次。');
    return Response.json({ transcript: transcript.slice(0, 1200) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : '语音转写失败。' }, { status: 502 });
  }
}
