import type {
  User, Character, Realm, Attributes, Equipment, Skill,
  InventoryItem, Quest, ShopItem, RankingEntry, MapLocation,
  RandomEvent, SocialContact, Message, Notification, SystemSettings,
  Activity, Announcement, CultivationState,
} from '../types/index';

// ==================== 用户 ====================

export const mockUser: User = {
  id: 'user-001',
  username: '剑无双',
  email: 'jianwushuang@xianxia.com',
  avatar: '',
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
  isGuest: false,
};

// ==================== 境界 ====================

export const mockRealm: Realm = {
  id: 'realm-jq-3',
  name: '炼气期',
  level: 1,
  subLevel: 3,
  maxSubLevel: 9,
  breakthroughConditions: [
    '炼气期九层修为圆满',
    '感悟天道，灵力凝实',
    '准备足量突破丹药',
  ],
  description: '炼气之道，以气入体，洗经伐髓，开辟气府。',
  color: '#4ade80',
};

// ==================== 属性 ====================

export const mockAttributes: Attributes = {
  maxHp: 1200,
  hp: 980,
  maxMp: 800,
  mp: 650,
  attack: 156,
  defense: 89,
  speed: 112,
  comprehension: 85,
  luck: 72,
  spirit: 340,
};

// ==================== 技能 ====================

export const mockSkills: Skill[] = [
  {
    id: 'skill-001',
    name: '御剑术',
    type: 'active',
    level: 3,
    maxLevel: 10,
    description: '驱使飞剑攻击敌人，造成大量物理伤害，附带穿透效果。',
    icon: '⚔️',
    cooldown: 8,
    cost: 60,
    damage: 320,
  },
  {
    id: 'skill-002',
    name: '灵盾',
    type: 'active',
    level: 2,
    maxLevel: 10,
    description: '凝聚灵力形成护盾，抵挡一定量的伤害。',
    icon: '🛡️',
    cooldown: 15,
    cost: 80,
    effect: '护盾值：200',
  },
  {
    id: 'skill-003',
    name: '灵力感知',
    type: 'passive',
    level: 4,
    maxLevel: 10,
    description: '被动提升灵力恢复速度，每秒恢复额外2点灵力。',
    icon: '✨',
    effect: '灵力恢复 +8/s',
  },
  {
    id: 'skill-004',
    name: '太清心法',
    type: 'xinjue',
    level: 2,
    maxLevel: 5,
    description: '太清宗入门心法，修炼时增加灵气吸收效率。',
    icon: '📖',
    effect: '修炼效率 +20%',
  },
];

// ==================== 装备 ====================

export const mockEquipments: Equipment[] = [
  {
    id: 'equip-001',
    name: '青云剑',
    slot: 'weapon',
    rarity: 'rare',
    level: 15,
    requiredRealm: '炼气期',
    attributes: { attack: 45, speed: 8 },
    description: '太清宗弟子常用飞剑，剑气凌厉，锋芒毕露。',
    icon: '🗡️',
    isEquipped: true,
  },
  {
    id: 'equip-002',
    name: '玄铁护甲',
    slot: 'armor',
    rarity: 'uncommon',
    level: 12,
    requiredRealm: '炼气期',
    attributes: { defense: 30, maxHp: 200 },
    description: '以玄铁铸造，坚硬如磐，可抵挡妖兽利爪。',
    icon: '🧥',
    isEquipped: true,
  },
  {
    id: 'equip-003',
    name: '聚灵珠',
    slot: 'treasure',
    rarity: 'epic',
    level: 20,
    requiredRealm: '筑基期',
    attributes: { maxMp: 150, spirit: 50, comprehension: 10 },
    description: '传说中的聚灵宝珠，可汇聚天地灵气，大幅提升修炼效率。',
    icon: '🔮',
    isEquipped: false,
  },
];

// ==================== 角色 ====================

export const mockCharacter: Character = {
  id: 'char-001',
  userId: 'user-001',
  name: '剑无双',
  avatar: '',
  realm: mockRealm,
  realmProgress: 65,
  attributes: mockAttributes,
  skills: mockSkills,
  equipment: {
    weapon: mockEquipments[0],
    armor: mockEquipments[1],
  },
  sect: '太清宗',
  title: '破剑童子',
  battlePower: 12850,
  spiritStones: 58600,
  yuanbao: 320,
  stamina: 85,
  maxStamina: 120,
  experience: 4500,
  nextLevelExp: 7000,
};

// ==================== 背包物品 ====================

export const mockInventoryItems: InventoryItem[] = [
  {
    id: 'item-001',
    name: '筑基丹',
    category: 'pill',
    rarity: 'rare',
    quantity: 3,
    description: '服用后有助于突破炼气期壁垒，进入筑基境界。',
    icon: '💊',
    isLocked: true,
    usable: true,
    sellable: false,
    sellPrice: 0,
    effect: '突破成功率 +15%',
  },
  {
    id: 'item-002',
    name: '聚气符',
    category: 'talisman',
    rarity: 'uncommon',
    quantity: 12,
    description: '一次性符箓，激活后两小时内修炼效率提升30%。',
    icon: '📜',
    isLocked: false,
    usable: true,
    sellable: true,
    sellPrice: 120,
    effect: '修炼效率 +30%，持续2小时',
  },
  {
    id: 'item-003',
    name: '玄铁矿石',
    category: 'material',
    rarity: 'common',
    quantity: 48,
    description: '锻造武器铠甲的基础材料，矿脉中常见。',
    icon: '⛏️',
    isLocked: false,
    usable: false,
    sellable: true,
    sellPrice: 30,
  },
  {
    id: 'item-004',
    name: '灵泉水',
    category: 'consumable',
    rarity: 'uncommon',
    quantity: 5,
    description: '来自灵泉深处的天然灵水，饮用后恢复大量灵力。',
    icon: '💧',
    isLocked: false,
    usable: true,
    sellable: true,
    sellPrice: 80,
    effect: '恢复灵力 300',
  },
  {
    id: 'item-005',
    name: '龙血草',
    category: 'material',
    rarity: 'rare',
    quantity: 7,
    description: '炼制高阶丹药的珍贵药材，生长于龙脉附近。',
    icon: '🌿',
    isLocked: false,
    usable: false,
    sellable: true,
    sellPrice: 500,
  },
  {
    id: 'item-006',
    name: '防妖令',
    category: 'quest',
    rarity: 'common',
    quantity: 1,
    description: '太清宗发放的防妖令牌，完成驱妖任务后交还。',
    icon: '🪪',
    isLocked: true,
    usable: false,
    sellable: false,
    sellPrice: 0,
  },
  {
    id: 'item-007',
    name: '青云剑谱',
    category: 'misc',
    rarity: 'epic',
    quantity: 1,
    description: '记载青云剑法要领的古卷，研读后可习得御剑术。',
    icon: '📚',
    isLocked: true,
    usable: true,
    sellable: false,
    sellPrice: 0,
  },
  {
    id: 'item-008',
    name: '回气丹',
    category: 'pill',
    rarity: 'common',
    quantity: 20,
    description: '基础丹药，快速恢复少量气血。',
    icon: '🔴',
    isLocked: false,
    usable: true,
    sellable: true,
    sellPrice: 15,
    effect: '恢复气血 200',
  },
];

// ==================== 任务 ====================

export const mockQuests: Quest[] = [
  {
    id: 'quest-001',
    type: 'daily',
    name: '清晨打坐',
    description: '每日清晨于清净之所打坐修炼，感悟天道，净化灵力。',
    objectives: [
      { id: 'obj-001', description: '打坐修炼 30 分钟', current: 0, required: 1800, completed: false },
    ],
    rewards: { experience: 200, spiritStones: 100 },
    status: 'available',
    difficulty: 'easy',
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: 'quest-002',
    type: 'daily',
    name: '采集灵草',
    description: '前往后山灵草园，采集新鲜的聚气草，用于炼制基础丹药。',
    objectives: [
      { id: 'obj-002', description: '采集聚气草', current: 3, required: 5, completed: false },
    ],
    rewards: { experience: 300, spiritStones: 150, items: [{ itemId: 'item-002', name: '聚气符', quantity: 2 }] },
    status: 'active',
    difficulty: 'easy',
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    acceptedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'quest-003',
    type: 'sect',
    name: '铲除妖兽',
    description: '近日后山妖兽频繁出没，宗门命弟子清剿，以保宗门安宁。',
    objectives: [
      { id: 'obj-003', description: '击败山野猪精', current: 5, required: 5, completed: true },
      { id: 'obj-004', description: '击败蟒蛇妖', current: 2, required: 3, completed: false },
    ],
    rewards: { experience: 800, spiritStones: 500, contribution: 100 },
    status: 'active',
    difficulty: 'normal',
    acceptedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'quest-004',
    type: 'sect',
    name: '护送商队',
    description: '宗门商队前往青云城，途中恐有盗贼袭扰，需得力弟子护送。',
    objectives: [
      { id: 'obj-005', description: '安全护送商队至青云城', current: 1, required: 1, completed: true },
    ],
    rewards: { experience: 600, spiritStones: 800, reputation: 50 },
    status: 'claimable',
    difficulty: 'normal',
    acceptedAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 'quest-005',
    type: 'bounty',
    name: '悬赏：追缉魔修',
    description: '有魔修潜入本地，杀害无辜，各大宗门联合悬赏，缉拿此人。',
    objectives: [
      { id: 'obj-006', description: '击败魔修或获得线索', current: 0, required: 1, completed: false },
    ],
    rewards: { experience: 2000, spiritStones: 3000, items: [{ itemId: 'item-001', name: '筑基丹', quantity: 1 }] },
    status: 'available',
    difficulty: 'hard',
    expiresAt: new Date(Date.now() + 172800000).toISOString(),
  },
  {
    id: 'quest-006',
    type: 'event',
    name: '春日赏花宴',
    description: '正值桃花盛开之际，宗门举办赏花宴，完成活动任务可获丰厚奖励。',
    objectives: [
      { id: 'obj-007', description: '参加赏花宴', current: 1, required: 1, completed: true },
      { id: 'obj-008', description: '与宗门弟子交流 5 次', current: 5, required: 5, completed: true },
      { id: 'obj-009', description: '获得桃花令牌', current: 1, required: 1, completed: true },
    ],
    rewards: { experience: 1500, spiritStones: 1200, items: [{ itemId: 'item-003', name: '玄铁矿石', quantity: 30 }] },
    status: 'completed',
    difficulty: 'normal',
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// ==================== 商城 ====================

export const mockShopItems: ShopItem[] = [
  {
    id: 'shop-001',
    name: '筑基丹（高品）',
    category: 'cultivation',
    description: '以百年灵草精心炼制，突破筑基境界的必备丹药，成功率大幅提升。',
    icon: '💊',
    price: 5000,
    currency: 'spiritStone',
    isHot: true,
  },
  {
    id: 'shop-002',
    name: '聚灵珠',
    category: 'cultivation',
    description: '汇聚天地灵气，修炼时自动吸收周围灵气，大幅提升修炼效率。',
    icon: '🔮',
    price: 50,
    currency: 'yuanbao',
    isNew: true,
  },
  {
    id: 'shop-003',
    name: '飞天蝶羽衣',
    category: 'appearance',
    description: '以千年蝴蝶精翅制成，穿上后身形飘逸，宛若仙人。',
    icon: '🦋',
    price: 120,
    currency: 'yuanbao',
    originalPrice: 200,
    discount: 0.6,
    isHot: true,
  },
  {
    id: 'shop-004',
    name: '灵狐（幼体）',
    category: 'pet',
    description: '百年灵狐幼崽，天资聪颖，可为主人提供防御加成，还可帮助感知危险。',
    icon: '🦊',
    price: 300,
    currency: 'yuanbao',
  },
  {
    id: 'shop-005',
    name: '新手大礼包',
    category: 'package',
    description: '包含：回气丹×50、聚气符×10、灵石×5000、双倍经验卡×3',
    icon: '🎁',
    price: 30,
    currency: 'yuanbao',
    originalPrice: 100,
    discount: 0.3,
    purchaseLimit: 1,
    purchasedCount: 0,
    isNew: true,
  },
  {
    id: 'shop-006',
    name: '双倍修炼卡',
    category: 'cultivation',
    description: '激活后4小时内修炼经验双倍获取。',
    icon: '🃏',
    price: 800,
    currency: 'spiritStone',
    stock: 99,
    isHot: true,
  },
  {
    id: 'shop-007',
    name: '月销限定·青龙剑意',
    category: 'discount',
    description: '本月限定外观，装备后剑身浮现青龙纹路，气势非凡。',
    icon: '🐉',
    price: 88,
    currency: 'yuanbao',
    originalPrice: 150,
    discount: 0.59,
    stock: 200,
    purchaseLimit: 1,
    isHot: true,
  },
  {
    id: 'shop-008',
    name: '仙鹤坐骑',
    category: 'appearance',
    description: '驾鹤而行，凌空九霄，遨游仙境。移动速度大幅提升。',
    icon: '🕊️',
    price: 500,
    currency: 'yuanbao',
  },
];

// ==================== 排行榜 ====================

export const mockRankingEntries: RankingEntry[] = [
  { rank: 1, userId: 'u001', characterName: '天玄道人', avatar: '', sect: '天机阁', realm: '元婴期', value: 89420, valueLabel: '战力', change: 0 },
  { rank: 2, userId: 'u002', characterName: '紫云仙子', avatar: '', sect: '灵霄派', realm: '金丹期', value: 76380, valueLabel: '战力', change: 1 },
  { rank: 3, userId: 'u003', characterName: '剑魔', avatar: '', sect: '万剑门', realm: '金丹期', value: 71250, valueLabel: '战力', change: -1 },
  { rank: 4, userId: 'u004', characterName: '破天', avatar: '', sect: '玄武门', realm: '金丹期', value: 68900, valueLabel: '战力', change: 2 },
  { rank: 5, userId: 'u005', characterName: '凌霄客', avatar: '', sect: '灵霄派', realm: '筑基期', value: 45200, valueLabel: '战力', change: -1 },
  { rank: 6, userId: 'u006', characterName: '龙吟子', avatar: '', sect: '太清宗', realm: '筑基期', value: 42100, valueLabel: '战力', change: 0 },
  { rank: 7, userId: 'u007', characterName: '月影', avatar: '', sect: '凤凰殿', realm: '筑基期', value: 39800, valueLabel: '战力', change: 3 },
  { rank: 8, userId: 'u008', characterName: '云散', avatar: '', sect: '苍云宗', realm: '筑基期', value: 37650, valueLabel: '战力', change: -2 },
  { rank: 9, userId: 'u009', characterName: '霜叶', avatar: '', sect: '太清宗', realm: '炼气期', value: 18400, valueLabel: '战力', change: 1 },
  { rank: 10, userId: 'user-001', characterName: '剑无双', avatar: '', sect: '太清宗', realm: '炼气期', value: 12850, valueLabel: '战力', change: 0 },
];

// ==================== 地图节点 ====================

export const mockMapLocations: MapLocation[] = [
  { id: 'loc-001', name: '太清宗', type: 'sect', status: 'completed', x: 50, y: 50, description: '所属宗门，安全之地。', requiredRealm: '凡人', requiredStamina: 0, rewardHint: '领取宗门任务' },
  { id: 'loc-002', name: '后山灵脉', type: 'spiritVein', status: 'available', x: 65, y: 40, description: '宗门后山有天然灵脉，灵气浓郁，适合修炼。', requiredRealm: '炼气期', requiredStamina: 10, rewardHint: '获取灵石与修炼经验' },
  { id: 'loc-003', name: '青云城', type: 'town', status: 'available', x: 30, y: 60, description: '附近最大的修士聚集地，有坊市与客栈。', requiredRealm: '炼气期', requiredStamina: 15, rewardHint: '购买物资，接取悬赏' },
  { id: 'loc-004', name: '幽暗森林', type: 'monsterDen', status: 'available', x: 75, y: 65, description: '妖兽频繁出没的危险区域，有宝物埋藏其中。', requiredRealm: '炼气期', requiredStamina: 20, rewardHint: '获取材料与装备' },
  { id: 'loc-005', name: '碧水洞府', type: 'cave', status: 'locked', x: 20, y: 35, description: '传闻是一位前辈高人的修炼洞府，宝物无数。', requiredRealm: '筑基期', requiredStamina: 30, rewardHint: '高品质装备与功法' },
  { id: 'loc-006', name: '断崖秘境', type: 'secret', status: 'locked', x: 85, y: 25, description: '悬崖之上有秘境入口，内有上古遗宝。', requiredRealm: '筑基期', requiredStamina: 40, rewardHint: '史诗级宝物', isElite: true },
  { id: 'loc-007', name: '上古遗迹', type: 'ruin', status: 'locked', x: 10, y: 75, description: '上古修士留下的遗迹，机关重重，但宝物众多。', requiredRealm: '金丹期', requiredStamina: 50, rewardHint: '功法与传承', isElite: true },
  { id: 'loc-008', name: '魔虎巢穴', type: 'boss', status: 'available', x: 55, y: 80, description: '一头修炼千年的魔虎盘踞于此，凶猛异常。', requiredRealm: '炼气期', requiredStamina: 35, rewardHint: '稀有材料与大量经验', isElite: true },
];

// ==================== 随机事件 ====================

export const mockRandomEvents: RandomEvent[] = [
  {
    id: 'event-001',
    type: 'encounter',
    title: '奇遇！神秘老人',
    description: '道路旁有一白发老人正在休息，见你前来，微微点头，似有话说...',
    options: [
      { id: 'opt-001', text: '上前拜见', outcome: '老人传授一门身法，速度 +5' },
      { id: 'opt-002', text: '绕道而行', outcome: '默默离开，无事发生' },
    ],
    icon: '🧙',
  },
  {
    id: 'event-002',
    type: 'treasure',
    title: '发现宝箱！',
    description: '草丛中有一个落满灰尘的铁箱，似乎有年头了...',
    options: [
      { id: 'opt-003', text: '强行打开', outcome: '获得灵石 500、玄铁矿石 10', cost: { type: 'stamina', amount: 5 } },
      { id: 'opt-004', text: '寻找钥匙', outcome: '未找到钥匙，无法开启' },
    ],
    icon: '📦',
  },
];

// ==================== 社交 ====================

export const mockContacts: SocialContact[] = [
  {
    id: 'contact-001',
    userId: 'u007',
    characterName: '月影',
    avatar: '',
    realm: '筑基期',
    sect: '凤凰殿',
    onlineStatus: 'online',
    lastActiveAt: new Date().toISOString(),
    unreadCount: 3,
    relationship: 'friend',
  },
  {
    id: 'contact-002',
    userId: 'u009',
    characterName: '霜叶',
    avatar: '',
    realm: '炼气期',
    sect: '太清宗',
    onlineStatus: 'online',
    lastActiveAt: new Date().toISOString(),
    unreadCount: 0,
    relationship: 'sectMember',
  },
  {
    id: 'contact-003',
    userId: 'u006',
    characterName: '龙吟子',
    avatar: '',
    realm: '筑基期',
    sect: '太清宗',
    onlineStatus: 'away',
    lastActiveAt: new Date(Date.now() - 1800000).toISOString(),
    unreadCount: 0,
    relationship: 'sectMember',
  },
  {
    id: 'contact-004',
    userId: 'u005',
    characterName: '凌霄客',
    avatar: '',
    realm: '筑基期',
    sect: '灵霄派',
    onlineStatus: 'offline',
    lastActiveAt: new Date(Date.now() - 86400000).toISOString(),
    unreadCount: 1,
    relationship: 'friend',
  },
];

// ==================== 消息 ====================

export const mockMessages: Message[] = [
  {
    id: 'msg-001',
    channelType: 'world',
    senderId: 'u001',
    senderName: '天玄道人',
    senderAvatar: '',
    content: '元婴期突破成功！道友们，贫道要去渡劫了，哈哈哈！',
    type: 'text',
    sentAt: new Date(Date.now() - 300000).toISOString(),
    isRead: true,
  },
  {
    id: 'msg-002',
    channelType: 'world',
    senderId: 'u002',
    senderName: '紫云仙子',
    senderAvatar: '',
    content: '恭喜天玄道友！本仙子这便去采购筑基丹了，坊市走起！',
    type: 'text',
    sentAt: new Date(Date.now() - 240000).toISOString(),
    isRead: true,
  },
  {
    id: 'msg-003',
    channelType: 'sect',
    senderId: 'u006',
    senderName: '龙吟子',
    senderAvatar: '',
    content: '师弟妹们，宗门今晚有议事，别忘了参加。',
    type: 'text',
    sentAt: new Date(Date.now() - 120000).toISOString(),
    isRead: false,
  },
  {
    id: 'msg-004',
    channelType: 'private',
    senderId: 'u007',
    senderName: '月影',
    senderAvatar: '',
    content: '道友，你手里有没有多余的龙血草？我愿意出高价收购。',
    type: 'text',
    sentAt: new Date(Date.now() - 60000).toISOString(),
    isRead: false,
  },
];

// ==================== 通知 ====================

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'quest',
    title: '任务可领取',
    content: '护送商队任务已完成，前往任务面板领取奖励！',
    isRead: false,
    createdAt: new Date(Date.now() - 300000).toISOString(),
    link: '/quests',
  },
  {
    id: 'notif-002',
    type: 'system',
    title: '系统维护公告',
    content: '服务器将于今晚23:00进行例行维护，预计维护时长2小时。',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'notif-003',
    type: 'social',
    title: '好友上线',
    content: '月影 已上线，快去打个招呼吧！',
    isRead: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    link: '/social',
  },
  {
    id: 'notif-004',
    type: 'event',
    title: '活动即将开始',
    content: '春日赏花宴活动将在1小时后开始，记得参加！',
    isRead: true,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: 'notif-005',
    type: 'reward',
    title: '每日签到奖励',
    content: '今日签到奖励已发放：灵石×100，体力×20',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// ==================== 设置 ====================

export const mockSettings: SystemSettings = {
  soundEnabled: true,
  musicEnabled: true,
  soundVolume: 80,
  musicVolume: 60,
  graphicsQuality: 'medium',
  performanceMode: false,
  language: 'zh-CN',
  uiScale: 1,
  showDamageNumbers: true,
  showOtherPlayers: true,
  notificationEnabled: true,
  effectsLevel: 'high',
};

// ==================== 活动 ====================

export const mockActivities: Activity[] = [
  {
    id: 'act-001',
    name: '春日赏花宴',
    description: '桃花盛开，宗门举办赏花宴，完成活动获丰厚奖励',
    icon: '🌸',
    startAt: new Date(Date.now() - 86400000).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    rewardHint: '筑基丹、灵石',
    isNew: false,
    isHot: true,
    status: 'active',
  },
  {
    id: 'act-002',
    name: '七日签到',
    description: '连续签到七日，获取累计奖励',
    icon: '📅',
    startAt: new Date(Date.now() - 86400000).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 6).toISOString(),
    rewardHint: '元宝、聚灵珠',
    isNew: false,
    isHot: false,
    status: 'active',
  },
  {
    id: 'act-003',
    name: '新服首充',
    description: '新服开启首次充值双倍元宝',
    icon: '💎',
    startAt: new Date(Date.now() + 3600000).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    rewardHint: '双倍元宝',
    isNew: true,
    isHot: true,
    status: 'upcoming',
  },
];

// ==================== 公告 ====================

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: '【维护公告】例行服务器维护',
    content: '服务器将于今晚23:00进行例行维护，预计维护时长2小时，维护期间无法登录游戏。',
    type: 'maintenance',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    isImportant: true,
  },
  {
    id: 'ann-002',
    title: '【版本更新】春日赏花宴活动上线',
    content: '本次版本新增春日赏花宴活动，参与活动可获得丰厚奖励，包括筑基丹、灵石等。',
    type: 'event',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    isImportant: false,
  },
  {
    id: 'ann-003',
    title: '【系统公告】1.2.0版本内容更新',
    content: '新增探索地图功能，优化战斗系统，修复已知BUG若干。',
    type: 'update',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    isImportant: false,
  },
];

// ==================== 修炼状态 ====================

export const mockCultivationState: CultivationState = {
  isActive: false,
  mode: null,
  startedAt: null,
  duration: 0,
  elapsed: 0,
  successRate: 0,
  gainPerHour: 0,
  status: 'idle',
};
