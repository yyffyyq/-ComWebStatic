/**
 * 产品分类标签配置
 */
export const categories = [
  { id: 'all', name: '全部案例' },
  { id: 'material', name: '工程材料' },
  { id: 'fire', name: '消防系统' },
  { id: 'lighting', name: '电气照明' },
  { id: 'brand', name: '品牌合作' },
  { id: 'case', name: '客户项目' },
]

/**
 * 案例卡片数据配置文件
 * 内容参考案例.txt，共9个案例
 */
export const cardList = [
  // 案例一｜工程材料供应
  {
    id: 1,
    category: 'material',
    title: '大型工程管材供应案例',
    subtitle: '工程材料 / 管材配送',
    action: '详情',
    image: '/images/cordPicture/案例一.webp',
    summary:
      '为大型工程项目提供镀锌管、无缝管、JDG管及配套辅材供应，依托共享仓储与物流体系，实现高效配送与稳定供货。',
    detail: {
      title: '大型工程管材供应案例',
      description:
        '为大型工程项目提供镀锌管、无缝管、JDG管及配套辅材供应，依托共享仓储与物流体系，实现高效配送与稳定供货。',
      images: ['/images/cordPicture/案例一.webp'],
    },
  },
  // 案例二｜消防系统配套
  {
    id: 2,
    category: 'fire',
    title: '消防系统一站式配套',
    subtitle: '消防器材 / 阀门系统',
    action: '详情',
    image: '/images/cordPicture/案例二.webp',
    summary:
      '整合消防管件、沟槽配件、喷淋系统及报警设备等产品资源，为工程客户提供完整消防系统采购解决方案。',
    detail: {
      title: '消防系统一站式配套',
      description:
        '整合消防管件、沟槽配件、喷淋系统及报警设备等产品资源，为工程客户提供完整消防系统采购解决方案。',
      images: ['/images/cordPicture/案例二.webp'],
    },
  },
  // 案例三｜电气照明工程
  {
    id: 3,
    category: 'lighting',
    title: '电气照明项目服务',
    subtitle: '配电系统 / 灯具照明',
    action: '详情',
    image: '/images/cordPicture/案例三.webp',
    summary:
      '覆盖配电箱、开关插座、电线电缆及照明灯具等全品类产品，为商业及工程项目提供专业电气配套服务。',
    detail: {
      title: '电气照明项目服务',
      description:
        '覆盖配电箱、开关插座、电线电缆及照明灯具等全品类产品，为商业及工程项目提供专业电气配套服务。',
      images: ['/images/cordPicture/案例三.webp'],
    },
  },
  // 案例四｜品牌合作案例
  {
    id: 4,
    category: 'brand',
    title: '品牌联合供应体系',
    subtitle: '品牌资源 / 供应链整合',
    action: '详情',
    image: '/images/cordPicture/案例四.webp',
    summary:
      '联合行业头部品牌与优质工厂资源，建立覆盖水电、消防、照明及工程辅材的稳定供应链体系，为工程客户提供更高效、更可靠的采购支持。',
    detail: {
      title: '品牌联合供应体系',
      description:
        '联合行业头部品牌与优质工厂资源，建立覆盖水电、消防、照明及工程辅材的稳定供应链体系，为工程客户提供更高效、更可靠的采购支持。26家上市企业合作。',
      images: ['/images/cordPicture/案例四.webp'],
    },
  },
  // 案例五｜仓储物流案例
  {
    id: 5,
    category: 'case',
    title: '共享仓储配送体系',
    subtitle: '仓储物流 / 快速配送',
    action: '详情',
    image: '/images/cordPicture/案例五.webp',
    summary:
      '依托共享仓储与区域物流体系，实现工程材料快速调拨与高效配送，减少中间流通环节，提升项目交付效率。',
    detail: {
      title: '共享仓储配送体系',
      description:
        '依托共享仓储与区域物流体系，实现工程材料快速调拨与高效配送，减少中间流通环节，提升项目交付效率。现货充足 · 快速响应。',
      images: ['/images/cordPicture/案例五.webp'],
    },
  },
  // 案例六｜工程项目案例
  {
    id: 6,
    category: 'case',
    title: '商业工程项目合作',
    subtitle: '工程配套 / 项目供应',
    action: '详情',
    image: '/images/cordPicture/案例六.webp',
    summary:
      '服务商业建筑、工业厂房、园区及市政工程项目，提供从管材、消防、电气到五金辅材的一站式工程建材配套服务。',
    detail: {
      title: '商业工程项目合作',
      description:
        '服务商业建筑、工业厂房、园区及市政工程项目，提供从管材、消防、电气到五金辅材的一站式工程建材配套服务。一站式采购服务。',
      images: ['/images/cordPicture/案例六.webp'],
    },
  },
  // 案例七｜消防工程案例
  {
    id: 7,
    category: 'fire',
    title: '大型消防系统配套项目',
    subtitle: '消防工程 / 系统配套',
    action: '详情',
    image: '/images/cordPicture/案例七.webp',
    summary: '覆盖喷淋系统、消防管件、报警设备及应急疏散系统，为工程项目提供专业消防材料供应服务。',
    detail: {
      title: '大型消防系统配套项目',
      description:
        '覆盖喷淋系统、消防管件、报警设备及应急疏散系统，为工程项目提供专业消防材料供应服务。',
      images: ['/images/cordPicture/案例七.webp'],
    },
  },
  // 案例八｜电力通信案例
  {
    id: 8,
    category: 'material',
    title: '电力通信管网建设',
    subtitle: '电力通信 / 管网建设',
    action: '详情',
    image: '/images/cordPicture/案例八.webp',
    summary: '提供PE管、电力护套管、JDG/KBG管材及通信配套产品，满足市政与园区项目建设需求。',
    detail: {
      title: '电力通信管网建设',
      description: '提供PE管、电力护套管、JDG/KBG管材及通信配套产品，满足市政与园区项目建设需求。',
      images: ['/images/cordPicture/案例八.webp'],
    },
  },
  // 案例九｜五金辅材案例
  {
    id: 9,
    category: 'material',
    title: '工程五金综合配套',
    subtitle: '五金辅材 / 工程配套',
    action: '详情',
    image: '/images/cordPicture/案例九.webp',
    summary: '覆盖五金工具、紧固件、防水辅材及安装配件，为施工现场提供高效便捷的辅材采购方案。',
    detail: {
      title: '工程五金综合配套',
      description:
        '覆盖五金工具、紧固件、防水辅材及安装配件，为施工现场提供高效便捷的辅材采购方案。',
      images: ['/images/cordPicture/案例九.webp'],
    },
  },
]
