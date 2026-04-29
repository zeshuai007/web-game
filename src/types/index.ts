// ==================== 用户与认证 ====================

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  lastLoginAt: string;
  isGuest: boolean;
}

// ==================== 境界与修炼 ====================

export type RealmLevel =
  | '凡人'
  | '炼气期'
  | '筑基期'
  | '金丹期'
  | '元婴期'
  | '化神期'
  | '合体期'
  | '大乘期'
  | '渡劫期'
  | '真仙';

export interface Realm {
  id: string;
  name: RealmLevel;
  level: number;       // 数字层级，用于比较
  subLevel: number;    // 小层，如炼气一层/二层..九层
  maxSubLevel: number;
  breakthroughConditions: string[];
  description: string;
  color: string;       // 境界颜色标识
}

// ==================== 属性 ====================

export interface Attributes {
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
  attack: number;
  defense: number;
  speed: number;
  comprehension: number; // 悟性
  luck: number;          // 机缘
  spirit: number;        // 灵力
}

// ==================== 技能 ====================

export type SkillType = 'active' | 'passive' | 'xinjue'; // 主动/被动/心法

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  level: number;
  maxLevel: number;
  description: string;
  icon: string;
  cooldown?: number;   // 冷却时间（秒）
  cost?: number;       // 灵力消耗
  damage?: number;
  effect?: string;
}

// ==================== 装备 ====================

export type EquipmentSlot =
  | 'weapon'
  | 'armor'
  | 'headgear'
  | 'footwear'
  | 'treasure'  // 法宝
  | 'pet';      // 灵宠

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'divine';

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: ItemRarity;
  level: number;
  requiredRealm: string;
  attributes: Partial<Attributes>;
  description: string;
  icon: string;
  isEquipped: boolean;
}

// ==================== 角色 ====================

export interface Character {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  realm: Realm;
  realmProgress: number;   // 0-100，当前境界进度
  attributes: Attributes;
  skills: Skill[];
  equipment: Partial<Record<EquipmentSlot, Equipment>>;
  sect: string;            // 门派
  title: string;           // 称号
  battlePower: number;     // 战力
  spiritStones: number;    // 灵石
  yuanbao: number;         // 元宝
  stamina: number;         // 体力
  maxStamina: number;
  experience: number;
  nextLevelExp: number;
}

// ==================== 背包物品 ====================

export type ItemCategory =
  | 'material'    // 材料
  | 'equipment'   // 装备
  | 'pill'        // 丹药
  | 'talisman'    // 符箓
  | 'quest'       // 任务物品
  | 'consumable'  // 消耗品
  | 'misc';       // 杂项

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: ItemRarity;
  quantity: number;
  description: string;
  icon: string;
  isLocked: boolean;
  usable: boolean;
  sellable: boolean;
  sellPrice: number;
  weight?: number;
  effect?: string;
  equipment?: Equipment;  // 若是装备类型，附带装备信息
}

// ==================== 任务 ====================

export type QuestType = 'daily' | 'sect' | 'bounty' | 'event';
export type QuestStatus = 'available' | 'active' | 'claimable' | 'completed';

export interface QuestObjective {
  id: string;
  description: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestReward {
  experience?: number;
  spiritStones?: number;
  items?: { itemId: string; name: string; quantity: number }[];
  reputation?: number;
  contribution?: number;
}

export interface Quest {
  id: string;
  type: QuestType;
  name: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  status: QuestStatus;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
  expiresAt?: string;
  acceptedAt?: string;
  completedAt?: string;
}

// ==================== 商城 ====================

export type ShopCategory = 'hot' | 'cultivation' | 'appearance' | 'pet' | 'package' | 'discount';
export type CurrencyType = 'spiritStone' | 'yuanbao';

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  description: string;
  icon: string;
  price: number;
  currency: CurrencyType;
  originalPrice?: number;  // 原价（用于折扣显示）
  discount?: number;       // 折扣，0-1
  stock?: number;          // 库存，undefined表示无限
  purchaseLimit?: number;  // 限购数量
  purchasedCount?: number; // 已购买数量
  isNew?: boolean;
  isHot?: boolean;
  expiresAt?: string;
}

// ==================== 排行榜 ====================

export type RankingType = 'battlePower' | 'realm' | 'alchemy' | 'sect' | 'explore';

export interface RankingEntry {
  rank: number;
  userId: string;
  characterName: string;
  avatar: string;
  sect: string;
  realm: string;
  value: number;        // 对应排行维度的数值
  valueLabel: string;   // 数值显示名
  change?: number;      // 排名变化
}

// ==================== 地图与探索 ====================

export type LocationType =
  | 'spiritVein'    // 灵脉
  | 'secret'        // 秘境
  | 'cave'          // 洞府
  | 'ruin'          // 遗迹
  | 'monsterDen'    // 妖兽巢穴
  | 'sect'          // 宗门驻地
  | 'town'          // 城镇
  | 'boss';         // BOSS

export type LocationStatus = 'locked' | 'available' | 'explored' | 'completed';

export interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  status: LocationStatus;
  x: number;  // 在地图上的相对位置 0-100
  y: number;
  description: string;
  requiredRealm?: string;
  requiredStamina: number;
  rewardHint: string;
  isElite?: boolean;
}

export type RandomEventType = 'encounter' | 'treasure' | 'monster' | 'npc' | 'battle' | 'mystery';

export interface RandomEvent {
  id: string;
  type: RandomEventType;
  title: string;
  description: string;
  options: {
    id: string;
    text: string;
    outcome: string;
    cost?: { type: string; amount: number };
  }[];
  icon: string;
}

// ==================== 社交 ====================

export type OnlineStatus = 'online' | 'away' | 'busy' | 'offline';

export interface SocialContact {
  id: string;
  userId: string;
  characterName: string;
  avatar: string;
  realm: string;
  sect: string;
  onlineStatus: OnlineStatus;
  lastActiveAt: string;
  unreadCount: number;
  relationship: 'friend' | 'sectMember' | 'follower';
}

export type MessageType = 'text' | 'system' | 'item' | 'quest' | 'emoji';
export type ChannelType = 'world' | 'sect' | 'private' | 'system';

export interface Message {
  id: string;
  channelType: ChannelType;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: MessageType;
  sentAt: string;
  isRead: boolean;
}

// ==================== 通知 ====================

export type NotificationType = 'system' | 'quest' | 'social' | 'combat' | 'event' | 'reward';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
  extra?: Record<string, unknown>;
}

// ==================== 设置 ====================

export interface SystemSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;     // 0-100
  musicVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high' | 'ultra';
  performanceMode: boolean;
  language: 'zh-CN' | 'zh-TW' | 'en-US';
  uiScale: number;         // 0.8 - 1.2
  showDamageNumbers: boolean;
  showOtherPlayers: boolean;
  notificationEnabled: boolean;

  /**
   * 动效强度
   * - high: 默认开启全部动效
   * - low: 省电/低端机
   * - off: 关闭动效
   */
  effectsLevel: 'high' | 'low' | 'off';
}

// ==================== 货币 ====================

export interface Currency {
  spiritStones: number;  // 灵石（基础货币）
  yuanbao: number;       // 元宝（高级货币）
  contribution: number;  // 贡献值（宗门货币）
  reputation: number;    // 声望
}

// ==================== 修炼 ====================

export type CultivationMode =
  | 'meditation'    // 打坐
  | 'seclusion'     // 闭关
  | 'absorption'    // 灵气吸收
  | 'breakthrough'  // 突破
  | 'tribulation';  // 渡劫

export interface CultivationState {
  isActive: boolean;
  mode: CultivationMode | null;
  startedAt: string | null;
  duration: number;         // 预计时长（秒）
  elapsed: number;          // 已过去时间（秒）
  successRate: number;      // 成功率（突破/渡劫）
  gainPerHour: number;      // 每小时经验收益
  status: 'idle' | 'active' | 'completed' | 'failed';
}

// ==================== 公告 ====================

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'maintenance' | 'event' | 'update' | 'notice';
  publishedAt: string;
  isImportant: boolean;
}

// ==================== 活动 ====================

export interface Activity {
  id: string;
  name: string;
  description: string;
  icon: string;
  startAt: string;
  endAt: string;
  rewardHint: string;
  isNew: boolean;
  isHot: boolean;
  status: 'upcoming' | 'active' | 'ended';
}
