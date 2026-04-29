// 境界等级配置
export const REALM_LEVELS = [
  { name: '凡人', level: 0, color: '#8a8a8a' },
  { name: '炼气期', level: 1, color: '#4ade80' },
  { name: '筑基期', level: 2, color: '#60a5fa' },
  { name: '金丹期', level: 3, color: '#f59e0b' },
  { name: '元婴期', level: 4, color: '#a78bfa' },
  { name: '化神期', level: 5, color: '#f87171' },
  { name: '合体期', level: 6, color: '#fb923c' },
  { name: '大乘期', level: 7, color: '#e879f9' },
  { name: '渡劫期', level: 8, color: '#67e8f9' },
  { name: '真仙', level: 9, color: '#fde68a' },
] as const;

// 稀有度颜色
export const RARITY_COLORS: Record<string, string> = {
  common: '#9ca3af',
  uncommon: '#4ade80',
  rare: '#60a5fa',
  epic: '#a78bfa',
  legendary: '#f59e0b',
  divine: '#fde68a',
};

// 稀有度名称
export const RARITY_NAMES: Record<string, string> = {
  common: '普通',
  uncommon: '精良',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
  divine: '神品',
};

// 装备槽位名称
export const EQUIPMENT_SLOT_NAMES: Record<string, string> = {
  weapon: '武器',
  armor: '护甲',
  headgear: '头饰',
  footwear: '鞋履',
  treasure: '法宝',
  pet: '灵宠',
};

// 技能类型名称
export const SKILL_TYPE_NAMES: Record<string, string> = {
  active: '主动技能',
  passive: '被动技能',
  xinjue: '心法',
};

// 物品分类名称
export const ITEM_CATEGORY_NAMES: Record<string, string> = {
  material: '材料',
  equipment: '装备',
  pill: '丹药',
  talisman: '符箓',
  quest: '任务',
  consumable: '消耗',
  misc: '杂项',
};

// 任务类型名称
export const QUEST_TYPE_NAMES: Record<string, string> = {
  daily: '日常',
  sect: '宗门',
  bounty: '悬赏',
  event: '活动',
};

// 任务状态名称
export const QUEST_STATUS_NAMES: Record<string, string> = {
  available: '可接取',
  active: '进行中',
  claimable: '可领取',
  completed: '已完成',
};

// 任务难度名称
export const QUEST_DIFFICULTY_NAMES: Record<string, string> = {
  easy: '简单',
  normal: '普通',
  hard: '困难',
  extreme: '极难',
};

// 商城分类名称
export const SHOP_CATEGORY_NAMES: Record<string, string> = {
  hot: '热销',
  cultivation: '修炼资源',
  appearance: '外观',
  pet: '灵宠',
  package: '礼包',
  discount: '特惠',
};

// 排行榜类型名称
export const RANKING_TYPE_NAMES: Record<string, string> = {
  battlePower: '战力榜',
  realm: '境界榜',
  alchemy: '炼丹榜',
  sect: '宗门榜',
  explore: '探索榜',
};

// 地图节点类型名称
export const LOCATION_TYPE_NAMES: Record<string, string> = {
  spiritVein: '灵脉',
  secret: '秘境',
  cave: '洞府',
  ruin: '遗迹',
  monsterDen: '妖兽巢穴',
  sect: '宗门驻地',
  town: '城镇',
  boss: 'BOSS',
};

// 频道名称
export const CHANNEL_NAMES: Record<string, string> = {
  world: '天下',
  sect: '宗门',
  private: '私信',
  system: '系统',
};

// 通知类型名称
export const NOTIFICATION_TYPE_NAMES: Record<string, string> = {
  system: '系统',
  quest: '任务',
  social: '社交',
  combat: '战斗',
  event: '活动',
  reward: '奖励',
};

// 修炼模式名称
export const CULTIVATION_MODE_NAMES: Record<string, string> = {
  meditation: '打坐',
  seclusion: '闭关',
  absorption: '灵气吸收',
  breakthrough: '突破境界',
  tribulation: '渡劫',
};

// 在线状态名称
export const ONLINE_STATUS_NAMES: Record<string, string> = {
  online: '在线',
  away: '离开',
  busy: '忙碌',
  offline: '离线',
};

// 在线状态颜色
export const ONLINE_STATUS_COLORS: Record<string, string> = {
  online: '#4ade80',
  away: '#f59e0b',
  busy: '#f87171',
  offline: '#6b7280',
};

// 随机事件类型名称
export const RANDOM_EVENT_TYPE_NAMES: Record<string, string> = {
  encounter: '奇遇',
  treasure: '宝箱',
  monster: '妖兽',
  npc: 'NPC',
  battle: '战斗',
  mystery: '神秘',
};

// 门派列表
export const SECT_LIST = [
  '太清宗', '玄武门', '灵霄派', '苍云宗', '紫电宫',
  '万剑门', '天机阁', '凤凰殿', '雷霆堂', '散修',
];

// 货币图标
export const CURRENCY_ICONS = {
  spiritStones: '💎',
  yuanbao: '🔮',
  contribution: '⭐',
  reputation: '🏅',
};

// 导航菜单项
export const NAV_MENU_ITEMS = [
  { key: 'cultivation', label: '修炼', icon: 'flame', path: '/cultivation' },
  { key: 'explore', label: '探索', icon: 'map', path: '/explore' },
  { key: 'quests', label: '任务', icon: 'scroll', path: '/quests' },
  { key: 'inventory', label: '背包', icon: 'package', path: '/inventory' },
  { key: 'shop', label: '坊市', icon: 'shopping-bag', path: '/shop' },
  { key: 'ranking', label: '排行', icon: 'trophy', path: '/ranking' },
  { key: 'social', label: '社交', icon: 'users', path: '/social' },
  { key: 'settings', label: '设置', icon: 'settings', path: '/settings' },
] as const;
