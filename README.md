# 王祥伟的个人博客

记录计算机视觉研究、农资库存管理系统、无人机稻田杂草识别、论文阅读与实验进展。保留原网站的静态 HTML、Bootstrap 和 Markdown 内容结构，无需 npm 构建。

## 本地预览

在仓库目录运行：

```sh
python -m http.server 8765 --bind 127.0.0.1
```

打开 http://127.0.0.1:8765 。不要直接双击 index.html：内容通过 fetch 读取，需要 HTTP 服务。

## 日常更新

| 内容 | 文件 |
|---|---|
| 标题、姓名、页脚 | contents/config.yml |
| 个人介绍、教育背景、近期工作 | contents/home.md |
| 项目介绍 | contents/projects.md |
| 三篇论文导读 | contents/reading.md |
| 完整论文阅读清单 | contents/papers.json |
| 模型指标和实验说明 | contents/experiments.md |
| 获奖经历 | contents/awards.md |

论文清单条目使用 title、tags 字段；有导读时添加 note，指向 reading.md 中的 details id，例如 #note-lsknet。新增论文可直接编辑 JSON，无需复制 PDF。当前收录 205 篇论文。全部题名已与 PDF 首页核对；同名重复条目已合并，页面不展示本地文件名。

论文导读依据原文整理。

公开项目与实验记录仅概述做过的工作，不披露实验成果、指标、数据规模、代码、实现细节、个人或公司业务信息。整理过程说明不放入页面。

## GitHub Pages

当前仓库为 Wxw-DDup/wxw9458-web.github.io。网站资源均使用相对路径，可部署到项目子路径。发布前核对仓库 Settings → Pages 的实际地址与发布来源；仓库名称并不意味着网站仍位于旧用户域名。

本次修改为本地可审阅版本，未自动推送或发布。原论文全文未上传。

原学术主页模板的许可证保留在 LICENSE 中。
