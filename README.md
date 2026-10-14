# MotionLex · 会动的网页术语书

独立于个人作品集的网页项目。用正在播放的示例介绍网页滚动、动效、交互与反馈术语，并把实现要求和验收要点复制成 Markdown，交给 AI 继续开发。

## 本地运行

需要 Node.js 22.13+。在本目录执行 `npm ci`，随后执行 `npm run dev -- --port 3001`，打开 `http://localhost:3001/`。

个人作品集位于相邻的 `zhangwen-portfolio-v2` 目录。它的 MotionLex 卡片默认跳转到本地 3001 端口；将来上线后，可给作品集设置 `NEXT_PUBLIC_MOTIONLEX_URL` 为公开网址，再构建作品集。

## 用自然语言找术语

首页支持长句描述和语音转文字，再展示相关术语与匹配理由。搜索模型默认接入 DeepSeek：在本机未提交的 `.env.local` 中设置 `DEEPSEEK_API_KEY=你的密钥`，重启开发服务即可使用。默认调用 `https://api.deepseek.com/chat/completions` 和 `deepseek-flash`；如需换模型，可设置 `AI_SEARCH_MODEL`。密钥只放在服务端环境变量，切勿写进前端代码或提交到仓库。没有密钥或模型服务暂时不可用时，页面会明确标为“本地意图匹配”，继续提供有限的描述检索。

语音优先使用浏览器提供的语音识别，需用户授权麦克风；浏览器如何处理语音由浏览器自身决定。DeepSeek 搜索密钥不会自动启用录音转写；若还要支持不提供浏览器语音识别的环境，可另外配置兼容 multipart `/audio/transcriptions` 的服务：`AI_TRANSCRIBE_API_KEY`、`AI_TRANSCRIBE_URL`、`AI_TRANSCRIBE_MODEL`。只有连接转写服务后，本站才会通过自己的接口上传录音。原有 `OPENAI_API_KEY` + `OPENAI_SEARCH_MODEL` 配置仍可用于搜索及 OpenAI 录音转写。

如需对接其他兼容接口，可设置 `AI_SEARCH_API_KEY`、完整的 `AI_SEARCH_URL`、`AI_SEARCH_MODEL`，以及 `AI_SEARCH_API_STYLE=chat-completions` 或 `responses`。

新的描述不会写入网址。旧版带 `?q=` 的链接仍可打开并触发一次检索。

## 内容结构

- `data/terms.ts`、`data/extra-terms.ts`、`data/expanded-terms.ts`：120 个词条的名称、场景、AI 提示词与验收要点。
- `data/taxonomy.ts`：按触发方式和使用目标组织为 12 个章节，每个词条只归入一个主章节。
- `lib/intent-search.ts` 与 `app/api/intent-search/route.ts`：本地意图匹配与服务端 AI 检索；结果只允许目录中已有的术语。
- `app/api/transcribe/route.ts`：浏览器语音识别不可用时的服务端录音转写入口。
- `components/motion-demo.tsx`：按术语映射的浏览器内动态示意；不依赖 GIF 或外部视频。
- `app/page.tsx`：搜索、筛选与卡片目录。
- `app/terms/[slug]/page.tsx`：独立词条页和 Markdown 复制入口。

## 调研依据

词条选择参考 [MDN 的滚动驱动动画说明](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)、[CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap)、[View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)、[W3C WAI-ARIA 交互模式](https://www.w3.org/WAI/ARIA/apg/patterns/) 和 [Motion 文档](https://motion.dev/docs)。参考站点 [VibeHub](https://vibe-hub.org/) 与 [Oil](https://www.oiloil.org/) 用于理解信息呈现和用户偏好的色彩气质；本站的界面、文案、分类和示例代码独立编写。

当前为本地版本，尚未发布公开网址。上线时需要先安装独立依赖并运行生产构建，随后把公开网址配置给作品集。
