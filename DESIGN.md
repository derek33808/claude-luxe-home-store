# LUXE HOME - 精品风格电商网站

## 项目目标
创建一个精品风格的电商网站，展示高端智能家居产品，以 Smart Digital Calendar 作为首个上架产品。网站架构设计支持后续SEO/GEO推广活动。

## 功能需求
- [x] 响应式导航栏（Logo、导航链接、搜索、购物车）
- [x] Hero 区域展示品牌理念和主打产品
- [x] 产品展示页面（图片画廊、详情、规格、价格）
- [x] 图片缩略图切换功能
- [x] 颜色选择器
- [x] 数量选择器
- [x] 添加购物车功能
- [x] 购物车侧边栏
- [x] 产品特性展示
- [x] 品牌故事区域
- [x] 订阅邮件功能
- [x] 联系信息区域
- [x] 完整Footer
- [x] SEO 优化结构
- [ ] 付费模块（已预留）

## 技术选型
- **HTML5**: 语义化标签
- **CSS3**: 自定义属性、Flexbox、Grid、动画
- **Vanilla JavaScript**: 无框架依赖
- **Google Fonts**: Cormorant Garamond + Montserrat
- **响应式设计**: 支持桌面、平板、手机

## 设计风格
- 精品/奢侈品风格
- 配色：黑色主调 + 金色点缀 + 米色背景
- 字体：衬线体（标题）+ 无衬线体（正文）
- 大量留白，简约优雅

## SEO 优化架构

### Meta 标签
- 标题优化（含品牌名和主关键词）
- 描述标签（包含产品卖点和关键词）
- 关键词标签
- Canonical URL
- Robots 指令

### Open Graph / 社交分享
- og:title, og:description, og:image
- og:type, og:url, og:site_name
- Twitter Card 标签

## GEO 生成式引擎优化 (Generative Engine Optimization)

针对 AI 搜索引擎（ChatGPT、Perplexity、Google SGE、Claude 等）的优化策略。

### 核心原则
1. **直接回答问题** - FAQ 结构提供明确答案
2. **结构化内容** - 清晰的标题层级、列表、表格
3. **实体明确** - 清晰定义产品名称、品牌、价格、功能
4. **权威性信号** - 具体数据、规格参数、比较信息
5. **内容全面性** - 覆盖用户可能的所有问题

### 已实现的 GEO 优化

#### 1. FAQ 结构化数据 (Schema.org FAQPage)
- 8 个常见问题及详细答案
- 支持 AI 搜索引擎直接引用
- 覆盖：功能、订阅、同步、安装、规格、家务、设置、颜色

#### 2. HowTo 结构化数据
- 5 步设置指南
- 预计时间：5分钟
- 支持 Google 精选摘要

#### 3. 页面内 FAQ 区域
- 使用 Microdata 标记
- 粗体高亮关键信息
- 直接可被 AI 抓取的文本内容

#### 4. 语义化 HTML
- 清晰的标题层级 (h1 > h2 > h3 > h4)
- article、section 等语义标签
- itemscope/itemprop 属性

### 关键问答覆盖
| 问题类型 | 覆盖内容 |
|---------|---------|
| 是什么 | 产品定义、功能介绍 |
| 多少钱 | 价格 $229，无订阅费 |
| 怎么用 | 5步设置指南 |
| 能同步 | Google/iCloud/Outlook/Yahoo/Cozi |
| 有什么颜色 | 白框/木框/黑框 |
| 屏幕参数 | 15.6寸 IPS HD 触摸屏 |

### 结构化数据 (Schema.org JSON-LD)
1. **Organization** - 公司信息
2. **Product** - 产品详情（含价格、库存、评分）
3. **WebSite** - 网站搜索功能
4. **BreadcrumbList** - 面包屑导航
5. **FAQPage** - 常见问题（GEO 核心）
6. **HowTo** - 设置指南

### URL 结构设计（建议）
```
/                           # 首页
/collection                 # 产品集合页
/products/{slug}            # 单品页 (如 /products/smart-digital-calendar)
/about                      # 关于我们
/contact                    # 联系我们
/search?q={query}           # 搜索结果
```

## 付费模块预留

### 支持的支付方式（待实现）
- Stripe
- PayPal
- Apple Pay
- Google Pay

### 预留接口
```javascript
PaymentModule = {
    init()           // 初始化支付SDK
    initStripe()     // Stripe集成
    initPayPal()     // PayPal集成
    checkout()       // 发起结账
    handleSuccess()  // 支付成功回调
    handleError()    // 支付失败回调
}
```

### 实现步骤
1. 在 index.html 取消注释支付 SDK 脚本
2. 在 PaymentModule.config 中填入 API 密钥
3. 取消注释 initStripe() 和 initPayPal() 中的代码
4. 添加后端 API 处理支付确认

## Analytics 模块

### 追踪事件
- page_view - 页面浏览
- view_item - 产品浏览
- add_to_cart - 加入购物车
- begin_checkout - 开始结账
- conversion - 转化事件

### 集成支持
- Google Analytics 4
- Facebook Pixel
- 自定义分析后端

## 产品目录模块

### ProductCatalog 对象
```javascript
ProductCatalog = {
    getById(id)         // 按ID获取产品
    getBySlug(slug)     // 按URL slug获取产品
    getAll()            // 获取所有产品
    getByCategory(cat)  // 按分类获取
    search(query)       // 搜索产品
}
```

### 产品数据结构
- id, sku, name, slug
- brand, price, description
- features, specifications
- images, colors
- rating, reviewCount
- inStock, stockQuantity
- category, tags
- seo (title, description, keywords)

## 产品信息来源
Amazon 产品页面: https://www.amazon.com/dp/B0FYDC2WFG

### 产品详情
- **名称**: Smart Digital Calendar 15.6-inch Wall Planner & Family Organizer
- **品牌**: LOCVMIKY
- **价格**: $229.00
- **尺寸**: 15.6 inches
- **显示**: IPS HD Touchscreen
- **特点**:
  - 无订阅费用
  - Wi-Fi 同步
  - 支持 Google/iCloud/Outlook/Yahoo/Cozi
  - 家务表和膳食计划
  - 数字相框功能
  - 智能提醒

## 文件结构
```
luxe-home-store/
├── index.html      # 主页面（含SEO标签和结构化数据）
├── styles.css      # 样式文件
├── script.js       # 功能脚本（含支付和分析模块预留）
├── DESIGN.md       # 设计文档
└── PROGRESS.md     # 开发进度
```

## 验收标准
- [x] 网站在本地服务器正常运行
- [x] 所有产品图片正常显示
- [x] 购物车功能正常工作
- [x] 响应式布局适配各种屏幕
- [x] 动画和交互流畅
- [x] SEO 结构化数据完整
- [x] 付费模块预留代码就绪
- [x] Analytics 追踪模块就绪

## 后续开发计划
1. 接入实际支付网关 (Stripe/PayPal)
2. 添加用户账户系统
3. 实现产品搜索功能
4. 添加更多产品到目录
5. 配置 Google Analytics / Search Console
6. 启动 SEO/GEO 推广活动

## 域名更换指南

当前为 Demo 环境，正式上线时需更换域名。

### 需要更新的文件
```bash
# 将 OLD_DOMAIN 替换为 NEW_DOMAIN
sed -i '' 's|https://claude-luxe-home.netlify.app|https://新域名.com|g' sitemap.xml robots.txt index.html
```

### 具体更新位置
1. **sitemap.xml** - 所有 `<loc>` 标签中的 URL
2. **robots.txt** - Sitemap 路径
3. **index.html**:
   - `<link rel="canonical">`
   - `<meta property="og:url">`
   - `<meta name="twitter:url">`
   - Schema.org JSON-LD 中的 URL

### Netlify 配置
1. 进入 Netlify 后台 → Domain settings
2. 添加自定义域名
3. 配置 DNS（CNAME 或 A 记录）
4. 启用 HTTPS（自动 Let's Encrypt）

### 部署命令
```bash
# 更新后重新部署
git add -A && git commit -m "Update to production domain" && git push
netlify deploy --prod --dir=.
```
