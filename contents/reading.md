阅读围绕几个具体问题展开：**小目标为什么漏检、上下文如何帮助识别、特征融合如何保留细节，以及匹配与定位如何影响检测结果。**

<details id="note-lsknet">
<summary>Large Selective Kernel Network for Remote Sensing Object Detection</summary>

### Large Selective Kernel Network for Remote Sensing Object Detection

**ICCV 2023 · 上下文建模 / 遥感检测**

**问题。** 小目标自身的外观信息有限，周围环境可能是判断类别的重要依据；不同目标需要的上下文范围也不同。

**方法。** LSKNet 用大核深度卷积构建不同范围的特征，再通过空间选择机制组合它们，使特征提取能适应不同位置所需的上下文。

**阅读重点。** 贡献主要落在特征提取骨干与空间选择机制。理解时应区分“扩大感受野”和“根据内容选择感受野”，并查看消融实验是否支持这两个设计各自的作用。

**边界。** 原文的遥感基准与杂草水平框数据不同，不能把论文成绩直接当成项目预期收益。

[论文原文](https://openaccess.thecvf.com/content/ICCV2023/html/Li_Large_Selective_Kernel_Network_for_Remote_Sensing_Object_Detection_ICCV_2023_paper.html) · [作者代码](https://github.com/zcablii/Large-Selective-Kernel-Network)

</details>

<details id="note-nwd">
<summary>Detecting tiny objects in aerial images: A normalized Wasserstein distance and a new benchmark</summary>

### Detecting tiny objects in aerial images: A normalized Wasserstein distance and a new benchmark

**ISPRS Journal of Photogrammetry and Remote Sensing · 2022 · 标签分配 / 微小目标**

**问题。** 对很小的框，少量像素的位置偏移就可能显著改变 IoU，影响正负样本分配。外观特征弱之外，监督信号本身也值得检查。

**方法。** 论文提出归一化 Wasserstein 距离（NWD）及基于排序的分配策略（RKA），改善 anchor-based 检测器的训练样本分配，并重新标注 AI-TOD、发布 AI-TOD-v2。

**阅读重点。** 距离度量、样本分配和标注质量是三个相关但不同的问题。不能把 NWD 简化成“换一个回归损失”，也不能认为改善训练匹配就改变了标准 AP 的评价定义。

**边界。** 论文的 anchor-based 分配方案不能直接视为 DETR 匈牙利匹配的替代品；迁移需要单独设计与消融。

[论文原文](https://arxiv.org/abs/2206.13996) · [作者项目页](https://chasel-tsui.github.io/AI-TOD-v2/)

</details>

<details id="note-freqfusion">
<summary>Frequency-Aware Feature Fusion for Dense Image Prediction</summary>

### Frequency-Aware Feature Fusion for Dense Image Prediction

**IEEE TPAMI · 2024 · 高频信息 / 特征融合**

**问题。** 普通上采样与融合可能留下物体内部特征不一致、边界模糊或偏移的问题。高频既可能是有用细节，也可能是干扰。

**方法。** FreqFusion 组合自适应低通滤波、偏移重采样和自适应高通滤波：低通抑制内部不一致，偏移将特征向邻近一致区域重采样，高通补充低层边界细节。

**阅读重点。** 论文强调不同位置与层级的频率处理，不能概括为“高频越强越好”。应结合特征可视化理解三个组件为何配合使用。

**边界。** 这是特征融合方法；接入具体检测器需要检查特征尺度、通道和额外开销。

[论文原文](https://arxiv.org/abs/2408.12879) · [作者代码](https://github.com/ying-fu/FreqFusion)

</details>
