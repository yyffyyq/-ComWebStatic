import { pipeProducts } from './管材类.js'
import { fireProducts } from './消防系统.js'
import { electricProducts } from './电气照明.js'
import { hardwareProducts } from './五金工具.js'

/**
 * 导航菜单数据配置
 * 存放于 /src/data 目录，供 Navbar 与各分类页面共享使用
 * 每个菜单项对应一个独立页面，通过 route 字段映射路由路径
 */
export const navMenu = [
  {
    name: 'products',
    label: '产品中心',
    route: '/products',
    children: [
      { title: '产品', items: ['管材类','电气照明','五金工具','消防系统' ]}
    ]
  },
  {
    name: 'solutions',
    label: '解决方案',
    route: '/solutions',
    children: [
      {
        title: '行业解决方案',
        items: ['建筑配电', '工业自动化', '新能源', '数据中心']
      },
      {
        title: '场景应用',
        items: ['智慧园区', '智能楼宇', '绿色能源']
      }
    ]
  },
  {
    name: 'cases',
    label: '案例中心',
    route: '/cases',
    children: [
      {
        title: '经典案例',
        items: ['商业综合体', '工业厂房', '市政工程']
      },
      {
        title: '合作伙伴',
        items: ['央企合作', '地产合作', '国际项目']
      }
    ]
  },
  {
    name: 'service',
    label: '服务与支持',
    route: '/service',
    children: [
      {
        title: '技术服务',
        items: ['产品选型', '技术文档', '安装指导']
      },
      {
        title: '售后服务',
        items: ['保修政策', '维修网点', '常见问题']
      }
    ]
  },
  {
    name: 'about',
    label: '关于公司',
    route: '/about',
    children: [
      {
        title: '企业介绍',
        items: ['公司简介', '发展历程', '企业文化']
      },
      {
        title: '新闻中心',
        items: ['公司新闻', '行业动态', '媒体报道']
      }
    ]
  }
]
