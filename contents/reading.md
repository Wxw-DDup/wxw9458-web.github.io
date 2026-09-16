阅读围绕几个具体问题展开：**小目标为什么漏检、上下文如何帮助识别、特征融合如何保留细节，以及匹配与定位如何影响检测结果。**

<details id="note-lsknet">
<summary>Large Selective Kernel Network for Remote Sensing Object Detection</summary>

### Large Selective Kernel Network for Remote Sensing Object Detection

**ICCV 2023 · 上下文建模 / 遥感检测**

**问题。** 小目标自身的外观信息有限，周围环境可能是判断类别的重要依据；不同目标需要的上下文范围也不同。

**方法。** LSKNet 用大核深度卷积构建不同范围的特征，再通过空间选择机制组合它们，使特征提取能适应不同位置所需的上下文。

**核心设计。** 贡献主要落在特征提取骨干与空间选择机制：大核提供更广的上下文，空间选择机制根据内容调整不同范围特征的组合。

**适用范围。** 论文主要在遥感目标检测基准上验证方法，其他场景中的表现取决于目标特点和数据条件。

[论文原文](https://openaccess.thecvf.com/content/ICCV2023/html/Li_Large_Selective_Kernel_Network_for_Remote_Sensing_Object_Detection_ICCV_2023_paper.html) · [作者代码](https://github.com/zcablii/Large-Selective-Kernel-Network)

</details>

<details id="note-nwd">
<summary>Detecting tiny objects in aerial images: A normalized Wasserstein distance and a new benchmark</summary>

### Detecting tiny objects in aerial images: A normalized Wasserstein distance and a new benchmark

**ISPRS Journal of Photogrammetry and Remote Sensing · 2022 · 标签分配 / 微小目标**

**问题。** 对很小的框，少量像素的位置偏移就可能显著改变 IoU，影响正负样本分配。外观特征弱之外，监督信号本身也值得检查。

**方法。** 论文提出归一化 Wasserstein 距离（NWD）及基于排序的分配策略（RKA），改善 anchor-based 检测器的训练样本分配，并重新标注 AI-TOD、发布 AI-TOD-v2。

**核心设计。** 距离度量、样本分配和标注质量共同影响监督信号。NWD-RKA 聚焦训练样本分配，标准 AP 仍按既定评价定义计算。

**适用范围。** 论文面向 anchor-based 检测器，应用到采用其他匹配机制的检测器时，需要相应的适配与验证。

[论文原文](https://arxiv.org/abs/2206.13996) · [作者项目页](https://chasel-tsui.github.io/AI-TOD-v2/)

</details>

<details id="note-freqfusion">
<summary>Frequency-Aware Feature Fusion for Dense Image Prediction</summary>

### Frequency-Aware Feature Fusion for Dense Image Prediction

**IEEE TPAMI · 2024 · 高频信息 / 特征融合**

**问题。** 普通上采样与融合可能留下物体内部特征不一致、边界模糊或偏移的问题。高频既可能是有用细节，也可能是干扰。

**方法。** FreqFusion 组合自适应低通滤波、偏移重采样和自适应高通滤波：低通抑制内部不一致，偏移将特征向邻近一致区域重采样，高通补充低层边界细节。

**核心设计。** 不同位置与层级承担不同的频率处理任务：抑制内部干扰与保留边界细节相互配合，共同改善融合特征。

**适用范围。** 方法面向密集预测中的特征融合，实际接入与特征尺度、通道设置及计算开销有关。

[论文原文](https://arxiv.org/abs/2408.12879) · [作者代码](https://github.com/ying-fu/FreqFusion)

</details>
